// User & Auth Types
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course & Module Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  createdAt: Date;
  publishedAt?: Date;
  thumbnailUrl?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  content: string; // Rich text/HTML
  order: number;
  estimatedDuration: number; // in minutes
  createdAt: Date;
}

export interface StudentProgress {
  id: string;
  userId: string;
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt?: Date;
  timeSpent: number; // in seconds
}

// Exam Types
export interface Exam {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  duration: number; // in minutes
  passingScore: number; // percentage (0-100)
  createdAt: Date;
}

export type QuestionType = 'multiple_choice' | 'essay';

export interface ExamQuestion {
  id: string;
  examId: string;
  questionText: string;
  questionType: QuestionType;
  options?: string[]; // For multiple choice
  correctAnswer?: string;
  points: number;
  order: number;
}

export interface ExamSubmission {
  id: string;
  userId: string;
  examId: string;
  answers: Record<string, string>; // questionId -> answer
  score: number;
  passed: boolean;
  submittedAt: Date;
  gradedAt?: Date;
}

// Certificate Types
export interface Certificate {
  id: string;
  userId: string;
  moduleId?: string;
  examId?: string;
  issueDate: Date;
  expirationDate?: Date;
  certificateCode: string;
  pdfUrl?: string;
  createdAt: Date;
}

// Chatbot Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  moduleId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
