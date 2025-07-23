"use client"
import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { combineBranchAnalytics } from "@/lib/combineAnalytics"

type ChartDataPoint = {
  month: string;
  revenue: number;
  subscriptions: number;
  sales: number;
};

export default function DashboardLineChart() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/analytics/get-analytics") 
      const data = await res.json()
      const finalData = combineBranchAnalytics(data);
      setChartData([
        {
          month: "Last Month",
          revenue: finalData.revenue.previous ?? 0,
          subscriptions: finalData.subscriptions.previous ?? 0,
          sales: finalData.sales.previous ?? 0,
        },
        {
          month: "This Month",
          revenue: finalData.revenue.value,
          subscriptions: finalData.subscriptions.value,
          sales: finalData.sales.value,
        },
      ])
    }

    fetchData()
  }, [])

  return (
    <Card className="max-w-max">
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
        <CardDescription>This month vs last month</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          <Line type="monotone" dataKey="subscriptions" stroke="#82ca9d" />
          <Line type="monotone" dataKey="sales" stroke="#ffc658" />
        </LineChart>
        <div className="flex gap-2 mt-4 text-sm font-medium">
          Trending up this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  )
}
