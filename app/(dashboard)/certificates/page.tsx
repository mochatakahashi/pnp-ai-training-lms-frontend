'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, Eye, Share2 } from 'lucide-react';
import { CertificateTemplate } from '@/components/certificates/certificate-template';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const certificates = [
  {
    id: 'cert-001',
    studentName: 'Maria Cruz',
    courseName: 'Police Ethics and Conduct',
    issueDate: '2024-01-15',
    certificateCode: 'PNP-2024-000001',
    instructorName: 'CPO Juan Santos',
    status: 'issued',
  },
  {
    id: 'cert-002',
    studentName: 'Maria Cruz',
    courseName: 'Community Policing Fundamentals',
    issueDate: '2024-01-10',
    certificateCode: 'PNP-2024-000002',
    instructorName: 'Insp. Maria Lopez',
    status: 'issued',
  },
];

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[0] | null
  >(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Certificates
        </h1>
        <p className="text-muted-foreground">
          {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} earned
        </p>
      </div>

      {certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-1 flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {cert.courseName}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instructor: {cert.instructorName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Issued: {cert.issueDate} • ID: {cert.certificateCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="bg-green-100/20 text-green-700 border-0">
                  Issued
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Certificate</DialogTitle>
                    </DialogHeader>
                    {selectedCertificate && (
                      <CertificateTemplate
                        studentName={selectedCertificate.studentName}
                        courseName={selectedCertificate.courseName}
                        issueDate={selectedCertificate.issueDate}
                        certificateCode={selectedCertificate.certificateCode}
                        instructorName={selectedCertificate.instructorName}
                      />
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Award className="mx-auto text-muted-foreground mb-4" size={48} />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No Certificates Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Complete courses and pass their exams to earn certificates.
          </p>
          <Button>
            <a href="/courses">Browse Courses</a>
          </Button>
        </Card>
      )}

      {/* Certificate Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-foreground mb-3">
          About Your Certificates
        </h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              Certificates are automatically generated when you pass an exam.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              Each certificate includes a unique verification code for authenticity
              checking.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              You can download certificates as PDF or image files for printing or
              sharing.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              All certificates are digitally signed and can be verified through the
              PNP LMS portal.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
