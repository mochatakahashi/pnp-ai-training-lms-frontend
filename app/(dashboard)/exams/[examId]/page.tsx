'use client';

import { useState } from 'react';
import { CourseExam } from '@/components/exams/course-exam';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Award, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { COMPREHENSIVE_50_QUESTIONS } from '@/lib/final-exam-questions';

export default function ExamPage({
  params,
}: {
  params: { examId: string };
}) {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);

  const handleComplete = (score: number, passed: boolean) => {
    if (passed) {
      router.push('/certificates');
    } else {
      router.push('/courses/1');
    }
  };

  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <Card className="p-8 border-2 border-primary/20 bg-card shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 font-semibold text-xs">
              Official PNP Course Final Exam
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 px-3 py-1 font-semibold text-xs">
              Passing Number: 80% (40/50)
            </Badge>
          </div>

          <h1 className="text-3xl font-extrabold text-foreground mb-3">
            Police Ethics and Conduct - Comprehensive Final Exam
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            This comprehensive 50-question examination tests your mastery of the PNP Code of Conduct, Ethical Decision Making Framework, Accountability, Transparency, and Legal Operational Guidelines.
          </p>

          {/* Exam Requirements Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Questions</p>
              <p className="text-2xl font-bold text-foreground">50 Questions</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Passing Threshold</p>
              <p className="text-2xl font-bold text-primary">80% Required</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Duration Limit</p>
              <p className="text-2xl font-bold text-foreground">2 Hours (120 mins)</p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-3 mb-8">
            <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
              <AlertCircle size={18} />
              Important Examination Guidelines
            </h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
              <li>You have <strong>2 Hours (120 minutes)</strong> to complete all 50 questions.</li>
              <li>You must achieve at least <strong>80% (40 out of 50 correct answers)</strong> to pass this final assessment.</li>
              <li>You can flag questions to review them before submitting.</li>
              <li>Achieving 80% or higher unlocks your official PNP Certificate of Completion.</li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 text-sm font-semibold h-11"
            >
              ← Back to Course
            </Button>
            <Button
              onClick={() => setHasStarted(true)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 text-base shadow-md"
            >
              Start 50-Question Exam Now →
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <CourseExam
        courseId="1"
        courseName="Police Ethics and Conduct (50 Questions)"
        questions={COMPREHENSIVE_50_QUESTIONS}
        durationMinutes={120}
        passingScore={80}
        onComplete={handleComplete}
      />
    </div>
  );
}
