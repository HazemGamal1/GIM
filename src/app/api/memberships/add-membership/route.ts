import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: NextRequest) {
    const { name, price, duration } = await req.json();
    try{
        await prisma.membership.create({
            data: {
                name,
                price: Number(price),
                duration: Number(duration)
            }
        })
        return NextResponse.json({message: `Membership Type "${name}" has been created successfully`}, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error : ${error}`}, { status: 500 });
    }
}