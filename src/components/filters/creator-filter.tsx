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
import { FilterData } from '@/lib/models'

export function CreatorFilter({
  label,
  data,
  isLoading,
  onSelect
}: {
  label: string
  data: FilterData[]
  isLoading: boolean
  onSelect: (selected?: FilterData) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<FilterData | undefined>()

  React.useEffect(() => {
    onSelect(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex flex-col'>
        <span className='text-sm font-semibold mb-1'>{label}:</span>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between truncate overflow-ellipsis"
          >
            {isLoading
              ? "Loading..."
              : selected
                ? data.find((item) => item.value === selected.value)?.value
                : `Select ${label}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandEmpty>No {label} found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setSelected(currentValue === selected?.value ? undefined : data.find(x => x.value === currentValue))
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
