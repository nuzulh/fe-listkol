export type User = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  provider: string
  name: string
  email: string
  avatar: string | null
  role: string
}
