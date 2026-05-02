import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, Award } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Maria</h1>
        <p className="text-muted-foreground">
          Continue your learning journey with the Philippine National Police training platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
              <Link href="/courses">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.completedModules} of {course.modules} modules completed
                      </p>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm">Continue</Button>
                    </Link>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{course.progress}% complete</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Exams & Certificates */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Exams</h2>
            <div className="space-y-3">
              {recentExams.map((exam) => (
                <Card key={exam.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm">{exam.title}</h3>
                    {exam.passed && (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100/20 text-green-700 px-2 py-1 rounded">
                        <CheckCircle size={14} />
                        Passed
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-primary">{exam.score}%</p>
                  <p className="text-xs text-muted-foreground mt-2">{exam.completedAt}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Certificates</h2>
            <Link href="/certificates">
              <Button className="w-full">View All Certificates</Button>
            </Link>
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Next Steps</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Complete Crisis Management course
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Retake Community Policing exam
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Explore new communication skills course
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
