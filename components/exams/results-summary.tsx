'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trophy, Download } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ResultsSummaryProps {
  examTitle: string;
  score: number;
  passingScore: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  passed: boolean;
  certificateId?: string;
}

export function ResultsSummary({
  examTitle,
  score,
  passingScore,
  totalQuestions,
  correctAnswers,
  timeSpent,
  passed,
  certificateId,
}: ResultsSummaryProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const minutesSpent = Math.floor(timeSpent / 60);
  const secondsSpent = timeSpent % 60;

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card
        className={cn(
          'p-8 text-center',
          passed
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
        )}
      >
        <div className="flex justify-center mb-6">
          {passed ? (
            <div className="relative">
              <Trophy className="text-amber-500" size={64} />
              <CheckCircle
                className="text-green-600 absolute bottom-0 right-0"
                size={32}
              />
            </div>
          ) : (
            <XCircle className="text-red-600" size={64} />
          )}
        </div>

        <h2 className="text-3xl font-bold mb-2">
          {passed ? 'Congratulations!' : 'Try Again'}
        </h2>

        <p
          className={cn(
            'text-lg mb-6',
            passed ? 'text-green-700' : 'text-red-700'
          )}
        >
          {passed
            ? 'You have successfully passed this exam!'
            : `You scored ${score}%. You need ${passingScore}% to pass.`}
        </p>

        {/* Score Display */}
        <div className="inline-block bg-white rounded-lg px-8 py-6 shadow-sm mb-6">
          <p className="text-5xl font-bold text-primary mb-1">{score}%</p>
          <p className="text-muted-foreground">Your Score</p>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center gap-3 mb-6">
          <Badge
            className={
              passed
                ? 'bg-green-100/20 text-green-700 border-green-200'
                : 'bg-red-100/20 text-red-700 border-red-200'
            }
          >
            {passed ? '✓ Passed' : '✗ Not Passed'}
          </Badge>
          <Badge variant="outline">
            {correctAnswers}/{totalQuestions} correct
          </Badge>
        </div>
      </Card>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Exam</p>
          <p className="font-semibold text-foreground">{examTitle}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Time Spent</p>
          <p className="font-semibold text-foreground">
            {minutesSpent}m {secondsSpent}s
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Passing Score</p>
          <p className="font-semibold text-foreground">{passingScore}%</p>
        </Card>
      </div>

      {/* Question Analysis */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Performance Analysis</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Correct Answers</span>
              <span className="font-semibold text-green-600">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Incorrect Answers</span>
              <span className="font-semibold text-red-600">
                {totalQuestions - correctAnswers}/{totalQuestions}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600"
                style={{ width: `${100 - percentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Certificate Section */}
      {passed && certificateId && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Trophy className="text-primary flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Certificate Earned
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A digital certificate has been automatically generated and is ready for download.
              </p>
              <Button>
                <Download size={18} className="mr-2" />
                Download Certificate
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/exams" className="flex-1">
          <Button className="w-full">
            {passed ? 'Take Another Exam' : 'Review and Retake'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
