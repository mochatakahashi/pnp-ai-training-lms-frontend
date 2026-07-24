'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExamResults } from '@/components/exams/exam-results';
import { CertificateTemplate } from '@/components/certificates/certificate-template';
import { Download, Home, FileText } from 'lucide-react';
import Link from 'next/link';

type CompletionStep = 'results' | 'certificate' | 'download';

export default function AssessmentCompletionPage() {
  const [currentStep, setCurrentStep] = useState<CompletionStep>('results');
  const [certificateData, setCertificateData] = useState({
    certificateNumber: `CERT-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    recipientName: 'PO1 Maria Santos',
    courseName: 'Police Ethics and Conduct',
    completionDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    score: 85,
  });

  const handleDownloadCertificate = () => {
    setCurrentStep('download');
  };

  const handleContinue = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'results' ? 'bg-primary text-primary-foreground' : 'bg-green-600 text-white'}`}>
              ✓
            </div>
            <p className="font-medium">Results</p>
          </div>
          <div className="flex-1 h-1 mx-4 bg-border" />
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'certificate' ? 'bg-primary text-primary-foreground' : currentStep === 'download' ? 'bg-green-600 text-white' : 'bg-secondary text-muted-foreground'}`}>
              2
            </div>
            <p className="font-medium">Certificate</p>
          </div>
          <div className="flex-1 h-1 mx-4 bg-border" />
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'download' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
              3
            </div>
            <p className="font-medium">Complete</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          {currentStep === 'results' && (
            <ExamResults
              courseId="course-1"
              courseName="Police Ethics and Conduct"
              correctAnswers={42}
              totalQuestions={50}
              timeSpent={4125}
              passed={true}
              certificateId={certificateData.certificateNumber}
              onDownloadCertificate={() => setCurrentStep('certificate')}
              onContinue={() => setCurrentStep('certificate')}
            />
          )}

          {currentStep === 'certificate' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30 mb-4">
                  Certificate Ready
                </Badge>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Your Certificate is Ready
                </h2>
                <p className="text-muted-foreground">
                  Download and share your certificate of completion
                </p>
              </div>

              <CertificateTemplate
                studentName={certificateData.recipientName}
                courseName={certificateData.courseName}
                issueDate={new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                certificateCode={certificateData.certificateNumber}
                score={certificateData.score}
                completionDate={certificateData.completionDate}
                instructorName="Philippine National Police"
              />

              <div className="mt-8 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('results')}
                  className="flex-1"
                >
                  Back to Results
                </Button>
                <Button
                  onClick={() => setCurrentStep('download')}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Next: Download
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'download' && (
            <div className="text-center space-y-8">
              <div>
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  All Set!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your certificate has been downloaded successfully
                </p>
              </div>

              {/* Certificate Summary */}
              <Card className="p-6 text-left space-y-4">
                <h3 className="font-semibold text-foreground">Certificate Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Certificate ID</p>
                    <p className="font-mono text-sm text-foreground">{certificateData.certificateNumber}</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Score</p>
                    <p className="text-lg font-bold text-primary">{certificateData.score}%</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Course</p>
                    <p className="font-medium text-foreground">{certificateData.courseName}</p>
                  </div>
                </div>
              </Card>

              {/* Next Steps */}
              <Card className="p-6 text-left bg-blue-500/5 border-l-4 border-l-blue-500">
                <h3 className="font-semibold text-foreground mb-3">Next Steps</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span>Your certificate has been saved to your device</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span>Certificate is also available in your PNP LMS account</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">✓</span>
                    <span>
                      You can verify it anytime using the certificate ID:{' '}
                      <span className="font-mono">{certificateData.certificateNumber}</span>
                    </span>
                  </li>
                </ul>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row">
                <Link href="/certificates/verify" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Verify Another Certificate
                  </Button>
                </Link>
                <Button
                  onClick={handleContinue}
                  className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <Card className="p-6 bg-amber-500/5 border-l-4 border-l-amber-500">
          <h4 className="font-semibold text-foreground mb-2">Keep Your Certificate Safe</h4>
          <p className="text-sm text-muted-foreground">
            Your certificate is an official credential from the Philippine National Police Learning Management System. Keep it in a safe place for future reference, employment applications, and professional advancement opportunities.
          </p>
        </Card>
      </div>
    </div>
  );
}
