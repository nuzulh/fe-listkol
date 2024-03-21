import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Spinner } from '../loading'
import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { postRegister } from '@/services/auth/register.service'

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
})

type RegisterSchema = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(registerSchema)
  })
  const { isSubmitting } = form.formState
  const navigate = useNavigate()

  const onSubmit = async (values: RegisterSchema) => {
    const result = await postRegister(values)
    const isError = Boolean(result.error)

    toast[isError ? 'error' : 'success'](
      isError ? 'Account has been created successfully. Please log in.' : result.error?.message
    )

    if (!result.error) navigate('/login', { replace: true })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-3 mb-4'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Masukkan password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full' type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? <Spinner className="mr-2 w-4 h-4" />
            : <UserPlus className='w-4 h-4 mr-2' />}
          Register
        </Button>
      </form>
    </Form>
  )
}
