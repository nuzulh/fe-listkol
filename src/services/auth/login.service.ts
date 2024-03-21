import API from '@/lib/api'

export const postLogin = async (
  data: { email: string; password: string }
) => {
  type LoginResponse = { name: string; token: string }
  const client = new API()
  return await client.post<LoginResponse>('/auth/login', data)
}
