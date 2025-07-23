import Image from 'next/image'
import React from 'react'
import not_authorized from "../../../public/Auth/not-authorized.png"
import { DashboardLayout } from '@/components/dashboard-layout'
const page = () => {
  return (
    <DashboardLayout>
        <div className='w-full h-full grid place-content-center'>
            <Image src={not_authorized} width={700} alt='not-authorized-access'/>
        </div>
    </DashboardLayout>
  )
}

export default page
