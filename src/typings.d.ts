import { LucideIcon } from 'lucide-react';

export declare type MenuItem = {
  title: string;
  link: string;
};

export declare type SidebarMenuItem = MenuItem & {
  icon: LucideIcon
}
