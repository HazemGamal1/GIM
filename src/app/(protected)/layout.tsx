import { auth, currentUser } from "@clerk/nextjs/server";
import { createUserIfNotExists } from "@/lib/createUserIfNotExist";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  const user = await currentUser();
  
  await createUserIfNotExists({
    clerkId: userId!,
    email: user!.emailAddresses[0].emailAddress,
    name: `${user?.firstName} ${user?.lastName}`,
  });

  return <>{children}</>;
}
