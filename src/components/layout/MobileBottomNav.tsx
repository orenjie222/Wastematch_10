import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Compass, Search, Plus, Sparkles, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsCreateListingOpen, 
    matches,
    isAdminMode 
  } = useMarketplace();

  if (isAdminMode) return null;

  return (
    <nav 
      aria-label="เมนูหลักสำหรับมือถือ" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4DFD5] px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]"
      style={{ height: '62px' }}
    >
      <div className="grid grid-cols-5 items-center h-full max-w-md mx-auto font-sans">
        
        {/* Discover */}
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center justify-center h-full py-1 cursor-pointer transition-colors ${
            activeTab === 'discover' ? 'text-[#344634] font-bold' : 'text-[#252722]/60 hover:text-[#252722]'
          }`}
        >
          <Compass className="w-5 h-5" strokeWidth={activeTab === 'discover' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-0.5">ตลาด</span>
        </button>

        {/* Wanted */}
        <button
          onClick={() => setActiveTab('wanted')}
          className={`flex flex-col items-center justify-center h-full py-1 cursor-pointer transition-colors ${
            activeTab === 'wanted' ? 'text-[#344634] font-bold' : 'text-[#252722]/60 hover:text-[#252722]'
          }`}
        >
          <Search className="w-5 h-5" strokeWidth={activeTab === 'wanted' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-0.5">ตามหา</span>
        </button>

        {/* Primary Action: Post Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsCreateListingOpen(true)}
            aria-label="สร้างประกาศใหม่"
            className="w-11 h-11 rounded-full bg-[#344634] text-white flex items-center justify-center shadow-md shadow-[#344634]/20 active:scale-95 transition-transform cursor-pointer"
          >
            <Plus className="w-6 h-6" strokeWidth={2.4} />
          </button>
        </div>

        {/* Matches */}
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex flex-col items-center justify-center h-full py-1 cursor-pointer transition-colors relative ${
            activeTab === 'matches' ? 'text-[#344634] font-bold' : 'text-[#252722]/60 hover:text-[#252722]'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5" strokeWidth={activeTab === 'matches' ? 2.3 : 1.8} />
            {matches.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#344634] rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-0.5">แมตช์</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center h-full py-1 cursor-pointer transition-colors ${
            activeTab === 'profile' ? 'text-[#344634] font-bold' : 'text-[#252722]/60 hover:text-[#252722]'
          }`}
        >
          <User className="w-5 h-5" strokeWidth={activeTab === 'profile' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-0.5">โปรไฟล์</span>
        </button>

      </div>
    </nav>
  );
};
