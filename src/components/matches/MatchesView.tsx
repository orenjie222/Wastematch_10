import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MatchRecord } from '../../types/marketplace';
import { getCategoryDefaultImage } from '../../data/seedData';
import { 
  Sparkles, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  MoreVertical,
  UserX,
  Flag,
  Trash2,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const MatchesView: React.FC = () => {
  const { 
    matches, 
    currentUser, 
    setActiveConversationId, 
    setActiveTab, 
    setSelectedListing,
    conversations,
    createDealFromMatch,
    unmatch,
    blockUser,
    setReportModalTarget 
  } = useMarketplace();

  const [activeTab, setActiveTabState] = useState<'all' | 'interested' | 'swap' | 'wanted'>('all');
  const [openMenuMatchId, setOpenMenuMatchId] = useState<string | null>(null);

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

  const handleUnmatch = (matchId: string, title: string) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจับคู่สำหรับ "${title}"?`)) {
      unmatch(matchId);
      setOpenMenuMatchId(null);
    }
  };

  const handleBlockUser = (userId: string, userName: string) => {
    if (window.confirm(`คุณต้องการระงับการติดต่อ (Block) กับ "${userName}" ใช่หรือไม่?`)) {
      blockUser(userId);
      setOpenMenuMatchId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5] mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif text-[#252722]">
              Mutual Matches
            </h1>
            <span className="text-xs font-semibold text-[#344634] bg-[#EEEAE1] border border-[#E4DFD5] px-3 py-1 rounded-full font-sans">
              {matches.length} แมตช์ที่จับคู่ตรงกัน
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#252722]/70 mt-1.5 font-sans">
            ทั้งคุณและอีกฝ่ายมีความสนใจตรงกัน สามารถเปิดห้องแชทเพื่อเจรจา สร้างข้อตกลง หรือจัดการความปลอดภัยได้ทันที
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E4DFD5] mb-8">
        {[
          { id: 'all', label: `ทั้งหมด (${matches.length})` },
          { id: 'interested', label: 'รอเริ่มเจรจา' },
          { id: 'swap', label: 'การแลกเปลี่ยนวัสดุ' },
          { id: 'wanted', label: 'กำลังดำเนินการ' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabState(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-[#344634] text-white shadow-2xs'
                : 'text-[#252722]/70 hover:bg-[#EEEAE1]'
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
            const isMenuOpen = openMenuMatchId === m.id;

            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-[#E4DFD5] p-6 flex flex-col justify-between hover:border-[#344634]/50 transition-all shadow-2xs relative group"
              >
                <div className="space-y-4">
                  {/* Top Metadata & Menu Dropdown */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#344634]">
                      <Sparkles className="w-4 h-4" />
                      <span>Mutual Match Active</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[#252722]/50 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(m.createdAt).toLocaleDateString('th-TH')}</span>
                      </span>

                      {/* Match Actions Dropdown (Unmatch, Block, Report) */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuMatchId(isMenuOpen ? null : m.id)}
                          className="p-1 text-[#252722]/50 hover:text-[#252722] hover:bg-[#EEEAE1] rounded-lg cursor-pointer"
                          title="ตัวเลือกความปลอดภัย"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-[#E4DFD5] py-1.5 z-20 animate-in fade-in zoom-in-95 duration-100">
                            <button
                              onClick={() => handleUnmatch(m.id, m.listing.title)}
                              className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#252722] hover:bg-[#F7F5F0] flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-amber-700" />
                              <span>ยกเลิกการจับคู่ (Unmatch)</span>
                            </button>

                            <button
                              onClick={() => {
                                setReportModalTarget({
                                  type: 'user',
                                  id: otherParty.id,
                                  title: otherParty.name
                                });
                                setOpenMenuMatchId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#252722] hover:bg-[#F7F5F0] flex items-center gap-2 cursor-pointer"
                            >
                              <Flag className="w-3.5 h-3.5 text-rose-600" />
                              <span>รายงานผู้ใช้ (Report)</span>
                            </button>

                            <button
                              onClick={() => handleBlockUser(otherParty.id, otherParty.name)}
                              className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                            >
                              <UserX className="w-3.5 h-3.5 text-rose-700" />
                              <span>ระงับการติดต่อ (Block)</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Listing Info Box */}
                  <div className="flex gap-4 p-4 rounded-xl bg-[#F7F5F0] border border-[#E4DFD5]">
                    <img
                      src={m.listing.images[0] || getCategoryDefaultImage(m.listing.category)}
                      alt={m.listing.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(m.listing.category);
                      }}
                      className="w-18 h-18 rounded-xl object-cover ring-1 ring-[#E4DFD5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-semibold text-[#7C8B72] tracking-wider block">
                        {m.listing.category} · {m.listing.transactionType}
                      </span>
                      <h3 className="text-sm font-bold text-[#252722] truncate mt-0.5 font-serif">
                        {m.listing.title}
                      </h3>
                      <div className="text-sm font-serif font-bold text-[#344634] mt-1 tabular-nums">
                        {m.listing.price > 0 ? `฿${m.listing.price.toLocaleString()}` : 'ส่งต่อฟรี'}
                      </div>
                    </div>
                  </div>

                  {/* Match Reason Chips / Explanation */}
                  <div className="p-3.5 rounded-xl border border-[#E4DFD5] bg-white text-xs space-y-1">
                    <span className="text-[10px] text-[#7C8B72] uppercase tracking-wider font-semibold block">
                      เหตุผลที่ระบบจับคู่ (Match Reason)
                    </span>
                    <p className="text-xs text-[#252722]/80 leading-relaxed font-sans">
                      {m.matchReason}
                    </p>
                  </div>

                  {/* Other User Snapshot */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E4DFD5] text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={otherParty.avatar}
                        alt={otherParty.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E4DFD5]"
                      />
                      <div>
                        <div className="font-semibold text-[#252722] flex items-center gap-1">
                          <span>{otherParty.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#344634]" />
                        </div>
                        <div className="text-[11px] text-[#252722]/60 font-sans">
                          ตอบไว {otherParty.responseRate}% · {m.listing.location.district} (ห่าง {m.listing.location.distanceKm} กม.)
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#344634] tabular-nums font-serif">
                        ★ {otherParty.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 mt-4 border-t border-[#E4DFD5] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedListing(m.listing)}
                    className="text-xs font-semibold text-[#252722]/70 hover:text-[#344634] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>ดูประกาศ</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => createDealFromMatch(m.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-[#344634] bg-white border border-[#E4DFD5] hover:border-[#344634] hover:bg-[#EEEAE1] rounded-xl transition-all cursor-pointer"
                    >
                      เริ่มสร้าง Deal
                    </button>
                    <button
                      onClick={() => handleOpenChat(m)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#344634] rounded-xl hover:bg-[#263426] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
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
        <div className="p-14 bg-white rounded-2xl border border-[#E4DFD5] text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#EEEAE1] text-[#344634] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#252722]">ยังไม่มีรายการแมตช์ในหมวดนี้</h3>
          <p className="text-xs sm:text-sm text-[#252722]/65 max-w-md mx-auto font-sans leading-relaxed">
            ไปที่หน้า Marketplace เพื่อปัดเลือกสิ่งของที่คุณสนใจ หรือสร้างประกาศตามหาเพื่อรอการจับคู่แบบ Mutual Match
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-6 py-3 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
          >
            ไปที่หน้า Marketplace
          </button>
        </div>
      )}

    </div>
  );
};
