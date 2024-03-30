import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';

export function TextFilter({
  label,
  onChange
}: {
  label: string,
  onChange: (value: string | undefined) => void
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
      <Label>{label}:</Label>
      <div className='flex items-center'>
        <Input
          id={`input${label}`}
          placeholder={`Input ${label}...`}
          className='w-[200px] focus-visible:ring-transparent'
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onChange(value)}
        />
        <Button
          size='icon'
          variant='outline'
          className='-ml-1'
          onClick={() => onChange(value)}
        >
          <Search className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
