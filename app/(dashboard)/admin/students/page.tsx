'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Mail, Trash2, Eye, Search } from 'lucide-react';
import { useState } from 'react';

const students = [
  {
    id: '1',
    name: 'Maria Cruz',
    email: 'maria.cruz@pnp.gov.ph',
    role: 'Police Officer',
    organization: 'Manila Police District',
    coursesEnrolled: 3,
    coursesCompleted: 2,
    certificatesEarned: 2,
    overallProgress: 67,
    status: 'active',
    joinDate: '2024-01-01',
  },
  {
    id: '2',
    name: 'Juan Santos',
    email: 'juan.santos@pnp.gov.ph',
    role: 'Police Officer',
    organization: 'Quezon City Police',
    coursesEnrolled: 2,
    coursesCompleted: 1,
    certificatesEarned: 1,
    overallProgress: 50,
    status: 'active',
    joinDate: '2024-01-05',
  },
  {
    id: '3',
    name: 'Lucia Martinez',
    email: 'lucia.martinez@pnp.gov.ph',
    role: 'Police Officer',
    organization: 'Makati Police Station',
    coursesEnrolled: 1,
    coursesCompleted: 0,
    certificatesEarned: 0,
    overallProgress: 30,
    status: 'active',
    joinDate: '2024-01-10',
  },
  {
    id: '4',
    name: 'Ramon Flores',
    email: 'ramon.flores@pnp.gov.ph',
    role: 'Police Officer',
    organization: 'Las Piñas Police',
    coursesEnrolled: 3,
    coursesCompleted: 3,
    certificatesEarned: 3,
    overallProgress: 100,
    status: 'active',
    joinDate: '2023-12-15',
  },
  {
    id: '5',
    name: 'Ana Garcia',
    email: 'ana.garcia@pnp.gov.ph',
    role: 'Police Officer',
    organization: 'Pasig Police',
    coursesEnrolled: 2,
    coursesCompleted: 1,
    certificatesEarned: 1,
    overallProgress: 55,
    status: 'active',
    joinDate: '2024-01-12',
  },
];

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEnrollments = students.reduce((sum, s) => sum + s.coursesEnrolled, 0);
  const totalCompleted = students.reduce((sum, s) => sum + s.coursesCompleted, 0);
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.overallProgress, 0) / students.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Manage Students</h1>
        <p className="text-muted-foreground mt-2">Monitor officer progress, enrollments, and certificate achievement</p>
      </div>

      {/* Search */}
      <Card className="p-6 border-border">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search by name, email, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Total Students</p>
          <p className="text-3xl font-bold text-primary">{students.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Total Enrollments</p>
          <p className="text-3xl font-bold text-accent">{totalEnrollments}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <p className="text-sm text-muted-foreground mb-1">Courses Completed</p>
          <p className="text-3xl font-bold text-green-600">{totalCompleted}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <p className="text-sm text-muted-foreground mb-1">Avg Progress</p>
          <p className="text-3xl font-bold text-blue-600">{avgProgress}%</p>
        </Card>
      </div>

      {/* Students Table */}
      <Card className="p-6 border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/20">
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Student</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Organization</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Courses</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Progress</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Certificates</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-all duration-200 group"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary">
                          {student.name}
                        </p>
                        <button className="text-xs text-primary hover:underline mt-1 flex items-center gap-1">
                          <Mail size={12} />
                          {student.email}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">
                      {student.organization}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{student.coursesCompleted}/{student.coursesEnrolled}</span>
                        <span className="text-xs text-muted-foreground">complete</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 flex-1 max-w-xs">
                      <div className="space-y-2">
                        <Progress value={student.overallProgress} className="h-2" />
                        <p className="text-xs font-medium text-accent">{student.overallProgress}% complete</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-700 dark:text-green-400 font-semibold text-sm">
                        {student.certificatesEarned}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-secondary rounded-lg"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-destructive/10 text-destructive hover:text-destructive"
                          title="Remove Student"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No students found matching your search
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
