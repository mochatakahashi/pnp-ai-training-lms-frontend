'use client';

import { useState } from 'react';
import { ExamForm } from '@/components/exams/exam-form';
import { ResultsSummary } from '@/components/exams/results-summary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock exam data
const mockExam = {
  id: 'exam-1',
  title: 'Introduction to Ethics - Quiz',
  moduleId: 'mod1',
  duration: 15,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      questionText: 'What is the primary purpose of professional ethics in policing?',
      questionType: 'multiple_choice' as const,
      options: [
        'To provide guidelines for fair and impartial service to all citizens',
        'To maximize police department efficiency',
        'To increase arrest rates',
        'To simplify police procedures',
      ],
      correctAnswer: 'A',
      points: 1,
      order: 1,
    },
    {
      id: 'q2',
      questionText: 'Which of the following is NOT one of the PNP Core Values?',
      questionType: 'multiple_choice' as const,
      options: [
        'Integrity',
        'Accountability',
        'Profit maximization',
        'Transparency',
      ],
      correctAnswer: 'C',
      points: 1,
      order: 2,
    },
    {
      id: 'q3',
      questionText: 'Describe the first step in the ethical decision-making framework.',
      questionType: 'essay' as const,
      points: 2,
      order: 3,
    },
    {
      id: 'q4',
      questionText:
        'Public trust in law enforcement is primarily built on which two elements?',
      questionType: 'multiple_choice' as const,
      options: [
        'Technology and resources',
        'Accountability and transparency',
        'Political connections',
        'Military training',
      ],
      correctAnswer: 'B',
      points: 1,
      order: 4,
    },
    {
      id: 'q5',
      questionText:
        'What does it mean to be accountable in a policing context?',
      questionType: 'essay' as const,
      points: 2,
      order: 5,
    },
  ],
};

type ExamState = 'instructions' | 'taking' | 'results';

export default function ExamPage({
  params,
}: {
  params: { examId: string };
}) {
  const router = useRouter();
  const [state, setState] = useState<ExamState>('instructions');
  const [results, setResults] = useState<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
  } | null>(null);

  const handleStartExam = () => {
    setState('taking');
  };

  const handleSubmitExam = (answers: Record<string, string>) => {
    // Calculate score
    let correctCount = 0;
    const totalPoints = mockExam.questions.reduce((sum, q) => sum + q.points, 0);
    let earnedPoints = 0;

    mockExam.questions.forEach((question) => {
      const answer = answers[question.id];
      if (question.questionType === 'multiple_choice') {
        if (answer && answer === question.correctAnswer) {
          correctCount++;
          earnedPoints += question.points;
        }
      } else {
        // For essay questions, simulate grading (in real app, instructor would grade)
        if (answer && answer.trim().length > 10) {
          correctCount++;
          earnedPoints += question.points;
        }
      }
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);

    setResults({
      score,
      correctAnswers: correctCount,
      totalQuestions: mockExam.questions.length,
      timeSpent: 480, // 8 minutes (mock)
    });

    setState('results');
  };

  const handleCancelExam = () => {
    router.back();
  };

  if (state === 'instructions') {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            {mockExam.title}
          </h1>

          {/* Exam Details */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockExam.duration} minutes
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Passing Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockExam.passingScore}%
                </p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
              <p className="text-2xl font-bold text-foreground">
                {mockExam.questions.length}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-blue-600" />
              Exam Instructions
            </h2>
            <ul className="space-y-2 text-sm text-foreground list-disc list-inside">
              <li>You have {mockExam.duration} minutes to complete this exam.</li>
              <li>Answer all questions to the best of your ability.</li>
              <li>
                Some questions are multiple choice and some require essay responses.
              </li>
              <li>You can flag questions to review them later.</li>
              <li>Once you submit, you cannot change your answers.</li>
              <li>You must maintain focus on this window during the exam.</li>
              <li>Cheating or academic dishonesty will result in exam failure.</li>
            </ul>
          </div>

          {/* Terms */}
          <div className="mb-8">
            <label className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <input type="checkbox" className="mt-1" defaultChecked />
              <span className="text-sm text-foreground">
                I understand and agree to the exam terms and conditions. I will
                complete this exam honestly and without assistance.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleCancelExam}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleStartExam} className="flex-1">
              Start Exam
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (state === 'taking') {
    return (
      <div className="space-y-6">
        <ExamForm
          examId={mockExam.id}
          examTitle={mockExam.title}
          duration={mockExam.duration}
          passingScore={mockExam.passingScore}
          questions={mockExam.questions}
          onSubmit={handleSubmitExam}
          onCancel={handleCancelExam}
        />
      </div>
    );
  }

  if (state === 'results' && results) {
    return (
      <div className="space-y-6">
        <ResultsSummary
          examTitle={mockExam.title}
          score={results.score}
          passingScore={mockExam.passingScore}
          totalQuestions={results.totalQuestions}
          correctAnswers={results.correctAnswers}
          timeSpent={results.timeSpent}
          passed={results.score >= mockExam.passingScore}
          certificateId={
            results.score >= mockExam.passingScore ? 'cert-001' : undefined
          }
        />
      </div>
    );
  }

  return null;
}
