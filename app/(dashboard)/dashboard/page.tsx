'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, CheckCircle, Award, Target, ArrowRight, Zap, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const statistics = [
  { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: 'text-sky-600 bg-sky-100 dark:bg-sky-950/60 border-sky-200' },
  { label: 'Hours Spent', value: '24.5', icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/60 border-amber-200' },
  { label: 'Completed Modules', value: '9', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200' },
  { label: 'Certificates Earned', value: '2', icon: Award, color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-950/60 border-indigo-200' },
];

const enrolledCourses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    progress: 65,
    modules: 5,
    completedModules: 3,
  },
  {
    id: '2',
    title: 'Community Policing Fundamentals',
    progress: 40,
    modules: 6,
    completedModules: 2,
  },
  {
    id: '3',
    title: 'Crisis Management and De-escalation',
    progress: 100,
    modules: 4,
    completedModules: 4,
  },
];

const recentExams = [
  {
    id: '1',
    title: 'Ethics Module Quiz',
    score: 85,
    passed: true,
    completedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Community Policing Final Exam',
    score: 78,
    passed: true,
    completedAt: '2024-01-10',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      {/* 1. Rich Gradient Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 text-white p-8 md:p-10 shadow-lg overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-extrabold">
            <Zap size={14} className="text-amber-300 fill-amber-300" />
            <span>9 new modules available this week</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome Officer
          </h1>
          <p className="text-sm md:text-base text-sky-100 leading-relaxed font-medium">
            Continue your professional development with our training modules and certification programs.
          </p>
        </div>
      </div>

      {/* 2. My Progress Section (Compact & Accessible under Welcome Officer) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <TrendingUp size={20} className="text-sky-500" />
            My Progress
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {statistics.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4 rounded-2xl border border-border shadow-2xs bg-card flex items-center gap-3.5 hover:shadow-sm transition-all">
                <div className={`p-2.5 rounded-xl border ${stat.color} shrink-0`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-xl md:text-2xl font-extrabold text-foreground mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 3. Three Big Navigation Cards (Elderly Accessible) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Card 1: My Learning */}
        <Link href="/courses?tab=my-learning" className="block group">
          <Card className="p-7 text-center space-y-4 rounded-3xl border border-border/80 bg-card hover:shadow-xl hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto border border-sky-100 dark:border-sky-900 group-hover:scale-110 transition-transform">
              <BookOpen size={32} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground group-hover:text-sky-600 transition-colors">
                My Learning
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Resume your enrolled courses and track your progress.
              </p>
            </div>
            <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-full h-10 shadow-sm">
              Go to My Learning →
            </Button>
          </Card>
        </Link>

        {/* Card 2: Find Learning */}
        <Link href="/courses?tab=catalog" className="block group">
          <Card className="p-7 text-center space-y-4 rounded-3xl border border-border/80 bg-card hover:shadow-xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-900 group-hover:scale-110 transition-transform">
              <Search size={32} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground group-hover:text-indigo-600 transition-colors">
                Find Learning
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Browse the catalog and discover new training modules.
              </p>
            </div>
            <Button variant="outline" className="w-full border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 font-extrabold text-xs rounded-full h-10 shadow-2xs hover:bg-indigo-50 dark:hover:bg-indigo-950">
              Find Learning →
            </Button>
          </Card>
        </Link>

        {/* Card 3: Certificates */}
        <Link href="/certificates" className="block group">
          <Card className="p-7 text-center space-y-4 rounded-3xl border border-border/80 bg-card hover:shadow-xl hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-900 group-hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground group-hover:text-emerald-600 transition-colors">
                Certificates
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                View and download your earned module credentials.
              </p>
            </div>
            <Button variant="outline" className="w-full border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 font-extrabold text-xs rounded-full h-10 shadow-2xs hover:bg-emerald-50 dark:hover:bg-emerald-950">
              View Certificates →
            </Button>
          </Card>
        </Link>
      </div>

      {/* 4. Recent Exams & Recommended Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        {/* Recent Exams (with See All link) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              Recent Exams
            </h2>
            <Link href="/exams" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
              See All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentExams.map((exam) => (
              <Card key={exam.id} className="p-5 rounded-2xl border border-border bg-card shadow-xs hover:border-sky-300 transition-all flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-foreground text-sm">{exam.title}</h3>
                  <p className="text-xs text-muted-foreground">Completed on {exam.completedAt}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-sky-600 dark:text-sky-400">{exam.score}%</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Final Grade</p>
                  </div>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                    ✓ Passed
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Next Steps */}
        <Card className="p-6 rounded-3xl border border-border bg-card shadow-md space-y-4">
          <div className="flex items-center gap-2 text-foreground font-extrabold text-base border-b border-border pb-3">
            <Target className="w-5 h-5 text-sky-500" />
            Recommended Next Steps
          </div>

          <ul className="space-y-3 text-xs font-medium text-muted-foreground">
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-border flex items-center gap-2.5 text-foreground font-bold">
              <span className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />
              Complete Crisis Management course
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-border flex items-center gap-2.5 text-foreground font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
              Retake Community Policing exam
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-border flex items-center gap-2.5 text-foreground font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              Explore new communication skills course
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}


