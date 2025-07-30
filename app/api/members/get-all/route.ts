import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: { membership: true },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ message: `Internal server error: ${error}` }, { status: 500 });
  }
}