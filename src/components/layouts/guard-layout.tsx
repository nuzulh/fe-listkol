import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingPage } from '../loading'
import { useToken } from '@/lib/hooks/token'
import Sidebar from '../sidebar'
import { toast } from 'sonner'

type GuardState = 'loading' | 'loggedIn' | 'loggedOut'

export default function GuardLayout() {
  const [guardState, setGuardState] = useState<GuardState>('loading')
  const { pathname } = useLocation()
  const userToken = useToken()
  const urlPrefix = pathname.split('/')[1]

  useEffect(() => {
    if (!userToken) {
      const token = localStorage.getItem('token')
      if (token) toast.error('Invalid token. Please login again.')
      localStorage.removeItem('token')
      setGuardState('loggedOut')
      return
    }

    setGuardState('loggedIn')
  }, [userToken])

  switch (guardState) {
    case 'loading': return <LoadingPage />
    case 'loggedOut': return urlPrefix === 'app' ? <Navigate to='/auth' /> : <Outlet />
    case 'loggedIn': return urlPrefix === 'auth' ? <Navigate to='/app' /> : (
      <main className='min-h-screen w-full flex items-start gap-4 py-4'>
        <Sidebar userToken={userToken} />
        <div className='flex flex-col items-start justify-start gap-4 w-full pl-[18rem] pr-4'>
          <Outlet />
        </div>
      </main>
    )
  }
}
