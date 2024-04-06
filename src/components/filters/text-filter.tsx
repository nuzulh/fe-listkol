import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function TextFilter({
  label,
  onChange,
  hideAction = false,
  placeholder
}: {
  label: string | React.ReactNode
  onChange: (value: string | undefined) => void
  hideAction?: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState<string>('')
  // const onClear = () => {
  //   (document.getElementById(`input${label}`) as HTMLInputElement).value = ''
  //   onChange('')
  // }

  useEffect(() => {
    if (value === '') onChange(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div>
      {typeof label === 'string' ? <Label>{label}:</Label> : label}
      <div className='flex items-center'>
        <Input
          id={`input${label}`}
          placeholder={placeholder ? placeholder : `Input ${label}...`}
          className={cn(
            'w-[200px] focus-visible:ring-transparent',
            hideAction && 'w-[236px]'
          )}
          onChange={e => hideAction ? onChange(e.target.value) : setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onChange(value)}
        />
        {!hideAction && (
          <Button
            size='icon'
            variant='outline'
            className='-ml-1'
            onClick={() => onChange(value)}
          >
            <Search className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
