'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock, Flag } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CourseExamProps {
  courseId: string;
  courseName: string;
  questions: Question[];
  durationMinutes?: number;
  passingScore?: number;
  onComplete: (score: number, passed: boolean, details: ExamDetails) => void;
}

interface ExamDetails {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
}

export function CourseExam({
  courseId,
  courseName,
  questions,
  durationMinutes = 120,
  passingScore = 80,
  onComplete,
}: CourseExamProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startTime] = useState(Date.now());
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  const currentQuestion = questions[currentIndex];
  const answered = selectedAnswers[currentQuestion.id] !== undefined;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  // Timer effect
  useEffect(() => {
    if (showResults || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults, isTimeUp]);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion.id)) {
      newFlagged.delete(currentQuestion.id);
    } else {
      newFlagged.add(currentQuestion.id);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleComplete = () => {
    const passed = score >= passingScore;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    onComplete(score, passed, {
      totalQuestions,
      correctAnswers: correctCount,
      timeSpent,
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  if (showResults || isTimeUp) {
    const passed = score >= passingScore;
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    return (
      <div className="space-y-6 max-w-xl mx-auto py-8 text-center">
        <Card className="p-8 shadow-xl bg-card border border-border rounded-3xl relative overflow-hidden">
          {/* Confetti Decorative Accents */}
          <div className="absolute top-4 left-6 w-3 h-3 bg-amber-400 rounded-sm rotate-12 opacity-80" />
          <div className="absolute top-6 right-10 w-2.5 h-2.5 bg-rose-500 rounded-full opacity-80" />
          <div className="absolute bottom-8 left-10 w-3 h-3 bg-sky-400 rounded-full opacity-80" />
          <div className="absolute top-12 right-16 w-3 h-3 bg-emerald-500 rounded-sm -rotate-45 opacity-80" />

          {/* Green Circle Badge Icon (Image 4 Vibe) */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center border-4 border-emerald-200 dark:border-emerald-800 shadow-sm">
              <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-foreground mb-3 tracking-tight">
            {passed ? 'Module Passed!' : 'Assessment Complete'}
          </h2>

          {passed && (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs mb-4">
              <span>✨</span>
              <span>Certificate Unlocked!</span>
            </div>
          )}

          <p className="text-sm font-medium text-muted-foreground mb-6">
            You scored <strong className="text-sky-600 dark:text-sky-400 text-base font-extrabold">{correctCount}</strong> out of {totalQuestions}
          </p>

          {/* Action Button (Image 4 Pill Style) */}
          <div className="space-y-3">
            <Button
              onClick={handleComplete}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold h-12 text-base rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" />
              {passed ? 'Claim Your Certificate' : 'Review Course Material'}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setShowResults(false);
                setCurrentIndex(0);
                setSelectedAnswers({});
              }}
              className="w-full rounded-full text-xs font-bold text-muted-foreground hover:text-foreground h-9"
            >
              Retake Assessment
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-2xl mx-auto py-1">
      {/* Header & Inline Timer */}
      <div className="bg-card p-3 rounded-xl border border-border flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Final Assessment (50 Questions)</p>
          <h2 className="text-xs font-extrabold text-foreground truncate max-w-[280px]">{courseName}</h2>
        </div>
        <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1.5 rounded-lg border border-border">
          <Clock size={14} className="text-primary" />
          <span className="font-mono text-xs font-bold text-foreground">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress & Completely Visible Non-Scrollable 50 Question Grid */}
      <div className="bg-card p-4 rounded-xl border border-border space-y-3 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground">Progress: Question {currentIndex + 1} of {totalQuestions}</span>
          <span className="font-extrabold text-primary">{answeredCount}/{totalQuestions} Answered ({Math.round((answeredCount / totalQuestions) * 100)}%)</span>
        </div>

        {/* 50-Question Grid: NON-SCROLLABLE, High-Contrast White Text on All Buttons */}
        <div className="grid grid-cols-10 gap-1.5">
          {questions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isFlagged = flaggedQuestions.has(q.id);

            let bgStyle = 'bg-slate-700 text-white hover:bg-slate-600'; // Default un-answered: Crisp White on Dark Slate
            if (isCurrent) {
              bgStyle = 'bg-blue-600 text-white ring-2 ring-yellow-400 font-black scale-105 shadow-md';
            } else if (isAnswered) {
              bgStyle = 'bg-emerald-600 text-white font-bold hover:bg-emerald-500';
            } else if (isFlagged) {
              bgStyle = 'bg-amber-500 text-white font-bold hover:bg-amber-400';
            }

            return (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(idx)}
                className={`h-7 rounded-md text-xs font-extrabold transition-all flex items-center justify-center ${bgStyle}`}
                title={`Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-4 shadow-sm border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Question {currentIndex + 1} of {totalQuestions}</span>
          <button
            onClick={handleFlagQuestion}
            className={`text-xs font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
              flaggedQuestions.has(currentQuestion.id)
                ? 'text-amber-600 bg-amber-500/20 border border-amber-500/30'
                : 'text-muted-foreground hover:text-foreground bg-secondary/50'
            }`}
          >
            <Flag size={12} />
            {flaggedQuestions.has(currentQuestion.id) ? 'Flagged for Review' : 'Flag Question'}
          </button>
        </div>

        <h3 className="text-sm font-bold text-foreground mb-3 leading-snug">{currentQuestion.question}</h3>

        {/* Options List */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-primary bg-primary/10 font-bold text-foreground shadow-xs'
                    : 'border-border bg-card hover:bg-secondary/40 text-foreground'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-xs leading-tight">{option}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Senior-Accessible Navigation Footer */}
      <div className="flex items-center gap-3 pt-0.5">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex-1 text-xs font-bold h-10 border-border"
        >
          ← Previous Question
        </Button>

        {currentIndex === totalQuestions - 1 ? (
          <Button
            size="sm"
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-10 shadow-md"
          >
            Submit Final Assessment ✓
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-10 shadow-md"
          >
            Next Question →
          </Button>
        )}
      </div>
    </div>
  );
}
