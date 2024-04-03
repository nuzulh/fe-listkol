import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Objective, Timeline } from '@/lib/models'
import { useGetCampaigns } from '@/services/campaign/get-campaign.service'
import { History } from 'lucide-react'

export default function CampaignHistoryPage() {
  const { isLoading, data: response } = useGetCampaigns()

  if (response?.error) return 'Something error, please refresh the page.'

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <History /> Campaign History
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {isLoading ? 'Fetching campaign history...' : (
          response?.data.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardDescription>
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
              <CardContent>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Industry:</span>
                  <span>{item.industry || 'N/A'}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Category:</span>
                  <span>{item.category}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Country:</span>
                  <span>{item.country}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Objective:</span>
                  <span>{(Objective as any)[item.objective]}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Timeline:</span>
                  <span>{(Timeline as any)[item.timeline]}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Product:</span>
                  <span>{item.product}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>Target Audience:</span>
                  <span>{item.targetAudience}</span>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Result</AccordionTrigger>
                    <AccordionContent>
                      <p
                        className='text-sm mt-4'
                        dangerouslySetInnerHTML={{
                          __html: item.result.split('\n').join('<br />')
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )
        }
      </CardContent >
    </Card >
  )
}
