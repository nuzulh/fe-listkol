import { Spinner } from '@/components/loading'
import { columns } from '@/components/tables/analysis/columns'
import { DataTable } from '@/components/tables/data-table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import API from '@/lib/api'
import { AnalysisResult } from '@/lib/models'
import { useGetAnalysis } from '@/services/analysis/get-analysis.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LampDesk, ScanSearch, Search } from 'lucide-react'
import { useCallback, useState } from 'react'
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
                  <CardTitle className='text-base'>{item.campaignName}</CardTitle>
                  <CardDescription className='flex flex-col gap-2 items-start'>
                    Generated at{' '}
                    {Intl.DateTimeFormat('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(item.createdAt))}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex items-center flex-wrap gap-3'>
                  <Accordion type="single" collapsible className='w-full'>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Result</AccordionTrigger>
                      <AccordionContent className='flex flex-col-reverse md:flex-row items-end md:items-start gap-3'>
                        <div className='grow w-full'>
                          <DataTable
                            columns={columns}
                            data={item.details}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </>
  )
}
