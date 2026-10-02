import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { getCategoryDefaultImage } from '../../data/seedData';
import { 
  ShieldCheck, 
  Leaf, 
  Star, 
  MapPin, 
  Clock, 
  Check,
  Building2, 
  User as UserIcon, 
  HeartHandshake,
  Activity,
  Layers,
  Sparkles,
  MessageSquare,
  FileCheck,
  CheckCircle2,
  Lock,
  KeyRound,
  Trash2,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    reviews, 
    listings, 
    matches,
    deals,
    conversations,
    setSelectedListing,
    setActiveTab,
    currentSubscription,
    changePassword,
    deleteAccount,
    logout
  } = useMarketplace();

  const [activeTabState, setActiveTabState] = useState<'dashboard' | 'impact' | 'listings' | 'reviews' | 'security'>('dashboard');

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ success: boolean; text: string } | null>(null);

  const myListings = listings.filter(l => l.sellerId === currentUser.id);
  const myReviews = reviews.filter(r => r.targetUserId === currentUser.id);

  // Dashboard activity feed
  const recentActivities = [
    {
      id: 'act_1',
      icon: <Sparkles className="w-4 h-4 text-[#344634]" />,
      title: 'Mutual Match สำเร็จ',
      desc: 'คุณและ GreenCraft Studio จับคู่ตรงกันในรายการไม้สักเก่ารีไซเคิล',
      time: '10 นาทีที่แล้ว'
    },
    {
      id: 'act_2',
      icon: <MessageSquare className="w-4 h-4 text-[#7C8B72]" />,
      title: 'ได้รับข้อความและข้อเสนอใหม่',
      desc: 'คุณสมชาย ยื่นข้อเสนอราคา ฿850 สำหรับเก้าอี้ Ergonomic Mesh',
      time: '35 นาทีที่แล้ว'
    },
    {
      id: 'act_3',
      icon: <FileCheck className="w-4 h-4 text-emerald-700" />,
      title: 'การส่งมอบสำเร็จผ่านรหัส WM-8492',
      desc: 'ยืนยันรับกล่องพัสดุและพาเลทไม้ รับคะแนน 50 EcoPoints',
      time: 'เมื่อวานนี้'
    },
    {
      id: 'act_4',
      icon: <Star className="w-4 h-4 text-amber-600" />,
      title: 'ได้รับรีวิว 5 ดาวใหม่',
      desc: 'มูลนิธิกระจกเงา ให้คะแนน 5 ดาว: "วัสดุคุณภาพดี จัดส่งตรงเวลามาก"',
      time: '2 วันที่แล้ว'
    }
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    const ok = changePassword(oldPassword, newPassword);
    if (ok) {
      setPwdMessage({ success: true, text: 'เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว' });
      setOldPassword('');
      setNewPassword('');
    } else {
      setPwdMessage({ success: false, text: 'รหัสผ่านเดิมไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' });
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้? ข้อมูลทั้งหมดจะไม่สามารถกู้คืนได้')) {
      deleteAccount();
      setActiveTab('landing');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#E4DFD5] p-6 sm:p-8 shadow-2xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-[#344634]/20 shadow-xs"
            />
            
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252722]">
                  {currentUser.name}
                </h1>
                <span className="text-xs px-3 py-0.5 rounded-full bg-[#344634] text-white font-medium capitalize">
                  {currentUser.accountType === 'individual' ? 'บุคคลทั่วไป' : currentUser.accountType === 'business' ? 'ธุรกิจหมุนเวียน' : 'มูลนิธิ/NGO'}
                </span>
                {currentUser.verifiedBadges.identity && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#344634] font-semibold bg-[#EEEAE1] border border-[#E4DFD5] px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ยืนยันตัวตนแล้ว</span>
                  </span>
                )}
                <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-[#F7F5F0] text-[#344634] border border-[#E4DFD5] rounded-full uppercase">
                  แผน {currentSubscription}
                </span>
              </div>

              {currentUser.organizationName && (
                <p className="text-xs font-semibold text-[#344634] font-serif">
                  {currentUser.organizationName}
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#252722]/75 max-w-xl leading-relaxed font-sans">
                {currentUser.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#252722]/60 pt-1 font-sans">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#344634]" />
                  <span>{currentUser.location.district}, {currentUser.location.province}</span>
                </span>
                <span>·</span>
                <span>สมาชิกตั้งแต่ {currentUser.memberSince}</span>
                <span>·</span>
                <span className="text-emerald-700 font-medium">Session Active (เข้าสู่ระบบแล้ว)</span>
              </div>
            </div>
          </div>

          {/* Manage Membership CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('subscription')}
              className="px-5 py-2.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              จัดการแพ็กเกจสมาชิก
            </button>
          </div>

        </div>

        {/* Community Proof Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#E4DFD5]">
          <div className="p-3.5 bg-[#F7F5F0] rounded-xl border border-[#E4DFD5]">
            <span className="text-[10px] text-[#252722]/50 block uppercase tracking-wider">อัตราการตอบกลับ</span>
            <div className="text-xl font-serif font-bold text-[#344634]">
              {currentUser.responseRate}%
            </div>
            <span className="text-[10px] text-[#252722]/60 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-[#344634]" />
              <span className="truncate">{currentUser.responseSpeed}</span>
            </span>
          </div>

          <div className="p-3.5 bg-[#F7F5F0] rounded-xl border border-[#E4DFD5]">
            <span className="text-[10px] text-[#252722]/50 block uppercase tracking-wider">คะแนนความพึงพอใจ</span>
            <div className="text-xl font-serif font-bold text-[#344634] flex items-baseline gap-1">
              <span>{currentUser.recommendationRate}%</span>
              <span className="text-xs font-normal text-[#252722]/50">แนะนำต่อ</span>
            </div>
            <span className="text-[10px] text-[#252722]/60 flex items-center gap-0.5 mt-0.5">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>★ {currentUser.rating} ({currentUser.reviewsCount} รีวิว)</span>
            </span>
          </div>

          <div className="p-3.5 bg-[#F7F5F0] rounded-xl border border-[#E4DFD5]">
            <span className="text-[10px] text-[#252722]/50 block uppercase tracking-wider">ส่งมอบสำเร็จ (Deals)</span>
            <div className="text-xl font-serif font-bold text-[#344634]">
              {currentUser.completedDeals} ครั้ง
            </div>
            <span className="text-[10px] text-emerald-800 flex items-center gap-1 mt-0.5 font-medium">
              <Check className="w-3 h-3" />
              <span>ยืนยันด้วยรหัส WM-Code</span>
            </span>
          </div>

          <div className="p-3.5 bg-[#F7F5F0] rounded-xl border border-[#E4DFD5]">
            <span className="text-[10px] text-[#252722]/50 block uppercase tracking-wider">วัสดุหมุนเวียน (Items Reused)</span>
            <div className="text-xl font-serif font-bold text-[#344634]">
              {currentUser.itemsReused} ชิ้น
            </div>
            <span className="text-[10px] text-emerald-800 flex items-center gap-1 mt-0.5">
              <Leaf className="w-3 h-3" />
              <span>ลด CO₂ {currentUser.carbonSavedKg.toLocaleString()} กก.</span>
            </span>
          </div>
        </div>

      </div>

      {/* 2. Section Navigation Tabs */}
      <div className="flex border-b border-[#E4DFD5] mb-8 gap-6 sm:gap-8 text-sm font-semibold overflow-x-auto pb-1">
        {[
          { id: 'dashboard', label: 'My Dashboard' },
          { id: 'impact', label: 'Environmental Impact' },
          { id: 'listings', label: `รายการของฉัน (${myListings.length})` },
          { id: 'reviews', label: `รีวิวที่ได้รับ (${myReviews.length})` },
          { id: 'security', label: 'ความปลอดภัย & จัดการบัญชี' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabState(tab.id as any)}
            className={`pb-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTabState === tab.id
                ? 'text-[#344634] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#344634]'
                : 'text-[#252722]/60 hover:text-[#252722]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* Tab: My Dashboard */}
      {/* ========================================================================= */}
      {activeTabState === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Key Requirement Metrics: Listings: 24, Matches: 18, Deals: 12, Completed Deals: 10, Rating: 4.8 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#7C8B72] font-semibold block">
                Listings
              </span>
              <div className="text-3xl font-serif font-bold text-[#344634] tabular-nums">
                24
              </div>
              <p className="text-[11px] text-[#252722]/60">รายการที่ลงประกาศทั้งหมด</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#7C8B72] font-semibold block">
                Matches
              </span>
              <div className="text-3xl font-serif font-bold text-[#344634] tabular-nums">
                18
              </div>
              <p className="text-[11px] text-[#252722]/60">การจับคู่ Mutual Match</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#7C8B72] font-semibold block">
                Deals
              </span>
              <div className="text-3xl font-serif font-bold text-[#344634] tabular-nums">
                12
              </div>
              <p className="text-[11px] text-[#252722]/60">ข้อตกลงที่สร้างในระบบ</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#7C8B72] font-semibold block">
                Completed Deals
              </span>
              <div className="text-3xl font-serif font-bold text-emerald-800 tabular-nums">
                10
              </div>
              <p className="text-[11px] text-emerald-700">ส่งมอบสำเร็จ 83.3%</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#7C8B72] font-semibold block">
                Rating
              </span>
              <div className="text-3xl font-serif font-bold text-amber-700 tabular-nums">
                4.8
              </div>
              <p className="text-[11px] text-amber-800">จาก 154 รีวิวชุมชน</p>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-[#252722]">
                  Recent Activity (กิจกรรมล่าสุด)
                </h3>
                <p className="text-xs text-[#252722]/60 mt-0.5 font-sans">
                  ประวัติการใช้งานล่าสุด การแมตช์ ข้อความ และสถานะข้อตกลง
                </p>
              </div>
              <Activity className="w-5 h-5 text-[#344634]" />
            </div>

            <div className="divide-y divide-[#E4DFD5]/60">
              {recentActivities.map(act => (
                <div key={act.id} className="py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#F7F5F0] border border-[#E4DFD5] flex items-center justify-center shrink-0">
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-bold text-[#252722]">{act.title}</span>
                      <span className="text-[11px] text-[#252722]/50 font-sans">{act.time}</span>
                    </div>
                    <p className="text-xs text-[#252722]/75 font-sans">
                      {act.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* Tab: Circular Impact (Documented Science & Factors) */}
      {/* ========================================================================= */}
      {activeTabState === 'impact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#7C8B72] font-bold block">
                คาร์บอนที่ลดการปล่อยสะสม (Carbon Avoided)
              </span>
              <div className="text-3xl font-serif font-bold text-[#344634] tabular-nums">
                {currentUser.carbonSavedKg.toLocaleString()} <span className="text-sm font-sans font-normal text-[#252722]/60">kg CO₂e</span>
              </div>
              <p className="text-xs text-[#252722]/70 font-sans">
                เทียบเท่ากับการปลูกต้นไม้โตเต็มวัย {Math.round(currentUser.carbonSavedKg / 15)} ต้นในประเทศไทย
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#7C8B72] font-bold block">
                สิ่งของและวัสดุที่ช่วยชีวิตจากหลุมฝังกลบ
              </span>
              <div className="text-3xl font-serif font-bold text-[#344634] tabular-nums">
                {currentUser.itemsReused} <span className="text-sm font-sans font-normal text-[#252722]/60">ชิ้น/ล็อต</span>
              </div>
              <p className="text-xs text-[#252722]/70 font-sans">
                ลดปริมาณขยะมูลฝอยชุมชนและการเผาทำลายในที่โล่ง
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#7C8B72] font-bold block">
                คะแนนสะสม EcoPoints
              </span>
              <div className="text-3xl font-serif font-bold text-[#344634] tabular-nums">
                {currentUser.ecoPoints.toLocaleString()} <span className="text-sm font-sans font-normal text-[#252722]/60">pts</span>
              </div>
              <p className="text-xs text-[#252722]/70 font-sans">
                ใช้แลกรับส่วนลดค่าบริการจัดส่งและส่วนลดแพ็กเกจสมาชิก
              </p>
            </div>
          </div>

          {/* Documented Methodology Box */}
          <div className="p-6 bg-[#EEEAE1] rounded-2xl border border-[#E4DFD5] space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#344634]">
              ระเบียบวิธีและตัวคูณการคำนวณคาร์บอน (Documented Methodology)
            </h4>
            <div className="text-xs text-[#252722]/80 leading-relaxed font-sans space-y-2">
              <p>
                การคำนวณค่าการลดการปล่อยก๊าซเรือนกระจก (CO₂e Avoided) ของ WasteMatch อ้างอิงตามมาตรฐาน IPCC Guideline for National Greenhouse Gas Inventories และฐานข้อมูลบัญชีก๊าซเรือนกระจกขององค์การบริหารจัดการก๊าซเรือนกระจก (อบก. - TGO):
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>เฟอร์นิเจอร์สำนักงาน/เก้าอี้:</strong> 25-45 kg CO₂e / ชิ้น (ลดการตัดไม้และกระบวนการฉีดพลาสติกใหม่)</li>
                <li><strong>พาเลทและกล่องกระดาษลูกฟูก:</strong> 1.8 kg CO₂e / กก. (ลดการตัดต้นไม้และกระบวนการฟอกเยื่อกระดาษ)</li>
                <li><strong>อุปกรณ์อิเล็กทรอนิกส์/คอมพิวเตอร์:</strong> 120-280 kg CO₂e / เครื่อง (ลดกระบวนการถลุงแร่หายากและผลิตเซมิคอนดักเตอร์)</li>
                <li><strong>เศษผ้าและเครื่องแต่งกาย:</strong> 15 kg CO₂e / กก. (ลดกระบวนการปลูกฝ้าย ฟอกย้อม และบำบัดน้ำเสีย)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* Tab: My Listings */}
      {/* ========================================================================= */}
      {activeTabState === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E4DFD5] space-y-3">
              <p className="text-sm font-bold text-[#252722]">คุณยังไม่มีประกาศที่สร้างไว้</p>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-2.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426]"
              >
                เริ่มค้นหาและลงประกาศ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map(listing => (
                <div
                  key={listing.id}
                  onClick={() => setSelectedListing(listing)}
                  className="bg-white p-4 rounded-2xl border border-[#E4DFD5] hover:border-[#344634] transition-all cursor-pointer flex gap-4 shadow-2xs"
                >
                  <img
                    src={listing.images[0] || getCategoryDefaultImage(listing.category)}
                    alt={listing.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = getCategoryDefaultImage(listing.category);
                    }}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F7F5F0] shrink-0 ring-1 ring-[#E4DFD5]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-[#344634] bg-[#EEEAE1] px-2 py-0.5 rounded">
                        สภาพ {listing.conditionPercentage}%
                      </span>
                      <h4 className="text-xs font-bold text-[#252722] truncate mt-1 font-serif">
                        {listing.title}
                      </h4>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#344634]">
                      {listing.price > 0 ? `฿${listing.price.toLocaleString()}` : 'ส่งต่อฟรี/แลกเปลี่ยน'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* Tab: Received Reviews */}
      {/* ========================================================================= */}
      {activeTabState === 'reviews' && (
        <div className="space-y-4">
          {myReviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#252722]/60 bg-white rounded-2xl border border-[#E4DFD5]">
              ยังไม่มีรีวิวเข้ามา
            </div>
          ) : (
            myReviews.map(rev => (
              <div key={rev.id} className="p-6 bg-white rounded-2xl border border-[#E4DFD5] space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={rev.reviewer.avatar} 
                      alt={rev.reviewer.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E4DFD5]" 
                    />
                    <div>
                      <div className="text-xs font-bold text-[#252722]">{rev.reviewer.name}</div>
                      <div className="text-[10px] text-[#252722]/50 font-mono">{rev.createdAt.split('T')[0]}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-amber-700">
                    ★ {rev.rating} / 5
                  </div>
                </div>
                <p className="text-xs text-[#252722]/80 leading-relaxed font-serif italic">
                  "{rev.comment}"
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rev.tags.map(t => (
                    <span key={t} className="text-[10px] px-2.5 py-0.5 bg-[#F7F5F0] rounded-lg text-[#252722]/70 font-sans">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* Tab: Security & Account Management */}
      {/* ========================================================================= */}
      {activeTabState === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Change Password Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E4DFD5] pb-3">
              <KeyRound className="w-5 h-5 text-[#344634]" />
              <h3 className="text-sm font-serif font-bold text-[#252722]">เปลี่ยนรหัสผ่าน (Change Password)</h3>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 font-sans text-xs">
              <div>
                <label className="font-semibold text-[#252722] block mb-1">รหัสผ่านปัจจุบัน</label>
                <input
                  type="password"
                  placeholder="กรอกรหัสผ่านปัจจุบัน (เช่น demo1234)"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#252722] block mb-1">รหัสผ่านใหม่</label>
                <input
                  type="password"
                  placeholder="ความยาวอย่างน้อย 8 ตัวอักษร"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                  required
                />
              </div>

              {pwdMessage && (
                <p className={`text-xs ${pwdMessage.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {pwdMessage.text}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#344634] text-white font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
              >
                บันทึกรหัสผ่านใหม่
              </button>
            </form>
          </div>

          {/* Account Details & Danger Zone */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#E4DFD5] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#344634]" />
                <h3 className="text-sm font-serif font-bold text-[#252722]">สถานะความปลอดภัยบัญชี</h3>
              </div>
              <ul className="text-xs space-y-2 text-[#252722]/75 font-sans">
                <li className="flex items-center justify-between">
                  <span>การยืนยันอีเมล (Email Verified):</span>
                  <span className="font-bold text-emerald-700">ยืนยันแล้ว ({currentUser.email})</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>การยืนยันเบอร์โทร (Phone Verified):</span>
                  <span className="font-bold text-emerald-700">ยืนยันแล้ว ({currentUser.phone})</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>การเข้ารหัสข้อมูล (Data Encryption):</span>
                  <span className="font-bold text-[#344634]">AES-256 / RLS Enforced</span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-800">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold">พื้นที่เสี่ยง (Danger Zone)</h3>
              </div>
              <p className="text-xs text-rose-700 font-sans leading-relaxed">
                การลบบัญชีจะลบประวัติการส่งมอบ รายการสินค้า และข้อความทั้งหมดออกจากระบบอย่างถาวร
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-rose-700 text-white text-xs font-semibold rounded-xl hover:bg-rose-800 cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบบัญชีผู้ใช้นี้ถาวร</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
