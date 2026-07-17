'use client';

import { useState } from 'react';
import { markMessageAsRead } from '@/app/actions';
import { toast } from 'sonner';

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
  read: boolean;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes} UTC`;
};

export default function DashboardClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleRead = async (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      const res = await markMessageAsRead(msg.id);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        );
        toast.success('Message marked as read.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Messages Feed panel */}
      <div className="lg:col-span-6 space-y-4">
        <h2 className="text-xl font-black uppercase font-syne tracking-tight">Inbox Messages</h2>
        
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {messages.length === 0 ? (
            <div className="brutalist-border rounded-xl p-6 text-center text-sm font-bold text-foreground/50 uppercase bg-background">
              Inbox is empty
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleRead(msg)}
                className={`w-full text-left bg-background brutalist-border rounded-xl p-4 transition-all hover:translate-x-1 cursor-pointer block ${
                  msg.read
                    ? 'opacity-75 shadow-none'
                    : 'border-brutalist-dark dark:border-brutalist-light shadow-[3px_3px_0px_0px_#ff007a]'
                }`}
              >
                <div className="flex justify-between items-start mb-2 font-space-grotesk">
                  <span className="font-black text-sm uppercase">{msg.name}</span>
                  <span className="text-[10px] text-foreground/50 font-bold">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
                <h4 className="font-black text-xs uppercase mb-1 line-clamp-1">{msg.subject || 'No Subject'}</h4>
                <p className="text-xs text-foreground/80 font-medium line-clamp-2">{msg.message}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Reader Panel */}
      <div className="lg:col-span-6">
        <h2 className="text-xl font-black uppercase font-syne tracking-tight mb-4">Message Reader</h2>
        
        {selectedMessage ? (
          <div className="bg-background brutalist-border rounded-xl p-6 brutalist-shadow-black dark:shadow-[4px_4px_0px_0px_var(--border-color)] space-y-4 font-space-grotesk">
            <div className="flex justify-between items-start pb-4 border-b-2 border-dashed border-border-color/20">
              <div>
                <h3 className="text-lg font-black uppercase">{selectedMessage.name}</h3>
                <a 
                  href={`mailto:${selectedMessage.email}`} 
                  className="text-xs font-bold text-brutalist-blue dark:text-brutalist-yellow underline"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <span className="text-xs font-bold text-foreground/50">
                {formatDateTime(selectedMessage.created_at)}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50">Subject</span>
              <p className="text-sm font-black uppercase">{selectedMessage.subject || 'No Subject'}</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-foreground/50">Message Body</span>
              <p className="text-sm font-bold leading-relaxed bg-muted/10 dark:bg-muted/5 brutalist-border-thin p-4 rounded-lg mt-1 whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>
          </div>
        ) : (
          <div className="brutalist-border rounded-xl p-12 text-center text-sm font-bold text-foreground/50 uppercase bg-background">
            Select a message to display contents
          </div>
        )}
      </div>
    </div>
  );
}
