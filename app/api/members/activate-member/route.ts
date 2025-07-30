import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: NextRequest){
    try{
        const { firstName, lastName, phone, email, birthDate, gender, startDate, branchId, membershipId, amount } = await req.json();


        const membership = await prisma.membership.findUnique({
            where: { id: membershipId },
            select: { duration: true }
        })
        
        if(!membership){
            return NextResponse.json({ message: "Membership type not found"}, { status: 404 });
        }

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + membership.duration);
        
        const activeMember = await prisma.member.create({
            data: {
                firstName,
                lastName,
                phone,
                email,
                birthDate,
                gender: gender.toUpperCase(),
                startDate,
                endDate,
                membershipId,
                branchId,
            }
        })

        await prisma.payment.create({
            data: {
                amount: Number(amount),
                type: 'MEMBERSHIP',
                memberId: activeMember.id
            }
        })
        return NextResponse.json({ message: activeMember }, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error: ${error}`}, { status: 500 });
    }
}