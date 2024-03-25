import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import VerifiedTtIcon from '@/components/verified-tt-icon'
import { Creator } from '@/lib/models'
import { countParser } from '@/lib/utils'
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, ExternalLink, User, XCircle } from 'lucide-react'
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
    header: "Nickname",
    cell: ({ row }) => row.original.nickName || 'N/A'
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || 'N/A'
  },
  {
    accessorKey: "instagram",
    header: "Instagram",
    cell: ({ row }) => row.original.instagram || 'N/A'
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone || 'N/A'
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => row.original.country?.value || 'N/A'
  },
  {
    accessorKey: "ttSeller",
    header: "Tiktok Seller",
    cell: ({ row }) => row.original.ttSeller === null
      ? 'N/A'
      : row.original.ttSeller
        ? <CheckCircle className='h-4 w-4' color='green' />
        : <XCircle className='h-4 w-4' color='red' />
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
          <Link to={bioLink.startsWith('http') ? bioLink : `https://${bioLink}`} target='_blank'>
            <ExternalLink className='h-4 w-4' />
          </Link>
        </Button>
      )
    }
  }
]
