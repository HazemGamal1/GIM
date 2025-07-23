import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gymId = searchParams.get("gymId");
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!gymId) {
      return NextResponse.json({ message: "Missing gymId" }, { status: 400 });
    }

    // const gym = await prisma.gym.findFirst({
    //   where: {
    //     id: gymId,
    //     ownerId: userId,
    //   },
    // });
    // if (!gym) {
    //   return NextResponse.json(
    //     { message: "Gym not found or access denied" },
    //     { status: 403 }
    //   );
    // }

    const branches = await prisma.branch.findMany({
      where: { gymId },
    });

    return NextResponse.json(branches, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
