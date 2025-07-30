import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect, useState } from 'react'

interface Gym {
    name: string
}

const GymSelect = () => {
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const getGyms = async () => {
            try{
                setIsLoading(true);
                const res = await fetch(`/api/gyms/get-gyms`)
                const data = await res.json();
                setGyms(data);
            }catch(error){
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        }
        getGyms();
    }, []);


  return (
    isLoading ?
    <Skeleton className='w-[6rem] h-[2rem] mr-4'/>
    :
    <select className='dark:bg-[#1E1E1E] py-1 px-5 border bg-white border-gray-200 dark:border-[#121212]'>
        {
            gyms.map((gym, idx) => (
                <option key={idx}>
                    {gym.name} Gym
                </option>
            ))
        }
    </select>
  )
}

export default GymSelect
