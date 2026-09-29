import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { User, Listing } from '../../types/marketplace';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Star, 
  MessageSquare, 
  RotateCw, 
  Leaf, 
  Clock, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  User as UserIcon, 
  Layers, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';

interface SellerProfileModalProps {
  seller: User | null;
  onClose: () => void;
}

export const SellerProfileModal: React.FC<SellerProfileModalProps> = ({ seller, onClose }) => {
  const { 
    listings, 
    reviews, 
    setSelectedListing, 
    currentUser, 
    handleSwipe,
    setActiveTab,
    conversations,
    setActiveConversationId 
  } = useMarketplace();

  const [activeTab, setActiveTabState] = useState<'listings' | 'completed' | 'reviews' | 'impact'>('listings');

  if (!seller) return null;

  const sellerListings = listings.filter(l => l.sellerId === seller.id && l.status === 'active');
  const pastListings = listings.filter(l => l.sellerId === seller.id && l.status === 'completed');
  const sellerReviews = reviews.filter(r => r.targetUserId === seller.id);

  const isMe = currentUser.id === seller.id;

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    onClose();
  };

  const handleContactSeller = () => {
    // Check if there's any active listing
    if (sellerListings.length > 0) {
      handleSwipe(sellerListings[0].id, 'interested');
      setSelectedListing(sellerListings[0]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1C211F]/10 flex items-center justify-between bg-[#F7F5EF] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#164C3A]">
              โปรไฟล์ผู้ส่งต่อสิ่งของ (Community Profile)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1C211F]/50 hover:text-[#1C211F] rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Profile Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* 1. Profile Identity Hero */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-white border border-[#1C211F]/10 rounded-2xl">
            <img
              src={seller.avatar}
              alt={seller.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#164C3A]/20 shadow-sm shrink-0"
            />

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-[#1C211F] font-display">
                  {seller.name}
                </h2>
                
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#164C3A] text-white font-medium capitalize">
                  {seller.accountType === 'individual' ? 'บุคคลทั่วไป' : seller.accountType === 'business' ? 'ธุรกิจหมุนเวียน' : 'มูลนิธิเพื่อสังคม'}
                </span>

                {seller.verifiedBadges.identity && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#164C3A] font-semibold bg-[#DCE9E2] px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ยืนยันตัวตนแล้ว</span>
                  </span>
                )}
              </div>

              {seller.organizationName && (
                <p className="text-xs font-semibold text-[#164C3A]">
                  {seller.organizationName}
                </p>
              )}

              <p className="text-xs text-[#1C211F]/75 leading-relaxed max-w-xl">
                {seller.bio || 'ยังไม่มีคำแนะนำตัว'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#1C211F]/60 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>{seller.location.district}, {seller.location.province}</span>
                </span>
                <span>·</span>
                <span>สมาชิกตั้งแต่ {seller.memberSince}</span>
              </div>
            </div>
          </div>

          {/* 2. Authentic User Indicators (Replaced Trust Score!) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
              <span className="text-[11px] text-[#1C211F]/60 block mb-0.5">อัตราการตอบกลับ</span>
              <div className="text-lg font-bold text-[#164C3A] font-display">
                {seller.responseRate}%
              </div>
              <span className="text-[10px] text-[#1C211F]/50 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-[#164C3A]" />
                <span className="truncate">{seller.responseSpeed}</span>
              </span>
            </div>

            <div className="p-3.5 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
              <span className="text-[11px] text-[#1C211F]/60 block mb-0.5">ความพึงพอใจชุมชน</span>
              <div className="text-lg font-bold text-[#164C3A] font-display flex items-baseline gap-1">
                <span>{seller.recommendationRate}%</span>
                <span className="text-xs font-normal text-[#1C211F]/50">แนะนำ</span>
              </div>
              <span className="text-[10px] text-[#1C211F]/50 flex items-center gap-0.5 mt-0.5">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>★ {seller.rating} ({seller.reviewsCount} รีวิว)</span>
              </span>
            </div>

            <div className="p-3.5 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
              <span className="text-[11px] text-[#1C211F]/60 block mb-0.5">ส่งมอบสำเร็จแล้ว</span>
              <div className="text-lg font-bold text-[#164C3A] font-display">
                {seller.completedDeals} ครั้ง
              </div>
              <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5 font-medium">
                <Check className="w-3 h-3" />
                <span>สำเร็จไร้ข้อพิพาท</span>
              </span>
            </div>

            <div className="p-3.5 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
              <span className="text-[11px] text-[#1C211F]/60 block mb-0.5">วัสดุหมุนเวียน/นำกลับมาใช้</span>
              <div className="text-lg font-bold text-[#164C3A] font-display">
                {seller.itemsReused} ชิ้น
              </div>
              <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
                <Leaf className="w-3 h-3" />
                <span>ลด CO₂ {seller.carbonSavedKg.toLocaleString()} กก.</span>
              </span>
            </div>
          </div>

          {/* 3. Navigation Tabs within Profile */}
          <div className="border-b border-[#1C211F]/10 flex gap-6 text-xs font-medium">
            <button
              onClick={() => setActiveTabState('listings')}
              className={`pb-3 relative cursor-pointer ${
                activeTab === 'listings'
                  ? 'text-[#164C3A] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
                  : 'text-[#1C211F]/60 hover:text-[#1C211F]'
              }`}
            >
              ประกาศที่กำลังเปิดรับ ({sellerListings.length})
            </button>
            <button
              onClick={() => setActiveTabState('reviews')}
              className={`pb-3 relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#164C3A] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
                  : 'text-[#1C211F]/60 hover:text-[#1C211F]'
              }`}
            >
              รีวิวและความคิดเห็น ({sellerReviews.length})
            </button>
            <button
              onClick={() => setActiveTabState('impact')}
              className={`pb-3 relative cursor-pointer ${
                activeTab === 'impact'
                  ? 'text-[#164C3A] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
                  : 'text-[#1C211F]/60 hover:text-[#1C211F]'
              }`}
            >
              ประวัติการส่งเสริมสิ่งแวดล้อม
            </button>
          </div>

          {/* Tab 1: Active Listings */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              {sellerListings.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#1C211F]/60 bg-[#F7F5EF] rounded-xl">
                  ผู้ใช้นี้ยังไม่มีรายการประกาศที่เปิดรับอยู่ในขณะนี้
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sellerListings.map(listing => (
                    <div 
                      key={listing.id}
                      onClick={() => handleListingClick(listing)}
                      className="p-3 bg-white border border-[#1C211F]/10 rounded-xl hover:border-[#164C3A] transition-all cursor-pointer flex gap-3 group"
                    >
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-lg object-cover bg-[#F7F5EF] shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#DCE9E2] text-[#164C3A]">
                              {listing.transactionType === 'sell' ? 'ขาย' : listing.transactionType === 'swap' ? 'แลกเปลี่ยน' : listing.transactionType === 'donate' ? 'บริจาค' : 'ให้ฟรี'}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-medium">
                              {listing.conditionLabel}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-[#1C211F] group-hover:text-[#164C3A] transition-colors truncate">
                            {listing.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-[#164C3A] tabular-nums">
                            {listing.price > 0 ? `฿${listing.price.toLocaleString()}` : 'ฟรี / แลกเปลี่ยน'}
                          </span>
                          <span className="text-[10px] text-[#1C211F]/50 flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#164C3A]" />
                            <span>{listing.location.district}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {sellerReviews.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#1C211F]/60 bg-[#F7F5EF] rounded-xl">
                  ยังไม่มีรีวิวสำหรับผู้ใช้นี้
                </div>
              ) : (
                sellerReviews.map(rev => (
                  <div key={rev.id} className="p-4 bg-white border border-[#1C211F]/10 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={rev.reviewer.avatar} 
                          alt={rev.reviewer.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover" 
                        />
                        <span className="text-xs font-bold text-[#1C211F]">{rev.reviewer.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        ★ {rev.rating} / 5
                      </div>
                    </div>

                    <p className="text-xs text-[#1C211F]/80 leading-relaxed">
                      "{rev.comment}"
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {rev.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-[#F7F5EF] rounded text-[#1C211F]/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Circular Impact */}
          {activeTab === 'impact' && (
            <div className="p-5 bg-[#F7F5EF] rounded-2xl border border-[#164C3A]/15 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#164C3A]">
                <Leaf className="w-4 h-4" />
                <span>การมีส่วนร่วมใน Circular Economy ชุมชน</span>
              </div>
              <p className="text-xs text-[#1C211F]/80 leading-relaxed">
                การหมุนเวียนสิ่งของของ {seller.name} ช่วยลดการเกิดขยะสู่หลุมฝังกลบ (Landfill Diversion) 
                และลดการผลิตใหม่ โดยบันทึกคาร์บอนเครดิตสะสมเทียบเท่ากับการปลูกต้นไม้ {Math.round(seller.carbonSavedKg / 15)} ต้นในประเทศไทย
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#1C211F]/10">
                  <span className="text-[10px] text-[#1C211F]/50 block">คะแนนสะสม EcoPoints</span>
                  <span className="text-base font-bold text-[#164C3A] font-display">{seller.ecoPoints.toLocaleString()} คะแนน</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#1C211F]/10">
                  <span className="text-[10px] text-[#1C211F]/50 block">สถานะการยืนยันทางธุรกิจ</span>
                  <span className="text-xs font-semibold text-emerald-700">ยืนยันตัวตนบุคคล/นิติบุคคลแล้ว</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F7F5EF] border-t border-[#1C211F]/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#1C211F]/60">
            ระบบตรวจสอบความปลอดภัย WasteMatch SafeTrade
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#1C211F]/70 hover:text-[#1C211F] rounded-lg cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
            {!isMe && sellerListings.length > 0 && (
              <button
                onClick={handleContactSeller}
                className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>เจรจาส่งต่อสิ่งของ</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
