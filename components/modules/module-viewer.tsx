'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { ChatWidget } from './chat-widget';

interface Module {
  id: string;
  title: string;
  content: string;
  estimatedDuration: number;
  order: number;
}

interface ModuleViewerProps {
  module: Module;
  modules: Module[];
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isCompleted?: boolean;
}

export function ModuleViewer({
  module,
  modules,
  onComplete,
  onNext,
  onPrevious,
  isCompleted = false,
}: ModuleViewerProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentIndex = modules.findIndex((m) => m.id === module.id);
  const hasNext = currentIndex < modules.length - 1;
  const hasPrev = currentIndex > 0;

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 100;

    if (isNearBottom) {
      setHasScrolledToEnd(true);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Main Content */}
      <div className="lg:col-span-3 flex flex-col">
        <div className="flex-1 overflow-auto pr-4" onScroll={handleScroll}>
          {/* Module Header */}
          <div className="sticky top-0 bg-gradient-to-b from-background to-transparent pb-4 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">
                  Module {module.order} of {modules.length}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground">{module.title}</h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Est. {module.estimatedDuration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>You spent {formatTime(timeSpent)}</span>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={16} />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Module Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
            <div
              className="space-y-4 text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: module.content }}
            />
          </div>

          {/* Completion Message */}
          {hasScrolledToEnd && !isCompleted && (
            <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
              <h3 className="font-semibold text-foreground mb-2">Module Content Review Complete</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You&apos;ve reviewed all the module content. You can now take the exam or review the material again.
              </p>
              <Button onClick={onComplete} className="w-full">
                Mark as Complete & Take Exam
              </Button>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!hasPrev}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {modules.length}
          </span>

          <Button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {/* Module Navigation */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Modules</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {modules.map((m, idx) => (
              <div
                key={m.id}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  m.id === module.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <p className="text-xs font-medium">Module {idx + 1}</p>
                <p className="text-xs truncate">{m.title}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Button */}
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          variant={isChatOpen ? 'default' : 'outline'}
          className="w-full flex items-center justify-center gap-2"
        >
          <MessageSquare size={18} />
          AI Assistant
        </Button>

        {/* Chat Widget */}
        {isChatOpen && (
          <Card className="p-4 h-96 flex flex-col">
            <ChatWidget moduleId={module.id} moduleTitle={module.title} />
          </Card>
        )}

        {/* Progress */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3 text-sm">Overall Progress</h3>
          <Progress value={(currentIndex + 1) / modules.length * 100} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            {currentIndex + 1} of {modules.length} modules
          </p>
        </Card>
      </div>
    </div>
  );
}
