import { UserToken } from '@/lib/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { ChevronRight, LogOut, User } from 'lucide-react'
import { sidebarMenus } from '@/lib/consts'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar({
  userToken
}: {
  userToken: UserToken | null
}) {
  const navigate = useNavigate()
  const onLogOut = () => {
    localStorage.removeItem('token')
    navigate('/auth', { replace: true })
  }

  return (
    <aside className='fixed w-full max-w-[17rem] h-2/3'>
      <Card className='rounded-r-2xl rounded-l-none shadow-lg'>
        <CardHeader>
          <CardTitle>ListKOL</CardTitle>
          <CardDescription className='flex flex-col items-center py-4'>
            <Avatar className='mb-2 h-16 w-16'>
              <AvatarImage src='' />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <Button variant='ghost' className='text-lg text-black font-semibold'>
              {userToken?.name} <ChevronRight className='h-4 w-4 ml-2' />
            </Button>
            <span>{userToken?.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sidebarMenus.map(menu => (
            <Button key={menu.link} variant='ghost' className='w-full justify-start' asChild>
              <Link to={menu.link}>
                <menu.icon className='h-4 w-4 mr-2' /> {menu.title}
              </Link>
            </Button>
          ))}
          <Button variant='ghost' className='w-full justify-start text-destructive mt-4' onClick={onLogOut}>
            <LogOut className='h-4 w-4 mr-2' /> Log Out
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}
