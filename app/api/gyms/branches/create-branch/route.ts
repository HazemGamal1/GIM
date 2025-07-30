import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    try{
        const { name, gymId, locationX, locationY, locationName,branchIsVisible } = await req.json();
        
        const branch = await prisma.branch.create({
            data: {
                name,
                gymId,
                locationX,
                locationY,
                locationName,
                branchIsVisible, 
            }
        });

        return NextResponse.json({ message: branch }, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `internal server error: ${error}` }, { status: 500 });
    }
}