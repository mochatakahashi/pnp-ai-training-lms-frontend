'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Search, CheckCircle, AlertCircle, ArrowLeft, ShieldCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock certificate database
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
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const result = certificateDatabase[serialNumber.trim().toUpperCase() as keyof typeof certificateDatabase];
      if (result) {
        setVerificationResult({
          found: true,
          ...result,
        });
      } else {
        setVerificationResult({
          found: false,
          message: 'Certificate not found. Please verify the serial number and try again.',
        });
      }
      setIsSearching(false);
    }, 400);
  };

  const handleReset = () => {
    setSerialNumber('');
    setVerificationResult(null);
  };

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
              <ShieldCheck className="text-sky-500" size={28} />
              Certificate Verification
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Verify the authenticity of PNP training certificates by entering the serial number.
            </p>
          </div>
        </div>
      </Card>

      {/* Search Input Card */}
      <Card className="p-6 md:p-8 border border-border bg-card shadow-sm rounded-2xl space-y-4">
        <form onSubmit={handleVerify} className="space-y-4">
          <Label htmlFor="serial" className="text-xs md:text-sm font-extrabold text-foreground block uppercase tracking-wider">
            Enter Certificate Serial Number
          </Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="serial"
              placeholder="e.g., CERT-2024-001-PNP"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              disabled={isSearching}
              className="h-11 rounded-xl border-border bg-background text-sm font-mono px-4 focus-visible:ring-sky-500 flex-1 shadow-2xs"
            />
            <Button
              type="submit"
              disabled={!serialNumber || isSearching}
              className="h-11 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs px-7 shadow-xs shrink-0 inline-flex items-center justify-center gap-2"
            >
              <Search size={16} />
              {isSearching ? 'Verifying...' : 'Verify Certificate'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <div className="space-y-4">
          {verificationResult.found ? (
            <div className="space-y-4">
              {/* Status Banner Card */}
              <Card
                className={`p-6 rounded-2xl border-2 ${
                  verificationResult.status === 'valid'
                    ? 'border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-950/30'
                    : 'border-rose-500/40 bg-rose-50/60 dark:bg-rose-950/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  {verificationResult.status === 'valid' ? (
                    <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3
                      className={`text-base md:text-lg font-extrabold ${
                        verificationResult.status === 'valid'
                          ? 'text-emerald-900 dark:text-emerald-200'
                          : 'text-rose-900 dark:text-rose-200'
                      }`}
                    >
                      {verificationResult.status === 'valid'
                        ? 'Official Certificate Verified (Authentic)'
                        : 'Certificate Has Expired'}
                    </h3>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        verificationResult.status === 'valid'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {verificationResult.status === 'valid'
                        ? 'This credential is registered and verified in the official PNP LMS database.'
                        : 'This certificate has passed its validity date. Recertification is required.'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Certificate Metadata Card */}
              <Card className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100 dark:border-sky-900 shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">
                      {verificationResult.name}
                    </h3>
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-bold mt-0.5">
                      {verificationResult.course}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/60">
                    <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                      Serial Number
                    </p>
                    <p className="text-xs font-mono font-bold text-foreground mt-1">
                      {verificationResult.verificationCode}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/60">
                    <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                      Issue Date
                    </p>
                    <p className="text-xs font-bold text-foreground mt-1">
                      {verificationResult.issueDate}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/60">
                    <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                      Expiry Date
                    </p>
                    <p className="text-xs font-bold text-foreground mt-1">
                      {verificationResult.expiryDate}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border/60">
                    <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">
                      Status
                    </p>
                    <div className="mt-1">
                      <span
                        className={`inline-flex px-3 py-0.5 rounded-full text-[11px] font-extrabold ${
                          verificationResult.status === 'valid'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
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
            <Card className="p-6 rounded-2xl border-2 border-amber-500/40 bg-amber-50/60 dark:bg-amber-950/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-extrabold text-amber-900 dark:text-amber-200">
                    Certificate Not Found
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium mt-1">
                    {verificationResult.message}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Reset Search Button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="rounded-full border-border text-foreground hover:bg-secondary font-bold text-xs px-6 h-10 shadow-2xs flex items-center gap-2"
            >
              <RefreshCw size={14} />
              Verify Another Serial Number
            </Button>
          </div>
        </div>
      )}

      {/* Guide Info Card */}
      {!verificationResult && (
        <Card className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <ShieldCheck size={20} className="text-sky-500" />
            How to Verify a PNP Certificate
          </h3>
          <ul className="space-y-3 text-xs text-muted-foreground font-medium">
            <li className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <span className="text-foreground font-bold">Locate the official serial number printed on the certificate (e.g. CERT-2024-001-PNP).</span>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <span className="text-foreground font-bold">Enter the serial number into the verification search field above.</span>
            </li>
            <li className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <span className="text-foreground font-bold">Click &quot;Verify Certificate&quot; to fetch real-time authenticity status from PNP servers.</span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}

