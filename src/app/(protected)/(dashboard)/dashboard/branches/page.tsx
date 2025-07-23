"use client"

import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { useGymStore } from '../../../../../../store/useGymStore';
import { ImSpinner } from 'react-icons/im';
import { Branch } from '@prisma/client';

const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const { selectedGym } = useGymStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const getBranches = async () => {
        try{
          if(selectedGym){
            setIsLoading(true);
            const res = await fetch(`/api/gyms/branches/get-all?gymId=${selectedGym.id}`)
            const data = await res.json();
            console.log(data);
            setBranches(data);
          }
        }catch(error){
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      }

      getBranches();
  }, [selectedGym])

  if(!selectedGym){
    return(
    <div className='w-full h-full grid place-content-center'>
      Pelase select a gym first to show its branches...
    </div>)
  }
  return (
    <div className='p-12'>
      <p className='text-red-300 my-8'>Needs UI</p>
      Branches 
      {
        isLoading ? 
       <div className="w-full h-full grid place-content-center">
          <div className="mx-auto animate-spin">
            <ImSpinner />
          </div>
          loading...
        </div>
        :
        <div className='flex flex-col gap-4'>
          {
            branches.map((branch) => (
            <div className='max-w-max p-2 py-4 flex items-center' key={branch.id}>
              <div>
                <FaLocationDot className='text-xl'/>
              </div>
              <div className='flex flex-col gap-1 ml-2'>
                <h3 className='font-bold text-md'>{branch.name}</h3>
                <div className='text-xs text-shadow-2xs text-gray-400'>
                  <h4>Coordinates:</h4>
                  <h4>x: {branch.locationX}</h4>
                  <h4>y: {branch.locationY}</h4>
                </div>
              </div>
            </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Branches
