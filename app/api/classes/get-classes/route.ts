import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const classes = await prisma.class.findMany({
      include: {
        trainers: {
          include: {
            trainer: true
          },
        },
        attendees: {
          include: {
            member: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    const formatted = classes.map((cls : any) => ({
      ...cls,
      trainers: cls.trainers.map((ct : any) => ({
        id: ct.trainer.id,
        name: ct.trainer.name,
      })),
      attendees: cls.attendees.map((ca : any) => ({
        id: ca.member.id,
        name: ca.member.firstName + " " + ca.member.lastName,
      })),
    }))

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
  }
}
