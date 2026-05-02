import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Trash2, Eye } from 'lucide-react';

const students = [
  {
    id: '1',
    name: 'Maria Cruz',
    email: 'maria.cruz@pnp.gov.ph',
    role: 'Police Officer',
    organization: 'Manila Police District',
    coursesEnrolled: 3,
    certificatesEarned: 2,
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
    certificatesEarned: 1,
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
    certificatesEarned: 0,
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
    certificatesEarned: 3,
    status: 'active',
    joinDate: '2023-12-15',
  },
];

export default function AdminStudentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-foreground">Manage Students</h1>

      {/* Students Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Organization
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Courses
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Certificates
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
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border hover:bg-muted transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {student.role}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-primary hover:underline flex items-center gap-1">
                      <Mail size={14} />
                      {student.email}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-foreground">
                    {student.organization}
                  </td>
                  <td className="py-4 px-4 text-foreground">
                    {student.coursesEnrolled}
                  </td>
                  <td className="py-4 px-4 text-foreground">
                    {student.certificatesEarned}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary">{student.status}</Badge>
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
                        title="Remove"
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
