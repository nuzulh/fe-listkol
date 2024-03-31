import { DropdownFilter } from '@/components/filters/dropdown-filter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { baseUrl } from '@/lib/consts';
import { ApiResponse, CampaignBody, Objective, Timeline } from '@/lib/models';
import { useGetCreatorFilter } from '@/services/creator/get-creator.service';
import { Bot, Command, NotebookText } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type Steps = {
  'find-influencer': string,
  'generate-campaign': string,
  'parsing-influencer': string,
  'loading': string,
  idle: string
}

const STEPS: Steps = {
  'find-influencer': 'Finding influencers...',
  'generate-campaign': 'Generating campaign...',
  'parsing-influencer': 'Parsing influencers...',
  'loading': 'Loading...',
  'idle': '...'
}

export default function CampaignPage() {
  const [body, setBody] = useState<CampaignBody>({})
  const [campaignStep, setCampaignStep] = useState<keyof Steps>('idle')
  const [resultText, setResultText] = useState('')
  const { data: filterResponse, isLoading: filterLoading } = useGetCreatorFilter()

  const industries = filterResponse?.data?.industry || []
  const categories = filterResponse?.data?.category || []
  const countries = filterResponse?.data?.country || []

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
        toast.error(result.error?.message)
        return
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;

      while (loopRunner) {
        const { value, done } = await reader!.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        if (decodedChunk.includes('step: ')) {
          const step = decodedChunk.replace('step: ', '').trim()
          setCampaignStep(step as keyof Steps)
        } else if (!decodedChunk.includes('context: ')) setResultText(prev => prev + decodedChunk.replace('\n', '<br />'))
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
          <Button className='self-end mt-4' variant='shadow' onClick={onGenerate}>
            <Bot className='h-4 w-4 mr-2' />
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
    </>
  )
}
