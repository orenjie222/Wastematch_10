import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  Tag, 
  FileCheck, 
  Search, 
  Star, 
  Bell, 
  CheckCheck,
  ChevronRight
} from 'lucide-react';
import { AppNotification } from '../../types/marketplace';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationsDrawerOpen, 
    setIsNotificationsDrawerOpen, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    setActiveTab,
    setActiveConversationId,
    setSelectedDealId 
  } = useMarketplace();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'match' | 'deal'>('all');

  if (!isNotificationsDrawerOpen) return null;

  const filtered = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'match') return n.type === 'match';
    if (activeFilter === 'deal') return n.type === 'deal' || n.type === 'offer';
    return true;
  });

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    setIsNotificationsDrawerOpen(false);

    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    if (notif.type === 'offer' && notif.referenceId) {
      setActiveConversationId(notif.referenceId);
      setActiveTab('chat');
    }
    if (notif.type === 'deal' && notif.referenceId) {
      setSelectedDealId(notif.referenceId);
      setActiveTab('deals');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-4 h-4 text-[#164C3A]" />;
      case 'message':
      case 'offer':
        return <Tag className="w-4 h-4 text-amber-600" />;
      case 'deal':
        return <FileCheck className="w-4 h-4 text-emerald-700" />;
      case 'wanted':
        return <Search className="w-4 h-4 text-blue-600" />;
      case 'review':
        return <Star className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-[#164C3A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsNotificationsDrawerOpen(false)}
        className="absolute inset-0 bg-[#1C211F]/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#1C211F]/10 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#1C211F]/10 flex items-center justify-between bg-[#F7F5EF]/50 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-[#1C211F] font-display">
                ศูนย์การแจ้งเตือน (Notifications)
              </h2>
              <p className="text-[11px] text-[#1C211F]/50 mt-0.5">การอัปเดตการจับคู่ แชท และสถานะข้อตกลง</p>
            </div>
            <button
              onClick={() => setIsNotificationsDrawerOpen(false)}
              className="p-1 text-[#1C211F]/50 hover:text-[#1C211F] rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action & Filter Pills */}
          <div className="p-3 border-b border-[#1C211F]/10 flex items-center justify-between text-xs shrink-0">
            <div className="flex gap-1">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'unread', label: 'ยังไม่อ่าน' },
                { id: 'match', label: 'Matches' },
                { id: 'deal', label: 'Deals' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                    activeFilter === f.id
                      ? 'bg-[#164C3A] text-white font-medium'
                      : 'text-[#1C211F]/60 hover:bg-[#F7F5EF]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-[#164C3A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>อ่านทั้งหมด</span>
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1C211F]/5">
            {filtered.length > 0 ? (
              filtered.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-[#F7F5EF]/60 ${
                    !notif.read ? 'bg-[#F7F5EF]/30 font-medium' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-[#1C211F]/10 flex items-center justify-center shrink-0 shadow-2xs">
                    {getIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className={`font-semibold ${!notif.read ? 'text-[#164C3A]' : 'text-[#1C211F]'}`}>
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-[#1C211F]/40">{notif.createdAt}</span>
                    </div>
                    <p className="text-xs text-[#1C211F]/70 leading-relaxed">
                      {notif.body}
                    </p>
                  </div>

                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#164C3A] shrink-0 self-center" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#1C211F]/50">
                ไม่มีการแจ้งเตือนในหมวดนี้
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
