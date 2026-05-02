'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data
const courseData = {
  id: '1',
  title: 'Police Ethics and Conduct',
  description: 'Learn the fundamental principles of professional ethics and conduct in policing.',
  instructor: 'CPO Juan Santos',
  progress: 65,
  modules: [
    {
      id: 'mod1',
      title: 'Introduction to Ethics',
      order: 1,
      estimatedDuration: 20,
      content: `
        <h2>Introduction to Ethics</h2>
        <p>Ethics is the foundation of professional policing. Understanding and practicing ethical conduct is essential for maintaining public trust and upholding the law.</p>
        <h3>Key Topics:</h3>
        <ul>
          <li><strong>Definition of Ethics:</strong> The principles concerning the distinction between right and wrong behavior.</li>
          <li><strong>Professional Ethics:</strong> Standards of conduct specific to law enforcement professionals.</li>
          <li><strong>Code of Conduct:</strong> The PNP Code of Professional Conduct and its requirements.</li>
        </ul>
        <h3>Why Ethics Matter in Policing</h3>
        <p>Police officers hold positions of significant authority and public trust. Ethical conduct ensures:</p>
        <ul>
          <li>Public confidence in law enforcement</li>
          <li>Fair and impartial service to all citizens</li>
          <li>Protection of individual rights and freedoms</li>
          <li>Maintenance of the rule of law</li>
        </ul>
        <h3>The PNP Core Values</h3>
        <p>The Philippine National Police is guided by core values that reflect our commitment to ethical policing:</p>
        <ul>
          <li><strong>Integrity:</strong> Honesty and strong moral principles</li>
          <li><strong>Accountability:</strong> Responsibility for actions and decisions</li>
          <li><strong>Transparency:</strong> Open communication and operations</li>
          <li><strong>Service:</strong> Dedicated service to the public</li>
          <li><strong>Excellence:</strong> Commitment to high standards</li>
        </ul>
      `,
      completed: true,
    },
    {
      id: 'mod2',
      title: 'Decision Making and Ethical Dilemmas',
      order: 2,
      estimatedDuration: 25,
      content: `
        <h2>Decision Making and Ethical Dilemmas</h2>
        <p>Officers frequently face complex situations that require ethical decision-making. This module teaches frameworks for navigating these challenges.</p>
        <h3>The Ethical Decision-Making Framework</h3>
        <p>When facing an ethical dilemma, follow these steps:</p>
        <ol>
          <li><strong>Identify the Issue:</strong> Clearly define what makes this situation ethically challenging.</li>
          <li><strong>Gather Information:</strong> Collect all relevant facts and context.</li>
          <li><strong>Consider Options:</strong> Identify possible courses of action.</li>
          <li><strong>Evaluate Consequences:</strong> Consider the impact on all stakeholders.</li>
          <li><strong>Consult Standards:</strong> Review the PNP Code of Conduct and applicable laws.</li>
          <li><strong>Make a Decision:</strong> Choose the action that aligns with your values and professional standards.</li>
          <li><strong>Reflect:</strong> Review the outcome and learn from the experience.</li>
        </ol>
      `,
      completed: true,
    },
    {
      id: 'mod3',
      title: 'Accountability and Transparency',
      order: 3,
      estimatedDuration: 30,
      content: `
        <h2>Accountability and Transparency</h2>
        <p>Accountability and transparency are core to maintaining public trust in law enforcement.</p>
        <h3>What is Accountability?</h3>
        <p>Accountability means being answerable for your actions and decisions. In policing, it involves:</p>
        <ul>
          <li>Clear responsibility for actions taken</li>
          <li>Willingness to explain and justify decisions</li>
          <li>Acceptance of consequences for misconduct</li>
          <li>Commitment to improvement</li>
        </ul>
        <h3>Transparency in Operations</h3>
        <p>Transparency builds public confidence by making police operations understandable and open to scrutiny within appropriate bounds.</p>
      `,
      completed: false,
    },
    {
      id: 'mod4',
      title: 'Case Studies in Police Ethics',
      order: 4,
      estimatedDuration: 35,
      content: `
        <h2>Case Studies in Police Ethics</h2>
        <p>Real-world scenarios help us understand how to apply ethical principles in practice.</p>
        <h3>Case Study 1: The Dilemma of Loyalty vs. Justice</h3>
        <p>Scenario: You discover that a fellow officer, whom you've worked with for years, has been engaging in corruption...</p>
      `,
      completed: false,
    },
    {
      id: 'mod5',
      title: 'Professional Development and Continued Learning',
      order: 5,
      estimatedDuration: 20,
      content: `
        <h2>Professional Development and Continued Learning</h2>
        <p>Ethical conduct is an ongoing commitment that requires continuous learning and improvement.</p>
      `,
      completed: false,
    },
  ],
};

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState(courseData.modules[0]);

  const completedCount = courseData.modules.filter((m) => m.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{courseData.title}</h1>
          <p className="text-muted-foreground mt-1">Instructor: {courseData.instructor}</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Course Progress</h3>
          <span className="text-sm text-muted-foreground">
            {completedCount} of {courseData.modules.length} modules
          </span>
        </div>
        <Progress value={courseData.progress} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">{courseData.progress}% complete</p>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module List */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit sticky top-20">
            <h3 className="font-semibold text-foreground mb-3">Modules</h3>
            <div className="space-y-2">
              {courseData.modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedModule.id === module.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {module.completed && (
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 text-sm">
                      <p className="font-medium">Module {module.order}</p>
                      <p className="text-xs opacity-75 line-clamp-2">{module.title}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Module Content */}
        <div className="lg:col-span-3">
          <Card className="p-8">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-3">
                Module {selectedModule.order} of {courseData.modules.length}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {selectedModule.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  Est. {selectedModule.estimatedDuration} minutes
                </div>
                {selectedModule.completed && (
                  <Badge className="bg-green-100/20 text-green-700 border-0">
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none dark:prose-invert mb-8">
              <div
                className="space-y-4 text-foreground"
                dangerouslySetInnerHTML={{ __html: selectedModule.content }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Button variant="outline" disabled={selectedModule.order === 1}>
                Previous Module
              </Button>
              {!selectedModule.completed ? (
                <Button className="flex-1" onClick={() => {
                  // Mark as complete
                  setSelectedModule({ ...selectedModule, completed: true });
                }}>
                  Mark as Complete
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  onClick={() => router.push(`/exams/${selectedModule.id}`)}
                >
                  Take Module Exam
                </Button>
              )}
              <Button
                variant="outline"
                disabled={selectedModule.order === courseData.modules.length}
              >
                Next Module
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
