import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  X, 
  Sparkles, 
  Tag, 
  FileCheck, 
  Search, 
  Star, 
  Bell, 
  CheckCheck,
  ShieldAlert
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
        return <Sparkles className="w-4 h-4 text-[#344634]" />;
      case 'message':
      case 'offer':
        return <Tag className="w-4 h-4 text-amber-700" />;
      case 'deal':
        return <FileCheck className="w-4 h-4 text-[#344634]" />;
      case 'wanted':
        return <Search className="w-4 h-4 text-[#7C8B72]" />;
      case 'review':
        return <Star className="w-4 h-4 text-amber-600" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-rose-700" />;
      default:
        return <Bell className="w-4 h-4 text-[#344634]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsNotificationsDrawerOpen(false)}
        className="absolute inset-0 bg-[#252722]/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E4DFD5] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E4DFD5] flex items-center justify-between bg-[#F7F5F0] shrink-0">
            <div>
              <h2 className="text-base font-serif font-bold text-[#252722]">
                Notifications
              </h2>
              <p className="text-[11px] text-[#252722]/60 mt-0.5 font-sans">
                การอัปเดตการจับคู่ แชท และสถานะข้อตกลง (ระบบเป็นทางการ ปราศจากอิโมจิ)
              </p>
            </div>
            <button
              onClick={() => setIsNotificationsDrawerOpen(false)}
              className="p-1 text-[#252722]/50 hover:text-[#252722] rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action & Filter Pills */}
          <div className="p-3 border-b border-[#E4DFD5] flex items-center justify-between text-xs shrink-0 bg-white">
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'unread', label: 'ยังไม่อ่าน' },
                { id: 'match', label: 'Matches' },
                { id: 'deal', label: 'Deals' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeFilter === f.id
                      ? 'bg-[#344634] text-white font-semibold'
                      : 'text-[#252722]/70 hover:bg-[#EEEAE1]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-[#344634] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>อ่านทั้งหมด</span>
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E4DFD5]/60 bg-white">
            {filtered.length > 0 ? (
              filtered.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 flex items-start gap-3.5 transition-colors cursor-pointer hover:bg-[#F7F5F0] ${
                    !notif.read ? 'bg-[#F7F5F0]/60' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E4DFD5] flex items-center justify-center shrink-0 shadow-2xs">
                    {getIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={`font-semibold ${!notif.read ? 'text-[#344634]' : 'text-[#252722]'}`}>
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-[#252722]/40 font-mono">
                        {notif.createdAt ? new Date(notif.createdAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    <p className="text-xs text-[#252722]/75 leading-relaxed font-sans">
                      {notif.body}
                    </p>
                  </div>

                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#344634] shrink-0 self-center" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-xs text-[#252722]/50 font-sans">
                ไม่มีการแจ้งเตือนในหมวดนี้
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
