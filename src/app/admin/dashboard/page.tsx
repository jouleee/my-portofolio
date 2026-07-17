import { getContactMessages, getAdminProjects } from '@/app/actions';
import DashboardClient from './dashboard-client';

export const revalidate = 0; // render dynamically for dashboard updates

export default async function DashboardPage() {
  const [messages, projects] = await Promise.all([
    getContactMessages(),
    getAdminProjects(),
  ]);

  const unreadCount = messages.filter((m: any) => !m.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b-2 border-dashed border-border-color/20">
        <div className="font-space-grotesk">
          <h1 className="text-3xl font-black uppercase font-syne tracking-tight">Overview Dashboard</h1>
          <p className="text-sm font-bold text-foreground/50 mt-1 uppercase">Manage inquiries and project summary</p>
        </div>
      </div>

      {/* Grid Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background brutalist-border rounded-xl p-5 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
          <span className="text-xs font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk block mb-1">
            Projects
          </span>
          <h3 className="text-4xl font-black uppercase font-syne tracking-tight">{projects.length}</h3>
          <p className="text-xs font-bold text-foreground/50 font-space-grotesk mt-2 uppercase">Total Registered</p>
        </div>

        <div className="bg-background brutalist-border rounded-xl p-5 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
          <span className="text-xs font-black uppercase tracking-widest text-brutalist-blue font-space-grotesk block mb-1">
            Total Inbox
          </span>
          <h3 className="text-4xl font-black uppercase font-syne tracking-tight">{messages.length}</h3>
          <p className="text-xs font-bold text-foreground/50 font-space-grotesk mt-2 uppercase">Messages Received</p>
        </div>

        <div className="bg-background brutalist-border rounded-xl p-5 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)]">
          <span className="text-xs font-black uppercase tracking-widest text-brutalist-yellow font-space-grotesk block mb-1">
            Unread Inbox
          </span>
          <h3 className="text-4xl font-black uppercase font-syne tracking-tight">{unreadCount}</h3>
          <p className="text-xs font-bold text-foreground/50 font-space-grotesk mt-2 uppercase">Awaiting Review</p>
        </div>
      </div>

      {/* Messages Feed */}
      <DashboardClient initialMessages={messages} />
    </div>
  );
}
