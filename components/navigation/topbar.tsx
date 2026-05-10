'use client';

import { Bell, User, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TopbarProps {
  userName?: string;
}

export function Topbar({ userName = 'Officer' }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30 md:left-64">
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search courses, exams..."
            className="pl-10 bg-muted border-muted-foreground/20"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative text-foreground hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">Officer</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
            <User size={20} className="text-primary" />
          </Button>
        </div>
      </div>
    </header>
  );
}
