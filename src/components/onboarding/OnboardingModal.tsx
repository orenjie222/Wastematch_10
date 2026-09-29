import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Compass, 
  MapPin, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, currentUser, setCurrentUser, setActiveTab } = useMarketplace();
  const [step, setStep] = useState(1);

  // Selections
  const [interests, setInterests] = useState<string[]>(['เฟอร์นิเจอร์สำนักงาน', 'ไม้เก่า/วัสดุก่อสร้าง']);
  const [categories, setCategories] = useState<string[]>(['furniture', 'materials']);
  const [district, setDistrict] = useState('คลองเตย');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [needs, setNeeds] = useState<string[]>(['หาของราคาประหยัด', 'ลดขยะหมุนเวียน']);
  const [maxDistance, setMaxDistance] = useState(15);
  const [bioInput, setBioInput] = useState(currentUser.bio);

  if (!isOnboardingOpen) return null;

  const totalSteps = 6;

  const toggleInterest = (val: string) => {
    setInterests(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const toggleCategory = (val: string) => {
    setCategories(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const toggleNeed = (val: string) => {
    setNeeds(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const handleFinish = () => {
    setCurrentUser({
      ...currentUser,
      bio: bioInput,
      location: {
        ...currentUser.location,
        district,
        province
      }
    });
    setIsOnboardingOpen(false);
    setActiveTab('discover');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-semibold tracking-wide font-display">
              เริ่มต้นใช้งาน WasteMatch (Personalized Onboarding)
            </h3>
            <p className="text-[11px] text-[#DCE9E2]">
              ขั้นตอนที่ {step} จาก {totalSteps}
            </p>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#DCE9E2]/30 h-1">
          <div 
            className="bg-[#164C3A] h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Step 1: เลือกสิ่งที่สนใจ */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">
                  ขั้นตอนที่ 1: เลือกสิ่งที่คุณสนใจ
                </h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  ระบบ Mutual Match จะใช้วิเคราะห์เพื่อแนะนำรายการที่ตรงใจคุณ
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  'เฟอร์นิเจอร์สำนักงาน',
                  'ไม้เก่า/วัสดุก่อสร้าง',
                  'เครื่องชงกาแฟ/บาร์',
                  'กล่องลูกฟูก/บรรจุภัณฑ์',
                  'เศษผ้า/ยีนส์ Upcycle',
                  'อุปกรณ์คอมพิวเตอร์',
                  'ของสะสม/วินเทจ',
                  'เศษเหล็ก/โลหะ'
                ].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      interests.includes(item)
                        ? 'border-[#164C3A] bg-[#F7F5EF] text-[#164C3A] font-semibold'
                        : 'border-[#1C211F]/15 text-[#1C211F]/70 hover:border-[#1C211F]/30'
                    }`}
                  >
                    <span>{item}</span>
                    {interests.includes(item) && <Check className="w-3.5 h-3.5 text-[#164C3A]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: เลือกหมวดหมู่ */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">
                  ขั้นตอนที่ 2: หมวดหมู่หลักที่คุณต้องการติดตาม
                </h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  จัดลำดับการแสดงผลใน Discover Feed
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  { id: 'furniture', label: 'เฟอร์นิเจอร์ (Furniture)' },
                  { id: 'materials', label: 'วัสดุช่างและไม้ (Materials)' },
                  { id: 'machinery', label: 'เครื่องจักรพาณิชย์ (Machinery)' },
                  { id: 'packaging', label: 'บรรจุภัณฑ์และพาเลท (Packaging)' },
                  { id: 'textiles', label: 'สิ่งทอและผ้า (Textiles)' },
                  { id: 'electronics', label: 'ไอทีและอิเล็กทรอนิกส์ (Electronics)' }
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={`w-full p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      categories.includes(c.id)
                        ? 'border-[#164C3A] bg-[#F7F5EF] text-[#164C3A] font-semibold'
                        : 'border-[#1C211F]/15 text-[#1C211F]/70 hover:border-[#1C211F]/30'
                    }`}
                  >
                    <span>{c.label}</span>
                    {categories.includes(c.id) && <Check className="w-3.5 h-3.5 text-[#164C3A]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: เลือกพื้นที่ */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">
                  ขั้นตอนที่ 3: กำหนดพื้นที่พำนักหรือที่ตั้งธุรกิจ
                </h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  เพื่อคำนวณระยะทางสำหรับการนัดรับ ณ จุด Safe Handover Zone
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    เขต / อำเภอ
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    จังหวัด
                  </label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: เลือกสิ่งที่ต้องการ */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">
                  ขั้นตอนที่ 4: เป้าหมายการใช้งานของคุณ
                </h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  บอกเราว่าคุณต้องการให้ WasteMatch ช่วยเหลือในด้านใด
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  'หาของราคาประหยัดสำหรับตกแต่งห้อง/สตูดิโอ',
                  'ลดขยะหมุนเวียนในกระบวนการผลิต',
                  'หาแหล่งรับบริจาคสำหรับมูลนิธิ/โรงเรียน',
                  'ส่งต่อเฟอร์นิเจอร์เก่าก่อนย้ายที่พัก',
                  'สะสมคะแนน Eco Points และลดคาร์บอน'
                ].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleNeed(item)}
                    className={`w-full p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      needs.includes(item)
                        ? 'border-[#164C3A] bg-[#F7F5EF] text-[#164C3A] font-semibold'
                        : 'border-[#1C211F]/15 text-[#1C211F]/70 hover:border-[#1C211F]/30'
                    }`}
                  >
                    <span>{item}</span>
                    {needs.includes(item) && <Check className="w-3.5 h-3.5 text-[#164C3A]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Discovery Preference */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">
                  ขั้นตอนที่ 5: ตั้งค่าระยะค้นหา (Discovery Radius)
                </h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  เลือกความไกลสูงสุดสำหรับการจับคู่
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#1C211F]">รัศมีการเดินทางที่สะดวก</span>
                  <span className="font-bold text-[#164C3A] tabular-nums">{maxDistance} กิโลเมตร</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-[#164C3A] cursor-pointer"
                />
                <p className="text-[11px] text-[#1C211F]/60">
                  ครอบคลุมพื้นที่กรุงเทพฯ ชั้นใน และจุดนัดรับ Safe Handover Zone กว่า 45 แห่ง
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Create Profile */}
          {step === 6 && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#DCE9E2] text-[#164C3A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C211F] font-display">
                  พร้อมเริ่มต้นสร้างผลกระทบเชิงบวก
                </h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  ปรับแต่งข้อความแนะนำตัวของคุณสั้นๆ
                </p>
              </div>

              <textarea
                rows={3}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="เขียนประวัติย่อหรือความสนใจในการหมุนเวียนวัสดุของคุณ..."
                className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl text-left focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F7F5EF] border-t border-[#1C211F]/10 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="text-xs font-medium text-[#1C211F]/70 hover:text-[#1C211F] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>ถัดไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer shadow-sm"
            >
              เสร็จสิ้นและเริ่มใช้งาน
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
