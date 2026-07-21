'use client';

import { useState } from 'react';
import { Bell, SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSidebar } from './sidebar-context';

interface TopbarProps {
  userName?: string;
}

export function Topbar({ userName }: TopbarProps) {
  const { isOpen } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New course available: Advanced Crisis Management', time: '2 hours ago' },
    { id: 2, message: 'You have completed Police Ethics and Conduct', time: '5 hours ago' },
    { id: 3, message: 'Certificate verification updated', time: '1 day ago' },
  ]);

  return (
    <header className={`fixed top-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-6 pl-20 z-40 transition-all duration-300 ${isOpen ? 'md:left-64' : 'md:left-0'}`}>
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md pr-6">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search courses, exams..."
            className="pl-10 pr-4 bg-muted border-muted-foreground/20 w-full"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-foreground hover:text-primary transition-colors"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <Card className="absolute right-0 top-12 w-80 p-4 shadow-xl z-50 border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <p className="text-sm text-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No notifications</p>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </header>
  );
}
