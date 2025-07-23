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
import { Membership } from "@prisma/client"

interface Props {
  value: string
  onSetMembershipType: (typeId: string) => void
}

export function MembershipComboBox({ value, onSetMembershipType }: Props) {
  const [open, setOpen] = React.useState(false)
  const [membershipTypes, setMembershipTypes] = React.useState<Membership[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("/api/memberships/get-all")
        const data = await res.json()
        setMembershipTypes(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  const selectedMembership = membershipTypes.find((type) => type.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedMembership ? selectedMembership.name : "Select Membership..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Membership Type..." />
          <CommandList>
            {!isLoading ? (
              <CommandEmpty>No Membership types found.</CommandEmpty>
            ) : (
              <div className="w-full h-full grid place-content-center my-2 animate-spin">
                <Loader />
              </div>
            )}
            <CommandGroup>
              {membershipTypes.map((type) => (
                <CommandItem
                  key={type.id}
                  value={type.id}
                  onSelect={() => {
                    onSetMembershipType(type.id)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === type.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
