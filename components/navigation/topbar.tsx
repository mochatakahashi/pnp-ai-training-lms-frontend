'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, SearchIcon, X, Building2, LogOut, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from './sidebar-context';

interface TopbarProps {
  userName?: string;
}

export function Topbar({ userName }: TopbarProps) {
  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userInfo, setUserInfo] = useState<{ email: string; region: string; station: string }>({
    email: 'officer@pnp.gov.ph',
    region: 'National Capital Region (NCR)',
    station: 'Manila Police District - Station 1 (Ermita)',
  });

  const [notifications] = useState([
    { id: 1, message: 'New course available: Advanced Crisis Management', time: '2 hours ago' },
    { id: 2, message: 'You have completed Police Ethics and Conduct', time: '5 hours ago' },
    { id: 3, message: 'Certificate verification updated', time: '1 day ago' },
  ]);

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail');
    const region = sessionStorage.getItem('userRegion');
    const station = sessionStorage.getItem('userStation');

    setUserInfo({
      email: email || 'officer@pnp.gov.ph',
      region: region || 'National Capital Region (NCR)',
      station: station || 'Manila Police District - Station 1 (Ermita)',
    });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRegion');
    sessionStorage.removeItem('userStation');
    router.push('/login');
  };

  return (
    <header className={`fixed top-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-40 transition-all duration-300 ${isOpen ? 'md:left-64' : 'md:left-0'}`}>
      {/* Left Actions: Hamburger Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-200 border border-border flex items-center justify-center"
          title={isOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
          aria-label="Toggle sidebar menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm pl-2">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search courses, exams..."
              className="pl-10 pr-4 bg-muted border-muted-foreground/20 w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Right Actions: Officer Badge & Station Info */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
        {/* Officer Unit Info Badge */}
        <div className="hidden sm:flex flex-col items-end text-right">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs text-foreground truncate max-w-[180px]">{userInfo.email}</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20">
              Verified 2FA
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground truncate max-w-[240px] flex items-center gap-1">
            <Building2 className="w-3 h-3 text-primary inline" />
            {userInfo.station}
          </p>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors relative"
            title="Notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <Card className="absolute right-0 top-12 w-80 p-4 shadow-xl z-50 border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <p className="text-xs text-foreground">{notif.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center gap-1.5 text-xs h-9 px-2.5"
          title="Sign out of PNP LMS"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline font-medium">Log out</span>
        </Button>
      </div>
    </header>
  );
}
