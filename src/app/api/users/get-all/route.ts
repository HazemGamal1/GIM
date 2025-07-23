import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){
    try{
        const users = await prisma.user.findMany();
        if(!users){
            return NextResponse.json({ message: "No users were found"}, { status: 404 });
        }

        return NextResponse.json(users, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}