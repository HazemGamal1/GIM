import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const latestMembers = await prisma.member.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        branch: {
          select: {
            name: true,
          },
        },
        trainer: {
          select: {
            name: true,
          },
        },
        membership: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ members: latestMembers })
  } catch (error) {
    console.error("[GET_LATEST_MEMBERS]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
