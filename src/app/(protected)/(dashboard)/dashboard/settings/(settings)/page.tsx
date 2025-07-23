"use client"
import { Button } from '@/components/ui/button';
import React from 'react'
import { IoMdSettings } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs';
import { useGymStore } from '../../../../../../../store/useGymStore';

const Settings = () => {
    const { user } = useUser();
    const { selectedGym } = useGymStore();

    const onDeleteGym = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(user){
                const res = await fetch("/api/gyms/delete-gym", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: selectedGym?.name, clerkId: user.id})
                });
                const data = await res.json();
                console.log(data);
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className='container mx-auto '>
        <div className='flex items-center gap-2 mb-4 py-8'>
            <IoMdSettings className='text-2xl'/>
            <h1 className='text-xl font-semibold'>Settings</h1>
            <hr />
                
        </div>
        <div className='flex flex-col gap-5'>
            {/* <section>
                <h3 className='font-semibold text-lg mb-2'>Visual Settings</h3>
                <div className='border-[0.5px] rounded-md p-4'>
                    <div className='flex gap-2 items-center'>
                        <Switch />
                        <p className='font-semibold text-md'>Dark mode</p>
                    </div>
                </div>
            </section> */}

            <section>
                <h3 className='font-semibold text-lg mb-2'>Danger Zone</h3>
                <div className='border-[0.5px] rounded-md border-red-400/70 p-4'>
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='w-full flex justify-between items-center'>
                            <div>
                                <h3>Delete This Gym</h3>
                                <h4 className='text-red-500'>Note: This action is irreversible.</h4>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"material_danger_red"} size={"sm"} className='cursor-pointer dark:hover:bg-red-700'>
                                        Delete Gym
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your gym
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='max-w-max flex gap-2 ml-auto'>
                                        <form onSubmit={onDeleteGym}>
                                            <DialogClose asChild>
                                                <Button variant={"material_black"} size={"sm"} className='cursor-pointer dark:hover:bg-red-700'>
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button type='submit' variant={"material_danger_red"} size={"sm"} className='cursor-pointer dark:hover:bg-red-700'>
                                                Confirm
                                            </Button>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Settings
