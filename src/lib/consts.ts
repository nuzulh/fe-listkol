import { MenuItem, SidebarMenuItem } from "@/typings";
import { Coins, Command, History, LayoutDashboard, UserSearch } from 'lucide-react';
import { FilterData } from './models';

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
    title: 'Billing',
    link: '/app/billing',
    icon: Coins
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
  },
  {
    title: 'Campaign History',
    link: '/app/campaign-history',
    icon: History
  }
]

export const pageRows: FilterData[] = [
  {
    id: "5",
    value: "5",
  },
  {
    id: "10",
    value: "10",
  },
  {
    id: "20",
    value: "20",
  },
  {
    id: "25",
    value: "25",
  },
]
