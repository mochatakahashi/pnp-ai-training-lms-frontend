import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';
import { SidebarProvider } from '@/components/navigation/sidebar-context';
import { DashboardContent } from '@/components/navigation/dashboard-content';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar userRole="student" />
        
        <DashboardContent>
          <Topbar />
          
          <main className="flex-1 overflow-auto pt-16 p-4 md:p-8">
            {children}
          </main>
        </DashboardContent>
      </div>
    </SidebarProvider>
  );
}
