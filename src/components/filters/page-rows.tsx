import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

const filterData = [
  {
    value: "5",
    label: "5",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "25",
    label: "25",
  },
]

export function PageRowFilter({
  selected,
}: {
  selected: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("10")

  React.useEffect(() => {
    selected(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex flex-col'>
        <span className='text-sm font-semibold mb-1'>Page rows:</span>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? filterData.find((row) => row.value === value)?.label
              : "Select row..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search row..." />
          <CommandEmpty>No row found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filterData.map((row) => (
                <CommandItem
                  key={row.value}
                  value={row.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === row.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {row.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
