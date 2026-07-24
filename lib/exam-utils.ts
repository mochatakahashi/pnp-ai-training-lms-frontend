/**
 * Exam and assessment utilities for score calculation, validation, and grading
 */

export const PASSING_SCORES = {
  MODULE_QUIZ: 80, // Modules require 80% to pass
  COURSE_EXAM: 80, // Course final exam requires 80% to pass
};

/**
 * Calculate exam score based on correct answers
 */
export function calculateScore(
  totalQuestions: number,
  correctAnswers: number
): number {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
}

/**
 * Check if score is passing
 */
export function isPassingScore(
  score: number,
  passingThreshold: number = PASSING_SCORES.COURSE_EXAM
): boolean {
  return score >= passingThreshold;
}

/**
 * Validate exam submission (check for incomplete submissions, time violations, etc.)
 */
export interface ExamValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateExamSubmission(
  totalQuestions: number,
  answeredQuestions: number,
  timeUsed: number,
  timeLimit: number
): ExamValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if all questions are answered
  if (answeredQuestions < totalQuestions) {
    warnings.push(`${totalQuestions - answeredQuestions} questions were not answered`);
  }

  // Check if time exceeded
  if (timeUsed > timeLimit) {
    warnings.push('Time limit was exceeded');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Grade answer for multiple choice
 */
export function gradeMultipleChoice(
  selectedAnswer: number | undefined,
  correctAnswer: number
): boolean {
  return selectedAnswer === correctAnswer;
}

/**
 * Determine letter grade from percentage score
 */
export function getLetterGrade(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

/**
 * Generate exam report
 */
export interface ExamReport {
  scorePercentage: number;
  letterGrade: string;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  timeSpent: string;
  feedback: string;
}

export function generateExamReport(
  correctAnswers: number,
  totalQuestions: number,
  timeSpentSeconds: number,
  passingScore: number = PASSING_SCORES.COURSE_EXAM
): ExamReport {
  const scorePercentage = calculateScore(totalQuestions, correctAnswers);
  const letterGrade = getLetterGrade(scorePercentage);
  const passed = isPassingScore(scorePercentage, passingScore);

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeSpent = `${minutes}m ${seconds}s`;

  let feedback = '';
  if (passed) {
    if (scorePercentage === 100) {
      feedback = 'Perfect score! Outstanding performance!';
    } else if (scorePercentage >= 95) {
      feedback = 'Excellent work! You demonstrated mastery of the material.';
    } else if (scorePercentage >= 90) {
      feedback = 'Great job! You passed with flying colors.';
    } else {
      feedback = 'Congratulations! You passed the exam.';
    }
  } else {
    feedback = `Unfortunately, you did not meet the passing score of ${passingScore}%. Please review the material and try again.`;
  }

  return {
    scorePercentage,
    letterGrade,
    totalQuestions,
    correctAnswers,
    passed,
    timeSpent,
    feedback,
  };
}

/**
 * Calculate time remaining as percentage
 */
export function calculateTimeRemainingPercentage(
  secondsRemaining: number,
  totalSeconds: number
): number {
  return Math.max(0, (secondsRemaining / totalSeconds) * 100);
}

/**
 * Format time for display
 */
export function formatTimeDisplay(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

/**
 * Determine if time is running out (less than 5 minutes)
 */
export function isTimeRunningOut(seconds: number): boolean {
  return seconds < 300; // Less than 5 minutes
}
