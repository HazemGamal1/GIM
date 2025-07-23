"use client"
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Branch } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'

const Join_Gym = () => {
  const [id, setID] = useState<string>("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState<string>(""); 
  console.log(branchId);

  const router = useRouter();
  const getBranches = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setID(id);
    const res = await fetch(`/api/gyms/find-gym?id=${id}`)
    const data = await res.json();
    console.log(data);
    const resBranches = await fetch(`/api/gyms/branches/get-related-branches?id=${id}`);
    const dataBranches = await resBranches.json();
    setBranches(dataBranches);

  }
  const onConfirm = async () => {
    try{
      const resJoin = await fetch("/api/gyms/join-gym?id=${id}&branchId=${branchId}", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, branchId })
      })
      
      const dataJoin = await resJoin.json();


      if(resJoin.ok){
        router.push("/dashboard");
      }
      console.log(dataJoin);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='w-full h-screen grid place-content-center text-center'>
      <nav className='flex justify-between items-center w-full absolute top-0 p-8'>
        <div>
          <Button variant={"material_black"} asChild>
            <Link href={"/dashboard"} >
              <ArrowLeft />
              Back To Dashboard
            </Link>
          </Button>
        </div>
        <div>
          <SignedIn>
              <UserButton />
          </SignedIn>
        </div>
      </nav>
      <Logo size={60} className='mx-auto'/>
        <div className='flex flex-col gap-2 mb-6 mx-auto'>
            <h1 className='mt-4 text-left'>Enter Gym ID</h1>
            <Input type='text' placeholder='Gym ID' className='w-[20rem]' onChange={(e) => getBranches(e)}/>
        </div>
        {
          branches.length > 0 &&
          <div className='flex gap-4 items-center mb-5'>
            <div className='text-left'>
              <h2>Please select a branch: </h2>
              <p className='text-gray-500 max-w-[70%] text-sm text-left'>If you train at multiple branches, select the closest one to you</p>
            </div>
            <select
              defaultValue={""}
              className="bg-[#fefefe] border rounded-sm p-1.5 mb-4"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBranchId(e.target.value)}
            >
              <option disabled value="">
                --Select--
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                  <p className='text-gray-400 text-xs'> {branch.locationName}</p>
                </option>
              ))}
            </select>
          </div>  
        }
        <Button variant={"material_purple"} onClick={onConfirm} disabled={ branchId === "" }>Confirm <FiChevronRight /></Button>

    </div>
  )
}

export default Join_Gym
