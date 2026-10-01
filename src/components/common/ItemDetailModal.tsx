import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { getCategoryDefaultImage } from '../../data/seedData';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Bookmark, 
  Heart, 
  MessageSquare, 
  Flag, 
  Share2, 
  CheckCircle2, 
  Truck,
  ArrowRight,
  Eye,
  Clock,
  ChevronRight,
  Coins,
  Receipt,
  Navigation,
  Compass
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { 
    selectedListing, 
    setSelectedListing, 
    handleSwipe, 
    savedListingIds, 
    toggleSaveListing, 
    matches, 
    conversations, 
    setActiveConversationId, 
    setActiveTab, 
    setReportModalTarget, 
    currentUser,
    setViewingSeller
  } = useMarketplace();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedListing) return null;

  const isSaved = savedListingIds.includes(selectedListing.id);
  const existingMatch = matches.find(m => m.listingId === selectedListing.id && (m.buyerId === currentUser.id || m.sellerId === currentUser.id));

  const handleOpenChat = () => {
    if (existingMatch) {
      const conv = conversations.find(c => c.matchId === existingMatch.id);
      if (conv) setActiveConversationId(conv.id);
      setSelectedListing(null);
      setActiveTab('chat');
    }
  };

  const handleInterested = () => {
    handleSwipe(selectedListing.id, 'interested');
    setSelectedListing(null);
  };

  const handleOpenSellerProfile = () => {
    setViewingSeller(selectedListing.seller);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
      >
        
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-[#1C211F]/10 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#1C211F]/60">
            <span className="font-semibold text-[#164C3A] uppercase tracking-wider">{selectedListing.category}</span>
            <span>·</span>
            <span className="font-semibold text-[#1C211F]">
              {selectedListing.transactionType === 'sell' ? 'ขาย (SELL)' : selectedListing.transactionType === 'swap' ? 'แลกเปลี่ยน (EXCHANGE)' : selectedListing.transactionType === 'donate' ? 'บริจาคเพื่อสังคม (DONATE)' : 'ให้ฟรี (FREE)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveListing(selectedListing.id)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isSaved ? 'bg-[#164C3A] text-white border-[#164C3A]' : 'border-[#1C211F]/15 text-[#1C211F]/60 hover:text-[#1C211F]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedListing(null)}
              className="p-1.5 text-[#1C211F]/50 hover:text-[#1C211F] rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* 1. Large Image Gallery */}
          <div className="space-y-3">
            <div className="aspect-16/10 rounded-2xl overflow-hidden bg-[#F7F5EF] border border-[#1C211F]/10">
              <img
                src={selectedListing.images[activeImageIndex] || selectedListing.images[0] || getCategoryDefaultImage(selectedListing.category)}
                alt={selectedListing.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = getCategoryDefaultImage(selectedListing.category);
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {selectedListing.images.length > 1 && (
              <div className="flex gap-2">
                {selectedListing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImageIndex === idx ? 'border-[#164C3A]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="thumbnail" 
                      referrerPolicy="no-referrer" 
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(selectedListing.category);
                      }}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Title & Pricing Grid */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1C211F]/10 pb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1C211F] font-display">
                {selectedListing.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#1C211F]/60 mt-1.5">
                <span className="font-semibold text-emerald-800 bg-[#DCE9E2] px-2 py-0.5 rounded">
                  สภาพ {selectedListing.conditionPercentage}% ({selectedListing.conditionLabel})
                </span>
                <span>·</span>
                <span>จำนวน: {selectedListing.quantity} {selectedListing.unit}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#1C211F]">
                  <MapPin className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>{selectedListing.location.province} ({selectedListing.location.district})</span>
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-2xl font-bold text-[#164C3A] tabular-nums font-display">
                {selectedListing.price > 0 ? `฿${selectedListing.price.toLocaleString()}` : 'ส่งต่อฟรี/แลกเปลี่ยน'}
              </div>
              {selectedListing.originalPrice && (
                <span className="text-xs text-[#1C211F]/50 line-through tabular-nums block">
                  มือหนึ่ง ฿{selectedListing.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* 3. Platform Fee & Commission Breakdown (Requirements 12 & 13) */}
          {selectedListing.transactionType === 'sell' && (
            <div className="p-4 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1C211F]">
                <span className="flex items-center gap-1.5 text-[#164C3A]">
                  <Receipt className="w-4 h-4" />
                  <span>โครงสร้างค่าคอมมิชชั่นแพลตฟอร์มโปร่งใส (15% ลงสู่ต่ำสุด 10%)</span>
                </span>
                <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  อัตราค่าคอมมิชชั่น: {selectedListing.commissionRate}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[10px] text-[#1C211F]/50 block">ราคาขายที่ตั้งไว้</span>
                  <span className="font-semibold text-[#1C211F] font-display">฿{selectedListing.price.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#1C211F]/50 block">ค่าคอมมิชชั่นระบบ ({selectedListing.commissionRate}%)</span>
                  <span className="font-semibold text-[#164C3A] font-display">฿{selectedListing.platformFee.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#1C211F]/50 block">ยอดสุทธิที่ผู้ขายได้รับ</span>
                  <span className="font-bold text-emerald-800 font-display">฿{selectedListing.sellerNetPayout.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[10px] text-[#1C211F]/50 pt-0.5">
                * WasteMatch คิดค่าคอมมิชชั่น 15% สำหรับสินค้าขายทั่วไป และปรับลดลงตามมูลค่า (สูงสุดเหลือต่ำสุด 10% สำหรับยอด ฿20,000+) ส่วนรายการให้ฟรีและบริจาคไม่คิดค่าธรรมเนียมใดๆ
              </p>
            </div>
          )}

          {selectedListing.transactionType === 'donate' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1">
              <div className="font-bold text-rose-900 flex items-center gap-1">
                <span>ประกาศเพื่อการบริจาคสาธารณกุศล (Non-Profit Donation)</span>
              </div>
              <p className="text-rose-800 text-[11px] leading-relaxed">
                สิ่งของนี้มีวัตถุประสงค์เพื่อส่งต่อแก่มูลนิธิและองค์กรสาธารณประโยชน์เท่านั้น ห้ามนำไปจำหน่ายต่อในเชิงพาณิชย์ และไม่มีการเก็บค่าธรรมเนียมแพลตฟอร์มใดๆ (0%)
              </p>
            </div>
          )}

          {/* 4. Match Explanation Box */}
          <div className="p-4 bg-[#F7F5EF] rounded-xl border border-[#164C3A]/15 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#164C3A]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>การวิเคราะห์ความเข้ากันได้ (Match Explanation)</span>
              </span>
              <span>คะแนนความเข้ากันได้ {selectedListing.matchExplanation.compatibilityScore}%</span>
            </div>
            
            <div className="space-y-1.5 text-xs text-[#1C211F]/80">
              {selectedListing.matchExplanation.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A] shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C211F]/60">
              รายละเอียดสิ่งของและการนำไปใช้
            </h3>
            <p className="text-xs sm:text-sm text-[#1C211F]/80 leading-relaxed whitespace-pre-line">
              {selectedListing.description}
            </p>
          </div>

          {/* 6. Location, Distance & Service Area Coverage */}
          <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#1C211F]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C211F] flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#164C3A]" />
                <span>สถานที่ตั้งและรัศมีพื้นที่ส่งมอบ</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-[#DCE9E2] px-2 py-0.5 rounded">
                ห่างจากคุณ {selectedListing.location.distanceKm} กม.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#1C211F]/10">
                <span className="text-[10px] text-[#1C211F]/50 block">พิกัดและจังหวัด</span>
                <span className="font-bold text-[#1C211F] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>{selectedListing.location.province} ({selectedListing.location.district})</span>
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#1C211F]/10">
                <span className="text-[10px] text-[#1C211F]/50 block">รัศมีพื้นที่บริการ</span>
                <span className="font-bold text-[#164C3A] flex items-center gap-1 mt-0.5">
                  <Compass className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>
                    {selectedListing.location.radiusKm ? `สะดวกส่งมอบในรัศมี ${selectedListing.location.radiusKm} กม.` : 'ครอบคลุมจัดส่งทั่วประเทศ'}
                  </span>
                </span>
              </div>
            </div>

            {selectedListing.location.coverageArea && (
              <div className="text-xs text-[#1C211F]/70 bg-white/70 p-2.5 rounded-xl border border-[#1C211F]/5">
                <span className="font-semibold text-[#1C211F]">เงื่อนไขพื้นที่: </span>
                <span>{selectedListing.location.coverageArea}</span>
              </div>
            )}

            {/* Delivery Methods */}
            <div className="pt-2 border-t border-[#1C211F]/10">
              <span className="text-[11px] font-semibold text-[#1C211F]/70 block mb-1.5">
                ช่องทางการรับ-ส่งมอบสินค้า:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {selectedListing.deliveryOptions.map(opt => (
                  <div key={opt} className="p-2.5 bg-white border border-[#1C211F]/10 rounded-xl flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#164C3A]" />
                    <span className="font-medium text-[#1C211F]">
                      {opt === 'pickup' ? 'นัดรับด้วยตนเอง' : opt === 'local_courier' ? 'แมสเซนเจอร์ในเมือง' : 'ขนส่งพัสดุ/รถบรรทุก'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7. Seller Card & Track Record (Replaced Trust Score + Clickable Profile!) */}
          <div 
            onClick={handleOpenSellerProfile}
            className="p-4 bg-white border border-[#1C211F]/10 rounded-2xl flex items-center justify-between hover:border-[#164C3A] transition-colors cursor-pointer group shadow-2xs"
            title="คลิกเพื่อเปิดดูประวัติและโปรไฟล์ผู้ส่งต่อ"
          >
            <div className="flex items-center gap-3">
              <img
                src={selectedListing.seller.avatar}
                alt={selectedListing.seller.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                }}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#164C3A]/20"
              />
              <div>
                <div className="text-xs font-bold text-[#1C211F] group-hover:text-[#164C3A] flex items-center gap-1.5 transition-colors">
                  <span>{selectedListing.seller.name}</span>
                  <ShieldCheck className="w-4 h-4 text-[#164C3A]" />
                </div>
                <div className="text-[11px] text-[#1C211F]/60 mt-0.5 flex flex-wrap items-center gap-2">
                  <span className="text-emerald-700 font-medium">ตอบกลับไว {selectedListing.seller.responseRate}%</span>
                  <span>·</span>
                  <span>ส่งมอบสำเร็จ {selectedListing.seller.completedDeals} ครั้ง</span>
                  <span>·</span>
                  <span>แนะนำ {selectedListing.seller.recommendationRate}%</span>
                </div>
                <span className="text-[10px] text-[#1C211F]/40 block mt-0.5">
                  จังหวัด {selectedListing.seller.location.province} · สมาชิกตั้งแต่ {selectedListing.seller.memberSince}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0 flex items-center gap-2 text-xs font-semibold text-[#164C3A]">
              <span>ดูโปรไฟล์</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="px-6 py-4 bg-[#F7F5EF] border-t border-[#1C211F]/10 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              setReportModalTarget({
                type: 'listing',
                id: selectedListing.id,
                title: selectedListing.title
              });
            }}
            className="text-xs text-[#1C211F]/60 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>รายงานประกาศนี้</span>
          </button>

          <div className="flex items-center gap-3">
            {existingMatch ? (
              <button
                onClick={handleOpenChat}
                className="px-6 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>เปิดห้องแชทเจรจา (Open Chat)</span>
              </button>
            ) : (
              <button
                onClick={handleInterested}
                className="px-6 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>สนใจรายการนี้ (Mutual Match)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
