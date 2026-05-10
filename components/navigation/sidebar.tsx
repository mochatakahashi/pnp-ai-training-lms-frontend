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
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const studentItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/exams', label: 'Exams', icon: ClipboardList },
  { href: '/certificates', label: 'Certificates', icon: Award },
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
  const [isOpen, setIsOpen] = useState(false);

  const items = userRole === 'admin' ? adminItems : studentItems;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-card to-card/50 border-r border-border transition-transform duration-300 z-40 flex flex-col',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">📚</span>
            </div>
            <h1 className="text-lg font-bold text-foreground">PNP LMS</h1>
          </div>
          <p className="text-xs text-muted-foreground">Philippine National Police</p>
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

        {/* Divider */}
        <div className="px-4">
          <div className="h-px bg-border/50" />
        </div>

        {/* Footer */}
        <div className="p-4 space-y-2 border-t border-border/50">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary/50 hover:text-primary transition-all duration-200 group"
          >
            <Settings size={20} className="group-hover:rotate-90 transition-transform" />
            <span className="font-medium">Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 text-left group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
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
