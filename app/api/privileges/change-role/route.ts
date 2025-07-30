import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function PUT(req: NextRequest){
    try{
        const { newRole, userId }: { newRole: Role, userId: string } = await req.json();

        const user = await prisma.user.findUnique({
            where: { id : userId }
        });

        if(!user) return NextResponse.json({ message: "This user doesn'nt exist"}, { status: 404 }); 

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });


        return NextResponse.json(
            { message: "Role updated successfully", user: updatedUser },
            { status: 200 }
        )      
    }
    catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}