import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Spinner } from '../loading'
import { LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { postLogin } from '@/services/auth/login.service'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })
  const { isSubmitting } = form.formState
  const navigate = useNavigate()

  const onSubmit = async (values: LoginSchema) => {
    const result = await postLogin(values)

    if (result.error) {
      toast.error(result.error.message)
      return
    }

    localStorage.setItem('token', result.data.token)
    navigate('/app', { replace: true })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-3 mb-4'>
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
            : <LogIn className='w-4 h-4 mr-2' />}
          Login
        </Button>
      </form>
    </Form>
  )
}
