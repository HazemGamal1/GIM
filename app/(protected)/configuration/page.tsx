import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from "react-icons/fi";
import { GoArrowUpRight } from 'react-icons/go';

const Configuration = () => {
  return (
    <div className='w-full h-screen grid place-content-center text-center'>
      <h1 className='font-bold text-7xl text-[#383838]'>Welcome!</h1>
      <h3>What will you be using Flex for?</h3>
      <div className='flex gap-2 items-center mt-6'>
        <Link href={"/join-gym"}>
            <Button variant={"material_blue"}>
                I am a part of a gym staff
                <GoArrowUpRight />
            </Button>
        </Link>
        <Link href={"/create-gym"}>
            <Button variant={"material_purple"}>
                I am a gym owner
                <FiChevronRight />
            </Button>
        </Link>
      </div>
    </div>
  )
}

export default Configuration
