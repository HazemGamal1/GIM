"use client"
import React, { useState } from 'react'
const tabs = [
  {
    title: "Payments",
    text: "",
  },
  {
    title: "Marketing",
    text: "",
  },
  {
    title: "Self Management",
    text: "",
  },
  {
    title: "Boooking",
    text: "",
  },
  {
    title: "Scheduling",
    text: "",
  },
  {
    title: "Reporting",
    text: "",
  },
  {
    title: "Branded App",
    text: "",
  }
]

const FeaturesCard = () => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].title);


  return (
    <div className="w-[95rem] bg-[#f3f3f3] rounded-lg  border border-[#2d2d2d]">
        <div className="container mx-auto">               
        <ul className="flex items-center gap-12 bg-[#2d2d2d] p-8 font-bold text-white mx-auto">
          {
            tabs.map((tab) => (
              <li key={tab.title} onClick={() => setSelectedTab(tab.title)} className={`cursor-pointer pb-2 hover:border-b-2 border-b-blue-500 ${selectedTab === tab.title && "border-b-2    underline-blue-500"}`}>{tab.title}</li>
            ))
          }
        </ul>
        </div>
        <div className="p-12 py-48 flex items-baseline">
            <div className="w-full">
                <h1 className='font-bold text-3xl  text-center'>Process payments with ease</h1>
                <h4 className='text-xl mt-8'>Accept payments anytime, anywhere. Handle every sale on one system for quick & easy checkout paired with powerful reporting.</h4>
            </div>
            <div className='w-full'>

            </div>
        </div>
    </div>
  )
}

export default FeaturesCard
