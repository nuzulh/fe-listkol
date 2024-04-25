import { MenuItem, SidebarMenuItem } from "@/typings";
import { Coins, Command, History, LampDesk, UserSearch } from 'lucide-react';
import { FilterData } from './models';

export const baseUrl = "http://152.42.163.203/api";

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
    title: 'Creator',
    link: '/app/creator',
    icon: UserSearch
  },
  {
    title: 'Campaign Ideas',
    link: '/app/campaign',
    icon: Command
  },
  {
    title: 'Ideas History',
    link: '/app/campaign-history',
    icon: History
  },
  {
    title: 'Analysis',
    link: '/app/analysis',
    icon: LampDesk
  },
  {
    title: 'Billing',
    link: '/app/billing',
    icon: Coins
  },
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
