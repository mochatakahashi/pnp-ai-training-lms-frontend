'use client'

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, ClipboardList, BarChart3, Plus, TrendingUp, ArrowRight, ShieldCheck, Search, Filter, Award } from 'lucide-react';
import Link from 'next/link';

const adminStats = [
  { label: 'Active PNP Officers', value: 1420, icon: Users, change: '+48 this week' },
  { label: 'Courses Published', value: 6, icon: BookOpen, change: '+1 new' },
  { label: 'Exam Completion Rate', value: '84%', icon: ClipboardList, change: '+6%' },
  { label: 'Certificates Issued', value: 980, icon: Award, change: '+32 today' },
];

const mockOfficerProgress = [
  {
    id: 'off-1',
    name: 'Pat. Maria Cruz',
    email: 'maria.cruz@pnp.gov.ph',
    region: 'National Capital Region (NCR)',
    station: 'Manila Police District - Station 1 (Ermita)',
    course: 'Police Ethics and Conduct',
    modulesCompleted: '5/5',
    examScore: 88,
    status: 'Passed (88%)',
    certified: true,
  },
  {
    id: 'off-2',
    name: 'P/SSg. Juan Santos',
    email: 'juan.santos@pnp.gov.ph',
    region: 'Region 3 - Central Luzon',
    station: 'Pampanga Police Provincial Office',
    course: 'Police Ethics and Conduct',
    modulesCompleted: '3/5',
    examScore: null,
    status: 'In Progress (Mod 4)',
    certified: false,
  },
  {
    id: 'off-3',
    name: 'Pat. Pedro Reyes',
    email: 'pedro.reyes@pnp.gov.ph',
    region: 'Region 7 - Central Visayas',
    station: 'Cebu City Police Office - Station 1',
    course: 'Police Ethics and Conduct',
    modulesCompleted: '5/5',
    examScore: 92,
    status: 'Passed (92%)',
    certified: true,
  },
  {
    id: 'off-4',
    name: 'P/Cpl. Ana Torres',
    email: 'ana.torres@pnp.gov.ph',
    region: 'Region 11 - Davao Region',
    station: 'Davao City Police Office - Station 1',
    course: 'Police Ethics and Conduct',
    modulesCompleted: '2/5',
    examScore: null,
    status: 'In Progress (Mod 3)',
    certified: false,
  },
  {
    id: 'off-5',
    name: 'Pat. Carlos Gonzales',
    email: 'carlos.g@pnp.gov.ph',
    region: 'National Capital Region (NCR)',
    station: 'Quezon City Police District - Station 6',
    course: 'Police Ethics and Conduct',
    modulesCompleted: '5/5',
    examScore: 74,
    status: 'Failed (74%) - Retake Req.',
    certified: false,
  },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredOfficers = mockOfficerProgress.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === 'all' || officer.region.includes(selectedRegion);

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Command Admin Portal</Badge>
            <span className="text-xs text-muted-foreground">• Active Officer Progress Monitoring</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Administration & Command Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor police personnel training progress, configure course modules, and adjust final exam parameters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/courses">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold flex items-center gap-2 h-10 px-5 text-xs shadow-md">
              <Plus size={16} />
              Add / Manage Modules
            </Button>
          </Link>
          <Link href="/admin/exams">
            <Button variant="outline" className="border-border font-semibold h-10 text-xs">
              <ClipboardList size={16} className="mr-1.5" />
              Exam Time & Media Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5 border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Icon className="text-primary" size={22} />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 text-[11px]">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-foreground mt-1">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* OFFICER PROGRESS MONITORING TABLE */}
      <Card className="p-6 border-border shadow-md bg-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Officer Progress Monitoring
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time monitoring of personnel completion rates, module progress, and exam scores across all units.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search officer name, station..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-muted/40"
              />
            </div>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Police Regions</option>
              <option value="NCR">NCR - National Capital Region</option>
              <option value="Region 3">Region 3 - Central Luzon</option>
              <option value="Region 7">Region 7 - Central Visayas</option>
              <option value="Region 11">Region 11 - Davao Region</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Officer Personnel</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Assigned Unit / Station</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Enrolled Course</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Modules Completed</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Exam Result</th>
                <th className="py-3 px-4 font-bold text-foreground uppercase tracking-wider">Certificate Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOfficers.length > 0 ? (
                filteredOfficers.map((officer) => (
                  <tr key={officer.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-foreground">{officer.name}</p>
                      <p className="text-[11px] text-muted-foreground">{officer.email}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-foreground">{officer.station}</p>
                      <p className="text-[11px] text-muted-foreground">{officer.region}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-foreground">{officer.course}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold">
                        {officer.modulesCompleted} Modules
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      {officer.examScore !== null ? (
                        officer.examScore >= 80 ? (
                          <Badge className="bg-green-600 text-white font-bold">
                            Passed ({officer.examScore}%)
                          </Badge>
                        ) : (
                          <Badge className="bg-destructive text-destructive-foreground font-bold">
                            Failed ({officer.examScore}%)
                          </Badge>
                        )
                      ) : (
                        <Badge variant="secondary" className="text-muted-foreground font-semibold">
                          {officer.status}
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {officer.certified ? (
                        <span className="inline-flex items-center gap-1 font-bold text-green-600">
                          <Award size={14} /> Issued
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-[11px]">Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No officers match your search or region filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
