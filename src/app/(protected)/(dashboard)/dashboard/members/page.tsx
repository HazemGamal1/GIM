"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MemberActivation from '@/components/Members/MemberActivation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ImSpinner } from "react-icons/im"
import { FaExternalLinkAlt } from "react-icons/fa";
import MemberRow, { IMember } from "./components/MemberRow"
import MembershipRenew from "@/components/Members/MembershipRenew"
import { SiCodestream } from "react-icons/si";

const Members = () => {   
  const [members, setMembers] = useState<IMember[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMembers = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/members/get-pagination?page=${page}`);
    const data = await res.json();
    setIsLoading(false);
    setMembers(data.data);
    setTotalPages(data.totalPages)
  };

  const startPolling = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchMembers, 30000); 
    }
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    fetchMembers(); 
    startPolling();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPolling();
      } else {
        stopPolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling(); // Cleanup on unmount
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [page]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`/dashboard/members?${params.toString()}`)
  }


  return ( 
    <div className='max-w-screen p-12'>
      <p className='mb-2'>Configuration: </p>
      <div className='flex flex-col lg:flex-row gap-2.5 items-center mb-4'>
        <MemberActivation />
        <MembershipRenew />
        <Button variant={"material_black"} className='cursor-pointer' asChild>
          <Link href={"/dashboard/members/membership-types"}>
              <Users2 />
              <h4>Membership types</h4>
          </Link>
        </Button>
        <Button variant={"material_red"} className='cursor-pointer' asChild>
          <Link href={"/dashboard/members/access-manager"}>
              <SiCodestream />
              <h4>Access Manager</h4>
          </Link>
        </Button>
      </div>
      <span className="text-[#1561ef] hover:underline underline-blue-500 flex items-start gap-0.5 cursor-pointer mb-4">Generate Excel Sheet from this data <FaExternalLinkAlt className="text-xs"/></span>

      {
        isLoading &&
          <div className="w-full h-full grid place-content-center">
            <div className="mx-auto animate-spin">
              <ImSpinner />
            </div>
            loading...
          </div>
      }
      <Table className='overflow-x-auto'>
        <TableCaption>A list of your recent Members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] border">Member ID</TableHead>
            <TableHead className="border">Membership Type</TableHead>
            <TableHead className="border">Member Name</TableHead>
            <TableHead className="border">Membership E-Mail</TableHead>
            <TableHead className="border">Gender</TableHead>
            <TableHead className="border">Membership Duration</TableHead>
            <TableHead className="border">Branch</TableHead>
            <TableHead className="border">Start Date</TableHead>
            <TableHead className="border">End Date</TableHead>
            {/* <TableHead className="border">Amount Paid</TableHead> */}
            <TableHead className="border">Method of Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {
              members.length > 0 &&
              members.map((member) => (
                <MemberRow member={member} key={member.id}/>
              ))
            }
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          {
            page > 1 &&
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
            </PaginationItem>
          }
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i + 1 === page}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {
            ! (totalPages == 1) &&
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          }
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Members
