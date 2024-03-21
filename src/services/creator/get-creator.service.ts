import API from '@/lib/api'
import { FilterParams } from '@/lib/models/api'
import { Creator, CreatorFilter } from '@/lib/models/creator'
import { useQuery } from '@tanstack/react-query'

export const getCreatorsKeys = ['GET', 'CREATOR']
export const useGetCreators = (params: FilterParams) => {
  const queryParams = new URLSearchParams()

  Object.keys(params).forEach(key => {
    queryParams.append(
      key,
      (key === 'pagination' || key === 'followers')
        ? JSON.stringify(params[key])
        : params[key as keyof FilterParams] as string
    )
  })

  const client = new API({ applyAuth: true })
  const result = useQuery({
    queryKey: getCreatorsKeys,
    queryFn: () => client.get<Creator[]>(`/creator?${queryParams.toString()}`)
  })

  return result
}

export const getCreatorFilterKeys = ['GET', 'CREATOR', 'FILTER']
export const useGetCreatorFilter = () => {
  const client = new API({ applyAuth: true })
  const result = useQuery({
    queryKey: getCreatorFilterKeys,
    queryFn: () => client.get<CreatorFilter>('/creator/filter')
  })

  return result
}
