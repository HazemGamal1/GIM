import prisma from "./prisma";

export async function getUserRole(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId }, 
    select: { role: true },
  });

  return user?.role || 'guest'; // default fallback
}
