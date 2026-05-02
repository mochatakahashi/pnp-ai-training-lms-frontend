'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamTimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export function ExamTimer({
  durationMinutes,
  onTimeUp,
  isPaused = false,
}: ExamTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes * 60
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, onTimeUp]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const isWarning = remainingSeconds < 300; // Less than 5 minutes
  const isCritical = remainingSeconds < 60; // Less than 1 minute

  return (
    <Card
      className={cn(
        'p-4 flex items-center gap-3 sticky top-20',
        isCritical && 'bg-destructive/10 border-destructive',
        isWarning && !isCritical && 'bg-amber-100/10 border-amber-600'
      )}
    >
      <Clock
        className={cn(
          'flex-shrink-0',
          isCritical && 'text-destructive animate-pulse',
          isWarning && !isCritical && 'text-amber-600'
        )}
        size={24}
      />
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">Time Remaining</p>
        <p
          className={cn(
            'text-2xl font-bold',
            isCritical && 'text-destructive',
            isWarning && !isCritical && 'text-amber-600',
            !isWarning && 'text-foreground'
          )}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
      {isWarning && (
        <AlertCircle
          className={cn(
            isCritical && 'text-destructive',
            isWarning && !isCritical && 'text-amber-600'
          )}
          size={20}
        />
      )}
    </Card>
  );
}
