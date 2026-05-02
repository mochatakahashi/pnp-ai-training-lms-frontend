'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Eye, Plus, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const allCourses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    instructor: 'CPO Juan Santos',
    level: 'Beginner',
    subject: 'Ethics & Conduct',
    source: 'PNP Academy',
    students: 120,
    modules: 5,
    exams: 3,
    status: 'published',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Community Policing Fundamentals',
    instructor: 'Insp. Maria Lopez',
    level: 'Intermediate',
    subject: 'Community Relations',
    source: 'Local Training Center',
    students: 98,
    modules: 6,
    exams: 2,
    status: 'published',
    createdAt: '2024-01-05',
  },
  {
    id: '3',
    title: 'Crisis Management and De-escalation',
    instructor: 'P/Supt. Carlos Reyes',
    level: 'Advanced',
    subject: 'Crisis Management',
    source: 'PNP Academy',
    students: 87,
    modules: 4,
    exams: 2,
    status: 'published',
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    title: 'Digital Forensics Basics',
    instructor: 'Insp. Ana Torres',
    level: 'Intermediate',
    subject: 'Digital Forensics',
    source: 'Special Investigations Unit',
    students: 42,
    modules: 7,
    exams: 3,
    status: 'published',
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    title: 'Traffic Management & Enforcement',
    instructor: 'Supt. Miguel Santos',
    level: 'Beginner',
    subject: 'Traffic Management',
    source: 'Highway Patrol Group',
    students: 0,
    modules: 5,
    exams: 2,
    status: 'draft',
    createdAt: '2024-01-20',
  },
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const subjects = ['Ethics & Conduct', 'Community Relations', 'Crisis Management', 'Digital Forensics', 'Traffic Management'];
const sources = ['PNP Academy', 'Local Training Center', 'Special Investigations Unit', 'Highway Patrol Group'];

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesSubject = !selectedSubject || course.subject === selectedSubject;
    const matchesSource = !selectedSource || course.source === selectedSource;
    
    return matchesSearch && matchesLevel && matchesSubject && matchesSource;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Manage All Courses</h1>
          <p className="text-muted-foreground mt-2">Create, manage, and monitor all PNP training courses</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 h-11 px-6">
            <Plus size={18} />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 border-border">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search courses by title or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Filter Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level Filter */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Filter size={16} />
                Level
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedLevel(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    !selectedLevel
                      ? 'bg-primary/20 text-primary border border-primary'
                      : 'hover:bg-secondary/50 text-muted-foreground'
                  }`}
                >
                  All Levels
                </button>
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedLevel === level
                        ? 'bg-primary/20 text-primary border border-primary'
                        : 'hover:bg-secondary/50 text-muted-foreground'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Filter size={16} />
                Subject
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSubject(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    !selectedSubject
                      ? 'bg-primary/20 text-primary border border-primary'
                      : 'hover:bg-secondary/50 text-muted-foreground'
                  }`}
                >
                  All Subjects
                </button>
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedSubject === subject
                        ? 'bg-primary/20 text-primary border border-primary'
                        : 'hover:bg-secondary/50 text-muted-foreground'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Filter */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Filter size={16} />
                Source
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSource(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    !selectedSource
                      ? 'bg-primary/20 text-primary border border-primary'
                      : 'hover:bg-secondary/50 text-muted-foreground'
                  }`}
                >
                  All Sources
                </button>
                {sources.map(source => (
                  <button
                    key={source}
                    onClick={() => setSelectedSource(source)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedSource === source
                        ? 'bg-primary/20 text-primary border border-primary'
                        : 'hover:bg-secondary/50 text-muted-foreground'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
          <p className="text-3xl font-bold text-primary">{allCourses.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Published</p>
          <p className="text-3xl font-bold text-accent">{allCourses.filter(c => c.status === 'published').length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
          <p className="text-sm text-muted-foreground mb-1">Drafts</p>
          <p className="text-3xl font-bold text-orange-600">{allCourses.filter(c => c.status === 'draft').length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <p className="text-sm text-muted-foreground mb-1">Total Enrollments</p>
          <p className="text-3xl font-bold text-green-600">{allCourses.reduce((sum, c) => sum + c.students, 0)}</p>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="p-6 border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/20">
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Course</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Instructor</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Level</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Students</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Modules</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-border/30 hover:bg-secondary/30 transition-all duration-200 group">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-foreground group-hover:text-primary">{course.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{course.subject}</div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{course.instructor}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="bg-secondary/50">
                        {course.level}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                        {course.students}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-semibold">
                        {course.modules}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={course.status === 'published' ? 'secondary' : 'outline'}
                        className={course.status === 'published' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-orange-500/20 text-orange-700 dark:text-orange-400'}
                      >
                        {course.status}
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
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No courses match your filters
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
