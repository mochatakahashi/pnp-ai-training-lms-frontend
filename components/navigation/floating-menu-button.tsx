'use client';

import { Menu, X } from 'lucide-react';
import { useSidebar } from './sidebar-context';

export function FloatingMenuButton() {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed top-4 left-4 z-35 p-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg"
      aria-label="Toggle sidebar"
    >
      {isOpen ? (
        <X
          size={24}
          className="transition-transform duration-300 rotate-0"
          style={{
            transform: isOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)',
            opacity: isOpen ? 1 : 0.7,
          }}
        />
      ) : (
        <Menu
          size={24}
          className="transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
            opacity: isOpen ? 0.7 : 1,
          }}
        />
      )}
    </button>
  );
}
