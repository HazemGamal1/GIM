import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    const { branchId } = await req.json();

    const { userId } = await auth();
    try{        
        if(branchId && userId){
            const user = await prisma.user.findFirst({ where: { clerkId:  userId }})
            if(!user) return NextResponse.json({ message: "User was not found"}, { status: 404 });
            await prisma.branchTrainer.create({
                data: {
                    branchId,
                    trainerId: user.id
                }
            });
            return NextResponse.json({ message: "Trainer created successfully"}, { status: 200 })
        }else{
            return NextResponse.json({ message: "Data insufficient"}, { status: 404 })
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}