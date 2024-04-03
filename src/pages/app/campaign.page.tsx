import { DropdownFilter } from '@/components/filters/dropdown-filter';
import { Spinner } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import API from '@/lib/api';
import { baseUrl } from '@/lib/consts';
import { ApiResponse, CampaignBody, Objective, Timeline } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useGetCreatorFilter } from '@/services/creator/get-creator.service';
import { useMutation } from '@tanstack/react-query';
import { Bot, Command, NotebookText, Send, Star } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

type Steps = {
  'find-influencer': string
  'generate-campaign': string
  'parsing-influencer': string
  'loading': string
  'idle': string
  'done': string
}

const STEPS: Steps = {
  'find-influencer': 'Finding influencers...',
  'generate-campaign': 'Generating campaign...',
  'parsing-influencer': 'Parsing influencers...',
  'loading': 'Loading...',
  'idle': '...',
  'done': 'done'
}

export default function CampaignPage() {
  const [body, setBody] = useState<CampaignBody>({})
  const [campaignStep, setCampaignStep] = useState<keyof Steps>('idle')
  const [resultText, setResultText] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const isLoading = useMemo(() => campaignStep !== 'idle' && campaignStep !== 'done', [campaignStep])

  const { data: filterResponse, isLoading: filterLoading } = useGetCreatorFilter()
  const industries = filterResponse?.data?.industry || []
  const categories = filterResponse?.data?.category || []
  const countries = filterResponse?.data?.country || []

  const client = new API({ applyAuth: true })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['POST', 'FEEDBACK'],
    mutationFn: (
      data: { rating: string; message: string }
    ) => client.post<unknown>('/feedback', data)
  })
  const onSendFeedback = useCallback(
    async () => {
      const result = await mutateAsync({ rating: `${rating}`, message: feedback })
      if (result.error) {
        toast.error(result.error.message)
        return
      }

      toast.success('Your feedback have been sent!')
      setShowFeedback(false)
    },
    [feedback, mutateAsync, rating]
  )

  const abortController = new AbortController()

  const onGenerate = useCallback(
    async () => {
      setCampaignStep('loading')
      const token = localStorage.getItem('token')
      const response = await fetch(`${baseUrl}/campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
        signal: abortController.signal
      })
      if (!response.ok) {
        const result = await response.json() as ApiResponse<null>
        setCampaignStep('done')
        toast.error(result.error?.message)
        return
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;

      while (loopRunner) {
        const { value, done } = await reader!.read();
        if (done) {
          setCampaignStep('done')
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        if (decodedChunk.includes('step: ')) {
          const step = decodedChunk.replace('step: ', '').trim()
          setCampaignStep(step as keyof Steps)
        }
        else if (decodedChunk.includes('context: ')) { null }
        else if (decodedChunk.includes('feed-back: ')) {
          if (decodedChunk.replace('feed-back: ', '').trim() === 'not-found')
            setShowFeedback(true)
        }
        else
          setResultText(prev => prev + decodedChunk.replace('\n', '<br />'))
      }
    },
    [abortController.signal, body]
  )

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-2'>
            <span className='flex items-center gap-2'>
              <Command /> Campaign
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <div className='flex flex-wrap gap-3'>
            <div>
              <Label>Industry <span className='text-xs'>(optional)</span> :</Label>
              <DropdownFilter
                label='Industry'
                hideLabel
                data={industries}
                isLoading={filterLoading}
                onSelect={value => setBody(prev => ({ ...prev, industry: value?.id }))}
              />
            </div>
            <DropdownFilter
              label='Category'
              data={categories}
              isLoading={filterLoading}
              onSelect={value => setBody(prev => ({ ...prev, category: value?.id }))}
            />
            <DropdownFilter
              label='Country'
              data={countries}
              isLoading={filterLoading}
              onSelect={value => setBody(prev => ({ ...prev, country: value?.id }))}
            />
            <DropdownFilter
              label='Objective'
              data={Object.keys(Objective).map(key => ({ id: key, value: (Objective as any)[key] }))}
              isLoading={filterLoading}
              onSelect={value => setBody(prev => ({ ...prev, objective: value?.id as any }))}
            />
            <DropdownFilter
              label='Timeline'
              data={Object.keys(Timeline).map(key => ({ id: key, value: (Timeline as any)[key] }))}
              isLoading={filterLoading}
              onSelect={value => setBody(prev => ({ ...prev, timeline: value?.id as any }))}
            />
          </div>
          <div className='flex flex-wrap gap-3'>
            <div className='w-full'>
              <Label>Product:</Label>
              <Textarea
                placeholder='Input your product detail (ex: Healthy milk for baby)'
                onChange={e => setBody(prev => ({ ...prev, product: e.target.value }))}
              />
            </div>
            <div className='w-full'>
              <Label>Target Audience:</Label>
              <Input
                placeholder='Input target audience (ex: mommy)'
                onChange={e => setBody(prev => ({ ...prev, targetAudience: e.target.value }))}
              />
            </div>
          </div>
          <Button
            disabled={isLoading}
            className='self-end mt-4'
            variant='shadow'
            onClick={onGenerate}
          >
            {isLoading ? (
              <Spinner className='h-4 w-4 mr-2' />
            ) : (
              <Bot className='h-4 w-4 mr-2' />
            )}
            Generate campaign with AI
          </Button>
        </CardContent>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-2'>
            <span className='flex items-center gap-2 text-base'>
              <NotebookText className='h-5 w-5' /> Result
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <p
            className='text-sm'
            dangerouslySetInnerHTML={{
              __html: resultText === '' ? STEPS[campaignStep] : resultText
            }}
          />
        </CardContent>
      </Card>
      <Dialog
        open={showFeedback && !isLoading}
        onOpenChange={setShowFeedback}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription>
              Please rate the results and give us your feedback. Thank you!
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-2'>
            <Label>Rating:</Label>
            <div className='flex items-center gap-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  onMouseEnter={() => setHoveredRating(i + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(i + 1)}
                  className={cn(
                    'hover:fill-yellow-300 hover:text-yellow-300 cursor-pointer',
                    (i < hoveredRating) && 'fill-yellow-300 text-yellow-300',
                    (i < rating) && 'fill-yellow-300 text-yellow-300'
                  )}
                />
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <Label>Feedback description:</Label>
            <Textarea placeholder='Input your feedback' onChange={e => setFeedback(e.target.value)} />
          </div>
          <Button variant='shadow' onClick={onSendFeedback}>
            {isPending ? (
              <Spinner className='h-4 w-4 mr-2' />
            ) : (
              <Send className='h-4 w-4 mr-2' />
            )}
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
