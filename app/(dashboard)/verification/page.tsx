'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Mock certificate data
const certificateDatabase = {
  'CERT-2024-001-PNP': {
    name: 'Officer Maria Cruz',
    course: 'Police Ethics and Conduct',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    status: 'valid',
    verificationCode: 'CERT-2024-001-PNP',
  },
  'CERT-2024-002-PNP': {
    name: 'Officer Juan Santos',
    course: 'Community Policing Fundamentals',
    issueDate: '2024-01-20',
    expiryDate: '2026-01-20',
    status: 'valid',
    verificationCode: 'CERT-2024-002-PNP',
  },
  'CERT-2024-003-PNP': {
    name: 'Officer Carlos Reyes',
    course: 'Crisis Management and De-escalation',
    issueDate: '2024-01-10',
    expiryDate: '2025-01-10',
    status: 'expired',
    verificationCode: 'CERT-2024-003-PNP',
  },
};

export default function VerificationPage() {
  const [serialNumber, setSerialNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const result = certificateDatabase[serialNumber.toUpperCase()];
      if (result) {
        setVerificationResult({
          found: true,
          ...result,
        });
      } else {
        setVerificationResult({
          found: false,
          message: 'Certificate not found. Please check the serial number and try again.',
        });
      }
      setIsSearching(false);
    }, 500);
  };

  const handleReset = () => {
    setSerialNumber('');
    setVerificationResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Certificate Verification</h1>
        <p className="text-muted-foreground">
          Verify the authenticity of PNP training certificates by entering the serial number.
        </p>
      </div>

      {/* Search Card */}
      <Card className="p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <Label htmlFor="serial" className="text-base font-semibold mb-2 block">
              Certificate Serial Number
            </Label>
            <div className="flex gap-2">
              <Input
                id="serial"
                placeholder="e.g., CERT-2024-001-PNP"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                disabled={isSearching}
                className="text-base"
              />
              <Button
                type="submit"
                disabled={!serialNumber || isSearching}
                className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
              >
                <Search className="w-4 h-4 mr-2" />
                {isSearching ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Results */}
      {verificationResult && (
        <div>
          {verificationResult.found ? (
            <div className="space-y-4">
              {/* Valid/Invalid Status */}
              <Card
                className={`p-6 border-2 ${
                  verificationResult.status === 'valid'
                    ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20'
                    : 'border-red-500/50 bg-red-50/50 dark:bg-red-950/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  {verificationResult.status === 'valid' ? (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h3 className={`text-lg font-bold ${
                      verificationResult.status === 'valid'
                        ? 'text-green-900 dark:text-green-200'
                        : 'text-red-900 dark:text-red-200'
                    }`}>
                      {verificationResult.status === 'valid'
                        ? 'Certificate is Valid'
                        : 'Certificate has Expired'}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      verificationResult.status === 'valid'
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {verificationResult.status === 'valid'
                        ? 'This certificate has been verified as authentic.'
                        : 'This certificate has expired. Please renew the training.'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Certificate Details */}
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {verificationResult.name}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {verificationResult.course}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Serial Number
                    </Label>
                    <p className="text-base font-mono mt-1 text-foreground">
                      {verificationResult.verificationCode}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Issue Date
                    </Label>
                    <p className="text-base font-medium mt-1 text-foreground">
                      {new Date(verificationResult.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Expiry Date
                    </Label>
                    <p className="text-base font-medium mt-1 text-foreground">
                      {new Date(verificationResult.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </Label>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          verificationResult.status === 'valid'
                            ? 'bg-green-100/50 text-green-700 dark:bg-green-950/50 dark:text-green-400'
                            : 'bg-red-100/50 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                        }`}
                      >
                        {verificationResult.status === 'valid' ? 'Valid' : 'Expired'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-8 border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200">
                    Certificate Not Found
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    {verificationResult.message}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-border hover:bg-secondary/50"
            >
              Verify Another Certificate
            </Button>
          </div>
        </div>
      )}

      {/* Info Section */}
      {!verificationResult && (
        <Card className="p-6 border-border bg-secondary/20">
          <h3 className="text-lg font-bold text-foreground mb-4">How to Verify a Certificate</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                1
              </span>
              <span>Locate the certificate serial number on the certificate document.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                2
              </span>
              <span>Enter the serial number in the search field above (e.g., CERT-2024-001-PNP).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                3
              </span>
              <span>Click the Verify button to check the certificate&apos;s authenticity and status.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                4
              </span>
              <span>Review the verification results to confirm the certificate details.</span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}
