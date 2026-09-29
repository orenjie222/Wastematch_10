import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  X,
  FileCheck
} from 'lucide-react';

export const MatchModal: React.FC = () => {
  const { 
    matchModalData, 
    setMatchModalData, 
    setActiveConversationId, 
    setActiveTab, 
    conversations,
    createDealFromMatch 
  } = useMarketplace();

  if (!matchModalData) return null;
  const { match } = matchModalData;

  const handleStartChat = () => {
    // Find conversation corresponding to this match
    const conv = conversations.find(c => c.matchId === match.id);
    if (conv) {
      setActiveConversationId(conv.id);
    }
    setMatchModalData(null);
    setActiveTab('chat');
  };

  const handleCreateDeal = () => {
    createDealFromMatch(match.id);
    setMatchModalData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DCE9E2]" />
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Mutual Match Verified
            </h3>
          </div>
          <button
            onClick={() => setMatchModalData(null)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          <div className="text-center space-y-1.5">
            <h2 className="text-xl font-bold text-[#1C211F] font-display">
              คุณและผู้ใช้รายนี้สนใจรายการที่ตรงกัน
            </h2>
            <p className="text-xs text-[#1C211F]/70 max-w-sm mx-auto">
              ระบบ WasteMatch ได้ตรวจพบความเข้ากันได้ของความต้องการในสิ่งของชิ้นนี้
            </p>
          </div>

          {/* Matched Listing Card Summary */}
          <div className="flex gap-4 p-4 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10">
            <img
              src={match.listing.images[0]}
              alt={match.listing.title}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-lg object-cover ring-1 ring-[#1C211F]/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-medium text-[#164C3A] uppercase tracking-wider">
                {match.listing.transactionType === 'sell' ? 'รายการขาย' : match.listing.transactionType === 'swap' ? 'รายการแลกเปลี่ยน' : 'ส่งต่อฟรี/บริจาค'}
              </span>
              <h4 className="text-sm font-semibold text-[#1C211F] truncate mt-0.5">
                {match.listing.title}
              </h4>
              <div className="text-xs font-bold text-[#164C3A] mt-1 tabular-nums">
                {match.listing.price > 0 ? `฿${match.listing.price.toLocaleString()}` : 'ไม่มีค่าใช้จ่าย'}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#1C211F]/60 mt-1">
                <MapPin className="w-3 h-3 text-[#164C3A]" />
                <span>{match.listing.location.district}</span>
                <span>·</span>
                <span>ห่าง {match.listing.location.distanceKm} กม.</span>
              </div>
            </div>
          </div>

          {/* Seller Trust Status */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#1C211F]/10 bg-white">
            <div className="flex items-center gap-3">
              <img
                src={match.seller.avatar}
                alt={match.seller.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#1C211F]/10"
              />
              <div>
                <div className="text-xs font-semibold text-[#1C211F] flex items-center gap-1.5">
                  <span>{match.seller.name}</span>
                  <span className="text-[10px] text-[#164C3A] bg-[#DCE9E2] px-1.5 py-0.5 rounded font-medium">
                    Verified
                  </span>
                </div>
                <div className="text-[11px] text-[#1C211F]/60 mt-0.5">
                  ตอบกลับไว {match.seller.responseRate}% · ส่งมอบแล้ว {match.seller.completedDeals} ครั้ง
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#164C3A] tabular-nums">
                ★ {match.seller.rating}
              </span>
            </div>
          </div>

          {/* Explanation Reasons */}
          <div className="space-y-2 border-t border-[#1C211F]/10 pt-4">
            <span className="text-[11px] font-semibold text-[#1C211F]/60 uppercase tracking-wider block">
              เหตุผลการจับคู่ (Match Explanation)
            </span>
            <div className="space-y-1.5 text-xs text-[#1C211F]/80">
              {match.listing.matchExplanation.reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A] shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleStartChat}
              className="py-3 px-4 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>เปิดแชทเจรจา</span>
            </button>

            <button
              onClick={handleCreateDeal}
              className="py-3 px-4 bg-white text-[#1C211F] text-xs font-semibold rounded-xl border border-[#1C211F]/20 hover:border-[#164C3A] hover:text-[#164C3A] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>สร้างข้อตกลง (Deal)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
