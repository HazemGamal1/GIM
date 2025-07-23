"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react';
import { Input } from '../ui/input';
import { Calendar22 } from '../DatePicker';
import RadioGroupComp from '../Radio-Group';
import { BranchComboBox } from '../Branches/Branch-Combo-box';
import { MembershipComboBox } from './Membership-combo-box';
import { Branch } from '@prisma/client';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdOutlineArrowRight } from 'react-icons/md';

const MemberActivation = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [branch, setBranch] = useState<Branch>();
  const [membershipId, setMembershipId] = useState<string>("");
  const [gender, setGender] = useState<string>("MALE");
  const [startDate, setStartDate] = useState<Date>();
  const [amount, setAmount] = useState<number>();

  const onSetBranch = (val: Branch) => {
    setBranch(val);
  };

  const onSetMembershipType = (val: string) => {
    setMembershipId(val);
  };

  const onSetGender = (val: string) => {
    setGender(val);
  };

  const onSetDate = (val: Date | undefined) => {
    setDateOfBirth(val);
  };

  const onSetStartDate = (val: Date | undefined) => {
    setStartDate(val);
  };

  const onSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataOP = {
      firstName,
      lastName,
      phone,
      email,
      dateOfBirth,
      gender,
      membershipId,
      startDate,
      branchId: branch?.id,
      amount
    };

    try {
      const res = await fetch("/api/members/activate-member", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataOP)
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"material_purple"} className='flex gap-2 items-center cursor-pointer'>
            <UserPlus />
            <h4>Activate Memberships</h4>
          </Button>
        </DialogTrigger>
        <DialogContent className='dark:bg-[#171717] '>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 mb-2'>
              <UserPlus />
              Member Activation
            </DialogTitle>
            <DialogDescription>Enter required data</DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <Tabs defaultValue="member_data" className="w-[400px] mx-auto">
              <TabsList>
                <TabsTrigger value="member_data">Member Data</TabsTrigger>
                <TabsTrigger value="subscription_data">Subscription Data</TabsTrigger>
              </TabsList>

              <TabsContent value="member_data">
                <p className="text-sm text-muted-foreground mb-4">Enter all member basic information correctly.</p>
                <div className='flex items-center gap-2'>
                  <div className='flex flex-col gap-1 w-full'>
                    <span className='mb-2 text-sm'>First Name</span>
                    <Input
                      type='text'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <span className='mb-2 text-sm'>Last Name</span>
                    <Input
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className='flex flex-col mt-2'>
                  <span className='mb-2 text-sm'>Phone</span>
                  <Input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className='flex flex-col mt-2'>
                  <span className='mb-2 text-sm'>E-Mail</span>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Calendar22 text='Date of birth' value={dateOfBirth} onSetDate={onSetDate} />
              </TabsContent>

              <TabsContent value="subscription_data">
                <p className="text-sm text-muted-foreground mb-4">Enter the choosen subscription model.</p>
                <div className='flex gap-2 items-center my-4'>
                  <Calendar22 text='Start Date' value={startDate} onSetDate={onSetStartDate} />
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='my-2 flex flex-col gap-4 w-full'>
                    <span className='text-sm'>Gender</span>
                    <RadioGroupComp value={gender} onSetGender={onSetGender} />
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <span className='mb-2 text-sm'>Assigned Branch</span>
                      <BranchComboBox value={branch} onSetBranch={onSetBranch} />
                  </div>
                </div>
                <div className='flex gap-2 items-center my-2'>
                  <div className='flex flex-col gap-2 w-full'>
                    <span className='text-sm'>Membership Type</span>
                    <MembershipComboBox value={membershipId} onSetMembershipType={onSetMembershipType} />
                  </div>
                </div>
                <div className='mt-4'>
                  <Label htmlFor='amount-paid' className='text-sm mb-2'>Amount Paid</Label>
                  <Input
                    type='number'
                    id='amount-paid'
                    value={amount ?? ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className='flex gap-2 items-center ml-auto mt-4'>
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
  );
};

export default MemberActivation;
