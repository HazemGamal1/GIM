import { ChartAreaGradient } from '@/components/Area-Chart'
import { SubscriptionsBarChart } from '@/components/Bar-Chart'
import React from 'react'
import DashboardLineChart from '@/components/Line-Chart'

const Insights = () => {
  return (
    <div className='p-8'>
      <h3 className='mb-4'>3/3 insights components working</h3>
      <div className='grid grid-cols-2 gap-8 max-w-max mx-auto'>
          <DashboardLineChart />
          <SubscriptionsBarChart />
          <ChartAreaGradient />
      </div>
    </div>
  )
}

export default Insights
