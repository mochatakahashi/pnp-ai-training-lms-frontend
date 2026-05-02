'use client'

import { Card } from '@/components/ui/card';
import { LineChart, BarChart, PieChart, TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const topCourses = [
  { name: 'Police Ethics and Conduct', students: 120, avgScore: 82 },
  { name: 'Community Policing Fundamentals', students: 98, avgScore: 76 },
  { name: 'Crisis Management', students: 87, avgScore: 79 },
  { name: 'Digital Forensics Basics', students: 42, avgScore: 85 },
];

const studentMetrics = [
  { name: 'Beginner Officers', count: 85, percentage: 35 },
  { name: 'Intermediate Officers', count: 120, percentage: 50 },
  { name: 'Advanced Officers', count: 40, percentage: 15 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Analytics & Reporting</h1>
        <p className="text-muted-foreground mt-2">System-wide performance metrics and training statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                Enrollment Rate
              </p>
              <p className="text-4xl font-bold text-primary">94%</p>
            </div>
            <TrendingUp className="text-primary" size={28} />
          </div>
          <p className="text-xs text-green-600 font-medium">
            +8% from last month
          </p>
        </Card>

        <Card className="p-6 hover:shadow-xl hover:border-accent/50 transition-all duration-300 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                Average Pass Rate
              </p>
              <p className="text-4xl font-bold text-accent">78%</p>
            </div>
            <BarChart className="text-accent" size={28} />
          </div>
          <p className="text-xs text-green-600 font-medium">
            +5% from last month
          </p>
        </Card>

        <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                Completion Rate
              </p>
              <p className="text-4xl font-bold text-green-600">68%</p>
            </div>
            <BookOpen className="text-green-600" size={28} />
          </div>
          <p className="text-xs text-green-600 font-medium">
            +3% from last month
          </p>
        </Card>

        <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                Total Certificates
              </p>
              <p className="text-4xl font-bold text-blue-600">156</p>
            </div>
            <Award className="text-blue-600" size={28} />
          </div>
          <p className="text-xs text-green-600 font-medium">
            +12 this month
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Enrollment Trends
          </h3>
          <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-lg border border-border/50">
            <div className="text-center">
              <LineChart className="mx-auto text-muted-foreground mb-3" size={48} />
              <p className="text-sm text-muted-foreground">Chart visualization placeholder</p>
              <p className="text-xs text-muted-foreground mt-2">Monthly enrollment trend data</p>
            </div>
          </div>
        </Card>

        {/* Course Performance */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-accent" />
            Course Performance
          </h3>
          <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-lg border border-border/50">
            <div className="text-center">
              <BarChart className="mx-auto text-muted-foreground mb-3" size={48} />
              <p className="text-sm text-muted-foreground">Chart visualization placeholder</p>
              <p className="text-xs text-muted-foreground mt-2">Course pass rates comparison</p>
            </div>
          </div>
        </Card>

        {/* Student Distribution */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-600" />
            Student Distribution
          </h3>
          <div className="space-y-4">
            {studentMetrics.map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{metric.name}</p>
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                    {metric.count} officers
                  </span>
                </div>
                <Progress value={metric.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{metric.percentage}% of total</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Courses */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Top Courses by Enrollment
          </h3>
          <div className="space-y-4">
            {topCourses.map((course, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground">{course.name}</p>
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent">
                    {course.students} enrolled
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Pass Rate</span>
                  <span className="font-semibold text-green-600">{course.avgScore}%</span>
                </div>
                <Progress value={course.avgScore} className="h-1.5 mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-green-500/10 border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-6">Summary Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Active Students</p>
            <p className="text-3xl font-bold text-foreground">245</p>
            <p className="text-xs text-green-600 mt-2">+15 this week</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Course Modules</p>
            <p className="text-3xl font-bold text-foreground">18</p>
            <p className="text-xs text-green-600 mt-2">All published</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Average Training Hours</p>
            <p className="text-3xl font-bold text-foreground">16.5h</p>
            <p className="text-xs text-green-600 mt-2">+2.3h from last month</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
