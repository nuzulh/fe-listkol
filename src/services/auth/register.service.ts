import API from '@/lib/api'
import { User } from '@/lib/models';

export const postRegister = async (
  data: { name: string; email: string; password: string }
) => {
  const client = new API()
  return await client.post<User>('/auth/register', data)
}
