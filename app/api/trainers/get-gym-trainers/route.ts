import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        
        if(!id){
            return NextResponse.json({ message: "No gym Id was provided"}, { status: 400 });
        }

        const trainers = await prisma.branchTrainer.findMany({
            where: {
                branch: {
                    gymId: id,
                },
            },
            include: {
                trainer: { 
                    select: { 
                        name: true
                    }
                 },
            },
        });

        return NextResponse.json(trainers, { status: 500 });

    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}