'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, X, Building2, LogOut, Menu } from 'lucide-react';
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
          className={`w-9 h-9 rounded-full transition-all duration-200 shadow-2xs hover:scale-105 flex items-center justify-center shrink-0 border ${
            isOpen
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:bg-rose-500 hover:text-white hover:border-rose-500'
              : 'bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-500 hover:text-white hover:border-sky-500'
          }`}
          title={isOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
          aria-label="Toggle sidebar menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>


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
