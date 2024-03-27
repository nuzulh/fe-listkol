import { MenuItem, SidebarMenuItem } from "@/typings";
import { Command, LayoutDashboard, UserSearch } from 'lucide-react';

export const baseUrl = "https://be-listkol.up.railway.app/api";

export const menus: MenuItem[] = [
  {
    title: "Home",
    link: "/#home",
  },
  {
    title: "Benefit",
    link: "/#benefit",
  },
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Pricing",
    link: "/#pricing",
  },
  {
    title: "FAQ",
    link: "/#faq",
  },
];

export const sidebarMenus: SidebarMenuItem[] = [
  {
    title: 'Dashboard',
    link: '/app',
    icon: LayoutDashboard
  },
  {
    title: 'Creator',
    link: '/app/creator',
    icon: UserSearch
  },
  {
    title: 'Campaign',
    link: '/app/campaign',
    icon: Command
  }
]
