import { Spinner } from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import API from '@/lib/api'
import { AnalysisResult } from '@/lib/models'
import { numberParser } from '@/lib/utils'
import { useGetAnalysis } from '@/services/analysis/get-analysis.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ExternalLink, Eye, Heart, LampDesk, MessageCircle, Package, ScanSearch, Search, Send } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function AnalysisPage() {
  const queryClient = useQueryClient()
  const [videoUrl, setVideoUrl] = useState('')
  const { isLoading, data: response } = useGetAnalysis()

  const client = new API({ applyAuth: true })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['POST', 'ANALYSIS'],
    mutationFn: (url: string) => client.post<AnalysisResult>(
      '/analysis',
      { videoUrl: url }
    )
  })
  const onAnalyze = useCallback(
    async () => {
      const result = await mutateAsync(videoUrl)
      if (result.error) {
        toast.error(result.error.message)
        return
      }
      queryClient.invalidateQueries({ fetchStatus: 'idle' })
      setVideoUrl('')
    },
    [mutateAsync, queryClient, videoUrl]
  )

  if (response?.error) return 'Something error, please refresh the page.'

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LampDesk /> Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col'>
          <div>
            <Label>Your TikTok video url:</Label>
            <Input
              placeholder='example: https://www.tiktok.com/@username/video/123456789'
              onChange={e => setVideoUrl(e.target.value)}
              value={videoUrl}
            />
          </div>
          <Button
            disabled={!videoUrl || isPending}
            className='self-end mt-4'
            variant='shadow'
            onClick={onAnalyze}
          >
            {isPending
              ? <Spinner className='h-4 w-4 mr-2' />
              : <Search className='h-4 w-4 mr-2' />}
            Analyze video
          </Button>
        </CardContent>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-base'>
            <ScanSearch className='h-5 w-5' /> Your Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {isLoading ? 'Fetching your analysis...' : (
            response?.data.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <CardDescription className='flex flex-col gap-2 items-start'>
                    Generated at{' '}
                    {Intl.DateTimeFormat('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(item.createdAt))}
                    <span className='flex items-center gap-1'>
                      {item.videoUrl}
                      <Button variant='ghost' size='icon' asChild>
                        <Link to={item.videoUrl} target='_blank'>
                          <ExternalLink className='h-4 w-4' />
                        </Link>
                      </Button>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex items-center flex-wrap gap-3'>
                  <Badge
                    variant='outline'
                    className='flex flex-col items-center justify-center gap-1 rounded-lg w-full md:w-fit md:min-w-32 py-2 hover:scale-105'
                  >
                    <Eye className='text-blue-500' />
                    <p>{numberParser(item.viewCount)}</p>
                    <p className='font-normal'>Views</p>
                  </Badge>
                  <Badge
                    variant='outline'
                    className='flex flex-col items-center justify-center gap-1 rounded-lg w-full md:w-fit md:min-w-32 py-2 hover:scale-105'
                  >
                    <Heart className='text-red-500' />
                    <p>{numberParser(item.likeCount)}</p>
                    <p className='font-normal'>Likes</p>
                  </Badge>
                  <Badge
                    variant='outline'
                    className='flex flex-col items-center justify-center gap-1 rounded-lg w-full md:w-fit md:min-w-32 py-2 hover:scale-105'
                  >
                    <MessageCircle className='text-secondary' />
                    <p>{numberParser(item.commentCount)}</p>
                    <p className='font-normal'>Comments</p>
                  </Badge>
                  <Badge
                    variant='outline'
                    className='flex flex-col items-center justify-center gap-1 rounded-lg w-full md:w-fit md:min-w-32 py-2 hover:scale-105'
                  >
                    <Send className='text-green-500' />
                    <p>{numberParser(item.shareCount)}</p>
                    <p className='font-normal'>Shares</p>
                  </Badge>
                  <Badge
                    variant='outline'
                    className='flex flex-col items-center justify-center gap-1 rounded-lg w-full md:w-fit md:min-w-32 py-2 hover:scale-105'
                  >
                    <Package className='text-stone-500' />
                    <p>{numberParser(item.collectCount)}</p>
                    <p className='font-normal'>Collects</p>
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </>
  )
}
