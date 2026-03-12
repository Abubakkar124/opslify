import React from 'react';
import { Bell, Briefcase, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { StorageService } from '../services/storageService';
import { formatDate, cn } from '../utils/helpers';

export default function NotificationsPage() {
  const notifications = StorageService.getNotifications();
  const currentUser = StorageService.getCurrentUser();

  // Filter notifications for current user or general ones
  const filteredNotifications = notifications.filter(n => !n.userId || n.userId === currentUser?.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with the latest jobs and system announcements.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600">
          {filteredNotifications.length} Total
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-start space-x-6 group"
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110",
              note.type === 'job' ? 'bg-indigo-50 text-indigo-600' : 
              note.type === 'system' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
            )}>
              {note.type === 'job' ? <Briefcase size={28} /> : 
               note.type === 'system' ? <AlertCircle size={28} /> : <CheckCircle2 size={28} />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{note.title}</h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                  <Clock size={12} className="mr-1" />
                  {formatDate(note.timestamp)}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{note.message}</p>
              {note.category && (
                <div className="mt-4">
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-wider">
                    Category: {note.category}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
              <Bell size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No notifications yet</h3>
            <p className="text-slate-500 mt-2">We'll alert you when something important happens.</p>
          </div>
        )}
      </div>
    </div>
  );
}
