import { DashboardLayout } from '@/components/dashboard-layout'
import { getUserRole } from '@/lib/auth';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({ children } : { children : React.ReactNode }) => {
   let role;
    const { userId } = await auth();
    if(userId){
        role = await getUserRole(userId);
    }else {
        redirect("/unauthorized");
    } 
    if (role !== "OWNER" && role !== "TRAINER" && role !== "MEMBER") {
        redirect("/unauthorized");
    }
  
  return (
    <div className='dark:bg-[#212121]'>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </div>
  )
}

export default Layout
