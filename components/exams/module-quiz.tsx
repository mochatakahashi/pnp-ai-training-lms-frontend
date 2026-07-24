'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface ModuleQuizProps {
  moduleId: string;
  moduleName: string;
  questions: Question[];
  onComplete: (score: number, passed: boolean) => void;
}

export function ModuleQuiz({ moduleId, moduleName, questions, onComplete }: ModuleQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const answered = selectedAnswers[currentQuestion.id] !== undefined;
  const passingScore = 80;

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleComplete = () => {
    const passed = score >= passingScore;
    onComplete(score, passed);
  };

  if (showResults) {
    const passed = score >= passingScore;
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {passed ? (
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            {passed ? 'Quiz Passed!' : 'Quiz Failed'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {passed
              ? 'Great work! You passed this module quiz.'
              : `You need ${passingScore}% to pass. Please review the module and try again.`}
          </p>

          <div className="bg-card rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
            <p className="text-sm text-muted-foreground">
              {Object.values(selectedAnswers).filter((ans, idx) => ans === questions[idx]?.correctAnswer).length} of{' '}
              {questions.length} questions correct
            </p>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
            {questions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className="text-left">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="flex-shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">Question {idx + 1}</p>
                      <p className="text-xs text-muted-foreground mt-1">{q.question}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleComplete}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {passed ? 'Continue to Next Module' : 'Review Module Content'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Module Quiz</p>
          <h2 className="text-xl font-bold text-foreground">{moduleName}</h2>
        </div>
        <Badge variant="secondary">
          Question {currentIndex + 1} of {questions.length}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">Progress</p>
          <p className="text-xs font-semibold text-foreground">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </p>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{currentQuestion.question}</h3>

        {/* Options */}
        <div className="space-y-3">
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
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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

        {currentIndex === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!answered}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!answered}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Next
          </Button>
        )}
      </div>

      {/* Unanswered Warning */}
      {!answered && (
        <p className="text-sm text-amber-600 text-center">
          Please select an answer to continue
        </p>
      )}
    </div>
  );
}
