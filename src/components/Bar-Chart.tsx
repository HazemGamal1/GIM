"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, CartesianGrid, YAxis, XAxis, LabelList } from "recharts"
import { TrendingUp } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { combineBranchAnalytics } from "@/lib/combineAnalytics"

const chartConfig = {
  subscriptions: {
    label: "Subscriptions",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig


type ChartDataPoint = {
  month: string;
  subscriptions: number;
};

export function SubscriptionsBarChart() {
  const [data, setData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/analytics/get-analytics")
      const stats = await res.json()
      const finalStats = combineBranchAnalytics(stats); 
      setData([
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

  return (
    <Card className="max-w-max mx-auto">
      <CardHeader>
        <CardTitle>Subscription Growth</CardTitle>
        <CardDescription>Monthly comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="subscriptions"
              fill="var(--color-subscriptions)"
              radius={4}
              layout="vertical"
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-muted"
                fontSize={12}
              />
              <LabelList
                dataKey="subscriptions"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by {data.length === 2
            ? (
                ((data[1].subscriptions - data[0].subscriptions) /
                  (data[0].subscriptions || 1)) *
                100
              ).toFixed(1)
            : "0"}
          % this month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparing total new members from the last 2 months
        </div>
      </CardFooter>
    </Card>
  )
}
