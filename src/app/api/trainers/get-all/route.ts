import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){
    try{
        await prisma.branchTrainer.findMany();
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}