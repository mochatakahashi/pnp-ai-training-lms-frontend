'use client';

import { ReactNode } from 'react';
import { useSidebar } from './sidebar-context';

export function DashboardContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-0'}`}>
      {children}
    </div>
  );
}
