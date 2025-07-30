import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req : NextRequest) {
    try{
        const { clerkId, gymName } = await req.json();
        
        console.log("ClerkId: ", clerkId)
        console.log("Gym name: ", gymName)
        
        if(!clerkId || !gymName){
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const user = await prisma?.user.findUnique({
            where : { clerkId }
        })

        if(!user){
            return NextResponse.json({ messsage: "User was not found" }, { status: 404 });
        }

        const gym = await prisma.gym.create({
            data: {
                name: gymName,
                ownerId: user.id
            }
        })

        return NextResponse.json(gym, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}