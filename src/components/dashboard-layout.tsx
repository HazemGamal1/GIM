"use client"
import type React from "react"

import { useState } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNav } from "@/components/dashboard-nav"
import Logo from "./Logo"
import { BiPlus } from "react-icons/bi"
import { GymComboBox } from "./Gyms/Gym-Combo-box"


interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#f0f0f0] dark:border-[#2d2d2d] bg-[#fafafa] dark:bg-[#212121] px-2 py-0">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle Menu">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <DashboardNav isSidebarOpen={isSidebarOpen}/>
            </SheetContent>
          </Sheet>
        </Button>
        <div className="hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle Sidebar"
            className="dark:border-[#121212] cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <Link href="/" className="flex items-center gap-1">      
          <Logo size={25}/>
        </Link>
        <GymComboBox />
        <Link href={"/create-gym"}>
          <Button variant={"secondary"} size={"sm"} className="cursor-pointer w-[1.7rem] h-[1.7rem] border">
            <BiPlus />
          </Button>
        </Link>
        <Link href={"/dashboard/members/access-manager"}>
          <div className="text-xs hidden lg:block">
            Access Manager
          </div>
        </Link>
        <Link href={"/billing"}>
          <div className="text-xs hidden lg:block">
            Billing
          </div>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          {/* <form className="hidden md:block">
            <div className="relative rounded-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[240px] lg:w-[320px]" />
            </div>
          </form> */}
          {/* <Button variant="ghost" size="icon" aria-label="Notifications" className="hover:text-black" asChild>
            <Link href={'/dashboard/members/trainers-staff'}>
              <HiMiniUserGroup className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="hover:text-black">
            <Bell className="h-5 w-5" />
          </Button> */}
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={`${
            isSidebarOpen ? "w-62 p-0" : "w-0 -translate-x-full"
          } hidden border-r dark:border-[#2d2d2d] border-[#f0f0f0]  transition-all duration-300 md:block bg-[#f3f5f7] dark:bg-[#171717]`}
        >
          <DashboardNav isSidebarOpen={isSidebarOpen}/>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
