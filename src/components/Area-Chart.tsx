"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartConfig,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { combineBranchAnalytics } from "@/lib/combineAnalytics"

const chartConfig = {
  subscriptions: {
    label: "Subscriptions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type ChartDataPoint = {
  month: string;
  subscriptions: number;
};

export function ChartAreaGradient() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/analytics/get-analytics")
      const stats = await res.json()
      const finalStats = combineBranchAnalytics(stats);
      setChartData([
        {
          month: "Last Month",
          subscriptions: finalStats.subscriptions.previous ?? 0,
        },
        {
          month: "This Month",
          subscriptions: finalStats.subscriptions.value ?? 0,
        },
      ])
    }

    fetchData()
  }, [])

  const percentage =
    chartData.length === 2
      ? (
          ((chartData[1].subscriptions - chartData[0].subscriptions) /
            (chartData[0].subscriptions || 1)) *
          100
        ).toFixed(1)
      : "0"

  return (
    <Card className="max-w-max mx-auto">
      <CardHeader>
        <CardTitle>Subscriptions Overview</CardTitle>
        <CardDescription>This month vs last month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 12, left: 12, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <defs>
                <linearGradient id="fillSubscriptions" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-subscriptions)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-subscriptions)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="subscriptions"
                stroke="var(--color-subscriptions)"
                fill="url(#fillSubscriptions)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by {percentage}% this month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Monthly new memberships
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
