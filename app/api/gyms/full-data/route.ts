// app/api/gyms/full/route.ts

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const gyms = await prisma.gym.findMany({
      include: {
        owner: true,
        branches: {
          include: {
            members: {
              include: {
                workouts: true,
                payments: true,
                progressLogs: true,
                membership: true,
                trainer: true,
              },
            },
            trainerAssignments: {
              include: {
                trainer: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(gyms)
  } catch (error) {
    console.error("[GET_FULL_GYMS]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
