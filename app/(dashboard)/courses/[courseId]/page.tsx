'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, Lock, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const courseData = {
  id: '1',
  title: 'Police Ethics and Conduct',
  description: 'Learn the fundamental principles of professional ethics and conduct in policing.',
  progress: 65,
  modules: [
    {
      id: 'mod1',
      title: 'Introduction to Ethics',
      order: 1,
      estimatedDuration: 20,
      content: `
        <h2>Introduction to Ethics</h2>
        <p>Ethics is the foundation of professional policing. Understanding and practicing ethical conduct is essential for maintaining public trust and upholding the law.</p>
        <h3>Key Topics:</h3>
        <ul>
          <li><strong>Definition of Ethics:</strong> The principles concerning the distinction between right and wrong behavior.</li>
          <li><strong>Professional Ethics:</strong> Standards of conduct specific to law enforcement professionals.</li>
          <li><strong>Code of Conduct:</strong> The PNP Code of Professional Conduct and its requirements.</li>
        </ul>
      `,
      completed: true,
    },
    {
      id: 'mod2',
      title: 'Decision Making and Ethical Dilemmas',
      order: 2,
      estimatedDuration: 25,
      content: `
        <h2>Decision Making and Ethical Dilemmas</h2>
        <p>Officers frequently face complex situations that require ethical decision-making.</p>
        <h3>The Ethical Decision-Making Framework</h3>
        <p>When facing an ethical dilemma, follow these steps:</p>
        <ol>
          <li><strong>Identify the Issue:</strong> Clearly define what makes this situation ethically challenging.</li>
          <li><strong>Gather Information:</strong> Collect all relevant facts and context.</li>
          <li><strong>Consider Options:</strong> Identify possible courses of action.</li>
          <li><strong>Evaluate Consequences:</strong> Consider the impact on all stakeholders.</li>
          <li><strong>Consult Standards:</strong> Review the PNP Code of Conduct and applicable laws.</li>
          <li><strong>Make a Decision:</strong> Choose the action that aligns with your values and professional standards.</li>
        </ol>
      `,
      completed: true,
    },
    {
      id: 'mod3',
      title: 'Accountability and Transparency',
      order: 3,
      estimatedDuration: 30,
      content: `
        <h2>Accountability and Transparency</h2>
        <p>Accountability and transparency are core to maintaining public trust in law enforcement.</p>
      `,
      completed: false,
    },
    {
      id: 'mod4',
      title: 'Case Studies in Police Ethics',
      order: 4,
      estimatedDuration: 35,
      content: `
        <h2>Case Studies in Police Ethics</h2>
        <p>Real-world scenarios help us understand how to apply ethical principles in practice.</p>
      `,
      completed: false,
    },
    {
      id: 'mod5',
      title: 'Professional Development and Continued Learning',
      order: 5,
      estimatedDuration: 20,
      content: `
        <h2>Professional Development and Continued Learning</h2>
        <p>Ethical conduct is an ongoing commitment that requires continuous learning and improvement.</p>
      `,
      completed: false,
    },
  ],
};

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState(courseData.modules[0]);

  const completedCount = courseData.modules.filter((m) => m.completed).length;
  const canAccessModule = (module: typeof courseData.modules[0]) => {
    return module.order === 1 || courseData.modules[module.order - 2]?.completed;
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent/50 text-white px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{courseData.title}</h1>
            <p className="text-primary-foreground/90 text-sm">Progress: {completedCount} of {courseData.modules.length} modules completed</p>
          </div>
        </div>
        <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
          ← Return to Courses
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-gradient-to-b from-primary/10 to-background border-r border-border overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Module Title Card */}
            <div className="bg-gradient-to-br from-primary to-accent text-white p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-2">{selectedModule.title}</h2>
              <div className="space-y-2">
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full transition-all"
                    style={{ width: `${(completedCount / courseData.modules.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm font-semibold">
                  {completedCount * Math.floor(100 / courseData.modules.length)}% COMPLETE
                </p>
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-2">
              {courseData.modules.map((module) => {
                const isAccessible = canAccessModule(module);
                const isCurrent = selectedModule.id === module.id;

                return (
                  <button
                    key={module.id}
                    onClick={() => isAccessible && setSelectedModule(module)}
                    disabled={!isAccessible}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-primary text-white shadow-lg'
                        : isAccessible
                        ? 'bg-card hover:bg-card/80 text-foreground'
                        : 'bg-muted/30 text-muted-foreground cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {module.completed ? (
                          <CheckCircle2 size={20} className="text-green-500" />
                        ) : isAccessible ? (
                          <div className="w-5 h-5 rounded-full border-2 border-current opacity-50" />
                        ) : (
                          <Lock size={20} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">{module.title}</p>
                        <p className="text-xs opacity-70 mt-1">{module.estimatedDuration} min</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-background overflow-y-auto">
          {/* Content Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 border-b border-slate-700">
            <p className="text-sm text-white/70 mb-2">Lesson {selectedModule.order} of {courseData.modules.length}</p>
            <h1 className="text-4xl font-bold mb-4">{selectedModule.title}</h1>
            <div className="w-24 h-1 bg-accent rounded" />
          </div>

          {/* Module Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl prose prose-invert">
              <div
                className="text-foreground space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedModule.content }}
              />
            </div>
          </div>

          {/* Module Actions */}
          <div className="border-t border-border bg-card p-6 flex gap-4">
            <Button
              variant="outline"
              disabled={selectedModule.order === 1}
              onClick={() => {
                const prevModule = courseData.modules[selectedModule.order - 2];
                if (prevModule) setSelectedModule(prevModule);
              }}
            >
              ← Previous
            </Button>

            <div className="flex-1" />

            {selectedModule.completed ? (
              <Badge className="bg-green-500/20 text-green-700 border-green-500/30 px-4 py-2 text-sm">
                ✓ Completed
              </Badge>
            ) : (
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => setSelectedModule({ ...selectedModule, completed: true })}
              >
                <Play size={16} className="mr-2" />
                Mark as Complete
              </Button>
            )}

            <Button
              variant="outline"
              disabled={selectedModule.order === courseData.modules.length || !selectedModule.completed}
              onClick={() => {
                const nextModule = courseData.modules[selectedModule.order];
                if (nextModule) setSelectedModule(nextModule);
              }}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
