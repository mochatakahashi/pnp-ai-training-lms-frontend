import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    instructor: 'CPO Juan Santos',
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
    students: 0,
    modules: 7,
    exams: 0,
    status: 'draft',
    createdAt: '2024-01-15',
  },
];

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
        <Link href="/admin/courses/new">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            New Course
          </Button>
        </Link>
      </div>

      {/* Courses Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Course
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Instructor
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
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-border hover:bg-muted transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {course.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: {course.createdAt}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-foreground">
                    {course.instructor}
                  </td>
                  <td className="py-4 px-4 text-foreground">
                    {course.students}
                  </td>
                  <td className="py-4 px-4 text-foreground">
                    {course.modules}
                  </td>
                  <td className="py-4 px-4 text-foreground">{course.exams}</td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        course.status === 'published' ? 'secondary' : 'outline'
                      }
                    >
                      {course.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        title="View"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Delete"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
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
