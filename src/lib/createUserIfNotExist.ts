import prisma from "../lib/prisma"

export const createUserIfNotExists = async ({
  clerkId,
  email,
  name,
}: {
  clerkId: string;
  email: string;
  name: string;
}) => {
  let user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name,
      },
    });
  }

  return user;
};
