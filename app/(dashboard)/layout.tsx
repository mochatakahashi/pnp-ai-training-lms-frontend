import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';
import { SidebarProvider } from '@/components/navigation/sidebar-context';
import { DashboardContent } from '@/components/navigation/dashboard-content';
import { FloatingMenuButton } from '@/components/navigation/floating-menu-button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <FloatingMenuButton />
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar userRole="student" />
        
        <DashboardContent>
          <Topbar />
          
          <main className="flex-1 overflow-y-auto pt-16 bg-background">
            {children}
          </main>
        </DashboardContent>
      </div>
    </SidebarProvider>
  );
}
