import { Check, ChevronsUpDown, X } from "lucide-react"
import * as React from "react"

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
import { cn } from "@/lib/utils"
import { Spinner } from '../loading'

export function DropdownFilter({
  label,
  hideLabel,
  data,
  isLoading,
  width = 200,
  onSelect,
  showClearButton = true
}: {
  label: string
  hideLabel?: boolean
  data: FilterData[]
  isLoading: boolean
  width?: number
  onSelect: (selected?: FilterData) => void
  showClearButton?: boolean
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
        {!hideLabel && (
          <span className='text-sm font-semibold mb-1'>{label}:</span>
        )}
        <div className='flex items-center'>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-[${width}px] justify-between truncate overflow-ellipsis`}
            >
              {isLoading
                ? <Spinner className='h-4 2-4 text-muted-foreground' />
                : selected
                  ? data.find((item) => item.value === selected.value)?.value
                  : (
                    <p className='text-muted-foreground font-normal'>
                      {!hideLabel ? `Select ${label}...` : label}
                    </p>
                  )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {showClearButton && (<Button
            size='icon'
            variant='outline'
            className='-ml-1'
            onClick={() => setSelected(undefined)}
          >
            <X className='h-4 w-4' />
          </Button>)}
        </div>
      </div>
      <PopoverContent className={`w-[200px] p-0`}>
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
