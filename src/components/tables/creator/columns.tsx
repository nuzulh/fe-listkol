import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Creator } from '@/lib/models'
import { countParser } from '@/lib/utils'
import { ColumnDef } from "@tanstack/react-table"
import { BadgeCheck, CheckCircle, ExternalLink, Eye, EyeOff, User, XCircle } from 'lucide-react'
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
          {original.verified && <BadgeCheck color='blue' className='h-4 w-4' />}
        </Link>
      </Button>
    )
  },
  {
    accessorKey: "nickName",
    header: "Nickname",
    cell: ({ row }) => row.original.nickName || 'N/A'
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => row.original.country?.value || 'N/A'
  },
  {
    accessorKey: 'followerCount',
    header: "Followers",
    cell: ({ row }) => countParser(Number(row.original.followerCount)),
  },
  {
    accessorKey: 'videoCount',
    header: "Videos",
    cell: ({ row }) => row.original.videoCount || 'N/A'
  },
  {
    accessorKey: 'likeCount',
    header: "Likes",
    cell: ({ row }) => countParser(Number(row.original.likeCount)),
  },
  {
    accessorKey: 'viewCount',
    header: "Views",
    cell: ({ row }) => row.original.videoCount || 'N/A'
  },
  {
    accessorKey: "private",
    header: "Is Private?",
    cell: ({ row }) => row.original.verified === null
      ? 'N/A'
      : row.original.private
        ? <CheckCircle color='green' />
        : <XCircle color='red' />
  },
  {
    accessorKey: "visibility",
    header: "Is Visible?",
    cell: ({ row }) => row.original.visibility === null
      ? 'N/A'
      : row.original.visibility
        ? <Eye color='green' />
        : <EyeOff color='red' />
  },
  {
    accessorKey: "description",
    header: "Bio",
    cell: ({ row }) => row.original.description || 'N/A'
  },
  {
    accessorKey: 'bioLink',
    header: 'Bio Link',
    cell: ({ row }) => {
      const bioLink = row.original.bioLink

      if (!bioLink) return 'N/A'

      return (
        <Button size='icon' variant='outline' asChild>
          <Link to={bioLink} target='_blank'>
            <ExternalLink className='h-4 w-4' />
          </Link>
        </Button>
      )
    }
  }
]
