import { UserToken } from '@/lib/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { ChevronRight, LogOut, Menu, User, X } from 'lucide-react'
import { sidebarMenus } from '@/lib/consts'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Sidebar({
  userToken
}: {
  userToken: UserToken | null
}) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isMenuActive = (link: string) => pathname === link
  const onLogOut = () => {
    localStorage.removeItem('token')
    navigate('/auth', { replace: true })
  }

  return (
    <>
      <Button
        size='icon'
        variant='outline'
        className='md:hidden absolute mt-4 ml-4'
        onClick={() => setIsOpen(true)}
      >
        <Menu className='h-4 w-4' />
      </Button>
      <aside
        className={cn(
          'fixed z-40 w-full max-w-[17rem] min-h-dvh h-full py-4 transition-all duration-300 md:left-0',
          isOpen ? 'left-0' : '-left-[100%]'
        )}
      >
        <Card className='rounded-r-2xl rounded-l-none shadow-lg h-full overflow-y-auto flex flex-col'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>ListKOL</CardTitle>
              <Button
                size='icon'
                variant='ghost'
                className='md:hidden'
                onClick={() => setIsOpen(false)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
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
          <CardContent className='grow'>
            {sidebarMenus.map(menu => (
              <Button
                key={menu.link}
                variant='ghost'
                className={cn(
                  'w-full justify-start text-muted-foreground',
                  isMenuActive(menu.link) && 'text-black'
                )}
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link to={menu.link}>
                  <menu.icon className='h-4 w-4 mr-2' /> {menu.title}
                </Link>
              </Button>
            ))}
            <Button variant='ghost' className='w-full justify-start text-destructive mt-4' onClick={onLogOut}>
              <LogOut className='h-4 w-4 mr-2' /> Log Out
            </Button>
          </CardContent>
          <footer className='text-xs text-muted-foreground m-6'>
            ListKOL &copy; Copyright {new Date().getFullYear()}
          </footer>
        </Card>
      </aside>
    </>
  )
}
