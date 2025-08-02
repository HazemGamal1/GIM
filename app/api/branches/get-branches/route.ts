import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(){
    try{
        const branches = await prisma.branch.findMany();
        return NextResponse.json(branches, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}