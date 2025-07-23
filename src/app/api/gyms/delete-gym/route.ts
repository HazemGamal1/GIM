import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){
    const { name, clerkId } = await req.json();
    try{
        
        await prisma.gym.deleteMany({
            where: {
                name,
                ownerId: clerkId,
            },
        });
        return NextResponse.json({ message: "Gym Deleted"}, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error : ${error}`}, { status: 500 });
    }
}