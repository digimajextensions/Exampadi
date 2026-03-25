import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-surface">
      <Sidebar />
      <div className="md:ml-60">
        <Topbar />
        <main className="p-6 md:p-8 max-w-[1100px] mx-auto pb-24 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
