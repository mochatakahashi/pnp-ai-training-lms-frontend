import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="student" />
      
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar />
        
        <main className="flex-1 overflow-auto pt-16 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
