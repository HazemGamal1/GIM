"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Loader, Loader2, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IoTime } from "react-icons/io5";
import React from 'react'
import { Class } from '@prisma/client'
import CreateClass from '@/components/Classes/Create-Class'

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getClasses = async () => {
      try{
        setIsLoading(true);
        const res = await fetch("/api/classes/get-classes")
        const data = await res.json();
        setClasses(data);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    }

    getClasses();
  }, []);

  return (
    <div className='flex h-full'>
      <div className='w-full p-8'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl flex items-center text-[#525252]'><IoTime /> Today&apos;s Classes</h1>
          <div className='flex flex-col gap-4'>
            <div className='w-full rounded-md'>
              <CreateClass date={date}/>
            </div>
          </div>
        </div>
        {
          isLoading ? 
          <div className='grid w-full h-full place-content-center'>
            <Loader2 className='animate-spin'/>
          </div>
          :
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-12'>
            {
              classes.length > 0 &&
              classes?.map((myClass) => (
              <div className='border p-4 bg-[#e3f0fc]' key={myClass.id}>
                <h4 className='mb-2 font-semibold'>{myClass.name}</h4>
                <hr />
                <div className='py-4'>
                  <h4>Trainer</h4>
                  <h4>Trainees</h4>
                </div>
                <hr />
                <div className='py-4'>
                  <p>max capacity: {myClass.maxCapacity}</p>
                </div>
                <div className='max-w-max  ml-auto'>
                  <Button className='border max-w-max' variant={"material_black"} size={'sm'}>
                    <Pencil />
                  </Button>
                </div>
              </div>
              ))
            }
            <div className='border p-4 bg-[#fcf8e3]'>
              <h4 className='mb-2 font-semibold'>MMA Class</h4>
              <hr />
              <div className='py-4'>
                <h4>Trainer</h4>
                <h4>Trainees</h4>
              </div>
              <hr />
              <div className='py-4'>
                <p>max capacity: 12</p>
                <p>duration: 45 minutes</p>
              </div>
              <div className='max-w-max  ml-auto'>
                <Button className='border max-w-max' variant={"secondary"} size={'sm'}>
                  <Pencil />
                </Button>
              </div>
            </div>
            <div className='border p-4 bg-[#fce3e3]'>
              <h4 className='mb-2 font-semibold'>MMA Class</h4>
              <hr />
              <div className='py-4'>
                <h4>Trainer</h4>
                <h4>Trainees</h4>
              </div>
              <hr />
              <div className='py-4'>
                <p>max capacity: 12</p>
                <p>duration: 45 minutes</p>
              </div>
              <div className='max-w-max  ml-auto'>
                <Button className='border max-w-max' variant={"secondary"} size={'sm'}>
                  <Pencil />
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
      <div className='w-[30%] border-l px-4 mx-auto bg-[#f3f5f7]'>
        <div className='py-4 border-b'>
          <h4 className='mb-4'>Calendar</h4>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border mx-auto"
          />
        </div>
        <div>
          <h1 className='mt-4 flex gap-2 items-center'>
            Assigned Trainers
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Classes
