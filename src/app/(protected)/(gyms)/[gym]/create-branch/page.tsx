"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic';

import MapDark from "../../../../../../public/mapDark.png"
import MapLight from "../../../../../../public/mapLight.png"
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { HiMapPin } from "react-icons/hi2";
import { usePathname } from 'next/navigation'
const GymMap = dynamic(() => import('@/components/Map'), { ssr: false });


const CREATE_BRANCH = () => {
  const pathname = usePathname();
  const gymId = pathname.split('/')[1];
  const [name, setName] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("")
  const [branchIsVisible, setBranchIsVisible] = useState<boolean>(false);
  const [locationY, setLocationY] = useState<number>();
  const [locationX, setLocationX] = useState<number>();

  const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();   
    try {
      const res = await fetch("/api/gyms/branches/create-branch", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gymId, locationX, locationY, locationName, branchIsVisible })
      })
      const data = await res.json();
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }
  const onLocationSelect = (lat : number, lng: number) => {
    setLocationX(lng);
    setLocationY(lat);
  }

  return (
    <div className='flex justify-between w-full h-screen place-content-center dark:bg-[#171717]'>
      <div className='p-4 lg:p-4 w-full grid place-content-center overflow-y-auto'>
          <div>
            <form onSubmit={onSubmit} className='p-3 lg:p-5 rounded-md flex flex-col gap-4 lg:w-[50rem]'>
                <div className='flex items-end mb-2 border-b pb-2'>
                  <HiMapPin className='text-5xl'/>
                  <div className='ml-3'>
                    <h3 className='font-normal text-muted-foreground'>Step 2:</h3>
                    <p className='text-sm capitalize'>Tell us where your gym is located</p>
                  </div>
                </div>
                <label id='gym-name' className='2xl:text-xl capitalize font-normal'>
                  Where&apos;s your branch located?
                </label>
                <GymMap onLocationSelect={onLocationSelect} center={[30.0444, 31.2357]}/>
                <div>
                  <label htmlFor="">
                    <p className='mr-2'>What&apos;s the branch name </p>
                    <span className='text-xs text-gray-400'>Leave empty if this branch doesn&apos;t have a specific name</span>
                  </label>
                  <input type="text" className='w-full border mt-3 rounded-md py-1 px-3' placeholder='Enter branch name...' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="">
                    <p className='mr-2'>What&apos;s the branch location name </p>
                  </label>
                  <input type="text" className='w-full border mt-3 rounded-md py-1 px-3' placeholder='Enter branch name...' onChange={(e) => setLocationName(e.target.value)}/>
                </div>

          <div className='flex items-center justify-between mb-4'>
            <div>
              <label htmlFor="">Allow users to join this branch? </label>
              <p className='text-muted-foreground max-w-[60%] text-xs mt-2'>Disable if this branch is still not ready or under maintenance...</p>
            </div>
            <Switch 
                  checked={branchIsVisible}
                  onCheckedChange={(checked) => setBranchIsVisible(checked)}
            />
          </div>

          <Button type='submit' className='w-full mx-auto cursor-pointer'>Submit</Button>
        </form>
      </div>
      </div>
      <div className='hidden lg:block w-[60%] border-l h-screen'>
        <Image src={MapDark} className='object-cover object-center w-full h-full hidden dark:block' alt='gym'/>
        <Image src={MapLight} className='object-cover object-center w-full h-full dark:hidden' alt='gym'/>
      </div>
    </div>
  )
}

export default CREATE_BRANCH
