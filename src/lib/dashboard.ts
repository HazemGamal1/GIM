import prisma from "@/lib/prisma";

export async function getDashboardDataPerBranch(clerkUserId: string) {
  if (!clerkUserId) {
    throw new Error("User ID is required");
  }

  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
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
    throw new Error("User not found");
  }

  const ownedGymIds = user.gyms.map((gym) => gym.id);
  const ownedBranches = await prisma.branch.findMany({
    where: { gymId: { in: ownedGymIds } },
  });

  const assignedBranches = user.trainerAssignments.map((ta) => ta.branch);

  const branchesMap = new Map<string, typeof ownedBranches[0]>();
  ownedBranches.forEach((b) => branchesMap.set(b.id, b));
  assignedBranches.forEach((b) => branchesMap.set(b.id, b));
  const branches = Array.from(branchesMap.values());

  if (branches.length === 0) {
    return [];
  }

  const results = await Promise.all(
    branches.map(async (branch) => {
      const revenueCurrent = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          member: {
            branchId: branch.id,
          },
          createdAt: { gte: startOfCurrentMonth },
        },
      });

      const revenueLast = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          member: {
            branchId: branch.id,
          },
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      });


      const subscriptionsCurrent = await prisma.member.count({
        where: {
          branchId: branch.id,
          createdAt: { gte: startOfCurrentMonth },
        },
      });

      const subscriptionsLast = await prisma.member.count({
        where: {
          branchId: branch.id,
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      });

      const salesCurrent = await prisma.payment.count({
        where: {
          member: {
            branchId: branch.id,
          },
          type: { not: "MEMBERSHIP" },
          createdAt: { gte: startOfCurrentMonth },
        },
      });

      const salesLast = await prisma.payment.count({
        where: {
          member: {
            branchId: branch.id,
          },
          type: { not: "MEMBERSHIP" },
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      });

      const revenueDiff =
        revenueCurrent._sum.amount != null && revenueLast._sum.amount != null
          ? calculateChange(revenueCurrent._sum.amount, revenueLast._sum.amount)
          : 100;

      const subsDiff = calculateChange(subscriptionsCurrent, subscriptionsLast);
      const salesDiff = calculateChange(salesCurrent, salesLast);

      return {
        branch: {
          id: branch.id,
          name: branch.name,
          gymId: branch.gymId,
        },
        revenue: {
          value: revenueCurrent._sum.amount ?? 0,
          previous: revenueLast._sum.amount ?? 0,
          change: revenueDiff,
        },
        subscriptions: {
          value: subscriptionsCurrent,
          previous: subscriptionsLast,
          change: subsDiff,
        },
        sales: {
          value: salesCurrent,
          previous: salesLast,
          change: salesDiff,
        },
      };
    })
  );

  return results;
}

function calculateChange(current: number = 0, previous: number = 0): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
