'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Play, ArrowLeft, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const catalogModules = [
  {
    activityCode: 'SRAIU-2026-M1',
    id: '1',
    title: 'Module 1: Fundamentals of Artificial Intelligence',
    details: '6 Hours • 6 Lessons (Includes Final Assessment)',
    status: 'Enrolled',
    enrolled: true,
    progress: 65,
  },
  {
    activityCode: 'SRAIU-2026-M2',
    id: '2',
    title: 'Module 2: Generative AI and AI Tools for Law Enforcement',
    details: '6 Hours • 6 Lessons (Includes Final Assessment)',
    status: 'Available',
    enrolled: false,
    progress: 0,
  },
  {
    activityCode: 'SRAIU-2026-M3',
    id: '3',
    title: 'Module 3: Responsible AI, Ethics, and Human Rights',
    details: '6 Hours • 5 Lessons (Includes Final Assessment)',
    status: 'Available',
    enrolled: false,
    progress: 0,
  },
  {
    activityCode: 'SRAIU-2026-M4',
    id: '4',
    title: 'Module 4: Data Privacy, Cybersecurity, and AI Risks',
    details: '6 Hours • 5 Lessons (Includes Final Assessment)',
    status: 'Available',
    enrolled: false,
    progress: 0,
  },
];

function CoursesContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'my-learning' | 'catalog'>('catalog');
  const [modulesList, setModulesList] = useState(catalogModules);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (tabParam === 'my-learning') {
      setActiveTab('my-learning');
    } else if (tabParam === 'catalog') {
      setActiveTab('catalog');
    }
  }, [tabParam]);

  const enrolledModules = modulesList.filter((m) => m.enrolled);

  const filteredCatalog = modulesList.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.activityCode.toLowerCase().includes(q) ||
      m.details.toLowerCase().includes(q)
    );
  });

  const toggleEnrollment = (id: string) => {
    setModulesList((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              enrolled: !m.enrolled,
              status: !m.enrolled ? 'Enrolled' : 'Available',
            }
          : m
      )
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Subheader Back Navigation */}
      <div>
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white dark:bg-card border-border text-foreground hover:bg-secondary text-xs px-4 py-1.5 shadow-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Mode Toggle Buttons */}
      <div className="flex gap-2 border-b border-border/60 pb-3">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${
            activeTab === 'catalog'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'bg-secondary/70 text-foreground hover:bg-secondary'
          }`}
        >
          Course Catalog
        </button>
        <button
          onClick={() => setActiveTab('my-learning')}
          className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${
            activeTab === 'my-learning'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'bg-secondary/70 text-foreground hover:bg-secondary'
          }`}
        >
          My Learning ({enrolledModules.length})
        </button>
      </div>

      {/* Course Catalog View */}
      {activeTab === 'catalog' && (
        <Card className="p-6 md:p-8 border border-border shadow-md rounded-2xl bg-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Course Catalog
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Browse and enroll in available learning modules (5 to 6 hours each).
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search catalog by title or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-10 rounded-full border-border bg-background text-xs font-medium focus-visible:ring-sky-500 shadow-2xs"
              />
            </div>
          </div>

          {filteredCatalog.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <Search className="w-8 h-8 mx-auto text-muted-foreground/40" />
              <p className="font-extrabold text-foreground text-sm">No modules found</p>
              <p className="text-xs text-muted-foreground">Try searching with a different title or activity code.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider bg-secondary/30">
                    <th className="py-3 px-4 rounded-l-lg">ACTIVITY CODE</th>
                    <th className="py-3 px-4">MODULE DETAILS</th>
                    <th className="py-3 px-4 text-center w-40">STATUS</th>
                    <th className="py-3 px-4 text-center w-48 rounded-r-lg">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-xs font-medium">
                  {filteredCatalog.map((module) => (
                    <tr key={module.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-bold text-sky-600 dark:text-sky-400">
                        {module.activityCode}
                      </td>
                      <td className="py-4 px-4 space-y-0.5">
                        <p className="font-extrabold text-foreground text-sm">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.details}</p>
                      </td>
                      <td className="py-4 px-4 text-center align-middle">
                        {module.enrolled ? (
                          <Badge className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold text-[11px] px-3.5 py-1 rounded-full shadow-2xs inline-flex items-center justify-center">
                            Enrolled
                          </Badge>
                        ) : (
                          <Badge className="bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700 font-bold text-[11px] px-3.5 py-1 rounded-full shadow-2xs inline-flex items-center justify-center">
                            Available
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center align-middle">
                        <div className="flex items-center justify-center mx-auto">
                          {module.enrolled ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleEnrollment(module.id)}
                              className="bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold text-xs rounded-full px-4 h-8 shrink-0 inline-flex items-center justify-center"
                            >
                              Drop
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => toggleEnrollment(module.id)}
                              className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-full px-6 h-8 shadow-xs inline-flex items-center justify-center"
                            >
                              Enroll
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* My Learning View (Image 2 Vibe) */}
      {activeTab === 'my-learning' && (
        <Card className="p-6 md:p-8 border border-border shadow-md rounded-2xl bg-card">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              My Learning
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Manage and launch your enrolled learning modules.
            </p>
          </div>

          {enrolledModules.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-muted-foreground/50" />
              <p>You have not enrolled in any modules yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider bg-secondary/30">
                    <th className="py-3 px-4 rounded-l-lg">MODULE TITLE</th>
                    <th className="py-3 px-4 text-center">PROGRESS</th>
                    <th className="py-3 px-4 text-center rounded-r-lg">LAUNCH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-xs font-medium">
                  {enrolledModules.map((module) => (
                    <tr key={module.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 space-y-1">
                        <p className="font-extrabold text-foreground text-sm">{module.title}</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          {module.progress === 100
                            ? '4 of 4 modules completed'
                            : module.progress === 65
                            ? '3 of 5 modules completed'
                            : '2 of 6 modules completed'}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-3 max-w-[200px] mx-auto">
                          <div className="w-32 bg-secondary h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-sky-500 h-full transition-all"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{module.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link href={`/courses/${module.id}`}>
                          <button
                            className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center mx-auto shadow-sm hover:scale-105 transition-all"
                            title="Launch Module"
                          >
                            <Play size={18} className="fill-current" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground font-semibold">Loading courses...</div>}>
      <CoursesContent />
    </Suspense>
  );
}

