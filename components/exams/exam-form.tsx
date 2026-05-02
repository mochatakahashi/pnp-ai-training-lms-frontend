'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ExamTimer } from './exam-timer';
import { QuestionCard } from './question-card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

interface Question {
  id: string;
  questionText: string;
  questionType: 'multiple_choice' | 'essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
  order: number;
}

interface ExamFormProps {
  examId: string;
  examTitle: string;
  duration: number;
  passingScore: number;
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => void;
  onCancel: () => void;
}

export function ExamForm({
  examId,
  examTitle,
  duration,
  passingScore,
  questions,
  onSubmit,
  onCancel,
}: ExamFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [windowFocused, setWindowFocused] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  // Monitor window focus for exam integrity
  useEffect(() => {
    const handleFocus = () => setWindowFocused(true);
    const handleBlur = () => setWindowFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleFlagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id);
      } else {
        newSet.add(currentQuestion.id);
      }
      return newSet;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const isFlagged = flaggedQuestions.has(currentQuestion.id);
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="space-y-6">
      {/* Exam Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Badge variant="secondary" className="mb-2">
            Exam
          </Badge>
          <h1 className="text-2xl font-bold text-foreground">{examTitle}</h1>
        </div>
        {!windowFocused && (
          <div className="px-4 py-2 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm text-destructive font-medium">⚠️ Window not focused</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <ExamTimer durationMinutes={duration} onTimeUp={handleSubmit} />

          {/* Current Question */}
          <div className="mt-6">
            <QuestionCard
              question={currentQuestion}
              answer={answers[currentQuestion.id] || ''}
              onAnswerChange={handleAnswerChange}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <Button
              variant="outline"
              onClick={handleFlagQuestion}
              className={isFlagged ? 'border-amber-600 text-amber-600' : ''}
            >
              <Flag size={18} />
            </Button>

            {currentQuestionIndex === questions.length - 1 ? (
              <AlertDialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
                <AlertDialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    Submit Exam
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-2">
                      <p>You are about to submit your exam.</p>
                      <p>
                        You have answered <strong>{answeredCount}</strong> out of{' '}
                        <strong>{questions.length}</strong> questions.
                      </p>
                      <p>You cannot change your answers after submission.</p>
                    </div>
                  </AlertDialogDescription>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Submit Exam
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight size={18} />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Progress */}
          <Card className="p-4 mb-4 sticky top-20">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Progress
            </h3>
            <Progress value={progressPercent} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {answeredCount} of {questions.length} answered
            </p>
          </Card>

          {/* Question Navigator */}
          <Card className="p-4 sticky top-40">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Questions
            </h3>
            <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`aspect-square flex items-center justify-center rounded-lg font-medium text-xs transition-colors ${
                    idx === currentQuestionIndex
                      ? 'bg-primary text-primary-foreground'
                      : answers[q.id] !== undefined
                      ? 'bg-green-100/20 text-green-700 border border-green-200'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                  title={`Question ${idx + 1}${flaggedQuestions.has(q.id) ? ' (Flagged)' : ''}`}
                >
                  {idx + 1}
                  {flaggedQuestions.has(q.id) && <span className="absolute text-amber-600">⚐</span>}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
