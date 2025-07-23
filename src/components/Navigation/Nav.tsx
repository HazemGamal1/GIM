import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/Logo";
import NavMenu from "./NavMenu";

const Nav = () => {
  return (
    <nav className="sticky top-0 left-0 z-10  flex justify-between gap-2 items-center p-3 max-w-[100rem] mx-auto mb-3">
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
                    <Button className="cursor-pointer text-xss lg:text-md text-white" variant={"material_purple"}>
                        Sign Up
                    </Button>
                </Link>
            </SignedOut>
        </div>
    </nav>
  )
}

export default Nav
