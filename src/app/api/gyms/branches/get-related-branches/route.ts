import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id){
        return NextResponse.json({ message: "No id was provided"}, { status: 404 });
    }
    try{
        const branches = await prisma.branch.findMany({
            where: {
                gymId: id,
                branchIsVisible: true
            }
        });

        return NextResponse.json(branches, { status: 200 });
    }catch(err){
        return NextResponse.json({message: `Internal server error ${err}`}, { status: 500 });
    }
}