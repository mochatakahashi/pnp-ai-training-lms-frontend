import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Award, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const exams = [
  {
    id: 'exam-4',
    title: 'Course Final Exam (50 Questions)',
    module: 'Police Ethics and Conduct (Comprehensive)',
    duration: 120,
    questionsCount: 50,
    passingScore: 80,
    status: 'available',
    featured: true,
  },
  {
    id: 'exam-1',
    title: 'Introduction to Ethics - Quiz',
    module: 'Module 1 Assessment',
    duration: 15,
    questionsCount: 3,
    passingScore: 80,
    attempts: 1,
    bestScore: 85,
    status: 'completed',
    passed: true,
  },
  {
    id: 'exam-2',
    title: 'Decision Making & Dilemmas - Quiz',
    module: 'Module 2 Assessment',
    duration: 15,
    questionsCount: 3,
    passingScore: 80,
    status: 'available',
  },
  {
    id: 'exam-3',
    title: 'Accountability & Transparency - Quiz',
    module: 'Module 3 Assessment',
    duration: 15,
    questionsCount: 3,
    passingScore: 80,
    status: 'available',
  },
];

export default function ExamsPage() {
  const completedExams = exams.filter((e) => e.status === 'completed');
  const availableExams = exams.filter((e) => e.status === 'available');

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Exams & Assessments</h1>
        <p className="text-sm text-muted-foreground">
          Complete module quizzes (1-3 questions) sequentially and take the 50-Question Course Final Exam (2 Hours time limit, 80% passing number required).
        </p>
      </div>

      {/* Featured 50-Question Course Final Exam */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Course Final Exam (50 Questions • 2 Hours)
        </h2>
        <Card className="p-6 bg-gradient-to-r from-slate-900 via-primary/90 to-slate-900 text-white shadow-xl border-accent/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-accent text-accent-foreground font-extrabold text-xs">OFFICIAL CERTIFICATION EXAM</Badge>
                <Badge className="bg-white/20 text-white border-0 text-xs">80% Passing Threshold</Badge>
              </div>
              <h3 className="text-2xl font-extrabold">Police Ethics and Conduct Comprehensive Exam</h3>
              <p className="text-xs text-white/80 max-w-xl leading-relaxed">
                50 multiple-choice questions covering all 5 course modules. Requires a minimum score of 80% (40/50 correct) within 2 Hours to earn your official PNP LMS Certificate.
              </p>
              <div className="flex items-center gap-4 text-xs text-white/70 pt-1">
                <span className="flex items-center gap-1"><Clock size={14} /> 2 Hours (120 Mins)</span>
                <span className="flex items-center gap-1"><HelpCircle size={14} /> 50 Questions</span>
                <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Pass: 80% (40/50)</span>
              </div>
            </div>

            <Link href="/exams/exam-4" className="w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 text-sm shadow-lg">
                Start 50-Question Exam →
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Available Module Quizzes */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Module Quizzes (1-3 Questions Each)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableExams.map((exam) => (
            <Card
              key={exam.id}
              className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow bg-card border-border"
            >
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">{exam.module}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {exam.duration}m
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-base">
                  {exam.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Contains {exam.questionsCount} questions • Passing: {exam.passingScore}%
                </p>
              </div>

              <Link href={`/exams/${exam.id}`}>
                <Button variant="outline" className="w-full text-xs font-semibold">
                  Take Quiz ({exam.questionsCount} Qs)
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
