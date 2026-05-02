'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, ClipboardList, BarChart3, Plus, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const adminStats = [
  { label: 'Total Courses', value: 8, icon: BookOpen, change: '+2' },
  { label: 'Active Students', value: 342, icon: Users, change: '+18' },
  { label: 'Exams Created', value: 24, icon: ClipboardList, change: '+3' },
  { label: 'Avg. Pass Rate', value: '78%', icon: BarChart3, change: '+5%' },
];

const recentCourses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    students: 120,
    modules: 5,
    exams: 3,
    status: 'published',
  },
  {
    id: '2',
    title: 'Community Policing Fundamentals',
    students: 98,
    modules: 6,
    exams: 2,
    status: 'published',
  },
  {
    id: '3',
    title: 'Crisis Management and De-escalation',
    students: 87,
    modules: 4,
    exams: 2,
    status: 'draft',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Administration Dashboard
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System online • Manage courses, students, exams, and analytics for the PNP LMS
          </p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 h-11 px-6">
            <Plus size={18} />
            New Course
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur border-border group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                  <Icon className="text-primary" size={24} />
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 flex items-center gap-1 font-semibold">
                  <TrendingUp size={14} />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-4xl font-bold text-foreground mt-2">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-all">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/admin/courses/new">
            <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/10 hover:border-primary/50 h-11 group">
              <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
              Create Course
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/10 hover:border-primary/50 h-11 group">
              <BookOpen size={18} className="mr-2 group-hover:scale-110 transition-transform" />
              Manage Courses
            </Button>
          </Link>
          <Link href="/admin/students">
            <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/10 hover:border-primary/50 h-11 group">
              <Users size={18} className="mr-2 group-hover:scale-110 transition-transform" />
              Manage Students
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="outline" className="w-full justify-start border-border hover:bg-primary/10 hover:border-primary/50 h-11 group">
              <BarChart3 size={18} className="mr-2 group-hover:scale-110 transition-transform" />
              View Analytics
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Courses */}
      <Card className="p-6 hover:shadow-xl transition-all border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Recent Courses
          </h2>
          <Link href="/admin/courses">
            <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/20">
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">
                  Course
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">
                  Students
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">
                  Modules
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">
                  Exams
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-border/30 hover:bg-secondary/30 transition-all duration-200 group"
                >
                  <td className="py-4 px-4 font-medium text-foreground group-hover:text-primary">
                    {course.title}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                      {course.students}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-semibold">
                      {course.modules}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-foreground font-semibold">
                      {course.exams}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        course.status === 'published' ? 'secondary' : 'outline'
                      }
                      className={course.status === 'published' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : ''}
                    >
                      {course.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
