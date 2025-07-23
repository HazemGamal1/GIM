import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        gyms: true,
        trainerAssignments: {
          include: {
            branch: {
              include: {
                gym: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const trainerGymIds = user.trainerAssignments
      .map((assignment) => assignment.branch?.gym?.id)
      .filter((id): id is string => Boolean(id));

    const ownerGymIds = user.gyms.map((gym) => gym.id);

    // Combine and deduplicate gym IDs
    const uniqueGymIds = Array.from(new Set([...ownerGymIds, ...trainerGymIds]));

    if (uniqueGymIds.length === 0) {
      return NextResponse.json({ error: "No gyms found for this user" }, { status: 404 });
    }

    // Fetch full gym data
    const gyms = await prisma.gym.findMany({
      where: { id: { in: uniqueGymIds } },
      include: {
        branches: {
          include: {
            members: {
              include: {
                trainer: { select: { name: true } },
                membership: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(gyms, { status: 200 });

  } catch (error) {
    console.error("[GET_USER_GYMS]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
