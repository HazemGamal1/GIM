import { auth } from "@clerk/nextjs/server";
import { getUserRole } from "@/lib/auth"; // Prisma-safe in server environment
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }){
    let role;
    const { userId } = await auth();
    if(userId){
        role = await getUserRole(userId);
    }else {
        redirect("/unauthorized");
    } 
    if (role !== "OWNER" && role !== "TRAINER") {
        redirect("/unauthorized");
    }

  return (
    <div>
      {children}
    </div>
  )
}

