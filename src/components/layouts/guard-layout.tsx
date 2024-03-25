import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadingPage } from '../loading'
import { useToken } from '@/lib/hooks/token'

type GuardState = 'loading' | 'loggedIn' | 'loggedOut'

export default function GuardLayout({
  urlPrefix
}: {
  urlPrefix: 'auth' | 'app'
}) {
  const [guardState, setGuardState] = useState<GuardState>('loading')
  const decodedToken = useToken()

  useEffect(() => {
    if (!decodedToken) {
      setGuardState('loggedOut')
      return
    }

    setGuardState('loggedIn')
  }, [decodedToken])

  switch (guardState) {
    case 'loading': return <LoadingPage />
    case 'loggedOut': return urlPrefix === 'app' ? <Navigate to='/auth' /> : <Outlet />
    case 'loggedIn': return urlPrefix === 'auth' ? <Navigate to='/app' /> : <Outlet />
  }
}
