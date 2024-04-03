import API from '@/lib/api'
import { Campaign } from '@/lib/models'
import { useQuery } from '@tanstack/react-query'

export const useGetCampaigns = () => {
  const client = new API({ applyAuth: true })
  const result = useQuery({
    queryKey: ['GET', 'CAMPAIGNS'],
    queryFn: () => client.get<Campaign[]>('/campaign')
  })

  return result
}
