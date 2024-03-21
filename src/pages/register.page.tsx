import RegisterForm from '@/components/forms/register.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <main className="h-dvh flex items-center justify-center bg-dots bg-no-repeat bg-cover">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Button className='w-fit mb-4' size='sm' variant='outline' asChild>
            <Link to='/#home'>
              <ArrowLeft className='h-4 w-4 mr-2' /> Home
            </Link>
          </Button>
          <CardTitle>Register</CardTitle>
          <CardDescription>Please fill the form below to register new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className='mt-4'>
            <span className='text-sm'>
              Already have an account?
            </span>
            <Button size='sm' variant='link' asChild>
              <Link to='/login'>
                Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
