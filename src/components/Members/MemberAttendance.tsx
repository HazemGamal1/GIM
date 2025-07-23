"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdOutlineArrowRight } from 'react-icons/md';
import { BiQr } from 'react-icons/bi';
import { FaBarcode } from 'react-icons/fa';
import { DialogTitle } from '@radix-ui/react-dialog';

const MemberAttendance = () => {
    const [memberId, setMemberId] = useState<string>();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"material_blue"}>
                <FaBarcode />
                Take Attendance
            </Button>
        </DialogTrigger>
        <DialogContent className='dark:bg-[#171717] '>
            <DialogTitle>
                <div className='p-2 rounded-md bg-[#606060] text-[#dbdbdb] max-w-max mx-auto'>
                        <FaBarcode className='text-2xl'/>
                </div>
            </DialogTitle>
            <form>
                <Tabs defaultValue="member_data" className="w-[400px] mx-auto">
                <TabsList>
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                    <TabsTrigger value="qr"><BiQr /> QR</TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                    
                    <div className='flex items-center gap-2'>
                    <div className='flex flex-col gap-1 w-full'>
                        <span className='mb-2 text-sm'>Enter member id</span>
                        <Input
                        type='text'
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        />
                    </div>
    
                    </div>
                </TabsContent>

                <TabsContent value="qr">
                    under development
                </TabsContent>
                </Tabs>
                <div className='flex gap-2 items-center mt-4 mx-auto max-w-max'>
                <DialogClose asChild>
                    <Button variant={"material_red"} size={"sm"} className='cursor-pointer'>
                    Cancel
                    </Button>
                </DialogClose>
                <Button type='submit' variant={"material_blue"} size={"sm"} className='cursor-pointer'>
                    Confirm
                    <MdOutlineArrowRight className='text-lg'/>
                </Button>
                </div>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MemberAttendance
