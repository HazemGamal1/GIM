"use client"

import { useEffect, useState } from "react"
import { CheckIcon, ChevronsUpDownIcon, Loader } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Gym, useGymStore } from "../../../store/useGymStore"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"
import { useRouter } from "next/navigation"

export function GymComboBox() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setSelectedGym } = useGymStore();
    const router = useRouter();

    useEffect(() => {
      const getGyms = async () => {
        try{
            setIsLoading(true);
            const res = await fetch(`/api/gyms/get-all`)
            const data = await res.json();
            setGyms(data);
            if(data.error === "No gyms found for this user"){
              router.push("/configuration")
            }
        }catch(error){
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      }

      getGyms();
    }, [])


  useEffect(() => {
    if (gyms.length > 0 && !value) {
      setValue(gyms[0].name)
      setSelectedGym(gyms[0])
    }
  }, [gyms, setSelectedGym, value])

  if(isLoading){
    return (<Skeleton className="w-[20px] h-[10px]"/>)
  }
    
  if(gyms.length === 0 && !isLoading) return (
    <Link href={"/join-gym"}>
      <Button variant={"default"}>
        <span>Join/Create Gym</span>
      </Button>
    </Link>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? gyms.find((gym) => gym.name === value)?.name
            : "Select Gym..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Gym..." />
          <CommandList>
            {
              !isLoading ?
              <CommandEmpty>No Gyms found.</CommandEmpty>
              :
              <div className="w-full h-full grid place-content-center my-2 animate-spin"><Loader /></div>
            }
            <CommandGroup>
              {
                gyms.length > 0 &&
                  gyms.map((gym) => (
                    <CommandItem
                      key={gym.id.toString()}
                      value={gym.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setSelectedGym(gym)
                        setOpen(false)
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === gym.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {gym.name}
                    </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}