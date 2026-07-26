'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, Award, TrendingUp, Target, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with API calls
const enrolledCourses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    progress: 65,
    modules: 5,
    completedModules: 3,
  },
  {
    id: '2',
    title: 'Community Policing Fundamentals',
    progress: 40,
    modules: 6,
    completedModules: 2,
  },
  {
    id: '3',
    title: 'Crisis Management and De-escalation',
    progress: 100,
    modules: 4,
    completedModules: 4,
  },
];

const recentExams = [
  {
    id: '1',
    title: 'Ethics Module Quiz',
    score: 85,
    passed: true,
    completedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Community Policing Final Exam',
    score: 78,
    passed: true,
    completedAt: '2024-01-10',
  },
];

const statistics = [
  { label: 'Courses Enrolled', value: 3, icon: BookOpen },
  { label: 'Hours Spent', value: 24.5, icon: Clock },
  { label: 'Completed Modules', value: 9, icon: CheckCircle },
  { label: 'Certificates Earned', value: 2, icon: Award },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Section with Background */}
      <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-0" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Officer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Continue your professional development with our training modules and certification programs.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">9 new modules available this week</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 flex items-start gap-4 hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20">
                <Icon className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {typeof stat.value === 'number' && stat.value % 1 !== 0
                    ? stat.value.toFixed(1)
                    : stat.value}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your enrolled courses</p>
              </div>
              <Link href="/courses">
                <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer bg-card/50 backdrop-blur border-border"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {course.completedModules} of {course.modules} modules completed
                      </p>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Continue
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <Progress value={course.progress} className="h-2 bg-secondary" />
                    <p className="text-xs font-medium text-accent">{course.progress}% complete</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Exams & Certificates */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Recent Exams
            </h2>
            <div className="space-y-3">
              {recentExams.map((exam) => (
                <Card key={exam.id} className="p-4 hover:shadow-lg hover:border-accent/50 transition-all duration-300 border-border/50 bg-card/50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm">{exam.title}</h3>
                    {exam.passed && (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                        <CheckCircle size={14} />
                        Passed
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-primary">{exam.score}%</p>
                  <p className="text-xs text-muted-foreground mt-2">{exam.completedAt}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Certificates
            </h2>
            <Link href="/certificates">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
                View All Certificates
              </Button>
            </Link>
          </div>

          <Card className="p-6 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent border border-accent/20 hover:border-accent/50 transition-colors">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-3">Recommended Next Steps</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Complete Crisis Management course
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Retake Community Policing exam
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Explore new communication skills course
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
