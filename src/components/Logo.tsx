import Image from 'next/image'
import React from 'react'
import logo from "../../public/BullGIM2.svg"

interface ILogo {
    size?: number,
    className?: string
}
const Logo = ({ size, className } : ILogo ) => {
  return (
    <div>
      <Image src={logo} alt='logo' width={size} className={className} priority/>
    </div>
  )
}

export default Logo
