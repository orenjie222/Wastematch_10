import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { SubscriptionPlan } from '../../types/marketplace';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Zap, 
  AlertCircle,
  FileCheck,
  TrendingDown,
  Layers,
  Leaf,
  Factory
} from 'lucide-react';

export const SubscriptionView: React.FC = () => {
  const { currentSubscription, upgradeSubscription } = useMarketplace();
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | null>(null);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const plans: {
    id: SubscriptionPlan;
    name: string;
    price: number;
    billingPeriod: string;
    description: string;
    highlight?: boolean;
    features: {
      listingLimit: string;
      commissionCap: string;
      spotlight: string;
      matching: string;
      compliance: string;
      badge: string;
    };
  }[] = [
    {
      id: 'free',
      name: 'Free (ฟรีตลอดชีพ)',
      price: 0,
      billingPeriod: 'ฟรี ฿0 / เดือน',
      description: 'สำหรับบุคคลทั่วไปที่ต้องการส่งต่อสิ่งของในบ้านเป็นครั้งคราว',
      features: {
        listingLimit: 'ลงประกาศได้สูงสุด 5 รายการพร้อมกัน',
        commissionCap: 'ค่าคอมมิชชั่นมาตรฐาน 15% (ลดเหลือ 10% ตามยอด)',
        spotlight: 'แสดงผลตามลำดับมาตรฐาน',
        matching: 'ระบบ Mutual Match และแชทเจรจาพื้นฐาน',
        compliance: 'บันทึกประวัติการส่งต่อส่วนบุคคล',
        badge: 'สมาชิกยืนยันตัวตนทั่วไป'
      }
    },
    {
      id: 'starter',
      name: 'Eco Starter',
      price: 99,
      billingPeriod: '฿99 / เดือน',
      description: 'สำหรับนักออกแบบ ช่างฝีมือ หรือผู้ที่ต้องการส่งต่อและหมุนเวียนวัสดุสม่ำเสมอ',
      highlight: true,
      features: {
        listingLimit: 'ลงประกาศได้สูงสุด 20 รายการพร้อมกัน',
        commissionCap: 'เพดานค่าคอมมิชชั่นลดเหลือ 12% (ประหยัดทันที)',
        spotlight: 'สิทธิ์ปักหมุดสปอตไลท์ 3 รายการต่อเดือน',
        matching: 'Priority Match จับคู่เร็วกว่า 2 เท่า',
        compliance: 'สถิติการรับชมและการประหยัด CO2 รายสัปดาห์',
        badge: 'ตราสัญลักษณ์ Active Upcycler'
      }
    },
    {
      id: 'pro',
      name: 'Circular Pro',
      price: 299,
      billingPeriod: '฿299 / เดือน',
      description: 'สำหรับสตูดิโอ คาเฟ่ปรับปรุงร้าน หรือธุรกิจขนาดย่อมที่หมุนเวียนสินค้าปริมาณมาก',
      features: {
        listingLimit: 'ลงประกาศได้สูงสุด 100 รายการพร้อมกัน',
        commissionCap: 'เพดานค่าคอมมิชชั่นลดเหลือ 8% (คุ้มค่าสูงสุด)',
        spotlight: 'สิทธิ์ปักหมุดสปอตไลท์ 10 รายการต่อเดือน',
        matching: 'การแจ้งเตือนความต้องการวัสดุด่วนแบบ Real-time',
        compliance: 'ใบรับรองคาร์บอนเครดิตและรายงาน ESG รายเดือน',
        badge: 'ตราสัญลักษณ์ Verified Business Hub'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise Partner',
      price: 499,
      billingPeriod: '฿499 / เดือน',
      description: 'สำหรับโรงงานอุตสาหกรรม คลังสินค้า และผู้รวบรวมวัสดุรีไซเคิลขนาดใหญ่',
      features: {
        listingLimit: 'ลงประกาศไม่จำกัดจำนวน (พร้อม Bulk Upload)',
        commissionCap: 'ค่าคอมมิชชั่นต่ำสุดคงที่เพียง 5% แฟลตเรต',
        spotlight: 'ขึ้นแนะนำหน้าแรกและหมวดหมู่อุตสาหกรรมตลอดเวลา',
        matching: 'ระบบจับคู่แบบเหมาล็อต (Bulk Matchmaking)',
        compliance: 'ใบกำกับขนส่งกากของเสีย (DIW Manifest) และใบกำกับภาษีเต็มรูป',
        badge: 'ตราสัญลักษณ์ Industrial Circular Partner'
      }
    }
  ];

  const handleConfirmCheckout = () => {
    if (!selectedPlanForCheckout) return;
    upgradeSubscription(selectedPlanForCheckout);
    setIsSuccessModal(true);
    setTimeout(() => {
      setIsSuccessModal(false);
      setSelectedPlanForCheckout(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#164C3A] bg-[#DCE9E2] px-3 py-1 rounded-full">
          WasteMatch Membership Plans
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C211F] font-display">
          แผนสมาชิกและสิทธิประโยชน์เพื่อเศรษฐกิจหมุนเวียน
        </h1>
        <p className="text-sm text-[#1C211F]/70 leading-relaxed">
          เลือกแพ็กเกจที่ตรงกับปริมาณสิ่งของที่คุณต้องการส่งต่อ ลดค่าคอมมิชชั่นลงสูงสุดเหลือเพียง 5% 
          พร้อมรับเอกสารรับรองสิ่งแวดล้อมและใบกำกับภาษีสำหรับธุรกิจ
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => {
          const isCurrent = currentSubscription === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border flex flex-col justify-between p-6 transition-all duration-200 relative ${
                plan.highlight
                  ? 'border-[#164C3A] bg-[#F7F5EF] shadow-md ring-1 ring-[#164C3A]/20'
                  : 'border-[#1C211F]/10 bg-white hover:border-[#164C3A]/40'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#164C3A] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                  แนะนำสำหรับบุคคลและนักออกแบบ
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="border-b border-[#1C211F]/10 pb-4 mb-4">
                  <h3 className="text-base font-bold text-[#1C211F] font-display">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-[#164C3A] tabular-nums font-display">
                      ฿{plan.price}
                    </span>
                    <span className="text-xs text-[#1C211F]/60">
                      {plan.price === 0 ? '/ ฟรีตลอดไป' : '/ เดือน'}
                    </span>
                  </div>
                  <p className="text-xs text-[#1C211F]/70 mt-2 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 text-xs mb-6">
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-[#164C3A] shrink-0 mt-0.5" />
                    <span className="text-[#1C211F] font-medium">{plan.features.listingLimit}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-[#1C211F] font-bold text-emerald-800">{plan.features.commissionCap}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#164C3A] shrink-0 mt-0.5" />
                    <span className="text-[#1C211F]/80">{plan.features.spotlight}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#164C3A] shrink-0 mt-0.5" />
                    <span className="text-[#1C211F]/80">{plan.features.matching}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileCheck className="w-4 h-4 text-[#164C3A] shrink-0 mt-0.5" />
                    <span className="text-[#1C211F]/80">{plan.features.compliance}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#164C3A] shrink-0 mt-0.5" />
                    <span className="text-[#1C211F]/80">{plan.features.badge}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-[#DCE9E2] text-[#164C3A] text-xs font-bold rounded-xl cursor-default text-center"
                  >
                    แผนปัจจุบันของคุณ
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedPlanForCheckout(plan.id)}
                    className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs ${
                      plan.highlight
                        ? 'bg-[#164C3A] text-white hover:bg-[#123e2f]'
                        : 'bg-white border border-[#164C3A] text-[#164C3A] hover:bg-[#164C3A] hover:text-white'
                    }`}
                  >
                    {plan.price === 0 ? 'เลือกใช้งานฟรี' : `สมัครแผน ฿${plan.price}/เดือน`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise & DIW Compliance Banner */}
      <div className="mt-12 bg-white rounded-2xl border border-[#1C211F]/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DCE9E2] text-[#164C3A] flex items-center justify-center shrink-0">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#1C211F]">
              ต้องการระบบสำหรับโรงงานอุตสาหกรรม หรือระบบเอกสาร DIW e-Manifest?
            </h4>
            <p className="text-xs text-[#1C211F]/70 mt-1 max-w-2xl">
              ทีมผู้เชี่ยวชาญ WasteMatch พร้อมช่วยจัดการเอกสารส่งกากของเสียไม่อันตรายตามกฎกระทรวง และหนังสือรับรองก๊าซเรือนกระจก (TGO) สำหรับรายงานความยั่งยืน
            </p>
          </div>
        </div>

        <button 
          onClick={() => setSelectedPlanForCheckout('enterprise')}
          className="px-5 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] whitespace-nowrap cursor-pointer shrink-0"
        >
          เริ่มต้นใช้งาน Enterprise (฿499)
        </button>
      </div>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C211F]/10">
              <h4 className="text-base font-bold text-[#1C211F]">ยืนยันการเปลี่ยนแผนสมาชิก</h4>
              <button onClick={() => setSelectedPlanForCheckout(null)} className="text-[#1C211F]/40 hover:text-[#1C211F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#1C211F]/80 leading-relaxed">
              คุณกำลังจะเปลี่ยนเป็นแผน <strong className="text-[#164C3A] uppercase">{selectedPlanForCheckout}</strong> สิทธิประโยชน์และการจำกัดค่าคอมมิชชั่นจะมีผลทันทีกับทุกการทำธุรกรรมในระบบ
            </p>

            <div className="p-3 bg-[#F7F5EF] rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span>ค่าบริการรายเดือน:</span>
                <span className="font-bold">
                  {selectedPlanForCheckout === 'free' ? '฿0' : selectedPlanForCheckout === 'starter' ? '฿99' : selectedPlanForCheckout === 'pro' ? '฿299' : '฿499'}
                </span>
              </div>
              <div className="flex justify-between text-[#164C3A] font-semibold">
                <span>การลดหย่อนคอมมิชชั่น:</span>
                <span>มีผลทันที</span>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setSelectedPlanForCheckout(null)}
                className="px-4 py-2 text-xs font-semibold text-[#1C211F]/60 hover:text-[#1C211F]"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmCheckout}
                className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f]"
              >
                ยืนยันการสมัคร
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl text-center space-y-2 max-w-xs shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#1C211F]">อัปเกรดแผนสมาชิกสำเร็จ</h4>
            <p className="text-xs text-[#1C211F]/60">สิทธิพิเศษเริ่มใช้งานได้แล้ววันนี้</p>
          </div>
        </div>
      )}

    </div>
  );
};
