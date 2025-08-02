import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CreateClassInput = {
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  maxCapacity: number;
  status?: string;
  date: Date;
  branchId: string;
  courseId?: string;
  trainerIds: string[];
};


export async function POST(req: NextRequest){
    try{
       const body = (await req.json()) as CreateClassInput;

        const {
            name,
            description,
            startTime,
            endTime,
            maxCapacity,
            branchId,
            trainerIds,
        } = body;

        const newClass = await prisma.class.create({
            data: {
                name,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                maxCapacity,
                branchId,
                trainers: {
                create: trainerIds.map((trainerId: string) => ({
                    trainer: {
                    connect: { id: trainerId },
                    },
                })),
                },
            },
            include: {
                trainers: {
                    include: {
                        trainer: true,
                    },
                },
            },
            })

        return NextResponse.json(newClass, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error -> ${error}`}, { status: 500 });
    }
}