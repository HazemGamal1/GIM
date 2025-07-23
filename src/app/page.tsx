import Link from "next/link";
import Image from "next/image";
import abstractImg from "../../public/landing/abstract-img-logo.svg"
import { GoArrowUpRight } from "react-icons/go";
import Nav from "@/components/Navigation/Nav";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <div className="w-full">
          {/* <div className="bg-[#2d2d2d] w-full p-2 hidden lg:block">
            <div className="container mx-auto flex justify-between items-center">
              <Input className="max-w-max text-white bg-transparent rounded-none font-bold p-1 px-4 border-[#6f6f6f]" placeholder="Search..."/>
              <div className="flex items-baseline gap-1 text-lg">
                <h3 className="font-bold text-white">Not a business? </h3>
                <Link href="/app" className="text-blue-500 flex items-baseline font-bold">Book on the Flex App <GoArrowUpRight className="text-xl"/></Link>
              </div>
            </div>
          </div> */}
          <Nav />
          <div className="grid place-content-center relative h-[40rem] w-full text-center">
            <div className="text-center">
              <h1 className="font-bold xl:text-5xl z-10 text-black lg:text-white lg:max-w-[50%] text-center mx-auto tex mb-8 xl:leading-[58px]">All-in-One Gym & Training Management Platform</h1>
              <h4 className="font-semibold text-black lg:text-white lg:max-w-[40%] mx-auto">Manage members, track sessions, and empower your team — all from one dashboard</h4>
              <div className="flex max-w-max items-center gap-4 mx-auto mt-8">
                <SignedIn>
                  <Button variant={"material_purple"} className="text-sm flex items-center" asChild>
                    <Link href={"/dashboard"}>
                      Go To Dashboard <GoArrowUpRight />
                    </Link>
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Link href={"/sign-up"}>
                    <div className="bg-[#2d2d2d] text-white border-[#262626] border p-3 rounded-none font-semibold  flex gap-2 items-center">
                      <p className="tracking-wider text-lg">SIGN UP NOW</p>
                    </div>
                  </Link>
                  {/* <div className="bg-white border-[#262626] border p-3 rounded-none font-semibold  flex gap-2 items-center ">
                    <p className="tracking-wider text-lg">GET A DEMO</p>
                    <GoArrowUpRight className="text-xl"/>
                  </div> */}
                </SignedOut>
              </div>
            </div>
            <div className="w-full lg:w-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 lg:mt-18">
              <Image src={abstractImg} alt="abstract" className="hidden lg:block object-contain w-full h-full object-center place-content-center mx-auto"/>
            </div>
          </div>
          {/* <div className="grid place-content-center">
            <div className="w-[95rem] bg-[#f3f3f3] rounded-lg  border border-[#2d2d2d]">
              <div className="container mx-auto">
                
                <ul className="flex items-center gap-12 bg-[#2d2d2d] p-8 font-bold text-white mx-auto">
                  <li>Payments</li>
                  <li>Marketing</li>
                  <li>Self Management</li>
                  <li>Booking</li>
                  <li>Scheduling</li>
                  <li>Reporting</li>
                  <li>Branded App</li>
                </ul>
              </div>
              <div className="p-12 flex items-baseline">
                <div className="w-full">
                  <h1>Process payments with ease</h1>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div>
            <div className="grid place-content-center relative h-[50rem] w-full text-center">
                <div className="w-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                  <Image src={gradient_bar} alt="abstract" className="object-contain w-full h-full object-center place-content-center"/>
                </div>
              </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
