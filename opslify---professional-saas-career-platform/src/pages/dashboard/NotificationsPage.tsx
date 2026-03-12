import React, { useState } from 'react';
import { Bell, Briefcase, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorageService } from '../../services/storageService';
import { formatDate, cn } from '../../utils/helpers';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(StorageService.getNotifications());
  const currentUser = StorageService.getCurrentUser();

  // Filter notifications for this user or for everyone
  const userNotifications = notifications.filter(n => !n.userId || n.userId === currentUser?.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <button className="text-sm font-bold text-indigo-600 hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {userNotifications.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex space-x-4 group"
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center",
                note.type === 'job' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
              )}>
                {note.type === 'job' ? <Briefcase size={24} /> : <AlertCircle size={24} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900">{note.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <Clock size={12} className="mr-1" />
                    {formatDate(note.timestamp)}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{note.message}</p>
                {note.category && (
                  <span className="inline-block mt-3 px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">
                    {note.category}
                  </span>
                )}
              </div>
              <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {userNotifications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Bell size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
            <p className="text-slate-500">You have no new notifications at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
