import { AnalysisLineChart } from '@/components/charts/analysis'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Analysis } from '@/lib/models'
import { numberParser } from '@/lib/utils'
import { ColumnDef } from "@tanstack/react-table"
import { LineChartIcon } from 'lucide-react'

export const columns: ColumnDef<Analysis>[] = [
  {
    accessorKey: 'creatorName',
    header: 'Creator',
    cell: ({ row }) => row.original.creatorName,
  },
  {
    accessorKey: 'viewCount',
    header: 'Views',
    cell: ({ row }) => numberParser(row.original.viewCount),
  },
  {
    accessorKey: 'likeCount',
    header: 'Likes',
    cell: ({ row }) => numberParser(row.original.likeCount),
  },
  {
    accessorKey: 'commentCount',
    header: 'Comments',
    cell: ({ row }) => numberParser(row.original.commentCount),
  },
  {
    accessorKey: 'shareCount',
    header: 'Shares',
    cell: ({ row }) => numberParser(row.original.shareCount),
  },
  {
    accessorKey: 'collectCount',
    header: 'Collects',
    cell: ({ row }) => numberParser(row.original.collectCount),
  },
  {
    accessorKey: 'engagementRate',
    header: 'Engagement',
    cell: ({ row }) => `${row.original.engagementRate.toFixed(2)}%`,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => `IDR ${numberParser(row.original.cost)}`,
  },
  {
    accessorKey: 'oldData',
    header: 'Action',
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' size='sm'>
            <LineChartIcon className='h-4 w-4 mr-2' />
            View Chart
          </Button>
        </DialogTrigger>
        <DialogContent className='w-full max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Analysis Chart</DialogTitle>
          </DialogHeader>
          <AnalysisLineChart data={row.original.oldData} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
]
