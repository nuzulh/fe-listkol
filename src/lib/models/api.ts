export type ApiResponse<T> = {
  error: ErrorResponse | null
  data: T
  pagination?: Pagination
}

export type Pagination = {
  nextPage: number
  page: number
  totalPage: number
}

export type ErrorResponse = {
  message: string
}

export type FilterParams = {
  industry?: string
  country?: string
  address?: string
  category?: string
  engagementRate?: string
  language?: string
  contactBy?: string
  keywords?: string
  hashtags?: string
  followers?: { from?: number; to?: number }
  pagination?: { page: number; perPage: number }
}
