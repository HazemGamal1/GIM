"use client"

import { HomeIcon, Settings, Users } from "lucide-react"
import Link from "next/link"
import { BsBuildingsFill } from "react-icons/bs";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { GiGymBag } from "react-icons/gi";
import { FaBarcode } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { MdOutlineSell } from "react-icons/md";
import { FaChartPie, FaUsers } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { GrServicePlay } from "react-icons/gr";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    up: true,
  },
  {
    title: "Members",
    href: "/dashboard/members?page=1",
    icon: Users,
    up: true,
  },
  {
    title: "Point Of Sale",
    href: "/dashboard/pos",
    icon: MdOutlineSell,
    up: false,
  },
  {
    title: "Insights",
    href: "/dashboard/insights",
    icon: FaChartPie,
    up: true,
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    icon: HiSpeakerphone,
    up: false,
  },
  {
    title: "Branches",
    href: "/dashboard/branches",
    icon: BsBuildingsFill,
    up: true,
  },
  {
    title: "Services & Products",
    href: "/dashboard/services-products",
    icon: GrServicePlay,
    up: false
  },
  {
    title: "Staff",
    href: "/dashboard/members/trainers-staff",
    icon: FaUsers,
    up: false,
  },
  {
    title: "Training",
    href: "/dashboard/training",
    icon: GiGymBag,
    up: false,
  },
  {
    title: "Bar",
    href: "/dashboard/bar",
    icon: FaBarcode,
    up: false
  },
  {
    title: "Classes",
    href: "/dashboard/classes",
    icon: CiCalendar,
    up: true
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: FaRegCalendarAlt,
    up: false,
  },
  {
    title: "Courses",
    href: "/dashboard/courses",
    icon: IoMdBookmarks,
    up: false
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    up: true
  }
]

interface DashboardNavProps {
  className?: string,
  isSidebarOpen: boolean
}

export function DashboardNav({ className , isSidebarOpen}: DashboardNavProps) {
  const pathname = usePathname();
  const currentPath = pathname.split('/')[2];
  
  return (
    <nav className={cn(`flex flex-col gap-2 sticky top-16 left-0 ${!isSidebarOpen && "hidden"}`, className)}>
      <div className="py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            !item.up ?
            <div key={item.href}>
                <Button variant="ghost" className={` bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-700 w-full rounded-none dark:text-white font-normal duration-300 ${((currentPath === undefined && pathname.split('/')[1] === item.title.toLocaleLowerCase()) || currentPath === item.title.toLowerCase()) && "bg-[#e3f0fc] dark:bg-gray-800 my-2 font-bold text-[#4173f1]"} w-full justify-start`} asChild>
                  <div className="w-full flex justify-between ">
                    <div className="flex items-center gap-1">
                      <div className={`rounded-md p-1.5 aspect-square grid place-content-center duration-300 ${((currentPath === undefined && pathname.split('/')[1] === item.title.toLocaleLowerCase()) || currentPath === item.title.toLowerCase()) && "bg-[#4173f1] text-white"}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <div className="ml-auto text-[10px] border bg-[#fcf7f5] border-[#f1dbce] text-[#fd7224] p-1">
                      Dev
                    </div>
                  </div>
                </Button>
              {
                item.title === "Bar" && (
                  <hr />
                )
              }
            </div>
            :
            <div key={item.href}>
              <Link  href={item.href}>
                <Button variant="ghost" className={`w-full rounded-none text-[#4e4e4e] dark:text-white font-normal duration-300 hover:bg-[#293e55] hover:text-white ${((currentPath === undefined && pathname.split('/')[1] === item.title.toLocaleLowerCase()) || currentPath === item.title.toLowerCase()) && "bg-[#e3f0fc] dark:bg-gray-800 my-2 font-bold text-[#4173f1]"} w-full justify-start`} asChild>
                  <div className="w-full flex  justify-between ">
                    <div className="flex items-center gap-1">
                      <div className={`rounded-md p-1.5 aspect-square grid place-content-center duration-300 ${((currentPath === undefined && pathname.split('/')[1] === item.title.toLocaleLowerCase()) || currentPath === item.title.toLowerCase()) && "bg-[#4173f1] text-white"}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </div>
                </Button>
              </Link>
              {
                item.title === "Bar" && (
                  <hr />
                )
              }
            </div>
        ))}
        </div>
      </div>
    </nav>
  )
}
