'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle2, AlertCircle } from 'lucide-react';

interface VerificationResult {
  valid: boolean;
  certificateCode: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  score?: number;
  verified?: boolean;
  message: string;
}

export default function CertificateVerificationPage() {
  const [certificateCode, setCertificateCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsSearching(true);

    // Simulate API call to verify certificate
    setTimeout(() => {
      if (certificateCode.length >= 8) {
        // Mock successful verification
        setResult({
          valid: true,
          certificateCode,
          studentName: 'PO1 Maria Santos',
          courseName: 'Police Ethics and Conduct',
          issueDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          score: 85,
          verified: true,
          message: 'Certificate verified successfully',
        });
      } else {
        setError('Certificate code must be at least 8 characters');
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Verify Certificate
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter a certificate code to verify its authenticity
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                Certificate Code
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="code"
                  type="text"
                  placeholder="e.g., CERT-2024-001234"
                  value={certificateCode}
                  onChange={(e) => setCertificateCode(e.target.value.toUpperCase())}
                  className="pl-10 bg-secondary/30"
                  disabled={isSearching}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSearching || !certificateCode}
            >
              {isSearching ? 'Verifying...' : 'Verify Certificate'}
            </Button>
          </form>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {result.valid ? (
              <>
                {/* Success State */}
                <Card className="border-l-4 border-l-green-500 bg-green-500/5 p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-700 mb-1">
                        Certificate Verified
                      </h3>
                      <p className="text-green-600/80 mb-4">
                        {result.message}
                      </p>

                      {/* Certificate Details */}
                      <div className="space-y-3 bg-white/50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">
                              Student Name
                            </p>
                            <p className="text-lg font-semibold text-foreground">
                              {result.studentName}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">
                              Course Name
                            </p>
                            <p className="text-lg font-semibold text-foreground">
                              {result.courseName}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">
                              Issue Date
                            </p>
                            <p className="text-lg font-semibold text-foreground">
                              {result.issueDate}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase">
                              Final Score
                            </p>
                            <p className="text-lg font-semibold text-primary">
                              {result.score}%
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            <strong>Certificate Code:</strong>
                          </p>
                          <p className="font-mono text-sm text-foreground">
                            {result.certificateCode}
                          </p>
                        </div>
                      </div>

                      <Badge className="mt-4 bg-green-500/20 text-green-700 border-green-500/30">
                        ✓ Authentic Certificate
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Verification Info */}
                <Card className="p-6 bg-blue-500/5 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-foreground mb-3">How to Use This Certificate</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-blue-600 flex-shrink-0">•</span>
                      <span>Download and print for official records</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 flex-shrink-0">•</span>
                      <span>Share the certificate code for instant verification</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 flex-shrink-0">•</span>
                      <span>Use for employment and professional advancement</span>
                    </li>
                  </ul>
                </Card>
              </>
            ) : (
              /* Invalid Certificate */
              <Card className="border-l-4 border-l-red-500 bg-red-500/5 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-700 mb-1">
                      Certificate Not Found
                    </h3>
                    <p className="text-red-600/80">
                      The certificate code could not be verified. Please check the code and try again.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Information Section */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-foreground mb-2">Secure</h3>
              <p className="text-sm text-muted-foreground">
                All certificates are digitally secured
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-semibold text-foreground mb-2">Instant</h3>
              <p className="text-sm text-muted-foreground">
                Verify certificates in seconds
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-semibold text-foreground mb-2">Official</h3>
              <p className="text-sm text-muted-foreground">
                Issued by Philippine National Police
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
