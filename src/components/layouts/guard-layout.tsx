import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadingPage } from '../loading'

type GuardState = 'loading' | 'loggedIn' | 'loggedOut'

export default function GuardLayout() {
  const [guardState, setGuardState] = useState<GuardState>('loading')

  useEffect(() => {
    // TODO: handle check token
    const t = setTimeout(() => setGuardState('loggedOut'), 2000)
    return () => clearTimeout(t)
  }, [])

  switch (guardState) {
    case 'loading': return <LoadingPage />
    case 'loggedOut': return <Navigate to='/login' />
    case 'loggedIn': return <Outlet />
  }
}
