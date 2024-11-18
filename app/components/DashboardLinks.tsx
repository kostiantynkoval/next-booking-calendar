'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, Settings, Users2, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Link {
  id: number;
  name: string;
  href: string;
  icon: LucideIcon;
}

export const dasboardLinks: Link[] = [
  {
    id: 0,
    name: 'Event Types',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    id: 1,
    name: 'Meetings',
    href: '/dashboard/meetings',
    icon: Users2
  },
  {
    id: 2,
    name: 'Availability',
    href: '/dashboard/availability',
    icon: HomeIcon
  },
  {
    id: 3,
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
];
export const DashboardLinks = () => {
  const pathname = usePathname();
  return dasboardLinks.map((link) => (
    <Link
      key={link.id}
      href={link.href}
      className={cn(
        pathname === link.href
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground',
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
      )}
    >
      <link.icon className="mr-2" />
      {link.name}
    </Link>
  ));
};
