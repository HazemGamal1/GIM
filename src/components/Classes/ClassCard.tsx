import React from 'react'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react'

const ClassCard = () => {
  return (
    <div className='border p-4 bg-[#e3f0fc]'>
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
        <Button className='border max-w-max' variant={"material_black"} size={'sm'}>
            <Pencil />
        </Button>
        </div>
    </div>
  )
}

export default ClassCard
