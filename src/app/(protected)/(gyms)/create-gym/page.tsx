"use client"
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Create_Gym = () => {
  const { user } = useUser();
  const [gymName, setgymName] = useState<string>("");
  const router = useRouter();

  const handleCreateGym = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      if(user){
        const res = await fetch("/api/gyms/create-gym", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ gymName, clerkId: user.id })
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
          router.push(`/${data.id}/create-branch`)
        }
      }else {
        console.error("You have to be logged in.");
      }
    }catch(error){
      console.error(error);
    }
  }
  return (
    <div className='flex justify-between w-full h-screen place-content-center bg-[#ececec] dark:bg-[#121212]'>
      <div className='absolute left-4 top-4'>
        <Button variant={"material_black"} asChild className="rounded-full px-0">
          <Link href={"/dashboard"}>
            <ChevronLeft />
            Back To Dashboard
          </Link>
        </Button>
      </div>
      <div className='p-4 w-full grid place-content-center'>
        <form onSubmit={handleCreateGym} className='z-10 shadow-md dark:bg-[#212121]/90 backdrop-blur-lg bg-white p-12 rounded-md flex flex-col gap-4 max-w-[40rem]'>
          <div className='flex items-end mb-8'>
            <Logo size={60}/>
            <div className='ml-3'>
              <h3 className='font-normal text-muted-foreground'>Welcome!</h3>
              <p className='text-sm capitalize'>Let&apos;s create your gym</p>
            </div>
          </div>
          <label id='gym-name' className='2xl:text-xl capitalize font-normal'>
              What&apos;s your Gym name?
          </label>
          <input 
            type="text" 
            name="" 
            id="gym-name" 
            placeholder='Enter gym name...' 
            onChange={(e) => setgymName(e.target.value)} 
            className='border p-1.5 mb-4 rounded-sm 2xl:w-[35rem] mx-auto'
          />

          <div className='flex items-center justify-between mb-4'>
            <div>
              <label htmlFor="">Allow this gym to be seen by users? </label>
              <p className='text-muted-foreground max-w-[60%] text-xs mt-2'>No sensitive data will be shown... this option means that the users of the app will be able to request membership to this gym</p>
            </div>
            <Switch />
          </div>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <label htmlFor="">Does your gym have multiple branches? </label>
              <p className='text-muted-foreground max-w-[60%] text-xs mt-2'>Checking this will allow you to enter branches information and location on the next step... you can change this setting at any time.</p>
            </div>
            <Switch />
          </div>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <label htmlFor="">Is this gym owned by multiple people? </label>
              <p className='text-muted-foreground max-w-[60%] text-xs mt-2'>Only owners will have full privilege on data.</p>
            </div>
            <Switch />
          </div>

          <Button variant={"material_purple"} type='submit' className='w-full mx-auto cursor-pointer'>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default Create_Gym
