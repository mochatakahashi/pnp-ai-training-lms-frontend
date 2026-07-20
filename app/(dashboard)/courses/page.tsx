'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const allCourses = [
  {
    id: '1',
    title: 'Police Ethics and Conduct',
    description: 'Learn the fundamental principles of professional ethics and conduct in policing.',
    instructor: 'CPO Juan Santos',
    enrolled: true,
    progress: 65,
    duration: '8 weeks',
    modules: 5,
    status: 'enrolled',
  },
  {
    id: '2',
    title: 'Community Policing Fundamentals',
    description: 'Strategies for effective community engagement and relationship building.',
    instructor: 'Insp. Maria Lopez',
    enrolled: true,
    progress: 40,
    duration: '6 weeks',
    modules: 6,
    status: 'enrolled',
  },
  {
    id: '3',
    title: 'Crisis Management and De-escalation',
    description: 'Advanced techniques for managing critical situations and de-escalating conflicts.',
    instructor: 'P/Supt. Carlos Reyes',
    enrolled: true,
    progress: 100,
    duration: '10 weeks',
    modules: 4,
    status: 'completed',
  },
  {
    id: '4',
    title: 'Digital Forensics Basics',
    description: 'Introduction to digital evidence collection and preservation methods.',
    instructor: 'Insp. Ana Torres',
    enrolled: false,
    duration: '8 weeks',
    modules: 7,
    status: 'available',
  },
  {
    id: '5',
    title: 'Traffic Law Enforcement',
    description: 'Comprehensive guide to traffic regulations, enforcement, and accident investigation.',
    instructor: 'CPO Robert Gonzales',
    enrolled: false,
    duration: '6 weeks',
    modules: 5,
    status: 'available',
  },
  {
    id: '6',
    title: 'Cybersecurity for Law Enforcement',
    description: 'Protect digital assets and understand cyber threats facing law enforcement.',
    instructor: 'P/Insp. David Aquino',
    enrolled: false,
    duration: '7 weeks',
    modules: 6,
    status: 'available',
  },
];

export default function CoursesPage() {
  const [filterTab, setFilterTab] = useState('all');

  const getFilteredCourses = () => {
    switch (filterTab) {
      case 'enrolled':
        return allCourses.filter((c) => c.enrolled && c.status !== 'completed');
      case 'available':
        return allCourses.filter((c) => !c.enrolled);
      case 'completed':
        return allCourses.filter((c) => c.status === 'completed');
      default:
        return allCourses;
    }
  };

  const filteredCourses = getFilteredCourses();
  const enrolledCount = allCourses.filter((c) => c.enrolled && c.status !== 'completed').length;
  const completedCount = allCourses.filter((c) => c.status === 'completed').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Courses</h1>
        <p className="text-muted-foreground">
          {enrolledCount} course{enrolledCount !== 1 ? 's' : ''} enrolled • {completedCount} completed • {allCourses.length} total available
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            filterTab === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterTab('enrolled')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            filterTab === 'enrolled'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Enrolled
        </button>
        <button
          onClick={() => setFilterTab('available')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            filterTab === 'available'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setFilterTab('completed')}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            filterTab === 'completed'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
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
                {course.status === 'completed' && (
                  <Badge className="bg-green-100/20 text-green-700 border-green-200">
                    Completed
                  </Badge>
                )}
                {course.status === 'enrolled' && (
                  <Badge className="bg-blue-100/20 text-blue-700 border-blue-200">
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
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-border mb-4">
              <div className="text-center">
                <BookOpen className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{course.modules}</p>
                <p className="text-xs font-medium">Modules</p>
              </div>
              <div className="text-center">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{course.duration}</p>
                <p className="text-xs font-medium">Duration</p>
              </div>
            </div>

            {/* Progress Bar */}
            {course.enrolled && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium">Progress</span>
                  <span className="text-xs text-muted-foreground">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}

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

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found in this category.</p>
        </div>
      )}
    </div>
  );
}
