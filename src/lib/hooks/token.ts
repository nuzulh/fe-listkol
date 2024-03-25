import { jwtDecode } from 'jwt-decode'

type UserToken = {
  id: string
  email: string
  name: string
  role: string
  exp: number
  iat: number
}

export function useToken() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decoded = jwtDecode(token) as UserToken
    if (Date.now() > decoded.exp * 1000) return null

    return decoded
  } catch {
    return null
  }
}
