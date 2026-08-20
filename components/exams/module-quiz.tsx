'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, RotateCcw, ArrowRight, AlertCircle } from 'lucide-react';

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

  const passingScore = 70;
  const isPassed = score >= passingScore;

  const handleContinue = () => {
    onComplete(score, isPassed);
  };

  const correctCount = Object.keys(selectedAnswers).filter(
    (qId) => selectedAnswers[qId] === questions.find((q) => q.id === qId)?.correctAnswer
  ).length;

  if (showResults) {
    return (
      <div className="space-y-3 max-w-lg mx-auto font-sans">
        <Card className={`p-6 text-center shadow-lg bg-card border-2 ${isPassed ? 'border-emerald-500/40' : 'border-rose-500/40'} rounded-3xl space-y-4`}>
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPassed ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-300'}`}>
              <CheckCircle2 size={28} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              {isPassed ? 'Quiz Passed!' : 'Quiz Not Passed'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Final Score: <strong className={`text-base font-extrabold ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{score}%</strong> ({correctCount} of {questions.length} correct)
            </p>
            <p className="text-[11px] font-bold text-muted-foreground mt-1">
              Passing score required: {passingScore}%
            </p>
          </div>

          <div className="space-y-2 text-left pt-1">
            {questions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className="p-2.5 rounded-xl bg-secondary/30 border border-border text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-foreground truncate">Q{idx + 1}: {q.question}</span>
                    {isCorrect ? (
                      <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 font-bold text-[10px] px-2 py-0.5 shrink-0">✓ Correct</Badge>
                    ) : (
                      <Badge className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 font-bold text-[10px] px-2 py-0.5 shrink-0">✕ Incorrect</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            {isPassed ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetake}
                  className="rounded-full text-xs font-bold h-10 border-border flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  Retake Quiz
                </Button>
                <Button
                  size="sm"
                  onClick={handleContinue}
                  className="rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold h-10 shadow-sm flex items-center justify-center gap-1.5"
                >
                  Proceed to Next Module →
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                  You did not reach the 70% passing threshold. Please review the lesson and retake the quiz.
                </p>
                <Button
                  size="sm"
                  onClick={handleRetake}
                  className="w-full rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold h-10 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  Retake Quiz Now
                </Button>
              </div>
            )}
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

      {/* Question Card */}
      <Card className="p-4 shadow-sm border-border space-y-3">
        <div>
          <p className="text-[10px] text-sky-600 dark:text-sky-400 font-extrabold mb-0.5 uppercase tracking-wider">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h3 className="text-xs md:text-sm font-extrabold text-foreground leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            const isCorrectOption = idx === currentQuestion.correctAnswer;
            const hasAnsweredCurrent = selectedAnswers[currentQuestion.id] !== undefined;

            let optionStyle = 'border-border bg-card hover:bg-secondary/40 text-foreground';

            if (hasAnsweredCurrent && isSelected) {
              optionStyle = isCorrectOption
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 font-extrabold text-emerald-900 dark:text-emerald-200 shadow-2xs'
                : 'border-rose-500 bg-rose-50 dark:bg-rose-950/70 font-extrabold text-rose-900 dark:text-rose-200 shadow-2xs';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${optionStyle}`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? isCorrectOption
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-rose-600 bg-rose-600 text-white'
                      : 'border-muted-foreground'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-xs leading-tight font-medium">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Instant Answer Clue Feedback Card */}
        {selectedAnswers[currentQuestion.id] !== undefined && (
          <div className="pt-1">
            {selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-xs space-y-1 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">
                  <CheckCircle2 size={16} />
                  <span>Correct!</span>
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed">
                  {currentQuestion.explanation || 'Great job! You selected the right answer based on PNP standards.'}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                  <AlertCircle size={16} />
                  <span>Incorrect • Here&apos;s a Clue</span>
                </div>
                <p className="text-[11px] text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
                  <strong className="font-extrabold">💡 Clue:</strong> {currentQuestion.explanation || 'Review the module reading material to find the correct answer.'}
                </p>
              </div>
            )}
          </div>
        )}
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
