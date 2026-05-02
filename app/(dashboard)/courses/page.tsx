import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock } from 'lucide-react';
import Link from 'next/link';

const allCourses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    description: 'Learn the fundamental principles of professional ethics and conduct in policing.',
    instructor: 'CPO Juan Santos',
    enrolled: true,
    progress: 65,
    students: 1240,
    duration: '8 weeks',
    modules: 5,
  },
  {
    id: '2',
    title: 'Community Policing Fundamentals',
    description: 'Strategies for effective community engagement and relationship building.',
    instructor: 'Insp. Maria Lopez',
    enrolled: true,
    progress: 40,
    students: 980,
    duration: '6 weeks',
    modules: 6,
  },
  {
    id: '3',
    title: 'Crisis Management and De-escalation',
    description: 'Advanced techniques for managing critical situations and de-escalating conflicts.',
    instructor: 'P/Supt. Carlos Reyes',
    enrolled: true,
    progress: 100,
    students: 756,
    duration: '10 weeks',
    modules: 4,
  },
  {
    id: '4',
    title: 'Digital Forensics Basics',
    description: 'Introduction to digital evidence collection and preservation methods.',
    instructor: 'Insp. Ana Torres',
    enrolled: false,
    students: 523,
    duration: '8 weeks',
    modules: 7,
  },
  {
    id: '5',
    title: 'Traffic Law Enforcement',
    description: 'Comprehensive guide to traffic regulations, enforcement, and accident investigation.',
    instructor: 'CPO Robert Gonzales',
    enrolled: false,
    students: 1100,
    duration: '6 weeks',
    modules: 5,
  },
  {
    id: '6',
    title: 'Cybersecurity for Law Enforcement',
    description: 'Protect digital assets and understand cyber threats facing law enforcement.',
    instructor: 'P/Insp. David Aquino',
    enrolled: false,
    students: 342,
    duration: '7 weeks',
    modules: 6,
  },
];

export default function CoursesPage() {
  const enrolledCount = allCourses.filter((c) => c.enrolled).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Courses</h1>
        <p className="text-muted-foreground">
          {enrolledCount} course{enrolledCount !== 1 ? 's' : ''} enrolled • {allCourses.length} courses available
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary" className="cursor-pointer">All</Badge>
        <Badge variant="outline" className="cursor-pointer">Enrolled</Badge>
        <Badge variant="outline" className="cursor-pointer">Available</Badge>
        <Badge variant="outline" className="cursor-pointer">Completed</Badge>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map((course) => (
          <Card
            key={course.id}
            className="p-6 flex flex-col hover:shadow-lg transition-shadow overflow-hidden group"
          >
            {/* Course Header */}
            <div className="flex-1 space-y-3 mb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                </div>
                {course.enrolled && (
                  <Badge className="bg-green-100/20 text-green-700 border-green-200">
                    Enrolled
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>

              <p className="text-xs text-muted-foreground font-medium">
                Instructor: {course.instructor}
              </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-border mb-4">
              <div className="text-center">
                <BookOpen className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{course.modules}</p>
                <p className="text-xs font-medium">Modules</p>
              </div>
              <div className="text-center">
                <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{course.students}</p>
                <p className="text-xs font-medium">Students</p>
              </div>
              <div className="text-center">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{course.duration}</p>
                <p className="text-xs font-medium">Duration</p>
              </div>
            </div>

            {/* Action Button */}
            <div>
              {course.enrolled ? (
                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full">Continue Learning</Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full">
                  Enroll Now
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
