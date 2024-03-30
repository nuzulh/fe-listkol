import LoginForm from '@/components/forms/login.form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <main className="h-dvh flex items-center justify-center bg-dots bg-no-repeat bg-cover">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Button className='w-fit mb-4' size='sm' variant='outline' asChild>
            <Link to='/#home'>
              <ArrowLeft className='h-4 w-4 mr-2' /> Home
            </Link>
          </Button>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please fill the form below to login.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className='mt-4'>
            <span className='text-sm'>
              Don't have an account?
            </span>
            <Button size='sm' variant='link' asChild>
              <Link to='/auth/register'>
                register
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
