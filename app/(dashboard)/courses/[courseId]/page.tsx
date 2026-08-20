'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Award, ChevronLeft, Sparkles, FileText, HelpCircle, Bot, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/components/navigation/sidebar-context';
import { MODULE_QUIZZES } from '@/lib/module-quizzes';
import { ModuleQuiz } from '@/components/exams/module-quiz';
import { ChatWidget } from '@/components/modules/chat-widget';

// Original Course Data with 5 modules
const initialCourseData = {
  id: '1',
  code: 'SRAIU-2026-M1',
  title: 'Police Ethics and Conduct',
  description: 'Learn the fundamental principles of professional ethics and conduct in policing.',
  modules: [
    {
      id: 'mod1',
      title: 'Introduction to Ethics',
      order: 1,
      estimatedDuration: 20,
      content: `
        <h2 class="text-xl font-bold text-foreground mb-3">1. Introduction to Ethics in Law Enforcement</h2>
        <p class="text-muted-foreground leading-relaxed mb-4">
          Ethics forms the core of effective, constitutional policing. Understanding and practicing ethical conduct is essential for building and preserving public trust and upholding the laws of the Republic of the Philippines.
        </p>
        <h3 class="text-base font-bold text-foreground mb-2">Key Topics:</h3>
        <ul class="list-disc list-inside space-y-1.5 text-sm text-foreground mb-4">
          <li><strong>Definition of Ethics:</strong> Moral principles concerning the distinction between right and wrong behavior.</li>
          <li><strong>Professional Ethics:</strong> Specialized standards of conduct governing law enforcement officers.</li>
          <li><strong>PNP Code of Conduct:</strong> Ethical standards under R.A. 6713 and PNP Operational Guidelines.</li>
        </ul>
      `,
      completed: false,
    },
    {
      id: 'mod2',
      title: 'Decision Making and Ethical Dilemmas',
      order: 2,
      estimatedDuration: 25,
      content: `
        <h2 class="text-xl font-bold text-foreground mb-3">2. Decision Making and Ethical Dilemmas</h2>
        <p class="text-muted-foreground leading-relaxed mb-4">
          Police officers frequently face high-pressure situations requiring rapid, sound ethical decision-making.
        </p>
        <h3 class="text-base font-bold text-foreground mb-2">The PNP Ethical Decision-Making Framework</h3>
        <ol class="list-decimal list-inside space-y-1.5 text-sm text-foreground mb-4">
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
        <h2 class="text-xl font-bold text-foreground mb-3">3. Accountability and Transparency</h2>
        <p class="text-muted-foreground leading-relaxed mb-4">
          Accountability ensures officers remain answerable for their actions, while transparency builds citizen confidence in police operations.
        </p>
        <h3 class="text-base font-bold text-foreground mb-2">Core Principles:</h3>
        <ul class="list-disc list-inside space-y-1.5 text-sm text-foreground mb-4">
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
        <h2 class="text-xl font-bold text-foreground mb-3">4. Case Studies in Police Ethics</h2>
        <p class="text-muted-foreground leading-relaxed mb-4">
          Analyzing real-world scenarios regarding anti-graft policies, proper use of force, and handling anti-corruption mandates.
        </p>
        <h3 class="text-base font-bold text-foreground mb-2">Key Case Scenarios:</h3>
        <ul class="list-disc list-inside space-y-1.5 text-sm text-foreground mb-4">
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
        <h2 class="text-xl font-bold text-foreground mb-3">5. Professional Development & Continuing Education</h2>
        <p class="text-muted-foreground leading-relaxed mb-4">
          Continuous education keeps PNP personnel updated on human rights, modern technology, AI tools, and tactical ethics.
        </p>
      `,
      completed: false,
    },
  ],
  examQuestions: [
    {
      id: 'eq1',
      question: 'Regarding "All topics in Police Ethics and Conduct", which of the following is the most accurate statement for law enforcement?',
      options: [
        'It requires strict adherence to data privacy and ethical guidelines.',
        'It completely replaces human judgment in operations.',
        'It is only useful for administrative tasks, not operational.',
        'It has no security risks when deployed.',
      ],
      correctAnswer: 0,
    },
    {
      id: 'eq2',
      question: 'What is the FIRST step in the PNP Ethical Decision-Making Framework when confronting a dilemma?',
      options: [
        'Identify the core issue and ethical conflict',
        'Take immediate physical action without assessment',
        'Consult external media sources',
        'Delegate all responsibility to junior personnel',
      ],
      correctAnswer: 0,
    },
    {
      id: 'eq3',
      question: 'Which practice best demonstrates transparency in law enforcement operations?',
      options: [
        'Clear, accurate, and truthful documentation of official blotters and reports',
        'Withholding public information during non-classified matters',
        'Altering reports to avoid public criticism',
        'Restricting internal audit access',
      ],
      correctAnswer: 0,
    },
  ],
};

export default function CourseDetailPage() {
  const router = useRouter();
  const { setIsOpen } = useSidebar();

  // Automatically collapse sidebar when opening the module to maximize screen space
  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const [modules, setModules] = useState(initialCourseData.modules);
  const [selectedModule, setSelectedModule] = useState(initialCourseData.modules[0]);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'exam'>('content');
  const [showExamChoiceModal, setShowExamChoiceModal] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  // Final Assessment Exam state
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);

  // Helper to check if a module is unlocked (Module 1 is always unlocked; Module N requires Module N-1 to be completed)
  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    return modules[moduleIndex - 1].completed;
  };

  const completedCount = modules.filter((m) => m.completed).length;
  const isCourseComplete = completedCount === modules.length;
  const completionPercentage = Math.round((completedCount / modules.length) * 100);

  const handleModuleQuizComplete = (score: number, passed: boolean) => {
    const currentIndex = modules.findIndex((m) => m.id === selectedModule.id);

    // Mark current module completed
    const updatedModules = modules.map((m, idx) =>
      idx === currentIndex ? { ...m, completed: true } : m
    );
    setModules(updatedModules);

    // Automatically advance to the next module or trigger final assessment choice!
    if (currentIndex < updatedModules.length - 1) {
      setSelectedModule(updatedModules[currentIndex + 1]);
      setActiveTab('content');
    } else {
      setShowExamChoiceModal(true);
    }
  };

  const handleExamAnswerSelect = (optionIndex: number) => {
    const qId = initialCourseData.examQuestions[currentExamIndex].id;
    setExamAnswers({ ...examAnswers, [qId]: optionIndex });
  };

  const handleExamSubmit = () => {
    let correct = 0;
    initialCourseData.examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setExamScore(correct);
    setExamSubmitted(true);
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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans">
      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar (Reference Image 1 Vibe) */}
        <aside className="w-full md:w-80 bg-white dark:bg-card border-r border-border flex flex-col flex-shrink-0">
          {/* Module Banner Header */}
          <div className="bg-sky-500 text-white p-5">
            <h2 className="text-lg font-extrabold mb-2">Module 1</h2>
            <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden mb-1">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[10px] font-bold tracking-wider uppercase opacity-95">
              {completionPercentage}% COMPLETE
            </p>
          </div>

          {/* Sequential Modules & Quizzes List */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {modules.map((module, idx) => {
              const unlocked = isModuleUnlocked(idx);
              const isReadingActive = activeTab === 'content' && selectedModule.id === module.id;
              const isQuizActive = activeTab === 'quiz' && selectedModule.id === module.id;

              return (
                <div key={module.id} className="space-y-1">
                  {/* Reading Item */}
                  <button
                    disabled={!unlocked}
                    onClick={() => {
                      if (unlocked) {
                        setSelectedModule(module);
                        setActiveTab('content');
                      }
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-3 text-xs ${
                      !unlocked
                        ? 'text-muted-foreground/50 opacity-50 cursor-not-allowed bg-transparent'
                        : isReadingActive
                        ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-extrabold border border-sky-200 dark:border-sky-800 shadow-xs'
                        : 'text-foreground hover:bg-secondary/60 font-medium'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {module.completed ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : unlocked ? (
                        <div className="w-4 h-4 rounded-full border-2 border-sky-500" />
                      ) : (
                        <Lock size={15} className="text-slate-400" />
                      )}
                    </div>
                    <span className="truncate flex-1 font-bold">{module.title}</span>
                  </button>

                  {/* Quiz Child Item */}
                  <button
                    disabled={!unlocked}
                    onClick={() => {
                      if (unlocked) {
                        setSelectedModule(module);
                        setActiveTab('quiz');
                      }
                    }}
                    className={`w-full text-left ml-4 pl-3 pr-2.5 py-2 rounded-lg transition-all flex items-center gap-2 text-[11px] ${
                      !unlocked
                        ? 'text-muted-foreground/40 opacity-40 cursor-not-allowed bg-transparent'
                        : isQuizActive
                        ? 'bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-extrabold border border-sky-300 dark:border-sky-700 shadow-xs'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 font-medium'
                    }`}
                  >
                    <HelpCircle size={13} className={isQuizActive ? 'text-sky-600' : 'text-slate-400'} />
                    <span className="truncate flex-1">Quiz: {module.title}</span>
                    {module.completed && (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded-full">
                        Passed
                      </span>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Module Final Assessment Item */}
            <button
              disabled={!isCourseComplete}
              onClick={() => {
                if (isCourseComplete) {
                  setActiveTab('exam');
                }
              }}
              className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-center gap-3 text-xs mt-3 ${
                !isCourseComplete
                  ? 'text-muted-foreground/50 opacity-50 cursor-not-allowed bg-transparent'
                  : activeTab === 'exam'
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-extrabold border border-sky-200 dark:border-sky-800 shadow-xs'
                  : 'text-foreground hover:bg-secondary/60 font-semibold'
              }`}
            >
              <div className="flex-shrink-0">
                {examSubmitted ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : isCourseComplete ? (
                  <Award size={16} className="text-sky-500" />
                ) : (
                  <Lock size={15} className="text-slate-400" />
                )}
              </div>
              <span className="truncate flex-1 font-extrabold">Module Final Assessment</span>
            </button>
          </div>

          {/* Sidebar Footer Link */}
          <div className="p-4 border-t border-border/60">
            <Link
              href="/courses"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft size={14} />
              Back to Overview
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
          {/* VIEW A & B: Reading Content / Module Quiz View */}
          {activeTab !== 'exam' && (
            <div className="max-w-3xl mx-auto w-full space-y-6">
              {activeTab === 'content' ? (
                <Card className="p-6 md:p-8 border border-border shadow-md rounded-2xl bg-card space-y-6">
                  {/* Module Title Header */}
                  <div className="pb-4 border-b border-border/60">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-800 mb-1 px-2.5 py-0.5 rounded-full">
                      Module {selectedModule.order} of {modules.length}
                    </Badge>
                    <h2 className="text-xl md:text-2xl font-extrabold text-foreground">{selectedModule.title}</h2>
                  </div>

                  {/* Reading Material Body */}
                  <div
                    className="prose prose-slate dark:prose-invert max-w-none text-sm text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedModule.content }}
                  />

                  {/* AI Study Assistant (Only available during module reading/reviewing) */}
                  <div className="border-t border-border/60 pt-5 mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-extrabold text-xs">
                        <Bot className="w-4 h-4 text-sky-500" />
                        <span>AI Assistant for Module Review</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAiAssistant(!showAiAssistant)}
                        className="rounded-full text-xs font-bold border-sky-300 dark:border-sky-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950 h-8 px-4 flex items-center gap-1.5 shadow-2xs"
                      >
                        <MessageSquare size={14} />
                        {showAiAssistant ? 'Close AI Assistant' : 'Ask AI Assistant'}
                      </Button>
                    </div>

                    {showAiAssistant && (
                      <Card className="p-4 h-80 border border-sky-200 dark:border-sky-900 bg-sky-50/40 dark:bg-sky-950/30 rounded-2xl animate-in fade-in duration-200">
                        <ChatWidget moduleId={selectedModule.id} moduleTitle={selectedModule.title} />
                      </Card>
                    )}
                  </div>

                  {/* Take Quiz Action Card at the bottom of the reading */}
                  <Card className="p-6 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-8 shadow-xs">
                    <div className="space-y-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-sky-700 dark:text-sky-300 font-extrabold text-sm">
                        <HelpCircle className="w-5 h-5 text-sky-500" />
                        Module Knowledge Check ({currentQuizData.questions.length} Questions)
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Have you reviewed the material? Take the module quiz to unlock the next module.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {selectedModule.completed && (
                        <Badge className="bg-emerald-600 text-white text-xs font-bold rounded-full px-3 py-1">
                          ✓ Passed
                        </Badge>
                      )}
                      <Button
                        onClick={() => {
                          setShowAiAssistant(false);
                          setActiveTab('quiz');
                        }}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs h-10 rounded-full px-6 shadow-md transition-all hover:scale-105"
                      >
                        {selectedModule.completed ? 'Retake Module Quiz' : `Take Module ${selectedModule.order} Quiz →`}
                      </Button>
                    </div>
                  </Card>
                </Card>
              ) : (
                <div className="max-w-xl mx-auto py-1 space-y-4">
                  {/* Quiz Back to Reading link */}
                  <button
                    onClick={() => setActiveTab('content')}
                    className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1.5"
                  >
                    ← Back to Module Reading Material
                  </button>

                  <ModuleQuiz
                    moduleId={selectedModule.id}
                    moduleName={selectedModule.title}
                    questions={currentQuizData.questions}
                    onComplete={handleModuleQuizComplete}
                  />
                </div>
              )}

              {/* Footer Nav */}
              <div className="flex items-center justify-between pt-2">
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
                  className="rounded-full text-xs font-bold px-5 h-9"
                >
                  ← Previous Module
                </Button>

                <span className="text-xs font-bold text-muted-foreground">
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
                  className="rounded-full text-xs font-bold px-5 h-9"
                >
                  {currentModuleIndex < modules.length - 1 && !isModuleUnlocked(currentModuleIndex + 1)
                    ? '🔒 Pass Quiz to Unlock'
                    : 'Next Module →'}
                </Button>
              </div>
            </div>
          )}

          {/* VIEW C: Final Assessment Exam View (Image 1 Vibe) */}
          {activeTab === 'exam' && !examSubmitted && (
            <div className="max-w-3xl mx-auto w-full space-y-6">
              <div className="mb-2">
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-1 leading-snug">
                  Regarding &quot;All topics in Module 1: Fundamentals of Artificial Intelligence&quot;, which of the following is the most accurate statement for law enforcement? (Question {currentExamIndex + 1} of {initialCourseData.examQuestions.length})
                </h2>
              </div>

              {/* Options Card List (Image 1 Vibe) */}
              <div className="space-y-3.5 my-6">
                {initialCourseData.examQuestions[currentExamIndex].options.map((option, idx) => {
                  const qId = initialCourseData.examQuestions[currentExamIndex].id;
                  const isSelected = examAnswers[qId] === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleExamAnswerSelect(idx)}
                      className={`w-full p-4 md:p-5 rounded-2xl border text-left text-sm font-medium transition-all shadow-xs flex items-center justify-between ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-foreground font-extrabold ring-2 ring-sky-500/20'
                          : 'border-border bg-card hover:bg-secondary/40 text-foreground'
                      }`}
                    >
                      <span>{option}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-muted-foreground/40'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentExamIndex === 0}
                  onClick={() => setCurrentExamIndex((prev) => prev - 1)}
                  className="rounded-full text-xs font-bold px-5 h-9"
                >
                  ← Previous Question
                </Button>

                {currentExamIndex === initialCourseData.examQuestions.length - 1 ? (
                  <Button
                    onClick={handleExamSubmit}
                    disabled={examAnswers[initialCourseData.examQuestions[currentExamIndex].id] === undefined}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-full px-7 h-10 shadow-md"
                  >
                    Submit Assessment ✓
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentExamIndex((prev) => prev + 1)}
                    disabled={examAnswers[initialCourseData.examQuestions[currentExamIndex].id] === undefined}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-full px-6 h-9 shadow-sm"
                  >
                    Next Question →
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* VIEW D: Module Passed Screen (Reference Image 4 Vibe) */}
          {activeTab === 'exam' && examSubmitted && (
            <div className="max-w-xl mx-auto w-full my-auto text-center space-y-6">
              <Card className="p-8 md:p-10 border border-border shadow-xl rounded-3xl bg-card relative overflow-hidden">
                {/* Confetti Decor */}
                <div className="absolute top-4 left-6 w-3 h-3 bg-amber-400 rounded-sm rotate-12 opacity-80" />
                <div className="absolute top-6 right-10 w-2.5 h-2.5 bg-rose-500 rounded-full opacity-80" />
                <div className="absolute bottom-8 left-10 w-3 h-3 bg-sky-400 rounded-full opacity-80" />
                <div className="absolute top-12 right-16 w-3 h-3 bg-emerald-500 rounded-sm -rotate-45 opacity-80" />

                {/* Green Badge Icon (Image 4) */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center border-4 border-emerald-200 dark:border-emerald-800 shadow-sm">
                    <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                  Module Passed!
                </h2>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs mb-4">
                  <Sparkles size={14} />
                  <span>Certificate Unlocked!</span>
                </div>

                <p className="text-sm font-medium text-muted-foreground mb-8">
                  You scored <strong className="text-sky-600 dark:text-sky-400 text-base font-extrabold">{examScore}</strong> out of {initialCourseData.examQuestions.length}
                </p>

                {/* Claim Certificate Button */}
                <Button
                  onClick={() => router.push('/certificates')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold h-12 text-base rounded-full shadow-lg flex items-center justify-center gap-2"
                >
                  <Award size={20} />
                  Claim Your Certificate
                </Button>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* EXAM / QUIZ CHOICE MODAL (User requirement #5) */}
      {showExamChoiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <Card className="max-w-md w-full p-6 md:p-8 rounded-3xl shadow-2xl border border-border bg-card text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
              <Sparkles size={28} />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-foreground mb-1">
                Modules Completed!
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You have completed all 5 modules in {initialCourseData.title}. What would you like to do next?
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                onClick={() => {
                  setShowExamChoiceModal(false);
                  setActiveTab('exam');
                }}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs h-11 rounded-full shadow-md"
              >
                Take Module Final Assessment Now →
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowExamChoiceModal(false)}
                className="w-full rounded-full text-xs font-bold border-border h-10"
              >
                Review Modules First
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}


