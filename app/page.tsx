import Link from "next/link";
import Image from "next/image";
import abstractImg from "../public/landing/abstract-img-logo.svg"
import { GoArrowUpRight } from "react-icons/go";
import Nav from "@/components/Navigation/Nav";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import FeaturesCard from "@/components/Landing/FeaturesCard";
import register_card from "../public/landing/Register_Card.svg"
import { Input } from "@/components/ui/input";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Home() {
  return (
    <div className="flex flex-col justify-betweenn">
      <div>
        <div className="w-full">
          <Nav />
          <div className="grid place-content-center relative w-full min-h-[40rem] text-center relatives">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-center ">
                <h1 className="font-bold xl:text-[3.2rem] z-10 text-center mx-auto tex mb-4 xl:leading-[58px]">All-in-One Gym & Training Management Platform</h1>
                <h4 className="font-normal text-xl lg:max-w-[70%] mx-auto">Manage members, track sessions, and empower your team — all from one dashboard</h4>
                <div className="flex max-w-max items-center gap-4 mx-auto mt-8">
                  <SignedIn>
                    <Button variant={"material_black"} className="text-sm flex items-center" asChild>
                      <Link href={"/dashboard"}>
                        Go To Dashboard <GoArrowUpRight />
                      </Link>
                    </Button>
                  </SignedIn>
                  <SignedOut>
                    <Button variant={"material_black"}>
                      <Link href={"/sign-up"}>
                          SIGN UP NOW
                      </Link>
                    </Button>
                  </SignedOut>
                </div>
              </div>
            </div>
            <Image src={abstractImg} alt="landing" className="mx-auto -z-10"/>
          </div>
          <div className="grid place-content-center">
            <FeaturesCard />
          </div>
          <div className="w-full mx-auto relative mt-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 items-center text-nowrap">
              <div className="w-full">
                <h1 className="font-bold text-4xl max-w-[60%] text-wrap">Ignite your brand with the software built for growth </h1>
                <h4 className="my-5 text-xl">We&apos;ll show you how to: </h4>

                <ul className="flex flex-col gap-4 text-xl">
                  <li className="flex items-center gap-2">
                    <IoIosCheckmarkCircle /> 
                    Ditch the patchwork of providers with an all-in-one platform for business management
                  </li>
                  <li className="flex items-center gap-2">
                    <IoIosCheckmarkCircle />
                    Reach millions of consumers on the industry’s largest fitness & wellness marketplace
                  </li>
                  <li className="flex items-center gap-2">
                    <IoIosCheckmarkCircle />
                    Drive new revenue with exclusive AI-powered tools
                  </li>
                </ul>
              </div>
              <div className="w-full">
                <form className="bg-[#f4f5f5] border rounded-lg p-8 grid gap-4">
                  <div className="w-full flex items-center gap-4">
                    <div className="w-full">
                      <label htmlFor="">First Name</label>
                      <Input placeholder="First Name" className="min-w-[14rem]"/>
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Last Name</label>
                      <Input placeholder="Last Name" className="min-w-[14rem]"/>
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="">Business name</label>
                    <Input placeholder=""/>
                  </div>
                  <div className="w-full flex items-center gap-4">
                    <div className="w-full">
                      <label htmlFor="">Business email</label>
                      <Input placeholder="First Name" className="min-w-[14rem]"/>
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Business phone</label>
                      <Input placeholder="Last Name" className="min-w-[14rem]"/>
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="">Business website (optional)</label>
                    <Input placeholder=""/>
                  </div>
                  <p>Industry</p>
                  <div>
                    <div>
                      <input type="radio"/>
                      Fitness
                    </div>
                  </div>
                  <Button variant={"material_blue"}>LET&apos;S TALK</Button>
                </form>
              </div>
            </div>
            <Image src={register_card } alt="register_card" className="mx-auto"/>
          </div>
        </div>
      </div>
      <footer className="bg-[#2d2d2d] p-8">
        <div className="container mx-auto">
          <div className="flex items-start gap-28 mb-12">
            <div className="flex flex-col gap-4">
              <h4 className="uppercase font-semibold text-[#E5E5E5]">Company</h4>
              <ul className="flex flex-col gap-2 text-white font-semibold text-sm">
                <li>About Us</li>
                <li>About Playlist</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Legal</li>
                <li>Security</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="uppercase font-semibold text-[#E5E5E5]">Expore experiences</h4>
              <ul className="flex flex-col gap-2 text-white font-semibold text-sm">
                <li>Fitness</li>
                <li>Wellness</li>
                <li>Beauty</li>
                <li>Press</li>
                <li>Get The App</li>
                <li>Get Help</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="uppercase font-semibold text-[#E5E5E5]">Flex Business</h4>
              <ul className="flex flex-col gap-2 text-white font-semibold text-sm">
                <li>Products</li>
                <li>Education</li>
                <li>Flex Integrations</li>
                <li>Support Center</li>
                <li>Staff Sign In</li>
              </ul>
            </div>

          </div>
          <hr />
        </div>
      </footer>
    </div>
  );
}
