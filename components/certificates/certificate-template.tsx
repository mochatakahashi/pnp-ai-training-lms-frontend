'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2 } from 'lucide-react';

interface CertificateTemplateProps {
  studentName: string;
  courseName: string;
  issueDate: string;
  certificateCode: string;
  instructorName?: string;
}

export function CertificateTemplate({
  studentName,
  courseName,
  issueDate,
  certificateCode,
  instructorName = 'Philippine National Police Training Division',
}: CertificateTemplateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificate-${certificateCode}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `Certificate-${certificateCode}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className="w-full bg-white p-12 border-8 border-primary relative shadow-lg"
        style={{
          aspectRatio: '1.4',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3CpatternId="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="20" cy="20" r="1" fill="%23003D7A" opacity="0.05"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%" height="100%" fill="url(%23pattern)"/%3E%3C/svg%3E")',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 pb-8 border-b-2 border-primary/30">
          <div className="text-primary text-4xl font-bold mb-2">
            🏛️
          </div>
          <h1 className="text-3xl font-bold text-primary mb-1">
            Philippine National Police
          </h1>
          <p className="text-lg text-primary/70">Learning Management System</p>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm tracking-widest uppercase mb-2">
            Certificate of Completion
          </p>
          <p className="text-gray-500 text-xs">This is to certify that</p>
        </div>

        {/* Student Name */}
        <div className="text-center mb-8 py-6">
          <p className="text-3xl font-bold text-primary mb-1">
            {studentName}
          </p>
          <div className="w-3/4 mx-auto border-b-2 border-primary/30"></div>
        </div>

        {/* Certificate Body */}
        <div className="text-center mb-8 px-12">
          <p className="text-gray-700 text-base leading-relaxed">
            has successfully completed the course
          </p>
          <p className="text-2xl font-semibold text-primary mt-2">
            {courseName}
          </p>
          <p className="text-gray-600 text-sm mt-4">
            demonstrating proficiency in the subject matter and commitment to
            professional development.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-12 px-12">
          {/* Instructor Signature */}
          <div className="text-center">
            <div className="w-32 border-t-2 border-gray-400 mb-1"></div>
            <p className="text-xs text-gray-600 font-medium">
              {instructorName}
            </p>
          </div>

          {/* Date and Certificate Code */}
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Issued:</strong> {issueDate}
            </p>
            <p className="text-xs text-gray-600">
              <strong>Certificate ID:</strong> {certificateCode}
            </p>
          </div>

          {/* Seal */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center text-primary text-2xl">
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2"
        >
          <Download size={18} />
          Download as PDF
        </Button>
        <Button
          variant="outline"
          onClick={handleDownloadImage}
          className="flex items-center gap-2"
        >
          <Download size={18} />
          Download as Image
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 size={18} />
          Share
        </Button>
      </div>

      {/* Verification Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold mb-2">Certificate Verification</p>
        <p>
          This certificate can be verified at: <strong>https://pnp-lms.gov.ph/verify/{certificateCode}</strong>
        </p>
      </div>
    </div>
  );
}
