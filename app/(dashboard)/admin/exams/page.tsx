'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Eye, Plus, Search, BarChart3 } from 'lucide-react';
import { useState } from 'react';

const allExams = [
  {
    id: '1',
    title: 'Police Ethics Module Exam',
    course: 'Police Ethics and Conduct',
    totalTakers: 120,
    completed: 115,
    passed: 103,
    averageScore: 82,
    passingScore: 70,
    createdAt: '2024-01-01',
    status: 'published',
  },
  {
    id: '2',
    title: 'Community Policing Mid-Term',
    course: 'Community Policing Fundamentals',
    totalTakers: 98,
    completed: 92,
    passed: 78,
    averageScore: 76,
    passingScore: 70,
    createdAt: '2024-01-10',
    status: 'published',
  },
  {
    id: '3',
    title: 'Crisis Management Final Exam',
    course: 'Crisis Management and De-escalation',
    totalTakers: 87,
    completed: 84,
    passed: 72,
    averageScore: 79,
    passingScore: 75,
    createdAt: '2024-01-15',
    status: 'published',
  },
  {
    id: '4',
    title: 'Digital Forensics Quiz 1',
    course: 'Digital Forensics Basics',
    totalTakers: 42,
    completed: 38,
    passed: 35,
    averageScore: 85,
    passingScore: 70,
    createdAt: '2024-01-20',
    status: 'published',
  },
  {
    id: '5',
    title: 'Traffic Management Assessment',
    course: 'Traffic Management & Enforcement',
    totalTakers: 0,
    completed: 0,
    passed: 0,
    averageScore: 0,
    passingScore: 70,
    createdAt: '2024-01-25',
    status: 'draft',
  },
];

export default function AdminExamsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = allExams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completionRate = (completed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const passRate = (passed: number, completed: number) => {
    if (completed === 0) return 0;
    return Math.round((passed / completed) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Monitor Exams</h1>
          <p className="text-muted-foreground mt-2">Create, manage, and track exam performance and completion</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 h-11 px-6">
          <Plus size={18} />
          Create Exam
        </Button>
      </div>

      {/* Search */}
      <Card className="p-6 border-border">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search exams by title or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </Card>

      {/* Exam Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Total Exams</p>
          <p className="text-3xl font-bold text-primary">{allExams.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Active Exams</p>
          <p className="text-3xl font-bold text-accent">{allExams.filter(e => e.status === 'published').length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <p className="text-sm text-muted-foreground mb-1">Total Takers</p>
          <p className="text-3xl font-bold text-green-600">{allExams.reduce((sum, e) => sum + e.totalTakers, 0)}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <p className="text-sm text-muted-foreground mb-1">Avg Pass Rate</p>
          <p className="text-3xl font-bold text-blue-600">
            {allExams.length > 0 ? Math.round(allExams.reduce((sum, e) => sum + passRate(e.passed, e.completed), 0) / allExams.filter(e => e.completed > 0).length) : 0}%
          </p>
        </Card>
      </div>

      {/* Exams Table */}
      <Card className="p-6 border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/20">
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Exam</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Course</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Total Takers</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Completed</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Passed</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Avg Score</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <tr key={exam.id} className="border-b border-border/30 hover:bg-secondary/30 transition-all duration-200 group">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-foreground group-hover:text-primary">{exam.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">Created: {exam.createdAt}</div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{exam.course}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                          {exam.totalTakers}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">{exam.completed}</span>
                        <span className="text-xs text-muted-foreground">({completionRate(exam.completed, exam.totalTakers)}%)</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">{exam.passed}</span>
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 text-xs">
                          {passRate(exam.passed, exam.completed)}%
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {exam.completed > 0 ? (
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-accent" />
                          <span className="font-semibold text-foreground">{exam.averageScore}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={exam.status === 'published' ? 'secondary' : 'outline'}
                        className={exam.status === 'published' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-orange-500/20 text-orange-700 dark:text-orange-400'}
                      >
                        {exam.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    No exams found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
