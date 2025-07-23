import { SignIn } from '@clerk/nextjs'
import bg from "../../../../public/Sign up/sign-up-bg.png"
import Image from 'next/image'

export default function Page() {
  return (
    <div className='w-full h-screen grid place-content-center relative'>
      <Image src={bg} alt='background' className='hidden md:block absolute w-full h-full  object-cover object-center'/>
      <SignIn />
    </div>
  )
}