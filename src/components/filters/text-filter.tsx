import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function TextFilter({
  label,
  onChange
}: {
  label: string,
  onChange: (value: string) => void
}) {
  const onClear = () => {
    (document.getElementById(`input${label}`) as HTMLInputElement).value = ''
    onChange('')
  }

  return (
    <div>
      <Label>{label}:</Label>
      <div className='flex items-center'>
        <Input
          id={`input${label}`}
          placeholder={`Input ${label}...`}
          className='w-[200px] focus-visible:ring-transparent'
          onChange={e => onChange(e.target.value)}
        />
        <Button
          size='icon'
          variant='outline'
          className='-ml-1'
          onClick={onClear}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
