'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

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

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  const handleContinue = () => {
    onComplete(score, true);
  };

  const correctCount = Object.keys(selectedAnswers).filter(
    (qId) => selectedAnswers[qId] === questions.find((q) => q.id === qId)?.correctAnswer
  ).length;

  if (showResults) {
    return (
      <div className="space-y-3 max-w-lg mx-auto">
        <Card className="p-4 text-center shadow-md bg-card border-2 border-primary/20">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-foreground">Quiz Completed!</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Score: <strong className="text-primary text-sm font-extrabold">{score}%</strong> ({correctCount} of {questions.length} correct)
          </p>

          <div className="space-y-1.5 mt-3 text-left">
            {questions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className="p-2 rounded-lg bg-secondary/30 border border-border text-[11px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground truncate">Q{idx + 1}: {q.question}</span>
                    {isCorrect ? (
                      <Badge className="bg-green-600 text-white font-semibold text-[9px] px-1.5 py-0 flex-shrink-0">✓ Correct</Badge>
                    ) : (
                      <Badge className="bg-destructive text-destructive-foreground font-semibold text-[9px] px-1.5 py-0 flex-shrink-0">✕ Incorrect</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetake}
              className="text-xs font-bold h-9 border-border flex items-center justify-center gap-1"
            >
              <RotateCcw size={14} />
              Retake Quiz
            </Button>
            <Button
              size="sm"
              onClick={handleContinue}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9 flex items-center justify-center gap-1 shadow-sm"
            >
              Proceed to Next Module →
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* Quiz Header & Senior Friendly Progress */}
      <div className="flex items-center justify-between bg-card px-3 py-2 rounded-lg border border-border shadow-sm">
        <div>
          <p className="text-[10px] text-primary uppercase tracking-wider font-bold">Module Quiz</p>
          <h2 className="text-xs font-extrabold text-foreground truncate max-w-[240px]">{moduleName}</h2>
        </div>
        <Badge variant="secondary" className="text-xs font-bold px-2 py-0.5 bg-secondary text-foreground">
          Question {currentIndex + 1} of {questions.length}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card - Ultra Compact */}
      <Card className="p-3.5 shadow-sm border-border">
        <p className="text-[10px] text-primary font-bold mb-0.5 uppercase tracking-wider">Question {currentIndex + 1} of {questions.length}</p>
        <h3 className="text-xs font-bold text-foreground mb-2.5 leading-snug">{currentQuestion.question}</h3>

        {/* Options */}
        <div className="space-y-1.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-2 rounded-lg border text-left text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'border-primary bg-primary/10 font-bold text-foreground shadow-xs'
                    : 'border-border bg-card hover:bg-secondary/40 text-foreground'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                  }`}
                >
                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                <span className="text-xs leading-tight">{option}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Navigation Footer */}
      <div className="flex items-center gap-2 pt-0.5">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex-1 text-xs font-bold h-9 border-border"
        >
          ← Previous Question
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!answered}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9 shadow-sm"
          >
            Submit Quiz Answers ✓
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleNext}
            disabled={!answered}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold h-9 shadow-sm"
          >
            Next Question →
          </Button>
        )}
      </div>
    </div>
  );
}
