import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 10

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

    // Get all branches in those gyms
    const branches = await prisma.branch.findMany({
      where: { gymId: { in: uniqueGymIds } },
      select: { id: true },
    })

    const branchIds = branches.map(b => b.id)
    if (branchIds.length === 0) {
      return NextResponse.json({ data: [], total: 0, totalPages: 0 }, { status: 200 })
    }

    // Paginated members from those branches
    const [total, data] = await Promise.all([
      prisma.member.count({
        where: {
          branchId: { in: branchIds },
        },
      }),
      prisma.member.findMany({
        where: {
          branchId: { in: branchIds },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          membership: true,
          branch: true,
        },
      }),
    ])

    return NextResponse.json(
      {
        data,
        total,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    )
  }
}
