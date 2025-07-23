"use client"

import * as React from "react"
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
import { Branch } from "@prisma/client"
import { useGymStore } from "../../../store/useGymStore"

interface BranchComboBoxProps {
  value?: Branch | undefined,
  onSetBranch: (branch: Branch) => void
}

export function BranchComboBox({ value, onSetBranch }: BranchComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [branches, setBranches] = React.useState<Branch[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { selectedGym } = useGymStore()

  React.useEffect(() => {
    const getBranches = async () => {
      try {
        if (selectedGym) {
          setIsLoading(true)
          const res = await fetch(`/api/gyms/branches/get-all?gymId=${selectedGym.id}`)
          const data = await res.json()
          setBranches(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getBranches()
  }, [selectedGym])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value.name : "Select Branch..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Branch..." />
          <CommandList>
            {
              !isLoading ? (
                <CommandEmpty>No Branches found.</CommandEmpty>
              ) : (
                <div className="w-full h-full grid place-content-center my-2 animate-spin">
                  <Loader />
                </div>
              )
            }
            <CommandGroup>
              {branches.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={branch.name}
                  onSelect={() => {
                    onSetBranch(branch)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.id === branch.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {branch.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
