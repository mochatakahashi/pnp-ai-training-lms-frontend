'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, BookOpen, Award, BarChart3, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';

const topCourses = [
  { name: 'Police Ethics and Conduct', students: 120, avgScore: 88, passRate: 92 },
  { name: 'Community Policing Fundamentals', students: 98, avgScore: 84, passRate: 89 },
  { name: 'Crisis Management & De-escalation', students: 87, avgScore: 82, passRate: 86 },
  { name: 'Digital Forensics Basics', students: 42, avgScore: 91, passRate: 95 },
];

const regionalCompliance = [
  { region: 'NCR - National Capital Region', enrolled: 450, completed: 390, rate: 87 },
  { region: 'Region 3 - Central Luzon', enrolled: 320, completed: 275, rate: 85 },
  { region: 'Region 7 - Central Visayas', enrolled: 280, completed: 240, rate: 86 },
  { region: 'Region 11 - Davao Region', enrolled: 210, completed: 180, rate: 85 },
  { region: 'PRO CAR - Cordillera', enrolled: 160, completed: 142, rate: 88 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-1">Executive Analytics</Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Analytics & Command Reporting</h1>
          <p className="text-sm text-muted-foreground mt-1">
            System-wide performance metrics, regional compliance rates, and officer exam completion statistics.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Total Enrolled Officers</p>
              <p className="text-3xl font-extrabold text-primary">1,420</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl">
              <Users className="text-primary" size={24} />
            </div>
          </div>
          <p className="text-[11px] text-green-600 font-bold flex items-center gap-1">
            <TrendingUp size={12} /> +8.4% monthly increase
          </p>
        </Card>

        <Card className="p-5 border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Average Pass Rate</p>
              <p className="text-3xl font-extrabold text-accent">86%</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-xl">
              <BarChart3 className="text-accent" size={24} />
            </div>
          </div>
          <p className="text-[11px] text-green-600 font-bold flex items-center gap-1">
            <TrendingUp size={12} /> Exceeds 80% PNP threshold
          </p>
        </Card>

        <Card className="p-5 border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Course Completion</p>
              <p className="text-3xl font-extrabold text-green-600">87%</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl">
              <BookOpen className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-[11px] text-green-600 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> 1,227 Modules Finished
          </p>
        </Card>

        <Card className="p-5 border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Certificates Issued</p>
              <p className="text-3xl font-extrabold text-blue-600">980</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Award className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
            <ShieldCheck size={12} /> 100% Authenticated
          </p>
        </Card>
      </div>

      {/* Regional Compliance & Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Compliance Bar */}
        <Card className="p-6 border-border shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Regional Command Compliance
            </h2>
            <Badge variant="outline" className="text-xs font-bold bg-primary/10 text-primary">
              All PRO Regions
            </Badge>
          </div>

          <div className="space-y-4">
            {regionalCompliance.map((reg) => (
              <div key={reg.region} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{reg.region}</span>
                  <span className="font-extrabold text-primary">{reg.completed}/{reg.enrolled} ({reg.rate}%)</span>
                </div>
                <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${reg.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Courses & Scores */}
        <Card className="p-6 border-border shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Course Enrollment & Exam Performance
            </h2>
            <Badge variant="outline" className="text-xs font-bold bg-accent/10 text-accent">
              Active Courses
            </Badge>
          </div>

          <div className="space-y-3">
            {topCourses.map((course) => (
              <div key={course.name} className="p-3 rounded-xl bg-secondary/30 border border-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold text-foreground">{course.name}</p>
                  <Badge className="bg-green-600 text-white text-[10px] font-bold">
                    {course.passRate}% Pass Rate
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Enrolled Personnel: <strong className="text-foreground font-bold">{course.students} Officers</strong></span>
                  <span>Avg Exam Score: <strong className="text-primary font-bold">{course.avgScore}%</strong></span>
                </div>
                <Progress value={course.avgScore} className="h-1.5" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
