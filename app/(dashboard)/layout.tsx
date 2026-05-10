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
        <Topbar userName="Maria Cruz" />
        
        <main className="flex-1 overflow-auto">
          <div className="py-6 px-4 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
