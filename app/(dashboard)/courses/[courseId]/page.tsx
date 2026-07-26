'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Play, Award, FileText, HelpCircle, ArrowRight, Lock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MODULE_QUIZZES } from '@/lib/module-quizzes';
import { ModuleQuiz } from '@/components/exams/module-quiz';

const initialCourseData = {
  id: '1',
  title: 'Police Ethics and Conduct',
  description: 'Learn the fundamental principles of professional ethics and conduct in policing.',
  modules: [
    {
      id: 'mod1',
      title: 'Introduction to Ethics',
      order: 1,
      estimatedDuration: 20,
      content: `
        <h2>Introduction to Ethics in Law Enforcement</h2>
        <p>Ethics forms the core of effective, constitutional policing. Understanding and practicing ethical conduct is essential for building and preserving public trust and upholding the laws of the Republic of the Philippines.</p>
        <h3>Key Topics:</h3>
        <ul>
          <li><strong>Definition of Ethics:</strong> Moral principles concerning the distinction between right and wrong behavior.</li>
          <li><strong>Professional Ethics:</strong> Specialized standards of conduct governing law enforcement officers.</li>
          <li><strong>PNP Code of Conduct:</strong> Ethical standards under R.A. 6713 and PNP Operational Guidelines.</li>
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
        <p>Police officers frequently face high-pressure situations requiring rapid, sound ethical decision-making.</p>
        <h3>The PNP Ethical Decision-Making Framework</h3>
        <ol>
          <li><strong>Identify the Issue:</strong> Recognize the moral and legal challenge.</li>
          <li><strong>Gather Facts:</strong> Assess circumstances without bias.</li>
          <li><strong>Evaluate Options:</strong> Compare choices against PNP ethical guidelines and Philippine laws.</li>
          <li><strong>Execute & Report:</strong> Take responsible action and document the incident accurately.</li>
        </ol>
      `,
      completed: false,
    },
    {
      id: 'mod3',
      title: 'Accountability and Transparency',
      order: 3,
      estimatedDuration: 30,
      content: `
        <h2>Accountability and Transparency</h2>
        <p>Accountability ensures officers remain answerable for their actions, while transparency builds citizen confidence in police operations.</p>
        <h3>Core Principles:</h3>
        <ul>
          <li><strong>Truthful Reporting:</strong> Accurate logging of blotters and incident reports.</li>
          <li><strong>Internal Affairs Oversight:</strong> Independent investigation of administrative violations.</li>
          <li><strong>Body-Worn Camera Protocols:</strong> Maintaining objective digital records during tactical operations.</li>
        </ul>
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
        <p>Analyzing real-world scenarios regarding anti-graft policies, proper use of force, and handling anti-corruption mandates.</p>
        <h3>Key Case Scenarios:</h3>
        <ul>
          <li>Refusing gifts and gratuities under R.A. 6713.</li>
          <li>Duty to intervene against excessive force.</li>
          <li>Maintaining impartiality in local community policing.</li>
        </ul>
      `,
      completed: false,
    },
    {
      id: 'mod5',
      title: 'Professional Development & Continuing Education',
      order: 5,
      estimatedDuration: 20,
      content: `
        <h2>Professional Development & Continuing Education</h2>
        <p>Continuous education keeps PNP personnel updated on human rights, modern technology, AI tools, and tactical ethics.</p>
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
  const [modules, setModules] = useState(initialCourseData.modules);
  const [selectedModule, setSelectedModule] = useState(initialCourseData.modules[0]);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');

  // Helper to check if a module is unlocked (Module 1 is always unlocked; Module N requires Module N-1 to be completed)
  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    return modules[moduleIndex - 1].completed;
  };

  const completedCount = modules.filter((m) => m.completed).length;
  const isCourseComplete = completedCount === modules.length;

  const handleModuleQuizComplete = (score: number, passed: boolean) => {
    const currentIndex = modules.findIndex((m) => m.id === selectedModule.id);
    
    // Mark current module completed
    const updatedModules = modules.map((m, idx) =>
      idx === currentIndex ? { ...m, completed: true } : m
    );
    setModules(updatedModules);

    // Automatically advance to the next unlocked module!
    if (currentIndex < updatedModules.length - 1) {
      setSelectedModule(updatedModules[currentIndex + 1]);
    } else {
      setSelectedModule(updatedModules[currentIndex]);
    }
    setActiveTab('content');
  };

  const currentModuleIndex = modules.findIndex((m) => m.id === selectedModule.id);
  const currentQuizData = MODULE_QUIZZES[selectedModule.id] || {
    title: `${selectedModule.title} Quiz`,
    questions: [
      {
        id: `${selectedModule.id}_q1`,
        question: `What is the primary key standard emphasized in ${selectedModule.title}?`,
        options: ['Strict ethical compliance', 'Disregarding procedures', 'Speed over accuracy', 'None of the above'],
        correctAnswer: 0,
        explanation: 'Ethical compliance is the primary standard.',
      },
    ],
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-background flex flex-col overflow-hidden">
      {/* Visible Course Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-border shadow-md flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-xs">Course Module Viewer</Badge>
            <span className="text-xs text-white/70">• {completedCount} of {modules.length} Modules Completed</span>
          </div>
          <h1 className="text-xl font-bold">{initialCourseData.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => router.push('/courses')}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs h-9"
          >
            ← Courses List
          </Button>

          {/* Final Exam Button: Unlocked only when ALL modules completed */}
          {isCourseComplete ? (
            <Button
              onClick={() => router.push('/exams/exam-4')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs flex items-center gap-1.5 shadow-lg animate-bounce h-9"
            >
              <Award className="w-4 h-4" />
              Start 50-Question Final Exam (2 Hours)
            </Button>
          ) : (
            <Button
              disabled
              variant="outline"
              className="bg-white/5 border-white/10 text-white/50 text-xs flex items-center gap-1.5 cursor-not-allowed h-9"
              title="Complete all modules & quizzes to unlock Final Assessment"
            >
              <Lock className="w-3.5 h-3.5" />
              Final Exam Locked (2 Hours)
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 bg-card border-r border-border overflow-y-auto flex flex-col">
          <div className="p-4 space-y-4">
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-3.5 rounded-xl shadow-sm">
              <p className="text-[10px] opacity-90 mb-0.5 font-semibold uppercase tracking-wider">Learning Progress</p>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xl font-extrabold">{Math.round((completedCount / modules.length) * 100)}%</span>
                <span className="text-xs opacity-80">{completedCount}/{modules.length} Done</span>
              </div>
              <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${(completedCount / modules.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Sequential Modules</p>
              {modules.map((module, idx) => {
                const isCurrent = selectedModule.id === module.id;
                const unlocked = isModuleUnlocked(idx);

                return (
                  <button
                    key={module.id}
                    disabled={!unlocked}
                    onClick={() => {
                      if (unlocked) {
                        setSelectedModule(module);
                        setActiveTab('content');
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      !unlocked
                        ? 'bg-secondary/10 border-border/30 text-muted-foreground opacity-60 cursor-not-allowed'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'bg-secondary/30 hover:bg-secondary border-border/50 text-foreground'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 mt-0.5">
                        {!unlocked ? (
                          <Lock size={14} className="text-amber-500" />
                        ) : module.completed ? (
                          <CheckCircle2 size={16} className={isCurrent ? 'text-white' : 'text-green-600'} />
                        ) : (
                          <div className={`w-3.5 h-3.5 rounded-full border-2 ${isCurrent ? 'border-white' : 'border-primary'}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs truncate">Mod {module.order}: {module.title}</p>
                          {!unlocked && <Badge variant="outline" className="text-[8px] px-1 py-0 border-amber-500/40 text-amber-600">Locked</Badge>}
                        </div>
                        <p className={`text-[10px] mt-0.5 ${isCurrent ? 'opacity-90' : 'text-muted-foreground'}`}>
                          {module.estimatedDuration} min • {unlocked ? 'Quiz Included' : `Requires Mod ${idx}`}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Final Exam Status Card */}
            <Card className={`p-3.5 border ${isCourseComplete ? 'bg-accent/10 border-accent/40' : 'bg-muted/40 border-border opacity-80'} space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Award className="w-4 h-4 text-accent" />
                  Final Assessment
                </div>
                <Badge variant={isCourseComplete ? 'default' : 'secondary'} className="text-[9px]">
                  {isCourseComplete ? 'Unlocked ✓' : '🔒 Locked'}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight">
                50 Questions • <strong>2 Hours Limit</strong> • 80% Pass Score.
              </p>
              {isCourseComplete ? (
                <Link href="/exams/exam-4" className="block">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-bold h-8 shadow-sm">
                    Start 2-Hour Final Exam →
                  </Button>
                </Link>
              ) : (
                <Button disabled className="w-full text-xs font-semibold h-8" variant="outline">
                  Finish All {modules.length} Modules First
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col bg-background overflow-hidden">
          {/* Module Content Header Tabs */}
          <div className="bg-card px-6 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-[11px] text-muted-foreground">Module {selectedModule.order} of {modules.length}</p>
              <h2 className="text-lg font-bold text-foreground">{selectedModule.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={activeTab === 'content' ? 'default' : 'outline'}
                onClick={() => setActiveTab('content')}
                className="text-xs h-8 gap-1.5"
              >
                <FileText size={14} />
                Reading Material
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'quiz' ? 'default' : 'outline'}
                onClick={() => setActiveTab('quiz')}
                className="text-xs h-8 gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <HelpCircle size={14} />
                Module Quiz ({currentQuizData.questions.length} Qs)
              </Button>
            </div>
          </div>

          {/* Tab Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'content' ? (
              <div className="max-w-3xl space-y-6">
                <div
                  className="prose prose-slate dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: selectedModule.content }}
                />

                <Card className="p-5 bg-primary/5 border-primary/20 space-y-2.5 mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <HelpCircle className="w-4 h-4" />
                      Module Knowledge Check ({currentQuizData.questions.length} Questions)
                    </div>
                    {selectedModule.completed && (
                      <Badge className="bg-green-600 text-white text-xs">✓ Passed & Module Completed</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Completing this short module quiz unlocks Module {selectedModule.order + 1}.
                  </p>
                  <Button onClick={() => setActiveTab('quiz')} className="bg-primary hover:bg-primary/90 text-xs font-bold h-9">
                    {selectedModule.completed ? 'Retake Module Quiz' : `Take Module ${selectedModule.order} Quiz (${currentQuizData.questions.length} Questions) →`}
                  </Button>
                </Card>
              </div>
            ) : (
              <div className="max-w-xl mx-auto py-1">
                <ModuleQuiz
                  moduleId={selectedModule.id}
                  moduleName={selectedModule.title}
                  questions={currentQuizData.questions}
                  onComplete={handleModuleQuizComplete}
                />
              </div>
            )}
          </div>

          {/* Footer Nav */}
          <div className="border-t border-border bg-card px-6 py-3 flex items-center justify-between flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              disabled={currentModuleIndex === 0}
              onClick={() => {
                if (currentModuleIndex > 0) {
                  setSelectedModule(modules[currentModuleIndex - 1]);
                  setActiveTab('content');
                }
              }}
              className="text-xs h-8"
            >
              ← Previous Module
            </Button>

            <span className="text-xs text-muted-foreground font-medium">
              Module {selectedModule.order} of {modules.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={
                currentModuleIndex === modules.length - 1 ||
                !isModuleUnlocked(currentModuleIndex + 1)
              }
              onClick={() => {
                if (currentModuleIndex < modules.length - 1 && isModuleUnlocked(currentModuleIndex + 1)) {
                  setSelectedModule(modules[currentModuleIndex + 1]);
                  setActiveTab('content');
                }
              }}
              className="text-xs h-8"
            >
              {currentModuleIndex < modules.length - 1 && !isModuleUnlocked(currentModuleIndex + 1)
                ? '🔒 Pass Quiz to Unlock Next'
                : 'Next Module →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
