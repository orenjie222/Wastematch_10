import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Deal, DealStatus } from '../../types/marketplace';
import { 
  FileCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  KeyRound, 
  X,
  RotateCcw,
  CalendarCheck2,
  Ban,
  UserCheck
} from 'lucide-react';
import { getCategoryDefaultImage } from '../../data/seedData';

export const DealsView: React.FC = () => {
  const { 
    deals, 
    selectedDealId, 
    setSelectedDealId, 
    currentUser, 
    advanceDealStatus, 
    verifyHandoverCode,
    cancelDeal,
    rescheduleDeal,
    confirmDealParty,
    setReportModalTarget,
    setReviewModalDeal,
    setActiveTab 
  } = useMarketplace();

  const [inputCode, setInputCode] = useState('');
  const [codeFeedback, setCodeFeedback] = useState<{ success: boolean; message: string } | null>(null);
  
  // Reschedule modal state
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [newDate, setNewDate] = useState('2026-10-04');
  const [newTime, setNewTime] = useState('14:00');
  const [newLocation, setNewLocation] = useState('');
  const [newSafeZone, setNewSafeZone] = useState('Community Safe Handover Zone');

  // Cancel modal state
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('ตารางเวลาไม่สะดวก / ติดภารกิจด่วน');

  // Active deal
  const currentDeal = deals.find(d => d.id === selectedDealId) || deals[0];

  const timelineStages: { stage: DealStatus; label: string; desc: string }[] = [
    { stage: 'matched', label: '1. แมตช์สำเร็จ', desc: 'ตรวจพบความต้องการตรงกัน' },
    { stage: 'negotiating', label: '2. เจรจาเงื่อนไข', desc: 'ตกลงราคาและวิธีรับมอบ' },
    { stage: 'deal_confirmed', label: '3. ยืนยันข้อตกลง', desc: 'ทั้งสองฝ่ายเห็นพ้องในเงื่อนไข' },
    { stage: 'scheduled', label: '4. นัดหมายส่งมอบ', desc: 'กำหนดวัน เวลา และ Safe Zone' },
    { stage: 'in_transit', label: '5. กำลังเดินทาง', desc: 'สินค้าอยู่ระหว่างการขนย้าย' },
    { stage: 'completed', label: '6. ส่งมอบเรียบร้อย', desc: 'ตรวจรับด้วยรหัสยืนยันตัวตน' }
  ];

  const getStageIndex = (status: DealStatus) => {
    return timelineStages.findIndex(s => s.stage === status);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDeal) return;
    const res = verifyHandoverCode(currentDeal.id, inputCode);
    setCodeFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDeal) return;
    rescheduleDeal(currentDeal.id, newDate, newTime, newLocation || currentDeal.handover.meetingLocation || 'จุดนัดพบที่ตกลงกัน', newSafeZone);
    setIsRescheduleOpen(false);
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDeal) return;
    cancelDeal(currentDeal.id, cancelReason);
    setIsCancelOpen(false);
  };

  if (!currentDeal) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E4DFD5] space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#EEEAE1] text-[#344634] flex items-center justify-center mx-auto">
            <FileCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#252722]">ยังไม่มีข้อตกลงที่กำลังดำเนินการ</h2>
          <p className="text-xs sm:text-sm text-[#252722]/65 font-sans leading-relaxed">
            เมื่อคุณและผู้ใช้อีกฝ่ายตกลงเงื่อนไขในแชทแล้ว คุณสามารถสร้าง Deal เพื่อติดตามขั้นตอนการส่งมอบได้
          </p>
          <button
            onClick={() => setActiveTab('matches')}
            className="px-6 py-3 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
          >
            ดูรายการแมตช์ของคุณ
          </button>
        </div>
      </div>
    );
  }

  const currentStageIdx = getStageIndex(currentDeal.status);
  const isBuyer = currentUser.id === currentDeal.buyerId;
  const isSeller = currentUser.id === currentDeal.sellerId;
  const otherParty = isBuyer ? currentDeal.seller : currentDeal.buyer;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD5] mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif text-[#252722]">
              Deal Management
            </h1>
            <span className="text-xs font-mono font-semibold text-[#344634] bg-[#EEEAE1] border border-[#E4DFD5] px-3 py-1 rounded-full">
              #{currentDeal.id.toUpperCase()}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#252722]/70 mt-1.5 font-sans">
            ระบบส่งมอบและบันทึกประวัติการส่งมอบสิ่งของด้วยรหัสความปลอดภัย WM-Security Code
          </p>
        </div>

        {/* Other active deals picker */}
        {deals.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-[#252722]/60 whitespace-nowrap">เลือกดีล:</span>
            {deals.map(d => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDealId(d.id);
                  setCodeFeedback(null);
                }}
                className={`px-3 py-1 text-xs rounded-lg font-mono whitespace-nowrap cursor-pointer transition-all ${
                  d.id === currentDeal.id
                    ? 'bg-[#344634] text-white font-semibold'
                    : 'bg-white border border-[#E4DFD5] text-[#252722]/70 hover:bg-[#EEEAE1]'
                }`}
              >
                #{d.id.slice(-6)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Timeline, Verification & Handover (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Status Tracker */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-[#252722]">
                  ขั้นตอนความคืบหน้าของข้อตกลง
                </h3>
                <p className="text-xs text-[#252722]/60 mt-0.5 font-sans">
                  ติดตามสถานะตั้งแต่เริ่มต้นจับคู่จนถึงการส่งมอบสมบูรณ์
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                  currentDeal.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentDeal.status === 'cancelled'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-[#EEEAE1] text-[#344634]'
                }`}>
                  {currentDeal.status === 'completed' ? 'ส่งมอบสมบูรณ์' : currentDeal.status === 'cancelled' ? 'ยกเลิกดีล' : currentDeal.status}
                </span>
              </div>
            </div>

            {/* Horizontal Step Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {timelineStages.map((step, idx) => {
                const isPassed = currentStageIdx >= idx;
                const isCurrent = currentDeal.status === step.stage;

                return (
                  <div
                    key={step.stage}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? 'border-[#344634] bg-[#F7F5F0] ring-1 ring-[#344634]'
                        : isPassed
                        ? 'border-[#7C8B72]/30 bg-[#EEEAE1]/50 text-[#344634]'
                        : 'border-[#E4DFD5] bg-white opacity-50'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full mx-auto flex items-center justify-center text-xs font-bold mb-1.5 font-mono">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#344634]" />
                      ) : (
                        <span className="text-[#252722]/40">{idx + 1}</span>
                      )}
                    </div>
                    <div className="text-[11px] font-bold truncate text-[#252722]">
                      {step.label.split('. ')[1]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confirmations Matrix: Buyer & Seller confirmation check */}
            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E4DFD5] space-y-3">
              <span className="text-xs font-serif font-bold text-[#252722] block">
                สถานะการยืนยันเงื่อนไขของทั้งสองฝ่าย (Dual Confirmation)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  currentDeal.buyerConfirmed ? 'bg-white border-emerald-300 text-emerald-900' : 'bg-white/60 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>ผู้รับมอบ (Buyer): <strong>{currentDeal.buyer.name}</strong></span>
                  </div>
                  {currentDeal.buyerConfirmed ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">ยืนยันแล้ว</span>
                  ) : (
                    <button
                      onClick={() => confirmDealParty(currentDeal.id, 'buyer')}
                      className="text-[10px] font-bold bg-[#344634] text-white px-2.5 py-1 rounded-lg hover:bg-[#263426] cursor-pointer"
                    >
                      กดยืนยัน
                    </button>
                  )}
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  currentDeal.sellerConfirmed ? 'bg-white border-emerald-300 text-emerald-900' : 'bg-white/60 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>ผู้ส่งมอบ (Seller): <strong>{currentDeal.seller.name}</strong></span>
                  </div>
                  {currentDeal.sellerConfirmed ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">ยืนยันแล้ว</span>
                  ) : (
                    <button
                      onClick={() => confirmDealParty(currentDeal.id, 'seller')}
                      className="text-[10px] font-bold bg-[#344634] text-white px-2.5 py-1 rounded-lg hover:bg-[#263426] cursor-pointer"
                    >
                      กดยืนยัน
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Handover Details & Security Code Verification */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4DFD5] shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-[#252722]">
                  ข้อมูลการนัดรับและการส่งมอบ
                </h3>
                <p className="text-xs text-[#252722]/60 mt-0.5 font-sans">
                  จุดนัดพบที่ปลอดภัยและรหัสตรวจสอบตัวตนเฉพาะดีล
                </p>
              </div>

              {currentDeal.status !== 'completed' && currentDeal.status !== 'cancelled' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setNewLocation(currentDeal.handover.meetingLocation || '');
                      setIsRescheduleOpen(true);
                    }}
                    className="px-3 py-1.5 bg-[#EEEAE1] text-[#344634] hover:bg-[#E4DFD5] text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <CalendarCheck2 className="w-3.5 h-3.5" />
                    <span>เลื่อนเวลานัด / เปลี่ยนจุดนัด</span>
                  </button>

                  <button
                    onClick={() => setIsCancelOpen(true)}
                    className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>ยกเลิกดีล</span>
                  </button>
                </div>
              )}
            </div>

            {/* Handover Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E4DFD5] space-y-1">
                <span className="text-[10px] text-[#7C8B72] font-semibold uppercase flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  วันและเวลานัดหมาย
                </span>
                <span className="text-sm font-bold text-[#252722] block font-serif">
                  {currentDeal.handover.scheduledDate} เวลา {currentDeal.handover.scheduledTime} น.
                </span>
                {currentDeal.rescheduledCount && currentDeal.rescheduledCount > 0 ? (
                  <span className="text-[10px] text-amber-800">
                    (มีการปรับปรุงเวลานัดหมายแล้ว {currentDeal.rescheduledCount} ครั้ง)
                  </span>
                ) : null}
              </div>

              <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E4DFD5] space-y-1">
                <span className="text-[10px] text-[#7C8B72] font-semibold uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  สถานที่ส่งมอบ (Safe Zone)
                </span>
                <span className="text-sm font-bold text-[#252722] block font-serif">
                  {currentDeal.handover.meetingLocation}
                </span>
                <span className="text-[10px] text-[#344634] block">
                  {currentDeal.handover.safeZoneName}
                </span>
              </div>
            </div>

            {/* Code Verification Box */}
            <div className="p-6 rounded-2xl border-2 border-[#344634]/30 bg-[#F7F5F0] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#344634] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                    <KeyRound className="w-4 h-4" />
                    <span>รหัสยืนยันการรับมอบ (Handover Security Code)</span>
                  </h4>
                  <p className="text-xs text-[#252722]/75 mt-1 font-sans leading-relaxed max-w-md">
                    {isSeller 
                      ? 'รหัสด้านล่างนี้คือรหัสของคุณ แจ้งรหัสนี้ให้ผู้รับเมื่อส่งมอบสิ่งของเรียบร้อย'
                      : 'ขอรับรหัสความปลอดภัยจากผู้ส่งมอบ แล้วนำมากรอกยืนยันด้านล่าง เพื่อบันทึกการส่งมอบและรับคะแนนสิ่งแวดล้อม'}
                  </p>
                </div>

                <div className="text-center p-3 bg-white rounded-xl border border-[#E4DFD5] shadow-2xs shrink-0 min-w-[140px]">
                  <span className="text-[10px] text-[#252722]/50 block uppercase font-mono">
                    {isSeller ? 'รหัสของคุณ (แสดงให้ผู้รับ)' : 'รหัสที่ถูกต้อง'}
                  </span>
                  <span className="text-lg font-mono font-bold text-[#344634] tracking-wider block mt-0.5">
                    {currentDeal.handover.confirmationCode}
                  </span>
                </div>
              </div>

              {/* Input for verifying code if not completed yet */}
              {currentDeal.status !== 'completed' && currentDeal.status !== 'cancelled' ? (
                <form onSubmit={handleVerifyCode} className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="กรอกรหัส 6 หลัก เช่น WM-8492..."
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      setCodeFeedback(null);
                    }}
                    className="flex-1 px-4 py-2.5 text-xs border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634] bg-white font-mono uppercase text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] transition-all cursor-pointer whitespace-nowrap shadow-2xs"
                  >
                    ยืนยันรับสินค้าสำเร็จ
                  </button>
                </form>
              ) : currentDeal.status === 'completed' ? (
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <div className="font-bold font-serif text-sm">การส่งมอบเสร็จสมบูรณ์เรียบร้อยแล้ว</div>
                      <div className="text-[11px] text-emerald-700 font-sans">
                        บันทึกเวลาส่งมอบเมื่อ: {currentDeal.handover.handoverTime ? new Date(currentDeal.handover.handoverTime).toLocaleTimeString('th-TH') : 'วันนี้'}
                      </div>
                    </div>
                  </div>
                  {!currentDeal.hasBuyerReviewed && (
                    <button
                      onClick={() => setReviewModalDeal(currentDeal)}
                      className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer whitespace-nowrap"
                    >
                      เขียนรีวิวให้คะแนน
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs">
                  ข้อตกลงนี้ถูกยกเลิกแล้ว (เหตุผล: {currentDeal.cancellationReason || 'ไม่ได้ระบุ'})
                </div>
              )}

              {codeFeedback && (
                <p className={`text-xs flex items-center gap-1.5 font-sans ${codeFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {codeFeedback.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span>{codeFeedback.message}</span>
                </p>
              )}
            </div>

            {/* Stage Transition Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E4DFD5]">
              <button
                onClick={() => setReportModalTarget({
                  type: 'listing',
                  id: currentDeal.listingId,
                  title: currentDeal.listing.title
                })}
                className="text-xs text-[#252722]/60 hover:text-rose-600 transition-colors cursor-pointer"
              >
                รายงานปัญหาข้อพิพาท (Report Issue)
              </button>

              <div className="flex items-center gap-2">
                {currentDeal.status === 'deal_confirmed' && (
                  <button
                    onClick={() => advanceDealStatus(currentDeal.id, 'scheduled')}
                    className="px-5 py-2.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
                  >
                    ยืนยันการนัดหมาย (Schedule)
                  </button>
                )}

                {currentDeal.status === 'scheduled' && (
                  <button
                    onClick={() => advanceDealStatus(currentDeal.id, 'in_transit')}
                    className="px-5 py-2.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
                  >
                    เริ่มออกเดินทางไปจุดนัด (In Transit)
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Listing Card & Participant Profile (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Listing Summary */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4DFD5] space-y-4 shadow-2xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8B72] block">
              สิ่งของในข้อตกลง
            </span>

            <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F7F5F0]">
              <img
                src={currentDeal.listing.images[0] || getCategoryDefaultImage(currentDeal.listing.category)}
                alt={currentDeal.listing.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = getCategoryDefaultImage(currentDeal.listing.category);
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#7C8B72] font-semibold uppercase font-sans">
                {currentDeal.listing.category} · {currentDeal.listing.transactionType}
              </span>
              <h4 className="text-base font-serif font-bold text-[#252722] leading-snug">
                {currentDeal.listing.title}
              </h4>
            </div>

            <div className="p-3.5 bg-[#F7F5F0] rounded-xl flex items-baseline justify-between">
              <span className="text-xs text-[#252722]/70 font-sans">ราคาข้อตกลง (Agreed):</span>
              <span className="text-lg font-serif font-bold text-[#344634] tabular-nums">
                {currentDeal.agreedPrice > 0 ? `฿${currentDeal.agreedPrice.toLocaleString()}` : 'ส่งต่อฟรี/แลกเปลี่ยน'}
              </span>
            </div>
          </div>

          {/* Other Party Profile Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4DFD5] space-y-4 shadow-2xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7C8B72] block">
              คู่ข้อตกลง ({isBuyer ? 'ผู้ขาย/ผู้ส่งต่อ' : 'ผู้ซื้อ/ผู้รับมอบ'})
            </span>

            <div className="flex items-center gap-3.5">
              <img
                src={otherParty.avatar}
                alt={otherParty.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-1 ring-[#E4DFD5]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#252722] flex items-center gap-1 font-sans">
                  <span>{otherParty.name}</span>
                  <ShieldCheck className="w-4 h-4 text-[#344634]" />
                </h4>
                <div className="text-[11px] text-[#252722]/65 font-sans">
                  ตอบกลับไว {otherParty.responseRate}% · ★ {otherParty.rating} ({otherParty.reviewsCount} รีวิว)
                </div>
                <div className="text-[10px] text-[#7C8B72] mt-0.5 font-sans">
                  ยืนยันตัวตนแล้ว · ส่งมอบสำเร็จ {otherParty.completedDeals} ครั้ง
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4DFD5] flex gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className="flex-1 py-2.5 bg-[#EEEAE1] hover:bg-[#E4DFD5] text-[#252722] text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
              >
                เปิดแชทเจรจา
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Reschedule Modal */}
      {isRescheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252722]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E4DFD5] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-3">
              <h3 className="text-base font-serif font-bold text-[#252722]">เลื่อนวันเวลานัดหมาย / เปลี่ยนสถานที่</h3>
              <button onClick={() => setIsRescheduleOpen(false)} className="text-[#252722]/60 hover:text-[#252722]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#252722] block mb-1">วันที่ใหม่</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#252722] block mb-1">เวลาใหม่ (น.)</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#252722] block mb-1">สถานที่นัดหมายใหม่</label>
                <input
                  type="text"
                  placeholder="เช่น BTS เอกมัย ประตู 2"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#252722] block mb-1">ชื่อจุดนัดปลอดภัย (Safe Hub)</label>
                <input
                  type="text"
                  value={newSafeZone}
                  onChange={(e) => setNewSafeZone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRescheduleOpen(false)}
                  className="px-4 py-2 text-[#252722]/70 hover:bg-[#EEEAE1] rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#344634] text-white font-semibold rounded-xl hover:bg-[#263426] shadow-2xs"
                >
                  บันทึกการนัดใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Deal Modal */}
      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252722]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E4DFD5] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-3">
              <h3 className="text-base font-serif font-bold text-rose-800">ยกเลิกข้อตกลง (Cancel Deal)</h3>
              <button onClick={() => setIsCancelOpen(false)} className="text-[#252722]/60 hover:text-[#252722]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCancelSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="font-semibold text-[#252722] block mb-1">โปรดระบุเหตุผลในการยกเลิก</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-600 bg-white"
                >
                  <option value="ตารางเวลาไม่สะดวก / ติดภารกิจด่วน">ตารางเวลาไม่สะดวก / ติดภารกิจด่วน</option>
                  <option value="ตกลงเงื่อนไขหรือราคากันใหม่ไม่ได้">ตกลงเงื่อนไขหรือราคากันใหม่ไม่ได้</option>
                  <option value="สินค้าชำรุดหรือไม่พร้อมส่งมอบ">สินค้าชำรุดหรือไม่พร้อมส่งมอบ</option>
                  <option value="ไม่สามารถเดินทางไปจุดนัดพบได้">ไม่สามารถเดินทางไปจุดนัดพบได้</option>
                  <option value="คู่เจรจาไม่ตอบกลับหรือขาดการติดต่อ">คู่เจรจาไม่ตอบกลับหรือขาดการติดต่อ</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>

              <p className="text-[11px] text-rose-700 bg-rose-50 p-2.5 rounded-xl leading-relaxed">
                * การยกเลิกข้อตกลงจะแจ้งเตือนไปยังคู่เจรจาของคุณ และบันทึกประวัติเพื่อความปลอดภัยของชุมชน
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCancelOpen(false)}
                  className="px-4 py-2 text-[#252722]/70 hover:bg-[#EEEAE1] rounded-xl"
                >
                  ย้อนกลับ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-700 text-white font-semibold rounded-xl hover:bg-rose-800 shadow-2xs"
                >
                  ยืนยันการยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
