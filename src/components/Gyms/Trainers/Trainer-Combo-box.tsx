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
import { useGymStore } from "../../../../store/useGymStore"

interface ITrainer {
  assignedAt: Date
  branchId: string
  id: string // This is the BranchTrainer.id
  trainer: {
    name: string
  }
  trainerId: string // User.id
}

interface TrainerComboBoxProps {
  value: string // selected trainer's BranchTrainer.id
  onValueChange: (trainerId: string) => void
}

export function TrainerComboBox({ value, onValueChange }: TrainerComboBoxProps) {
  const { selectedGym } = useGymStore()
  const [open, setOpen] = useState(false)
  const [trainers, setTrainers] = useState<ITrainer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getTrainers = async () => {
      try {
        if (selectedGym) {
          setIsLoading(true)
          const res = await fetch(`/api/trainers/get-gym-trainers?id=${selectedGym.id}`)
          const data = await res.json()
          setTrainers(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getTrainers()
  }, [selectedGym])

  const selectedTrainer = trainers.find((trainer) => trainer.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mx-auto"
        >
          {selectedTrainer ? selectedTrainer.trainer.name : "Select Trainer..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <Command>
          <CommandInput placeholder="Search Trainer..." />
          <CommandList>
            {!isLoading ? (
              <CommandEmpty>No Trainers found.</CommandEmpty>
            ) : (
              <div className="w-full h-full grid place-content-center my-2 animate-spin">
                <Loader />
              </div>
            )}
            <CommandGroup>
              {trainers.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    onValueChange(item.id)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.trainer.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
