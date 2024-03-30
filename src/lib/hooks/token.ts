import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import API from '../api'
import { User } from '../models'

export type UserToken = {
  id: string
  email: string
  name: string
  role: string
  exp: number
  iat: number
}

export function useToken() {
  const token = localStorage.getItem('token')
  const client = new API({ applyAuth: true })
  const { data: response } = useQuery({
    queryKey: ['GET', 'ME', 'AUTH'],
    queryFn: () => client.get<User>('/auth/me'),
    enabled: Boolean(token)
  })

  if (response?.error || !token) return null

  try {
    const decoded = jwtDecode(token) as UserToken
    if ((Date.now() / 1000) > decoded.exp) return null


    return decoded
  } catch {
    return null
  }
}
