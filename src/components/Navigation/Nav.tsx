import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/Logo";
import NavMenu from "./NavMenu";
import { ChevronRight } from "lucide-react";

const Nav = () => {
  return (
    <nav className="absolute w-full top-0 left-0 z-10">
        {/* <div className="bg-[#2d2d2d] w-full p-2 hidden lg:block">
            <div className="max-w-[1782px] mx-auto flex justify-between items-center">
                <Input className="max-w-max text-white bg-transparent rounded-none font-bold p-1 px-4 border-[#6f6f6f]" placeholder="Search..."/>
                <div className="flex items-baseline gap-1 text-lg">
                    <h3 className="font-bold text-white leading-loose">Not a business? </h3>
                    <Link href="/app" className="text-blue-500 flex items-baseline font-bold leading-loose">Book on the Flex App <GoArrowUpRight className="text-xl"/></Link>
                </div>
            </div>
        </div> */}
        <div className="w-full">
            <div className=" flex justify-between gap-2 items-center p-3 container mx-auto mb-3">
                <div className="flex items-center gap-12">
                    <div className="flex items-end gap-2">
                        <Link href={"/"}>
                            <Logo size={35}/>
                        </Link>
                    </div>
                    <ul className="items-center gap-8 text-[#4a4a4a] font-semibold hidden lg:flex">
                        <NavMenu />
                        <li>
                            <div className="flex gap-2 items-center">
                                <p>Pricing</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Button asChild variant={"material_black"} className="cursor-pointer">  
                            <SignInButton />
                        </Button>
                        <Link href="/sign-up">
                            <Button className="cursor-pointer text-xss lg:text-md text-white" variant={"material_blue"}>
                                Sign Up
                                <ChevronRight />
                            </Button>
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Nav
