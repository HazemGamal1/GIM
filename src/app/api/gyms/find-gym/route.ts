import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
     const { searchParams } = new URL(req.url)
    const id = searchParams.get("id");

    if(!id){
        return NextResponse.json({ message: "No id provided" }, { status: 400 });
    }    
    
    try{
        const gym = await prisma.gym.findFirst({ where: { id }});

        if(!gym){
            return NextResponse.json({ message: "No gym was found with this ID "}, { status: 404 });
        }

        return NextResponse.json(gym, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error => ${error}` }, { status: 500 });
    }
}