import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Listing, ListingStatus } from '../../types/marketplace';
import { 
  Plus, 
  Eye, 
  Heart, 
  Sparkles, 
  MoreVertical, 
  CheckCircle, 
  PauseCircle, 
  Trash2, 
  Lock, 
  RotateCcw,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const MyListingsView: React.FC = () => {
  const { 
    listings, 
    currentUser, 
    updateListingStatus, 
    deleteListing, 
    setIsCreateListingOpen,
    setSelectedListing 
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'draft' | 'reserved' | 'completed' | 'expired'>('all');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Filter listings where current user is seller or view all if admin
  const userListings = listings.filter(l => l.sellerId === currentUser.id || l.seller.id === currentUser.id);

  const filteredListings = userListings.filter(l => {
    if (activeTab === 'all') return true;
    if (activeTab === 'draft') return l.status === 'suspended';
    return l.status === activeTab;
  });

  const getStatusBadge = (status: ListingStatus) => {
    switch (status) {
      case 'active':
        return <span className="text-[#164C3A] font-semibold">Active · พร้อมแมตช์</span>;
      case 'reserved':
        return <span className="text-amber-700 font-semibold">Reserved · จองแล้ว</span>;
      case 'completed':
        return <span className="text-emerald-700 font-semibold">Completed · สำเร็จแล้ว</span>;
      case 'suspended':
        return <span className="text-stone-500 font-semibold">Draft / พักประกาศ</span>;
      case 'expired':
        return <span className="text-rose-600 font-semibold">Expired · หมดอายุ</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C211F]/10 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C211F] font-display flex items-center gap-2">
            <span>รายการประกาศของฉัน (My Listings)</span>
            <span className="text-xs font-normal text-[#164C3A] bg-[#DCE9E2] px-2 py-0.5 rounded font-sans">
              {userListings.length} รายการ
            </span>
          </h1>
          <p className="text-xs text-[#1C211F]/60 mt-0.5">
            จัดการสถานะ แก้ไขรายละเอียด และตรวจสอบสถิติการรับชมและการแมตช์
          </p>
        </div>

        <button
          onClick={() => setIsCreateListingOpen(true)}
          className="px-4 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ลงประกาศเพิ่ม</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#1C211F]/10 mb-6">
        {[
          { id: 'all', label: `ทั้งหมด (${userListings.length})` },
          { id: 'active', label: `Active (${userListings.filter(l => l.status === 'active').length})` },
          { id: 'reserved', label: `จองแล้ว (${userListings.filter(l => l.status === 'reserved').length})` },
          { id: 'completed', label: `สำเร็จแล้ว (${userListings.filter(l => l.status === 'completed').length})` },
          { id: 'draft', label: `แบบร่าง/พัก (${userListings.filter(l => l.status === 'suspended').length})` },
          { id: 'expired', label: `หมดอายุ (${userListings.filter(l => l.status === 'expired').length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'bg-[#164C3A] text-white'
                : 'text-[#1C211F]/70 hover:bg-[#F7F5EF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings Table / Cards */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#1C211F]/10 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Image & Status Bar */}
                <div className="relative aspect-16/10 bg-[#F7F5EF]">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs">
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-white font-bold tabular-nums">
                    {item.price > 0 ? `฿${item.price.toLocaleString()}` : 'ส่งต่อฟรี'}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[11px] text-[#1C211F]/50 uppercase tracking-wider">
                      {item.category} · สภาพ {item.conditionPercentage}%
                    </span>
                    <h3 className="text-sm font-bold text-[#1C211F] line-clamp-1 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  {/* Real Engagement Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#F7F5EF] rounded-xl text-center text-xs">
                    <div>
                      <div className="font-bold text-[#1C211F] tabular-nums flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3 text-[#1C211F]/50" />
                        <span>{item.views}</span>
                      </div>
                      <span className="text-[10px] text-[#1C211F]/50">การดู</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#1C211F] tabular-nums flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3 text-[#1C211F]/50" />
                        <span>{item.saves}</span>
                      </div>
                      <span className="text-[10px] text-[#1C211F]/50">บันทึก</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#164C3A] tabular-nums flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#164C3A]" />
                        <span>{item.interestedCount}</span>
                      </div>
                      <span className="text-[10px] text-[#1C211F]/50">สนใจ/แมตช์</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Controls */}
              <div className="p-4 pt-0 border-t border-[#1C211F]/10 mt-3 pt-3 flex items-center justify-between">
                <button
                  onClick={() => setSelectedListing(item)}
                  className="text-xs font-semibold text-[#164C3A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ดูรายละเอียด</span>
                </button>

                {/* State Transition Actions */}
                <div className="flex items-center gap-1.5">
                  {item.status === 'active' && (
                    <>
                      <button
                        onClick={() => updateListingStatus(item.id, 'reserved')}
                        title="ทำเครื่องหมายว่าติดจอง"
                        className="px-2.5 py-1 text-[11px] font-medium bg-[#F7F5EF] text-[#1C211F] hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                      >
                        ติดจอง
                      </button>
                      <button
                        onClick={() => updateListingStatus(item.id, 'suspended')}
                        title="พักการแสดงผล"
                        className="p-1 text-[#1C211F]/60 hover:text-[#1C211F] cursor-pointer"
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {item.status === 'reserved' && (
                    <button
                      onClick={() => updateListingStatus(item.id, 'completed')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                    >
                      ส่งมอบแล้ว
                    </button>
                  )}

                  {item.status === 'suspended' && (
                    <button
                      onClick={() => updateListingStatus(item.id, 'active')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-[#164C3A] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      เปิดประกาศ
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบประกาศนี้?')) {
                        deleteListing(item.id);
                      }
                    }}
                    title="ลบประกาศ"
                    className="p-1 text-[#1C211F]/40 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-2xl border border-[#1C211F]/10 text-center space-y-3">
          <h3 className="text-base font-semibold text-[#1C211F]">ไม่มีรายการในสถานะนี้</h3>
          <p className="text-xs text-[#1C211F]/60">คุณสามารถลงประกาศสินค้าใหม่เพื่อเริ่มหมุนเวียนทรัพยากร</p>
          <button
            onClick={() => setIsCreateListingOpen(true)}
            className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-lg hover:bg-[#123e2f] cursor-pointer"
          >
            ลงประกาศสินค้าใหม่
          </button>
        </div>
      )}

    </div>
  );
};
