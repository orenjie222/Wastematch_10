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
  Truck, 
  User, 
  ChevronRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export const DealsView: React.FC = () => {
  const { 
    deals, 
    selectedDealId, 
    setSelectedDealId, 
    currentUser, 
    advanceDealStatus, 
    confirmHandoverCode,
    setReportModalTarget,
    setReviewModalDeal,
    setActiveTab 
  } = useMarketplace();

  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  // Active deal
  const currentDeal = deals.find(d => d.id === selectedDealId) || deals[0];

  const timelineStages: { stage: DealStatus; label: string; desc: string }[] = [
    { stage: 'matched', label: '1. จับคู่สำเร็จ', desc: 'ตรวจพบความต้องการตรงกัน' },
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
    const ok = confirmHandoverCode(currentDeal.id, inputCode);
    if (ok) {
      setCodeSuccess(true);
      setCodeError(false);
    } else {
      setCodeError(true);
      setCodeSuccess(false);
    }
  };

  if (!currentDeal) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#1C211F]/10 space-y-4">
          <h2 className="text-lg font-bold text-[#1C211F]">ยังไม่มีข้อตกลงที่กำลังดำเนินการ</h2>
          <p className="text-xs text-[#1C211F]/60">
            เมื่อคุณและผู้ใช้อีกฝ่ายตกลงเงื่อนไขในแชทแล้ว คุณสามารถสร้าง Deal เพื่อติดตามขั้นตอนการส่งมอบได้
          </p>
          <button
            onClick={() => setActiveTab('matches')}
            className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] cursor-pointer"
          >
            ดูรายการแมตช์ของคุณ
          </button>
        </div>
      </div>
    );
  }

  const currentStageIdx = getStageIndex(currentDeal.status);
  const isBuyer = currentUser.id === currentDeal.buyerId;
  const otherParty = isBuyer ? currentDeal.seller : currentDeal.buyer;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C211F]/10 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C211F] font-display flex items-center gap-2">
            <span>การจัดการข้อตกลง (Deal Pipeline)</span>
            <span className="text-xs font-mono font-medium text-[#164C3A] bg-[#DCE9E2] px-2 py-0.5 rounded">
              #{currentDeal.id.toUpperCase()}
            </span>
          </h1>
          <p className="text-xs text-[#1C211F]/60 mt-0.5">
            ติดตามสถานะการส่งมอบ บันทึกวันเวลา และยืนยันการรับสิ่งของด้วยรหัสความปลอดภัย
          </p>
        </div>

        {/* Deals Selector if multiple */}
        {deals.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#1C211F]/60">สลับข้อตกลง:</span>
            <select
              value={currentDeal.id}
              onChange={(e) => setSelectedDealId(e.target.value)}
              className="text-xs border border-[#1C211F]/15 rounded-lg px-2.5 py-1.5 bg-white text-[#1C211F] font-medium"
            >
              {deals.map(d => (
                <option key={d.id} value={d.id}>
                  {d.listing.title.substring(0, 24)}... ({d.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Timeline & Handover Verification (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Chronological Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-[#1C211F]/10 space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C211F]/70">
              สถานะขั้นตอนการส่งมอบ (Deal Timeline)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {timelineStages.map((step, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;

                return (
                  <div key={step.stage} className="space-y-1.5 text-center">
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isPassed
                            ? 'bg-[#164C3A] text-white shadow-2xs'
                            : 'bg-[#F7F5EF] text-[#1C211F]/40 border border-[#1C211F]/10'
                        } ${isCurrent ? 'ring-2 ring-[#164C3A]/30 scale-105' : ''}`}
                      >
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                    </div>
                    <div className={`text-[11px] font-semibold leading-tight ${isPassed ? 'text-[#1C211F]' : 'text-[#1C211F]/40'}`}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Handover Details & Security Confirmation Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#1C211F]/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#1C211F]">
                  การนัดหมายและการส่งมอบ (Handover Protocol)
                </h3>
                <p className="text-xs text-[#1C211F]/60 mt-0.5">
                  โปรดปฏิบัติตามแนวทางความปลอดภัยและแลกเปลี่ยนรหัสเพื่อปิดการส่งมอบ
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-[#164C3A] bg-[#DCE9E2] px-2.5 py-1 rounded-lg">
                  {currentDeal.deliveryMethod === 'pickup' ? 'นัดรับสินค้าด้วยตนเอง' : currentDeal.deliveryMethod === 'local_courier' ? 'จัดส่งด่วนแมสเซนเจอร์' : 'ขนส่งพัสดุขนาดใหญ่'}
                </span>
              </div>
            </div>

            {/* Handover specs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10 text-xs">
              <div className="space-y-1">
                <span className="text-[#1C211F]/50 block flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>วันและเวลานัดหมาย</span>
                </span>
                <span className="font-semibold text-[#1C211F]">
                  {currentDeal.handover.scheduledDate} · {currentDeal.handover.scheduledTime}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#1C211F]/50 block flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>จุดนัดพบที่ปลอดภัย (Safe Exchange Point)</span>
                </span>
                <span className="font-semibold text-[#1C211F]">
                  {currentDeal.handover.meetingLocation}
                </span>
                <span className="text-[10px] text-[#164C3A] block">
                  {currentDeal.handover.safeZoneName}
                </span>
              </div>
            </div>

            {/* Code Verification Box */}
            <div className="p-5 rounded-xl border-2 border-[#164C3A]/20 bg-[#FAF9F5] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#164C3A] uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4" />
                    <span>รหัสยืนยันการรับมอบ (Handover Security Code)</span>
                  </h4>
                  <p className="text-xs text-[#1C211F]/70 mt-1">
                    {isBuyer 
                      ? 'เมื่อได้รับสิ่งของและตรวจสอบความถูกต้องแล้ว นำรหัสด้านล่างนี้แจ้งต่อผู้ส่งมอบ หรือกรอกยืนยันด้วยตนเอง'
                      : 'ขอรับรหัส 6 หลักจากผู้รับสินค้าเมื่อตรวจรับสิ่งของเรียบร้อย เพื่อนำมากรอกบันทึกความสำเร็จ'}
                  </p>
                </div>

                <div className="text-center p-2.5 bg-white rounded-lg border border-[#1C211F]/10 shadow-2xs">
                  <span className="text-[10px] text-[#1C211F]/50 block uppercase">รหัสข้อตกลงนี้</span>
                  <span className="text-base font-mono font-bold text-[#164C3A] tracking-wider">
                    {currentDeal.handover.confirmationCode}
                  </span>
                </div>
              </div>

              {/* Input for verifying code if not completed yet */}
              {currentDeal.status !== 'completed' ? (
                <form onSubmit={handleVerifyCode} className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="กรอกรหัส 6 หลัก เช่น WM-8492..."
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      setCodeError(false);
                    }}
                    className="flex-1 px-3.5 py-2 text-xs border border-[#1C211F]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A] bg-white font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    ยืนยันรับสินค้าสำเร็จ
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-semibold">ข้อตกลงนี้ส่งมอบและตรวจรับสมบูรณ์แล้ว</span>
                  </div>
                  {!currentDeal.hasBuyerReviewed && (
                    <button
                      onClick={() => setReviewModalDeal(currentDeal)}
                      className="text-xs font-bold underline hover:text-emerald-950 cursor-pointer"
                    >
                      เขียนรีวิว
                    </button>
                  )}
                </div>
              )}

              {codeError && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>รหัสไม่ถูกต้อง กรุณาตรวจสอบรหัส 6 หลักจากคู่สนทนาอีกครั้ง</span>
                </p>
              )}
            </div>

            {/* Stage Transition Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1C211F]/10">
              <button
                onClick={() => setReportModalTarget({
                  type: 'listing',
                  id: currentDeal.listingId,
                  title: currentDeal.listing.title
                })}
                className="text-xs text-[#1C211F]/60 hover:text-rose-600 transition-colors cursor-pointer"
              >
                รายงานปัญหาข้อพิพาท (Report Issue)
              </button>

              <div className="flex items-center gap-2">
                {currentDeal.status === 'deal_confirmed' && (
                  <button
                    onClick={() => advanceDealStatus(currentDeal.id, 'scheduled')}
                    className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] cursor-pointer shadow-sm"
                  >
                    ยืนยันการนัดหมาย (Schedule)
                  </button>
                )}

                {currentDeal.status === 'scheduled' && (
                  <button
                    onClick={() => advanceDealStatus(currentDeal.id, 'in_transit')}
                    className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] cursor-pointer shadow-sm"
                  >
                    เริ่มออกเดินทางไปจุดนัด (In Transit)
                  </button>
                )}

                {currentDeal.status === 'in_transit' && (
                  <button
                    onClick={() => advanceDealStatus(currentDeal.id, 'completed')}
                    className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] cursor-pointer shadow-sm"
                  >
                    ทำเครื่องหมายว่าส่งมอบแล้ว (Complete)
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Listing Card & Participant Profile (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Listing Summary */}
          <div className="bg-white p-5 rounded-2xl border border-[#1C211F]/10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C211F]/60">
              สิ่งของในข้อตกลง
            </span>

            <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F7F5EF]">
              <img
                src={currentDeal.listing.images[0]}
                alt={currentDeal.listing.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#164C3A] font-semibold uppercase">
                {currentDeal.listing.category} · {currentDeal.listing.transactionType}
              </span>
              <h4 className="text-sm font-bold text-[#1C211F] leading-snug">
                {currentDeal.listing.title}
              </h4>
            </div>

            <div className="p-3 bg-[#F7F5EF] rounded-xl flex items-baseline justify-between">
              <span className="text-xs text-[#1C211F]/70">ราคาข้อตกลง (Agreed):</span>
              <span className="text-base font-bold text-[#164C3A] tabular-nums">
                {currentDeal.agreedPrice > 0 ? `฿${currentDeal.agreedPrice.toLocaleString()}` : 'ส่งต่อฟรี/แลกเปลี่ยน'}
              </span>
            </div>
          </div>

          {/* Other Party Profile Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#1C211F]/10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C211F]/60">
              คู่ข้อตกลง ({isBuyer ? 'ผู้ขาย/ผู้ส่งต่อ' : 'ผู้ซื้อ/ผู้รับมอบ'})
            </span>

            <div className="flex items-center gap-3">
              <img
                src={otherParty.avatar}
                alt={otherParty.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-1 ring-[#1C211F]/10"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1C211F] flex items-center gap-1">
                  <span>{otherParty.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#164C3A]" />
                </h4>
                <div className="text-[11px] text-[#1C211F]/60">
                  ตอบกลับไว {otherParty.responseRate}% · ★ {otherParty.rating} ({otherParty.reviewsCount} รีวิว)
                </div>
                <div className="text-[10px] text-[#1C211F]/40 mt-0.5">
                  ยืนยันตัวตนแล้ว · ส่งมอบสำเร็จ {otherParty.completedDeals} ครั้ง
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1C211F]/10 flex gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className="flex-1 py-2 bg-[#F7F5EF] hover:bg-[#DCE9E2]/50 text-[#1C211F] text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
              >
                เปิดแชทเจรจา
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
