import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  ShieldCheck, 
  Leaf, 
  RotateCw, 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Layers, 
  Building2, 
  User as UserIcon, 
  HeartHandshake,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Check
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    reviews, 
    listings, 
    switchUserRole,
    setSelectedListing,
    setActiveTab,
    currentSubscription
  } = useMarketplace();

  const [activeTabState, setActiveTabState] = useState<'listings' | 'reviews' | 'impact'>('impact');

  const myListings = listings.filter(l => l.sellerId === currentUser.id);
  const myReviews = reviews.filter(r => r.targetUserId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#1C211F]/10 p-6 sm:p-8 shadow-2xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#164C3A]/20 shadow-xs"
            />
            
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1C211F] font-display">
                  {currentUser.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#164C3A] text-white font-medium capitalize">
                  {currentUser.accountType === 'individual' ? 'บุคคลทั่วไป' : currentUser.accountType === 'business' ? 'ธุรกิจหมุนเวียน' : 'มูลนิธิ/NGO'}
                </span>
                {currentUser.verifiedBadges.identity && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#164C3A] font-semibold bg-[#DCE9E2] px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ยืนยันตัวตนแล้ว</span>
                  </span>
                )}
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#F7F5EF] text-[#164C3A] border border-[#164C3A]/20 rounded uppercase">
                  แผน {currentSubscription}
                </span>
              </div>

              {currentUser.organizationName && (
                <p className="text-xs font-semibold text-[#164C3A]">
                  {currentUser.organizationName}
                </p>
              )}

              <p className="text-xs text-[#1C211F]/75 max-w-xl leading-relaxed">
                {currentUser.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#1C211F]/60 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>{currentUser.location.district}, {currentUser.location.province}</span>
                </span>
                <span>·</span>
                <span>สมาชิกตั้งแต่ {currentUser.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Quick Edit or Switch Role CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('subscription')}
              className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              จัดการแพ็กเกจสมาชิก
            </button>
          </div>

        </div>

        {/* 2. Authentic Community Metrics (Replaced Trust Score!) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#1C211F]/10">
          <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
            <span className="text-[10px] text-[#1C211F]/50 block">อัตราการตอบกลับ</span>
            <div className="text-xl font-bold text-[#164C3A] font-display">
              {currentUser.responseRate}%
            </div>
            <span className="text-[10px] text-[#1C211F]/50 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-[#164C3A]" />
              <span className="truncate">{currentUser.responseSpeed}</span>
            </span>
          </div>

          <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
            <span className="text-[10px] text-[#1C211F]/50 block">ความพึงพอใจการแนะนำ</span>
            <div className="text-xl font-bold text-[#164C3A] font-display flex items-baseline gap-1">
              <span>{currentUser.recommendationRate}%</span>
              <span className="text-xs font-normal text-[#1C211F]/50">แนะนำต่อ</span>
            </div>
            <span className="text-[10px] text-[#1C211F]/50 flex items-center gap-0.5 mt-0.5">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>★ {currentUser.rating} ({currentUser.reviewsCount} รีวิว)</span>
            </span>
          </div>

          <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
            <span className="text-[10px] text-[#1C211F]/50 block">ส่งมอบสำเร็จแล้ว</span>
            <div className="text-xl font-bold text-[#164C3A] font-display">
              {currentUser.completedDeals} ครั้ง
            </div>
            <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5 font-medium">
              <Check className="w-3 h-3" />
              <span>ผ่านการยืนยันโค้ดปลอดภัย</span>
            </span>
          </div>

          <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
            <span className="text-[10px] text-[#1C211F]/50 block">วัสดุหมุนเวียน/นำกลับมาใช้</span>
            <div className="text-xl font-bold text-[#164C3A] font-display">
              {currentUser.itemsReused} ชิ้น
            </div>
            <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
              <Leaf className="w-3 h-3" />
              <span>ลด CO₂ {currentUser.carbonSavedKg.toLocaleString()} กก.</span>
            </span>
          </div>
        </div>

      </div>

      {/* 3. Section Tabs */}
      <div className="flex border-b border-[#1C211F]/10 mb-6 gap-8 text-sm font-semibold">
        <button
          onClick={() => setActiveTabState('impact')}
          className={`pb-3 relative cursor-pointer ${
            activeTabState === 'impact'
              ? 'text-[#164C3A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
              : 'text-[#1C211F]/60 hover:text-[#1C211F]'
          }`}
        >
          แดชบอร์ดผลกระทบสิ่งแวดล้อม (Circular Impact)
        </button>

        <button
          onClick={() => setActiveTabState('listings')}
          className={`pb-3 relative cursor-pointer ${
            activeTabState === 'listings'
              ? 'text-[#164C3A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
              : 'text-[#1C211F]/60 hover:text-[#1C211F]'
          }`}
        >
          รายการของฉัน ({myListings.length})
        </button>

        <button
          onClick={() => setActiveTabState('reviews')}
          className={`pb-3 relative cursor-pointer ${
            activeTabState === 'reviews'
              ? 'text-[#164C3A] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
              : 'text-[#1C211F]/60 hover:text-[#1C211F]'
          }`}
        >
          รีวิวที่ได้รับ ({myReviews.length})
        </button>
      </div>

      {/* Tab 1: Circular Impact */}
      {activeTabState === 'impact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[#1C211F]/10 space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#1C211F]/50 font-bold block">
                คาร์บอนที่ลดการปล่อยสะสม (Carbon Avoided)
              </span>
              <div className="text-3xl font-bold text-[#164C3A] font-display">
                {currentUser.carbonSavedKg.toLocaleString()} <span className="text-sm font-normal text-[#1C211F]/60">kg CO₂e</span>
              </div>
              <p className="text-xs text-[#1C211F]/70">
                เทียบเท่ากับการปลูกต้นไม้โตเต็มวัย {Math.round(currentUser.carbonSavedKg / 15)} ต้นในประเทศไทย
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#1C211F]/10 space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#1C211F]/50 font-bold block">
                สิ่งของและวัสดุที่ช่วยชีวิตจากหลุมฝังกลบ
              </span>
              <div className="text-3xl font-bold text-[#164C3A] font-display">
                {currentUser.itemsReused} <span className="text-sm font-normal text-[#1C211F]/60">ชิ้น/ล็อต</span>
              </div>
              <p className="text-xs text-[#1C211F]/70">
                ลดปริมาณขยะมูลฝอยชุมชนและการเผาทำลายในที่โล่ง
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#1C211F]/10 space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#1C211F]/50 font-bold block">
                คะแนนสะสม EcoPoints
              </span>
              <div className="text-3xl font-bold text-[#164C3A] font-display">
                {currentUser.ecoPoints.toLocaleString()} <span className="text-sm font-normal text-[#1C211F]/60">pts</span>
              </div>
              <p className="text-xs text-[#1C211F]/70">
                ใช้แลกรับส่วนลดค่าบริการจัดส่งและส่วนลดแพ็กเกจสมาชิก
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#F7F5EF] rounded-2xl border border-[#164C3A]/15 space-y-3">
            <h4 className="text-sm font-bold text-[#164C3A]">
              รายงานการรับรองการหมุนเวียนทรัพยากร (ESG & Circular Certificate)
            </h4>
            <p className="text-xs text-[#1C211F]/80 leading-relaxed">
              ทุกรายการส่งมอบสำเร็จบน WasteMatch ได้รับการบันทึกแฮชข้อมูลธุรกรรมเพื่อใช้อ้างอิงในรายงานความยั่งยืนขององค์กร 
              หากคุณเป็นธุรกิจหมุนเวียนหรือโรงงาน คุณสามารถดาวน์โหลดใบรับรองสรุปประจำเดือนได้ในหน้าแพ็กเกจสมาชิก
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: My Listings */}
      {activeTabState === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#1C211F]/10 space-y-3">
              <p className="text-sm font-bold text-[#1C211F]">คุณยังไม่มีประกาศที่สร้างไว้</p>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl"
              >
                เริ่มค้นหาและลงประกาศ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myListings.map(listing => (
                <div
                  key={listing.id}
                  onClick={() => setSelectedListing(listing)}
                  className="bg-white p-4 rounded-xl border border-[#1C211F]/10 hover:border-[#164C3A] transition-all cursor-pointer flex gap-4"
                >
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-[#F7F5EF] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-[#164C3A] bg-[#DCE9E2] px-2 py-0.5 rounded">
                        สภาพ {listing.conditionPercentage}%
                      </span>
                      <h4 className="text-xs font-bold text-[#1C211F] truncate mt-1">
                        {listing.title}
                      </h4>
                    </div>
                    <div className="text-xs font-bold text-[#164C3A]">
                      {listing.price > 0 ? `฿${listing.price.toLocaleString()}` : 'ส่งต่อฟรี/แลกเปลี่ยน'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Reviews */}
      {activeTabState === 'reviews' && (
        <div className="space-y-4">
          {myReviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#1C211F]/60 bg-white rounded-2xl border border-[#1C211F]/10">
              ยังไม่มีรีวิวเข้ามา
            </div>
          ) : (
            myReviews.map(rev => (
              <div key={rev.id} className="p-5 bg-white rounded-2xl border border-[#1C211F]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={rev.reviewer.avatar} 
                      alt={rev.reviewer.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <div>
                      <div className="text-xs font-bold text-[#1C211F]">{rev.reviewer.name}</div>
                      <div className="text-[10px] text-[#1C211F]/50">{rev.createdAt.split('T')[0]}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-amber-500">
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

    </div>
  );
};
