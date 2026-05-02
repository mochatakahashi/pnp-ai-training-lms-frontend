'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, Eye, Download, Search } from 'lucide-react';
import { useState } from 'react';

const pnpSections = [
  {
    id: 'sec-1',
    name: 'Manila Police District',
    region: 'NCR',
    trainees: [
      {
        id: 'tr-1',
        name: 'Maria Cruz',
        role: 'Police Officer',
        certificates: [
          { id: 'c-1', course: 'Police Ethics and Conduct', issueDate: '2024-01-15', score: 85, status: 'active' },
          { id: 'c-2', course: 'Community Policing Fundamentals', issueDate: '2024-02-10', score: 92, status: 'active' },
        ],
      },
      {
        id: 'tr-2',
        name: 'Juan Santos',
        role: 'Police Officer',
        certificates: [
          { id: 'c-3', course: 'Police Ethics and Conduct', issueDate: '2024-01-20', score: 88, status: 'active' },
        ],
      },
    ],
  },
  {
    id: 'sec-2',
    name: 'Quezon City Police',
    region: 'NCR',
    trainees: [
      {
        id: 'tr-3',
        name: 'Lucia Martinez',
        role: 'Police Officer',
        certificates: [
          { id: 'c-4', course: 'Crisis Management and De-escalation', issueDate: '2024-02-01', score: 79, status: 'active' },
        ],
      },
    ],
  },
  {
    id: 'sec-3',
    name: 'Makati Police Station',
    region: 'CALABARZON',
    trainees: [
      {
        id: 'tr-4',
        name: 'Ramon Flores',
        role: 'Police Officer',
        certificates: [
          { id: 'c-5', course: 'Digital Forensics Basics', issueDate: '2024-01-25', score: 91, status: 'active' },
          { id: 'c-6', course: 'Community Policing Fundamentals', issueDate: '2024-02-15', score: 87, status: 'active' },
          { id: 'c-7', course: 'Police Ethics and Conduct', issueDate: '2024-01-10', score: 90, status: 'active' },
        ],
      },
    ],
  },
];

export default function AdminCertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedTrainees, setExpandedTrainees] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const toggleTrainee = (traineeId: string) => {
    setExpandedTrainees(prev =>
      prev.includes(traineeId) ? prev.filter(id => id !== traineeId) : [...prev, traineeId]
    );
  };

  const filteredSections = pnpSections.map(section => ({
    ...section,
    trainees: section.trainees.filter(trainee =>
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(section => section.trainees.length > 0);

  const totalCertificates = pnpSections.reduce((sum, section) =>
    sum + section.trainees.reduce((traineeSum, trainee) => traineeSum + trainee.certificates.length, 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Monitor Certificates</h1>
        <p className="text-muted-foreground mt-2">View and manage trainee certificates by section and region</p>
      </div>

      {/* Search */}
      <Card className="p-6 border-border">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search by trainee name or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Total Sections</p>
          <p className="text-3xl font-bold text-primary">{pnpSections.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Total Trainees</p>
          <p className="text-3xl font-bold text-accent">
            {pnpSections.reduce((sum, s) => sum + s.trainees.length, 0)}
          </p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <p className="text-sm text-muted-foreground mb-1">Total Certificates</p>
          <p className="text-3xl font-bold text-green-600">{totalCertificates}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <p className="text-sm text-muted-foreground mb-1">Active Status</p>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round((pnpSections.reduce((sum, section) =>
              sum + section.trainees.reduce((traineeSum, trainee) =>
                traineeSum + trainee.certificates.filter(c => c.status === 'active').length, 0), 0) / totalCertificates) * 100)}%
          </p>
        </Card>
      </div>

      {/* Hierarchy */}
      <div className="space-y-3">
        {filteredSections.map(section => (
          <Card key={section.id} className="border-border overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 text-left">
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{section.name}</h3>
                  <p className="text-sm text-muted-foreground">{section.region} Region</p>
                </div>
              </div>
              <Badge className="bg-primary/20 text-primary">
                {section.trainees.length} trainees
              </Badge>
            </button>

            {/* Trainees */}
            {expandedSections.includes(section.id) && (
              <div className="border-t border-border/50 divide-y divide-border/50">
                {section.trainees.map((trainee) => (
                  <div key={trainee.id}>
                    {/* Trainee Header */}
                    <button
                      onClick={() => toggleTrainee(trainee.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors pl-20"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        {expandedTrainees.includes(trainee.id) ? (
                          <ChevronDown className="w-5 h-5 text-accent flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <div>
                          <h4 className="font-semibold text-foreground">{trainee.name}</h4>
                          <p className="text-sm text-muted-foreground">{trainee.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-accent/20 text-accent">
                        {trainee.certificates.length} certificates
                      </Badge>
                    </button>

                    {/* Certificates */}
                    {expandedTrainees.includes(trainee.id) && (
                      <div className="bg-secondary/10 border-t border-border/30 divide-y divide-border/30 pl-20">
                        {trainee.certificates.map((cert) => (
                          <div key={cert.id} className="p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                            <div className="flex-1">
                              <h5 className="font-semibold text-foreground">{cert.course}</h5>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span>Issued: {cert.issueDate}</span>
                                <span>Score: {cert.score}%</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                                {cert.status}
                              </Badge>
                              <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">
                                <Eye size={16} />
                              </Button>
                              <Button variant="outline" size="sm" className="border-border hover:bg-secondary/50">
                                <Download size={16} />
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

        {filteredSections.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No results found for &quot;{searchTerm}&quot;</p>
          </Card>
        )}
      </div>
    </div>
  );
}
