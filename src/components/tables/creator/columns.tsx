import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import VerifiedTtIcon from '@/components/verified-tt-icon'
import { Creator } from '@/lib/models'
import { countParser } from '@/lib/utils'
import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export const columns: ColumnDef<Creator>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => (
      <Avatar className='w-9 h-9'>
        <AvatarImage src={row.original.avatar || undefined} alt='Avatar' />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    )
  },
  {
    accessorKey: "uniqueId",
    header: "Username",
    cell: ({ row: { original } }) => (
      <Button size='sm' variant='link' className='text-black' asChild>
        <Link to={`https://tiktok.com/@${original.uniqueId}`} target='_blank'>
          <span className='mr-2'>{`@${original.uniqueId}`}</span>
          {original.verified && <VerifiedTtIcon />}
        </Link>
      </Button>
    )
  },
  {
    accessorKey: "nickName",
    header: "Name",
    cell: ({ row }) => row.original.nickName || 'N/A'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || 'N/A'
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => row.original.country?.value || 'N/A'
  },
  {
    accessorKey: 'bioLink',
    header: 'Link',
    cell: ({ row }) => {
      const bioLink = row.original.bioLink

      if (!bioLink) return 'N/A'

      return (
        <Button size='icon' variant='outline' asChild>
          <Link to={bioLink.startsWith('http') ? bioLink : `https://${bioLink}`} target='_blank'>
            <ExternalLink className='h-4 w-4' />
          </Link>
        </Button>
      )
    }
  },
  {
    accessorKey: 'followerCount',
    header: "Followers",
    cell: ({ row }) => countParser(Number(row.original.followerCount)),
  },
  {
    accessorKey: 'videoCount',
    header: "Total Videos",
    cell: ({ row }) => row.original.videoCount || 'N/A'
  },
  {
    accessorKey: 'engagementRate',
    header: 'Engagement Rate',
    cell: ({ row }) => `${row.original.engagementRate}%` || 'N/A'
  },
  {
    accessorKey: 'potentialCategories',
    header: 'Potential Categories',
    cell: ({ row }) => row.original.potentialCategories === null
      ? 'N/A'
      : row.original.potentialCategories.slice(0, 3).map(x => (
        <Badge key={x} className='m-1' variant='secondary'>{x}</Badge>
      ))
  },
  {
    accessorKey: 'textExtras',
    header: 'Hashtag',
    cell: ({ row }) => row.original.textExtras === null
      ? 'N/A'
      : row.original.textExtras.slice(0, 3).filter(x => !!x).map(x => (
        <Badge key={x} className='m-1' variant='secondary'>#{x}</Badge>
      ))
  }
]
