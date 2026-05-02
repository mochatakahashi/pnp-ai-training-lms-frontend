import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, ClipboardList, BarChart3, Plus } from 'lucide-react';
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
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Administration Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage courses, students, exams, and analytics for the PNP LMS.
          </p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="flex items-center gap-2">
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
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <Badge variant="secondary" className="text-green-700 bg-green-100/20">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/admin/courses/new">
            <Button variant="outline" className="w-full justify-start">
              <Plus size={18} className="mr-2" />
              Create Course
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="outline" className="w-full justify-start">
              <BookOpen size={18} className="mr-2" />
              Manage Courses
            </Button>
          </Link>
          <Link href="/admin/students">
            <Button variant="outline" className="w-full justify-start">
              <Users size={18} className="mr-2" />
              Manage Students
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 size={18} className="mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Courses */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Courses</h2>
          <Link href="/admin/courses">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Course
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Students
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Modules
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Exams
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-border hover:bg-muted transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-foreground">
                    {course.title}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {course.students}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {course.modules}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {course.exams}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        course.status === 'published' ? 'secondary' : 'outline'
                      }
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
