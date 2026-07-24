'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Download, Share2, ArrowRight } from 'lucide-react';
import { generateExamReport, ExamReport } from '@/lib/exam-utils';
import Link from 'next/link';

interface ExamResultsProps {
  courseId: string;
  courseName: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  passed: boolean;
  certificateId?: string;
  onDownloadCertificate?: () => void;
  onContinue?: () => void;
}

export function ExamResults({
  courseId,
  courseName,
  correctAnswers,
  totalQuestions,
  timeSpent,
  passed,
  certificateId,
  onDownloadCertificate,
  onContinue,
}: ExamResultsProps) {
  const report = generateExamReport(correctAnswers, totalQuestions, timeSpent);

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          {passed ? (
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-2">
          {passed ? 'Congratulations!' : 'Assessment Complete'}
        </h1>
        <p className="text-lg text-muted-foreground mb-2">{courseName}</p>
        {passed && (
          <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
            ✓ You have passed this course
          </Badge>
        )}
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Score */}
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
          <p className={`text-5xl font-bold mb-1 ${getScoreColor(report.scorePercentage)}`}>
            {report.scorePercentage}%
          </p>
          <Badge variant="secondary" className="text-lg">
            Grade {report.letterGrade}
          </Badge>
        </Card>

        {/* Correct Answers */}
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Correct Answers</p>
          <p className="text-5xl font-bold text-green-600 mb-1">
            {report.correctAnswers}
          </p>
          <p className="text-sm text-muted-foreground">of {report.totalQuestions} questions</p>
        </Card>

        {/* Time Spent */}
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Time Spent</p>
          <p className="text-4xl font-bold text-blue-600 mb-1">{report.timeSpent}</p>
          <p className="text-sm text-muted-foreground">on exam</p>
        </Card>
      </div>

      {/* Feedback */}
      <Card className={`p-6 border-l-4 ${passed ? 'border-l-green-500 bg-green-500/5' : 'border-l-red-500 bg-red-500/5'}`}>
        <p className={`text-lg font-medium mb-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {passed ? 'Excellent!' : 'Need Improvement'}
        </p>
        <p className={passed ? 'text-green-600/80' : 'text-red-600/80'}>
          {report.feedback}
        </p>
      </Card>

      {/* Performance Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Summary</h3>
        
        <div className="space-y-4">
          {/* Score Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-foreground">Score Progress</p>
              <p className="text-sm text-muted-foreground">
                Passing: 80%
              </p>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  report.scorePercentage >= 80 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(report.scorePercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Accuracy Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round((report.correctAnswers / report.totalQuestions) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Questions Answered</p>
              <p className="text-2xl font-bold text-foreground">{report.totalQuestions}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Certificate Section */}
      {passed && certificateId && (
        <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-500/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Certificate Earned</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You&apos;ve successfully earned a certificate of completion for this course.
              </p>
              <Button
                onClick={onDownloadCertificate}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white gap-2"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'PNP LMS Course Completion',
                text: `I just completed "${courseName}" with a score of ${report.scorePercentage}% on the PNP Learning Management System!`,
              });
            }
          }}
        >
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>

        <Button
          onClick={onContinue}
          className="flex-1 bg-primary hover:bg-primary/90 gap-2"
        >
          Continue to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Additional Resources */}
      {!passed && (
        <Card className="p-6 bg-blue-500/5 border-l-4 border-l-blue-500">
          <h3 className="font-semibold text-foreground mb-3">Recommended Next Steps</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Review the course materials and module lessons</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Take the module quizzes to reinforce learning</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Attempt the exam again after reviewing</span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}
