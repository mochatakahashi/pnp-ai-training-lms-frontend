'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, Award, ShieldCheck, CheckCircle2, FileText, Video, FileSpreadsheet, Settings } from 'lucide-react';

interface ExamConfig {
  id: string;
  courseTitle: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScorePercent: number;
  allowedRetakes: boolean;
  attachedMedia: string;
}

const initialExams: ExamConfig[] = [
  {
    id: 'exam-1',
    courseTitle: 'Police Ethics and Conduct - Final Assessment',
    totalQuestions: 50,
    timeLimitMinutes: 120, // 2 Hours
    passingScorePercent: 80,
    allowedRetakes: true,
    attachedMedia: 'RA 6713 Ethics Manual (PDF), Tactical Briefing Video (MP4), Ethics Lecture (PPTX)',
  },
  {
    id: 'exam-2',
    courseTitle: 'Community Policing Fundamentals - Final Exam',
    totalQuestions: 40,
    timeLimitMinutes: 90,
    passingScorePercent: 80,
    allowedRetakes: true,
    attachedMedia: 'Community Engagement Deck (PPTX), Case Studies (PDF)',
  },
  {
    id: 'exam-3',
    courseTitle: 'Crisis Management & De-escalation Assessment',
    totalQuestions: 30,
    timeLimitMinutes: 60,
    passingScorePercent: 80,
    allowedRetakes: true,
    attachedMedia: 'De-escalation Tactical Video (MP4)',
  },
];

export default function AdminExamsPage() {
  const [exams, setExams] = useState<ExamConfig[]>(initialExams);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTimeChange = (id: string, newMinutes: number) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, timeLimitMinutes: newMinutes } : e))
    );
  };

  const handleScoreChange = (id: string, newScore: number) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, passingScorePercent: newScore } : e))
    );
  };

  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-1">Assessment Configuration</Badge>
          <h1 className="text-3xl font-extrabold text-foreground">Exam Time Limits & Media Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure exam duration (e.g. 2 Hours / 120 mins), passing score percentage (80%), and manage course media resource attachments (PDF, PPT, Video).
          </p>
        </div>
        <Button onClick={handleSaveAll} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold flex items-center gap-2 h-10 px-5 shadow-md">
          <Settings size={16} />
          Save Exam Settings
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={18} />
          Exam configuration parameters successfully saved and applied to all officer assessments!
        </div>
      )}

      {/* Exam Cards Grid */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="p-6 border-border shadow-md bg-card space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <Badge variant="outline" className="text-[10px] bg-secondary text-foreground font-bold mb-1">
                  Course ID: {exam.id}
                </Badge>
                <h2 className="text-lg font-extrabold text-foreground">{exam.courseTitle}</h2>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
                  {exam.totalQuestions} Questions
                </Badge>
                <Badge className="bg-green-600 text-white text-xs font-bold">
                  {exam.passingScorePercent}% Pass Score Threshold
                </Badge>
              </div>
            </div>

            {/* Editable Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
              {/* Time Limit Setting */}
              <div className="space-y-2 p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-foreground flex items-center gap-1.5">
                    <Clock size={16} className="text-primary" />
                    Exam Time Limit (Minutes)
                  </label>
                  <span className="font-bold text-primary text-xs">
                    {(exam.timeLimitMinutes / 60).toFixed(1)} Hours
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={15}
                    max={300}
                    value={exam.timeLimitMinutes}
                    onChange={(e) => handleTimeChange(exam.id, Number(e.target.value))}
                    className="h-9 text-xs font-extrabold text-foreground"
                  />
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleTimeChange(exam.id, 120)}
                      className={`h-9 px-2 text-[10px] font-bold ${
                        exam.timeLimitMinutes === 120 ? 'bg-primary text-white border-primary' : ''
                      }`}
                    >
                      2 Hrs (120m)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleTimeChange(exam.id, 90)}
                      className={`h-9 px-2 text-[10px] font-bold ${
                        exam.timeLimitMinutes === 90 ? 'bg-primary text-white border-primary' : ''
                      }`}
                    >
                      1.5 Hrs (90m)
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Default setting for 50-Question Assessment is 2 Hours (120 Minutes).
                </p>
              </div>

              {/* Passing Percentage Setting */}
              <div className="space-y-2 p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-foreground flex items-center gap-1.5">
                    <Award size={16} className="text-accent" />
                    Passing Threshold (%)
                  </label>
                  <span className="font-bold text-accent text-xs">
                    {Math.round((exam.totalQuestions * exam.passingScorePercent) / 100)} / {exam.totalQuestions} Correct Required
                  </span>
                </div>
                <Input
                  type="number"
                  min={50}
                  max={100}
                  value={exam.passingScorePercent}
                  onChange={(e) => handleScoreChange(exam.id, Number(e.target.value))}
                  className="h-9 text-xs font-extrabold text-foreground"
                />
                <p className="text-[10px] text-muted-foreground">
                  PNP Doctrine requires 80% minimum score to earn official certification.
                </p>
              </div>

              {/* Media Formats Info */}
              <div className="space-y-2 p-4 rounded-xl bg-secondary/30 border border-border">
                <label className="font-extrabold text-foreground flex items-center gap-1.5">
                  <FileText size={16} className="text-blue-500" />
                  Attached Media Formats
                </label>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-foreground">
                    <FileText size={12} className="text-red-500" /> PDF Document Manuals
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-foreground">
                    <FileSpreadsheet size={12} className="text-orange-500" /> PowerPoint Slides (.pptx)
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-foreground">
                    <Video size={12} className="text-blue-500" /> Instructional Videos (.mp4)
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
