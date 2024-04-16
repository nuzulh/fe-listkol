import API from '@/lib/api'
import { AnalysisResult } from '@/lib/models'
import { useQuery } from '@tanstack/react-query'

export const useGetAnalysis = () => {
  const client = new API({ applyAuth: true })
  const result = useQuery({
    queryKey: ['GET', 'ANALYSIS'],
    queryFn: () => client.get<AnalysisResult[]>('/analysis')
  })

  return result
}
