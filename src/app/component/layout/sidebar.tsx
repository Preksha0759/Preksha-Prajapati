'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, PlusSquare, FileText, BrainCircuit, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/events', label: 'Events', icon: Calendar },
  { href: '/dashboard/events/create', label: 'Create Event', icon: PlusSquare },
  { href: '/dashboard/applications', label: 'My Applications', icon: FileText },
  { href: '/dashboard/project-ideas', label: 'Project Ideas', icon: BrainCircuit },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 md:flex">
      <div className="mb-8 flex items-center gap-2 group">
        <Rocket className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
        <h1 className="font-headline text-2xl font-bold text-primary-foreground transition-colors group-hover:text-primary">Eventra</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary-foreground hover:bg-accent',
                isActive && 'bg-accent text-primary-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
