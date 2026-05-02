import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const exams = [
  {
    id: 'exam-1',
    title: 'Introduction to Ethics - Quiz',
    module: 'Introduction to Ethics',
    duration: 15,
    attempts: 1,
    bestScore: 85,
    status: 'completed',
    passed: true,
    lastAttempt: '2024-01-15',
  },
  {
    id: 'exam-2',
    title: 'Decision Making - Quiz',
    module: 'Decision Making and Ethical Dilemmas',
    duration: 20,
    attempts: 0,
    bestScore: null,
    status: 'available',
    passed: null,
  },
  {
    id: 'exam-3',
    title: 'Accountability - Midterm',
    module: 'Accountability and Transparency',
    duration: 30,
    attempts: 0,
    bestScore: null,
    status: 'available',
    passed: null,
  },
  {
    id: 'exam-4',
    title: 'Course Final Exam',
    module: 'Police Ethics and Conduct (Complete)',
    duration: 60,
    attempts: 0,
    bestScore: null,
    status: 'locked',
    passed: null,
  },
];

export default function ExamsPage() {
  const completedExams = exams.filter((e) => e.status === 'completed');
  const availableExams = exams.filter((e) => e.status === 'available');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Exams</h1>
        <p className="text-muted-foreground">
          {completedExams.length} completed • {availableExams.length} available
        </p>
      </div>

      {/* Completed Exams */}
      {completedExams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Completed Exams
          </h2>
          <div className="space-y-3">
            {completedExams.map((exam) => (
              <Card
                key={exam.id}
                className="p-6 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {exam.title}
                    </h3>
                    {exam.passed && (
                      <Badge className="bg-green-100/20 text-green-700 border-0">
                        <CheckCircle size={14} className="mr-1" />
                        Passed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exam.module}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Score</p>
                    <p className="text-2xl font-bold text-primary">
                      {exam.bestScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attempts</p>
                    <p className="text-2xl font-bold text-foreground">
                      {exam.attempts}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available Exams */}
      {availableExams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Available Exams
          </h2>
          <div className="space-y-3">
            {availableExams.map((exam) => (
              <Card
                key={exam.id}
                className="p-6 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {exam.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exam.module}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {exam.duration} minutes
                    </div>
                  </div>
                </div>

                <Link href={`/exams/${exam.id}`}>
                  <Button>Take Exam</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked Exams */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Coming Soon
        </h2>
        <Card className="p-6 opacity-60">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Course Final Exam</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Police Ethics and Conduct (Complete)
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  60 minutes
                </div>
              </div>
            </div>
            <Button disabled>Locked</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
