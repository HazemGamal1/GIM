"use client"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Loader2, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiMapPin } from "react-icons/hi2";
import { BiPencil } from "react-icons/bi"
import { Button } from "./ui/button"
import { BranchComboBox } from "./Branches/Branch-Combo-box"
import { useGymStore } from "../../store/useGymStore"
import { Branch } from "@prisma/client"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"
import MemberActivation from "./Members/MemberActivation";
import MembershipRenew from "./Members/MembershipRenew";
import { FaTools } from "react-icons/fa";
import DashboardLineChart from "./Line-Chart";
import { combineBranchAnalytics } from "@/lib/combineAnalytics";
import MemberAttendance from "./Members/MemberAttendance";

type Metrics = {
  revenue: { value: number, change: number},
  sales: { value: number, change: number },
  subscriptions: { value: number, change: number }
}

type BranchAnalytics = {
  branch: {
    id: string;
    name: string;
    gymId: string;
  };
  revenue: {
    value: number;
    previous: number;
    change: number;
  };
  subscriptions: {
    value: number;
    previous: number;
    change: number;
  };
  sales: {
    value: number;
    previous: number;
    change: number;
  };
};

export function DashboardContent() {
  const [greeting, setGreeting] = useState('')
  const { setSelectedBranch, selectedGym } = useGymStore();
  const [currentBranch, setCurrentBranch] = useState<Branch>()
  const [allMetrics, setAllMetrics] = useState<BranchAnalytics[]>();
  const [metrics, setMetrics] = useState<Metrics>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSetBranch = (branch : Branch) => {
    setCurrentBranch(branch);
    setSelectedBranch(branch);
     if(allMetrics){
      const branchData = allMetrics.find((a) => a.branch.id === branch.id);
      if(branchData){
        setMetrics({ revenue: branchData.revenue, subscriptions: branchData?.subscriptions, sales: branchData.sales })
      }
    }
  };


  useEffect(() => {
    const hour = new Date().getHours()

    if (hour < 12) {
      setGreeting('Good Morning')
    } else if (hour < 18) {
      setGreeting('Good Afternoon')
    } else {
      setGreeting('Good Evening')
    }
  }, [])

  useEffect(() => {
    const getAnalyticsData = async () => {
      try{
        setIsLoading(true);
        const res = await fetch("/api/analytics/get-analytics");
        const data = await res.json();
        const combinedAnalytics = combineBranchAnalytics(data);

        setAllMetrics(data);
        setMetrics(combinedAnalytics);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    }

    getAnalyticsData();

  }, [])

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row  justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl text-[#4a4a4a] dark:text-[#fafafa]">{greeting}</h1>
          <h4 className="text-gray-500 dark:text-gray-200">Here&apos;s what&apos;s happening at your gym today</h4>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col gap-1">
              <p className="text-gray-500 dark:text-[#fafafa]">Currently viewing data for {currentBranch ? ":" : "All branches"}</p>
              <div className="flex gap-2 items-center">
                <div className="dark:bg-[#121212] dark:text-[#868383] p-2 rounded-full border">
                  <HiMapPin />
                </div>
                <BranchComboBox value={currentBranch} onSetBranch={onSetBranch}/>
              </div>
          </div>
          <div className="flex gap-2 items-center-safe">
            <div className="dark:bg-[#121212] flex items-center gap-2 dark:text-[#868383] p-2 rounded-full border">
              <BiPencil />
            </div>
            {
              selectedGym &&
              <Button asChild className="cursor-pointer" variant={"material_purple"}>
                <Link href={`/${selectedGym.id}/create-branch`}>
                    + Create
                </Link>
              </Button>
            }
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="flex gap-2 items-center mb-4 text-[#2a2a2a] dark:text-[#fafafa] font-bold">
          <FaTools />
          <h1>Quick Tools</h1>
        </div>
        <div className="flex gap-2 items-center">
            <MemberAttendance />
            <MemberActivation />
            <MembershipRenew />
        </div>
      </div>
      
      <h3 className="text-md font-semibold  mb-2">Metrics</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {
          isLoading ? 
          <Skeleton />
          :
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {
                metrics &&
                <>
                  <div className="text-2xl font-bold"><span className="text-sm font-normal mr-1">EGP</span>{metrics?.revenue.value}</div>
                  <p className="text-xs text-muted-foreground">+{metrics?.revenue.change}% from last month</p>
                </>
              }
            </CardContent>
            {
              metrics &&
                <CardFooter className={`flex items-center gap-2 text-sm ${metrics.revenue.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    <>
                      {
                        metrics.revenue.change > 0 ?
                        <ArrowUp className="h-4 w-4"/>
                        :
                        <ArrowDown className="h-4 w-4"/>
                      }
                      <span>{metrics.revenue.change}%</span>
                    </>
                </CardFooter>
            }
          </Card>
        }
        {
          isLoading ?
          <Skeleton />
          :
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {
                metrics &&
                <>
                  <div className="text-2xl font-bold">+{metrics.subscriptions.value}</div>
                  <p className="text-xs text-muted-foreground">+{metrics.subscriptions.change}% from last month</p>
                </>
              }

            </CardContent>
            {
              metrics &&
              <CardFooter className={`flex items-center gap-2 text-sm text-green-600 ${metrics.subscriptions.change ? "text-green-600" : "text-red-600"}`}>
               
                {
                  metrics.subscriptions.change > 0 ?
                  <ArrowUp className="h-4 w-4"/>
                  :
                  <ArrowDown className="h-4 w-4"/>
                }
                <span>{metrics.subscriptions.change}%</span>
              </CardFooter>
            }
          </Card>
        }
        {
          isLoading ?
          <Skeleton />
          :
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment Active</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p>Under development</p>
            </CardContent>
          </Card>
        }
        {
          isLoading ? 
          <Skeleton />
          :
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Check-ins</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p>Under development</p>
            </CardContent>
            <CardFooter className="flex items-center gap-2 text-sm text-red-600">
            </CardFooter>
          </Card>
        }
      </div>
      <div className="my-6">
        {
          isLoading ?
          <div className="p-4 grid place-content-center">
            <div className="animate-spin">
              <Loader2 />
            </div>
          </div> 
          :
          <DashboardLineChart />
        }
      </div>
    </div>
  )
}
