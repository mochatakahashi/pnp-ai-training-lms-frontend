'use client';

import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Question {
  id: string;
  questionText: string;
  questionType: 'multiple_choice' | 'essay';
  options?: string[];
  points: number;
  order: number;
}

interface QuestionCardProps {
  question: Question;
  answer?: string;
  onAnswerChange: (answer: string) => void;
}

export function QuestionCard({
  question,
  answer = '',
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <Card className="p-6 mb-6">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground flex-1">
            {question.order}. {question.questionText}
          </h3>
          <span className="text-sm font-medium text-primary ml-4 flex-shrink-0">
            {question.points} {question.points === 1 ? 'point' : 'points'}
          </span>
        </div>
      </div>

      {question.questionType === 'multiple_choice' ? (
        <RadioGroup value={answer} onValueChange={onAnswerChange}>
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                <Label
                  htmlFor={`${question.id}-${idx}`}
                  className="flex-1 cursor-pointer text-foreground"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <Textarea
          placeholder="Enter your answer here..."
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-32 resize-none"
        />
      )}
    </Card>
  );
}
