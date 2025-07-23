import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { GoArrowUpRight } from 'react-icons/go'

const NavMenu = () => {
  return (
    <NavigationMenu className="text-nowrap">
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md font-semibold">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="w-full p-4 flex gap-4">
                    <div>
                        <h1 className="text-blue-500 my-2 uppercase tracking-wider">Grow your business</h1>
                        <hr />
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Flex App</h3>
                            <p className="text-sm font-normal">Get discovered by app users</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Marketing Tools</h3>
                            <p className="text-sm font-normal">Create campaigns for your community</p>
                        </NavigationMenuLink>
                    </div>
                    <div>
                        <h1 className="text-blue-500 my-2 uppercase tracking-wider">Run your day-to-day</h1>
                        <hr />
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Payments</h3>
                            <p className="text-sm font-normal text-[#505050]">Manage, track and secure every transaction</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Staff Management</h3>
                            <p className="text-sm font-normal text-[#505050]">Keep your staff coordinated</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Scheduling</h3>
                            <p className="text-sm font-normal text-[#505050]">Optimize your calendar</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Business reporting</h3>
                            <p className="text-sm font-normal text-[#505050]">Analyze performance as you go</p>
                        </NavigationMenuLink>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="text-md font-semibold">Resources</NavigationMenuTrigger>
                <NavigationMenuContent className="w-full p-4 flex gap-4">
                    <div>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500 flex items-center">Customer Support <GoArrowUpRight /></h3>
                            <p className="text-sm font-normal">Connect with our team for help when you need it</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500 flex items-cente">Learning Center <GoArrowUpRight /></h3>
                            <p className="text-sm font-normal">Grow your software skills</p>
                        </NavigationMenuLink>
                    </div>
                    <div>
                        <h1 className="text-blue-500 my-2 uppercase tracking-wider">Need More Help?</h1>
                        <hr />
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Report a bug</h3>
                            <p className="text-sm font-normal text-[#505050]">We encourage you to report any unintended functionalities in our app</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="my-2 group">
                            <h3 className="group-hover:text-blue-500">Schedule a meeting with us</h3>
                            <p className="text-sm font-normal text-[#505050]"></p>
                        </NavigationMenuLink>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu
