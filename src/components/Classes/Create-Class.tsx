"use client"
import { Button } from '@/components/ui/button'
import {  Plus } from 'lucide-react'
import { useState } from 'react'
import { IoTime } from "react-icons/io5";
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrainerComboBox } from '@/components/Gyms/Trainers/Trainer-Combo-box'
import { BranchComboBox } from '@/components/Branches/Branch-Combo-box'
import { Branch } from '@prisma/client'

function combineDateAndTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
}

const CreateClass = ({ date }: { date?: Date}) => {
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>("")
    const [maxCapacity, setMaxCapacity] = useState<number>();
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    const [branch, setBranch] = useState<Branch>();
    const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");
    const [trainerIds, setTrainerIds] = useState<string[]>([]);

    
    const onSetBranch = (val: Branch) => setBranch(val);
      const onSetTrainer = (val: string) => {
        setSelectedTrainerId(val);
        setTrainerIds((prev) => [...prev, val]);
      };
       const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value) 
      }
      const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
      }
    
      const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !startTime || !endTime || !branch) return;
    
        const startDateTime = combineDateAndTime(date, startTime);
        const endDateTime = combineDateAndTime(date, endTime);
    
        const jsonDATA = {
          name: title,
          description,
          startTime: startDateTime,
          endTime: endDateTime,
          maxCapacity,
          branchId: branch.id,
          trainerIds
        };
    
        const res = await fetch("/api/classes/create-class", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonDATA),
        });
        await res.json();
      };

  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant={"material_blue"} >
            Schedule Class <Plus/>
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle className='flex gap-2 items-center'>
            <IoTime />
            <p>Add New Class</p>
            </DialogTitle>
            <DialogDescription>
            Create a new class event in schedule
            </DialogDescription>
        </DialogHeader>
        <div>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid gap-2'>
                    <Label>Enter Class Title: </Label>
                    <Input type='text' placeholder='Class title' onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='grid gap-2'>
                    <Label>Enter Class Trainer: </Label>
                    <TrainerComboBox value={selectedTrainerId} onValueChange={onSetTrainer}/>
                </div>
                <div className='grid gap-2'>
                    <Label>What Branch wil lthe class be in : </Label>
                    <BranchComboBox value={branch} onSetBranch={onSetBranch}/>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='grid gap-2 w-full'>
                    <Label>Enter Start Time: </Label>
                    <Input
                        type="time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        className="border p-2"
                    />
                    </div>
                    <div className='grid gap-2 w-full'>
                    <Label>Enter End Time: </Label>
                    <Input 
                        type='time'
                        value={endTime}
                        onChange={handleEndTimeChange}
                        className='border p-2'
                    />
                    </div>
                </div>
                <div className='grid gap-2'>
                    <Label>Enter Max Capacity: </Label>
                    <Input type='number' onChange={(e) => setMaxCapacity(Number(e.target.value))}/>
                </div>
                <div className='grid gap-2'>
                    <Label>Description: </Label>
                    <textarea className='border p-2' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <DialogClose asChild>
                    <Button variant="material_red">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant={"material_blue"}>Submit</Button>
            </form>
        </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreateClass
