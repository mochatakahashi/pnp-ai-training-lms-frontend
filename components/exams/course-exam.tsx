'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

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
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
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
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const timePercentage = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

  if (showResults || isTimeUp) {
    const passed = score >= passingScore;
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {passed ? (
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">
            {passed ? 'Congratulations!' : 'Exam Not Passed'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {passed
              ? 'You have successfully completed this course!'
              : `You need ${passingScore}% to pass. Your score: ${score}%`}
          </p>

          {isTimeUp && !passed && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="font-medium text-amber-600 text-sm">Time Limit Exceeded</p>
                <p className="text-xs text-amber-600/80">Your exam was submitted due to time limit.</p>
              </div>
            </div>
          )}

          {/* Score Card */}
          <Card className="p-8 mb-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                <p className="text-4xl font-bold text-primary">{score}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Correct Answers</p>
                <p className="text-4xl font-bold text-green-600">{correctCount}/{totalQuestions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Passing Score</p>
                <p className="text-4xl font-bold text-blue-600">{passingScore}%</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleComplete}
            className="w-full bg-primary hover:bg-primary/90 h-12"
            size="lg"
          >
            {passed ? 'Download Certificate' : 'Review Course Material'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Course Final Exam</p>
          <h2 className="text-2xl font-bold text-foreground">{courseName}</h2>
        </div>
        <div className={`text-center p-3 rounded-lg ${timeLeft < 300 ? 'bg-red-500/10' : 'bg-secondary'}`}>
          <div className="flex items-center gap-2 justify-center mb-1">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-600' : 'text-muted-foreground'}`} />
            <p className={`font-mono font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-foreground'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
          <Progress value={timePercentage} className="h-1 w-32" />
        </div>
      </div>

      {/* Progress Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions} • {answeredCount} answered
        </p>
        <Badge variant="secondary">
          {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Progress
        </Badge>
      </div>

      {/* Question Grid Preview */}
      <div className="grid grid-cols-10 gap-2">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => handleJumpToQuestion(idx)}
            className={`aspect-square rounded-lg text-xs font-medium transition-all ${
              currentIndex === idx
                ? 'ring-2 ring-primary bg-primary text-primary-foreground'
                : selectedAnswers[q.id] !== undefined
                ? 'bg-green-500 text-white'
                : flaggedQuestions.has(q.id)
                ? 'bg-amber-500 text-white'
                : 'bg-secondary hover:bg-secondary/80 text-foreground'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-foreground mb-6">{currentQuestion.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedAnswers[currentQuestion.id] === idx
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAnswers[currentQuestion.id] === idx
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {selectedAnswers[currentQuestion.id] === idx && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span className="font-medium text-foreground">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Flag Button */}
        <button
          onClick={handleFlagQuestion}
          className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
            flaggedQuestions.has(currentQuestion.id)
              ? 'text-amber-600 bg-amber-500/10'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          {flaggedQuestions.has(currentQuestion.id) ? '📌 Flagged' : '🚩 Flag for Review'}
        </button>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex-1"
        >
          Previous
        </Button>

        {currentIndex === totalQuestions - 1 ? (
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Submit Exam
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
