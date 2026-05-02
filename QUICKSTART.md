# PNP LMS - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm package manager

### Installation

1. **Install dependencies:**
```bash
pnpm install
```

2. **Start the development server:**
```bash
pnpm dev
```

3. **Open in browser:**
```
http://localhost:3000
```

## Navigating the Application

### Student Dashboard
- **Dashboard** (`/dashboard`) - Overview of courses, progress, and recent exams
- **Courses** (`/courses`) - Browse and enroll in available courses
- **Course Details** (`/courses/[courseId]`) - View modules and track progress
- **Exams** (`/exams`) - Take exams and view results
- **Certificates** (`/certificates`) - Download earned certificates

### Admin Dashboard
- **Admin Home** (`/admin`) - Overview and quick actions
- **Manage Courses** (`/admin/courses`) - Create, edit, delete courses
- **Manage Students** (`/admin/students`) - View student progress
- **Analytics** (`/admin/analytics`) - View system statistics

## Key Features

### Taking a Module
1. Go to `/courses`
2. Click "Continue Learning" on any course
3. Select a module from the list
4. Read the content, scroll to bottom
5. Click "Mark as Complete & Take Exam"
6. Ask questions to the AI assistant on the right

### Taking an Exam
1. Go to `/exams`
2. Click "Take Exam" on any available exam
3. Read instructions and click "Start Exam"
4. Answer questions (multiple choice or essay)
5. Use the flag feature to mark questions for review
6. Click "Submit Exam" when done
7. View instant results

### Viewing Certificates
1. Go to `/certificates`
2. Click "View" to see certificate preview
3. Click "Download" to save as PDF

## Testing with Mock Data

The application comes with built-in mock data:

**Student Account:**
- Name: Maria Cruz
- Email: maria.cruz@pnp.gov.ph
- Role: Police Officer

**Available Courses:**
1. Police Ethics and Conduct (65% complete)
2. Community Policing Fundamentals (40% complete)
3. Crisis Management and De-escalation (100% complete)

**Sample Exam:**
- Title: Introduction to Ethics - Quiz
- Duration: 15 minutes
- Questions: 5 (mix of multiple choice and essay)

## Configuration

### Theme Colors
Edit `/app/globals.css` to customize the white/blue color scheme:
```css
:root {
  --primary: oklch(0.3 0.18 240);      /* Primary blue */
  --background: oklch(0.995 0.001 0);  /* Off-white */
  /* ... other colors ... */
}
```

### Navigation Menu Items
Edit `/components/navigation/sidebar.tsx` to modify menu items

### Admin Menu Items
Update the `adminItems` array in `/components/navigation/sidebar.tsx`

## Component Structure

### Key Components
- `Sidebar` - Main navigation
- `Topbar` - Header with search
- `ModuleViewer` - Module content display
- `ChatWidget` - AI chatbot
- `ExamForm` - Exam taking interface
- `ResultsSummary` - Exam results display
- `CertificateTemplate` - PDF certificate

### Using Components
```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ModuleViewer } from '@/components/modules/module-viewer';

export default function MyPage() {
  return (
    <Card>
      <Button>Click me</Button>
      <ModuleViewer {...props} />
    </Card>
  );
}
```

## Adding New Content

### Add a Course
1. Edit `/app/(dashboard)/courses/page.tsx`
2. Add to the `allCourses` array with course details
3. Course automatically appears on courses page

### Add Course Modules
1. Edit `/app/(dashboard)/courses/[courseId]/page.tsx`
2. Add to the `courseData.modules` array
3. Include `title`, `content` (HTML), `estimatedDuration`

### Add Exam Questions
1. Edit `/app/(dashboard)/exams/[examId]/page.tsx`
2. Add to `mockExam.questions` array
3. Specify `questionType`: 'multiple_choice' or 'essay'

## Database Integration (When Ready)

To connect to Supabase:

1. **Create Supabase project** at supabase.com
2. **Set environment variables** in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

3. **Run migrations** using schema from `/v0_plans/deep-draft.md`

4. **Update API routes** in `/app/api/` to use Supabase client

## Local LLM Setup (Chatbot)

To enable the AI chatbot with a local LLM:

1. **Install Ollama** from ollama.ai
2. **Pull a model:**
```bash
ollama pull llama2
```

3. **Start Ollama:**
```bash
ollama serve
```

4. **Update chatbot endpoint** in `/components/modules/chat-widget.tsx`:
```tsx
const response = await fetch('http://localhost:11434/api/generate', {
  // Make actual call to local LLM
});
```

## Building for Production

1. **Build the project:**
```bash
pnpm build
```

2. **Start production server:**
```bash
pnpm start
```

3. **Deploy to Vercel:**
```bash
vercel deploy
```

## Environment Variables

Create a `.env.local` file with:
```
# Supabase (when ready)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Local LLM
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434

# Other configs
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installed
```bash
pnpm install
pnpm exec next dev
```

### PDF Download Not Working
Ensure `jspdf` and `html2canvas` are installed:
```bash
pnpm add jspdf html2canvas
```

## Support

For issues or questions:
1. Check the `PROJECT_SUMMARY.md` for detailed feature documentation
2. Review component source code with TypeScript types
3. Check the plan file at `/v0_plans/deep-draft.md` for architecture

## Next Steps

1. Connect Supabase for persistent data storage
2. Set up local LLM (Ollama) for chatbot
3. Customize with real PNP content and branding
4. Add real user authentication
5. Deploy to production
6. Conduct user testing with PNP personnel

Enjoy building with the PNP LMS!
