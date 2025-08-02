"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
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
  month: string
  revenue: number
  subscriptions: number
  sales: number
}

const colors = {
  revenue: "#6366f1",        
  subscriptions: "#22c55e", 
  sales: "#f97316",         
}

export default function DashboardLineChart() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/analytics/get-analytics")
      const data = await res.json()
      const finalData = combineBranchAnalytics(data)
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
    <Card className="w-full drop-shadow-lg shadow-md border ">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Monthly Performance</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Revenue, Subscriptions & Sales
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Growing faster than last month
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ color: "#6b7280", fontWeight: 500 }}
                itemStyle={{ fontSize: 13 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={colors.revenue}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="subscriptions"
                stroke={colors.subscriptions}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={colors.sales}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
