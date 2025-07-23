import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function DELETE(
  request: NextRequest,
) {
  const { searchParams } = new URL(request.url);
  const membershipId = searchParams.get("id");
  

  if (!membershipId) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    await prisma.membership.delete({
      where: { id: membershipId }
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}
