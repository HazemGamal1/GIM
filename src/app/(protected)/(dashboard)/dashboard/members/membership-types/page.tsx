"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MdOutlinePriceChange } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaRegTrashAlt } from "react-icons/fa";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Membership } from '@prisma/client'
import { deleteMembership } from '@/lib/api/memberships'
import { ImSpinner } from 'react-icons/im'

const Membership_Types = () => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>(0.0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [membershipTypes, setMembershipTypes] = useState<Membership[]>();
  const onSubmit = async ( e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/memberships/add-membership", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, duration})
      });
      const data = await res.json();
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const getMembershipTypes = async () => {
      try{
        setIsLoading(true);
        const res = await fetch("/api/memberships/get-all");
        const data = await res.json();
        setMembershipTypes(data);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    }

    getMembershipTypes();
  }, [])

  const onDelete = async (id : string) => {
    await deleteMembership(id)
  }
  return (
    <div className='w-full p-12 rounded-md'>
      <div className='flex w-full justify-between items-center mb-12'>
        <div className='font-semibold'>Membership types</div>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant={"material_purple"}><Plus /> Add Now</Button>
            </DialogTrigger>
            <DialogContent className='dark:bg-[#171717]'>
              <DialogHeader>
                <DialogTitle>
                  <div className='flex gap-2 items-center'>
                    <div className='grid place-content-center bg-[#f0f0f0] dark:bg-[#0c0c0c] p-1 rounded-full'>
                      <MdOutlinePriceChange />
                    </div>
                    <span>Add new membership type</span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Enter required data
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label>Memebership Name</Label>
                  <Input type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Membership price</Label>
                  <Input type='number' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}/>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Membership duration</Label>
                  <Input type='number' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDuration(Number(e.target.value))}/>
                </div>

                <div className='flex gap-2 items-center ml-auto mt-3'>
                  <DialogClose asChild>
                    <Button variant={"material_red"}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type='submit' variant={"material_blue"}>
                    Confirm
                  </Button>
                </div>
              </form>
            </DialogContent>           
        </Dialog>
      </div>

      {
        isLoading ?
        <div className="w-full h-full grid place-content-center my-2 animate-spin"><ImSpinner  /></div>
        :
        <Table className='overflow-x-auto'>
          <TableCaption>Your listed membership types.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="w-[400px]">Benefits</TableHead>
              <TableHead>Edit/Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {
                membershipTypes &&
                membershipTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div></div>
                        <span>{type.name}</span>
                      </div>  
                    </TableCell>
                    <TableCell>{type.price} <span className='text-xs'>EGP</span></TableCell>
                    <TableCell>{type.duration} days</TableCell>
                    <TableCell>No Benefits</TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        {/* <Button variant={"secondary"} className='cursor-pointer'>
                          <LuPencil />
                        </Button> */}
                        <Button onClick={() => onDelete(type.id)} variant={"material_danger_red"} className='cursor-pointer'>
                          <FaRegTrashAlt />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
          </TableBody>
        </Table>
      }
    </div>
  )
}

export default Membership_Types
