"use client"
import React from 'react'
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Calendar22 } from '../DatePicker';
import { MembershipComboBox } from './Membership-combo-box';
import { Label } from '../ui/label';
import { MdAutorenew, MdOutlineArrowRight } from "react-icons/md";

const MembershipRenew = () => {
    const [memberId, setMemberId] = useState<string>("")
    const [dialogOpen, setDialogOpen] = useState(false);
    const [membershipId, setMembershipId] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>();
    const [amount, setAmount] = useState<number>();
    const onSetMembershipType = (val : string) => {
      setMembershipId(val);
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataOP = { memberId, membershipId, startDate, amount };
        try{
          const res = await fetch("/api/members/activate-member", { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataOP)
          });
          await res.json();
          setDialogOpen(false);       
        }catch(error){
          console.log(error);
        }
    }

   

    const onSetStartDate = (val: Date | undefined) => {
      setStartDate(val)
    }
  return (
    <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"material_black"}  className='flex gap-2 items-center cursor-pointer'>
                    <MdAutorenew />
                    <h4>Renew Memberships</h4>
                </Button>
            </DialogTrigger>
            <DialogContent className='dark:bg-[#171717]'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2 mb-2'>                    
                      <MdAutorenew />
                      Membership Renewal
                    </DialogTitle>
                    <DialogDescription>
                        Enter required data
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                  <div className='flex items-center gap-2'>
                    <span>Member ID</span>
                    <Input type="text" placeholder='Enter member ID' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setMemberId(e.target.value)}/>
                  </div>
                  <div className='flex gap-2 items-center my-4'>
                    <Calendar22 value={startDate} text='StartDate' onSetDate={onSetStartDate}/>
                  </div>
                  <div className='flex items-baseline mt-1'>
                    <div className='flex flex-col gap-2 w-full'>
                      <span>Membership Type</span>
                      <MembershipComboBox value={membershipId} onSetMembershipType={onSetMembershipType}/>
                    </div>
                    <div className='mt-4'>
                      <Label htmlFor='amount-paid' className='mb-2'>Amount Paid</Label>
                      <Input type='number' placeholder='EGP' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))} id='amount-paid'/>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 mt-6 ml-auto max-w-max'>
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

export default MembershipRenew
