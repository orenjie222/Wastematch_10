import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MatchRecord } from '../../types/marketplace';
import { getCategoryDefaultImage } from '../../data/seedData';
import { 
  Sparkles, 
  MessageSquare, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  RotateCw,
  FileCheck
} from 'lucide-react';

export const MatchesView: React.FC = () => {
  const { 
    matches, 
    currentUser, 
    setActiveConversationId, 
    setActiveTab, 
    setSelectedListing,
    conversations,
    createDealFromMatch 
  } = useMarketplace();

  const [activeTab, setActiveTabState] = useState<'all' | 'interested' | 'swap' | 'wanted'>('all');

  const filteredMatches = matches.filter(m => {
    if (activeTab === 'all') return true;
    if (activeTab === 'swap') return m.listing.transactionType === 'swap';
    if (activeTab === 'interested') return m.status === 'matched';
    if (activeTab === 'wanted') return m.status === 'deal_created' || m.status === 'negotiating';
    return true;
  });

  const handleOpenChat = (match: MatchRecord) => {
    const conv = conversations.find(c => c.matchId === match.id);
    if (conv) {
      setActiveConversationId(conv.id);
    }
    setActiveTab('chat');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C211F]/10 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C211F] font-display flex items-center gap-2">
            <span>รายการที่แมตช์สำเร็จ (Mutual Matches)</span>
            <span className="text-xs font-normal text-[#164C3A] bg-[#DCE9E2] px-2 py-0.5 rounded font-sans">
              {matches.length} แมตช์
            </span>
          </h1>
          <p className="text-xs text-[#1C211F]/60 mt-0.5">
            ทั้งคุณและอีกฝ่ายมีความสนใจตรงกัน สามารถเปิดห้องแชทเพื่อเจรจาหรือสร้างข้อตกลง (Deal) ได้ทันที
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#1C211F]/10 mb-6">
        {[
          { id: 'all', label: `ทั้งหมด (${matches.length})` },
          { id: 'interested', label: 'รอเริ่มเจรจา' },
          { id: 'swap', label: 'การแลกเปลี่ยนวัสดุ' },
          { id: 'wanted', label: 'กำลังดำเนินการ' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabState(tab.id as any)}
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

      {/* Matches Grid */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMatches.map(m => {
            const otherParty = m.buyerId === currentUser.id ? m.seller : m.buyer;
            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-[#1C211F]/10 p-5 flex flex-col justify-between hover:border-[#164C3A]/40 transition-all shadow-sm group"
              >
                <div className="space-y-4">
                  {/* Top Metadata & Match Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#164C3A]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mutual Match Active</span>
                    </span>
                    <span className="text-[#1C211F]/50 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>บันทึกเมื่อ {new Date(m.createdAt).toLocaleDateString('th-TH')}</span>
                    </span>
                  </div>

                  {/* Listing Info Box */}
                  <div className="flex gap-4 p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10">
                    <img
                      src={m.listing.images[0] || getCategoryDefaultImage(m.listing.category)}
                      alt={m.listing.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(m.listing.category);
                      }}
                      className="w-16 h-16 rounded-lg object-cover ring-1 ring-[#1C211F]/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-semibold text-[#164C3A]">
                        {m.listing.category} · {m.listing.transactionType}
                      </span>
                      <h3 className="text-xs font-bold text-[#1C211F] truncate mt-0.5">
                        {m.listing.title}
                      </h3>
                      <div className="text-xs font-bold text-[#164C3A] mt-1 tabular-nums">
                        {m.listing.price > 0 ? `฿${m.listing.price.toLocaleString()}` : 'ส่งต่อฟรี'}
                      </div>
                    </div>
                  </div>

                  {/* Match Reason Chips / Explanation */}
                  <div className="p-3 rounded-xl border border-[#1C211F]/10 bg-white text-xs space-y-1">
                    <span className="text-[10px] text-[#1C211F]/50 uppercase tracking-wider font-semibold block">
                      เหตุผลที่ระบบจับคู่ (Match Reason)
                    </span>
                    <p className="text-xs text-[#1C211F]/80 leading-relaxed">
                      {m.matchReason}
                    </p>
                  </div>

                  {/* Other User Snapshot */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1C211F]/10 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={otherParty.avatar}
                        alt={otherParty.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                        }}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-[#1C211F]/10"
                      />
                      <div>
                        <div className="font-semibold text-[#1C211F] flex items-center gap-1">
                          <span>{otherParty.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#164C3A]" />
                        </div>
                        <div className="text-[11px] text-[#1C211F]/60">
                          ตอบไว {otherParty.responseRate}% · {m.listing.location.district} (ห่าง {m.listing.location.distanceKm} กม.)
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#164C3A] tabular-nums">
                        ★ {otherParty.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 mt-4 border-t border-[#1C211F]/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedListing(m.listing)}
                    className="text-xs font-semibold text-[#1C211F]/70 hover:text-[#164C3A] flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>ดูประกาศ</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => createDealFromMatch(m.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#164C3A] bg-white border border-[#164C3A]/30 hover:bg-[#F7F5EF] rounded-lg transition-colors cursor-pointer"
                    >
                      เริ่มสร้าง Deal
                    </button>
                    <button
                      onClick={() => handleOpenChat(m)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-[#164C3A] rounded-lg hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>เปิดแชทเจรจา</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-2xl border border-[#1C211F]/10 text-center space-y-3">
          <h3 className="text-base font-semibold text-[#1C211F]">ยังไม่มีรายการแมตช์ในหมวดนี้</h3>
          <p className="text-xs text-[#1C211F]/60">ไปที่หน้าค้นพบเพื่อปัดเลือกสิ่งของที่คุณสนใจ หรือสร้างประกาศตามหาเพื่อรอการจับคู่</p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-lg hover:bg-[#123e2f] cursor-pointer"
          >
            ไปที่หน้าค้นพบ (Discover)
          </button>
        </div>
      )}

    </div>
  );
};
