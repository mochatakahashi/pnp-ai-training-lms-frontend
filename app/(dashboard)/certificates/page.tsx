'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, Eye, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
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
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      {/* Subheader Back Navigation */}
      <div>
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white dark:bg-card border-border text-foreground hover:bg-secondary text-xs px-4 py-1.5 shadow-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Page Header Card */}
      <Card className="p-6 md:p-8 border border-border shadow-md rounded-2xl bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
              <Award className="text-sky-500" size={28} />
              My Certificates
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              View, verify, and download your earned PNP training credentials.
            </p>
          </div>
          <Badge className="bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700 font-extrabold text-xs px-3.5 py-1 rounded-full shadow-2xs hidden sm:inline-flex">
            {certificates.length} Certificate{certificates.length !== 1 ? 's' : ''} Earned
          </Badge>
        </div>
      </Card>

      {/* Certificates List */}
      {certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex-1 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100 dark:border-sky-900 shrink-0">
                  <Award size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-foreground">
                    {cert.courseName}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Instructor: <span className="font-bold text-foreground">{cert.instructorName}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Issued: {cert.issueDate} • Serial ID: <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{cert.certificateCode}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold text-[11px] px-3.5 py-1 rounded-full shadow-2xs inline-flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Issued
                </Badge>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCertificate(cert)}
                      className="rounded-full border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950 font-bold text-xs px-4 h-9 shadow-2xs flex items-center gap-1.5"
                    >
                      <Eye size={14} />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="font-extrabold text-lg">Certificate Details</DialogTitle>
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
                  className="rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs px-5 h-9 shadow-xs flex items-center gap-1.5"
                >
                  <Download size={14} />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center rounded-2xl border border-border bg-card shadow-xs space-y-4">
          <Award className="mx-auto text-muted-foreground/50" size={48} />
          <div>
            <h3 className="text-lg font-extrabold text-foreground">No Certificates Yet</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Complete learning modules and pass their exams to earn certificates.
            </p>
          </div>
          <Link href="/courses">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-full px-6 h-9 shadow-xs">
              Browse Courses →
            </Button>
          </Link>
        </Card>
      )}

      {/* Certificate Info Card */}
      <Card className="p-6 rounded-2xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/30 space-y-3">
        <h3 className="font-extrabold text-foreground text-sm flex items-center gap-2">
          <ShieldCheck size={18} className="text-sky-600 dark:text-sky-400" />
          About Your PNP Certificates
        </h3>
        <ul className="space-y-2 text-xs text-muted-foreground font-medium">
          <li className="flex items-center gap-2 text-foreground font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
            Certificates are automatically generated when you complete a course and pass its final quiz.
          </li>
          <li className="flex items-center gap-2 text-foreground font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
            Each certificate includes a unique verification code for official authenticity checks.
          </li>
          <li className="flex items-center gap-2 text-foreground font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
            All certificates are digitally signed and can be verified anytime on the PNP Verification page.
          </li>
        </ul>
      </Card>
    </div>
  );
}
