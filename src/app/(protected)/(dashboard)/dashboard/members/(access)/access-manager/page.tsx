"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from '@prisma/client'
import { FaUser } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import { ChevronDown, Loader2 } from 'lucide-react'

const Access_Manager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const res = await fetch("/api/users/get-all");
      const data = await res.json();
      setUsers(data);
      setIsLoading(false);
    }
    getUsers();
  }, [])
  return (
    <div className='p-8'>
      <Card className='max-w-max mx-auto min-w-[400px]'>
        <CardHeader>
          <CardTitle>Manage Acess</CardTitle>
          <CardDescription>Change Privileges of your staff</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {
            isLoading ?
            <div className='grid place-content-center'>
              <div className='animate-spin'>
                <Loader2 />
              </div>
            </div>
            :
            users.map((user) => (
            <div className='flex items-center justify-between gap-4' key={user.id}>
              <div className='flex items-center gap-1.5'>
                <div className='rounded-full p-1.5 bg-gray-300'>
                  <FaUser />
                </div>
                <div className='flex flex-col text-sm'>
                  <div>{user.name}</div>
                  <div className='text-xs underline'>{user.email}</div>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"secondary"}>
                    <span>{user.role}</span>
                    <ChevronDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h1 className='font-bold text-md mb-4'>Change Privilege.</h1>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1 hover:bg-gray-100 duration-200 p-1.5 rounded-md'>
                      <span>CO-Owner <span className='text-red-400 text-xs'>*Can delete sensitive gym data</span></span>
                      <div className='flex flex-col text-xs'>
                        <span className='text-gray-500'>Can edit gym settings and change privilege of members</span>
                      </div>
                    </div>
                    <div className='hover:bg-gray-100 duration-200 p-1.5 rounded-md'>
                      <span>Trainer</span>
                      <div className='flex flex-col text-xs'>
                        <span className='text-gray-500'>Can update training data, can directly sell products from gym bar.</span>
                      </div>
                    </div>
                    <div className='hover:bg-gray-100 duration-200 p-1.5 rounded-md'>
                      Member
                      <div className='flex flex-col text-xs'>
                        <span className='text-gray-500'>Can view selected data.</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            ))
          }
        </CardContent>
      </Card>
     </div> 
  )
}

export default Access_Manager
