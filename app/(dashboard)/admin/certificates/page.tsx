'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, Eye, Download, Search, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

const pnpSections = [
  {
    id: 'sec-1',
    name: 'Manila Police District - Station 1 (Ermita)',
    region: 'NCR',
    trainees: [
      {
        id: 'tr-1',
        name: 'Pat. Maria Cruz',
        role: 'Patrol Officer',
        certificates: [
          { id: 'c-1', course: 'Police Ethics and Conduct', issueDate: '2024-01-15', score: 88, status: 'active' },
          { id: 'c-2', course: 'Community Policing Fundamentals', issueDate: '2024-02-10', score: 92, status: 'active' },
        ],
      },
      {
        id: 'tr-2',
        name: 'P/SSg. Juan Santos',
        role: 'Senior Staff Sergeant',
        certificates: [
          { id: 'c-3', course: 'Police Ethics and Conduct', issueDate: '2024-01-20', score: 85, status: 'active' },
        ],
      },
    ],
  },
  {
    id: 'sec-2',
    name: 'Quezon City Police District - Station 6 (Batasan)',
    region: 'NCR',
    trainees: [
      {
        id: 'tr-3',
        name: 'Pat. Pedro Reyes',
        role: 'Patrol Officer',
        certificates: [
          { id: 'c-4', course: 'Crisis Management and De-escalation', issueDate: '2024-02-01', score: 90, status: 'active' },
        ],
      },
    ],
  },
  {
    id: 'sec-3',
    name: 'Cebu City Police Office - Station 1',
    region: 'Region 7 (Central Visayas)',
    trainees: [
      {
        id: 'tr-4',
        name: 'P/Cpl. Ana Torres',
        role: 'Corporal',
        certificates: [
          { id: 'c-5', course: 'Digital Forensics Basics', issueDate: '2024-01-25', score: 91, status: 'active' },
          { id: 'c-6', course: 'Community Policing Fundamentals', issueDate: '2024-02-15', score: 87, status: 'active' },
          { id: 'c-7', course: 'Police Ethics and Conduct', issueDate: '2024-01-10', score: 95, status: 'active' },
        ],
      },
    ],
  },
];

export default function AdminCertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['sec-1', 'sec-2', 'sec-3']);
  const [expandedTrainees, setExpandedTrainees] = useState<string[]>(['tr-1', 'tr-2', 'tr-3', 'tr-4']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const toggleTrainee = (traineeId: string) => {
    setExpandedTrainees((prev) =>
      prev.includes(traineeId) ? prev.filter((id) => id !== traineeId) : [...prev, traineeId]
    );
  };

  const filteredSections = pnpSections
    .map((section) => ({
      ...section,
      trainees: section.trainees.filter(
        (trainee) =>
          trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.trainees.length > 0);

  const totalCertificates = pnpSections.reduce(
    (sum, section) =>
      sum + section.trainees.reduce((tSum, t) => tSum + t.certificates.length, 0),
    0
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-1">Official Registry</Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Monitor Officer Certificates</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Audit, verify, and download official PNP certificates issued to personnel across regional commands.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-border bg-card shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Monitored Units</p>
          <p className="text-3xl font-extrabold text-primary">{pnpSections.length} Stations</p>
        </Card>
        <Card className="p-5 border-border bg-card shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Trainee Personnel</p>
          <p className="text-3xl font-extrabold text-accent">
            {pnpSections.reduce((sum, s) => sum + s.trainees.length, 0)} Officers
          </p>
        </Card>
        <Card className="p-5 border-border bg-card shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Issued Certificates</p>
          <p className="text-3xl font-extrabold text-green-600">{totalCertificates}</p>
        </Card>
        <Card className="p-5 border-border bg-card shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Verification Status</p>
          <p className="text-3xl font-extrabold text-blue-600">100% Validated</p>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4 border-border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search certificate by officer name or police station..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-xs bg-muted/40"
          />
        </div>
      </Card>

      {/* Hierarchy Cards */}
      <div className="space-y-4">
        {filteredSections.map((section) => (
          <Card key={section.id} className="border-border shadow-sm overflow-hidden">
            {/* Section Bar */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 bg-secondary/30 flex items-center justify-between hover:bg-secondary/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-sm font-extrabold text-foreground">{section.name}</h3>
                  <p className="text-[11px] text-muted-foreground">{section.region}</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
                {section.trainees.length} Officers Certified
              </Badge>
            </button>

            {/* Trainees List */}
            {expandedSections.includes(section.id) && (
              <div className="divide-y divide-border/60 bg-card">
                {section.trainees.map((trainee) => (
                  <div key={trainee.id} className="p-4 pl-10 space-y-3">
                    <button
                      onClick={() => toggleTrainee(trainee.id)}
                      className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity"
                    >
                      <div className="flex items-center gap-2.5">
                        {expandedTrainees.includes(trainee.id) ? (
                          <ChevronDown className="w-4 h-4 text-accent" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                        <div>
                          <p className="text-xs font-bold text-foreground">{trainee.name}</p>
                          <p className="text-[10px] text-muted-foreground">{trainee.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-semibold bg-accent/10 text-accent border-accent/20">
                        {trainee.certificates.length} Certificate{trainee.certificates.length !== 1 ? 's' : ''}
                      </Badge>
                    </button>

                    {/* Certificate Cards */}
                    {expandedTrainees.includes(trainee.id) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 pl-6">
                        {trainee.certificates.map((cert) => (
                          <div
                            key={cert.id}
                            className="p-3.5 rounded-xl bg-secondary/20 border border-border flex items-center justify-between gap-3 hover:border-primary/40 transition-all"
                          >
                            <div>
                              <p className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                                <Award size={14} className="text-primary" />
                                {cert.course}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-1">
                                Issued: <span className="font-semibold text-foreground">{cert.issueDate}</span> • Score: <strong className="text-green-600">{cert.score}%</strong>
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Badge className="bg-green-600 text-white text-[9px] font-bold">
                                ✓ Verified
                              </Badge>
                              <Button variant="outline" size="sm" className="h-7 w-7 p-0 border-border">
                                <Download size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
