'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  BookOpen,
  ClipboardList,
  Award,
  BarChart3,
} from 'lucide-react';
import { useSidebar } from './sidebar-context';

const officerItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/certificates', label: 'Certificates', icon: Award },
  { href: '/verification', label: 'Verification', icon: ClipboardList },
];

const adminItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/courses', label: 'Manage Courses', icon: BookOpen },
  { href: '/admin/students', label: 'Manage Students', icon: BarChart3 },
  { href: '/admin/exams', label: 'Monitor Exams', icon: ClipboardList },
  { href: '/admin/certificates', label: 'Monitor Certificates', icon: Award },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

interface SidebarProps {
  userRole?: string;
}

export function Sidebar({ userRole = 'student' }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const items = userRole === 'admin' ? adminItems : officerItems;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-card to-card/50 border-r border-border transition-transform duration-300 z-40 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-primary-foreground">📚</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">PNP LMS</h1>
              <p className="text-xs text-muted-foreground">Philippine National Police</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg'
                    : 'text-foreground hover:bg-secondary/50 hover:text-primary'
                )}
              >
                <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-primary-foreground" />}
              </Link>
            );
          })}
        </nav>


      </aside>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
