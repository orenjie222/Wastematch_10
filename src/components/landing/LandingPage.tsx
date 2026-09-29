import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  HERO_IMAGE, 
  CHAIR_IMAGE, 
  WOOD_IMAGE, 
  ESPRESSO_IMAGE 
} from '../../data/seedData';
import { 
  ArrowRight, 
  ShieldCheck, 
  RotateCw, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  User, 
  HeartHandshake,
  Layers,
  Scale,
  Leaf
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    setActiveTab, 
    setIsCreateListingOpen, 
    setIsOnboardingOpen,
    setSelectedListing,
    listings 
  } = useMarketplace();

  const categories = [
    { id: 'furniture', name: 'เฟอร์นิเจอร์สำนักงานและบ้าน', count: '142 รายการ', example: 'เก้าอี้ Ergonomic, โต๊ะประชุมไม้โอ๊ค' },
    { id: 'materials', name: 'วัสดุและโครงสร้างหมุนเวียน', count: '89 รายการ', example: 'ไม้สักเก่า, แผ่นอะคริลิก, ท่อเหล็กกล่อง' },
    { id: 'machinery', name: 'เครื่องจักรและอุปกรณ์พาณิชย์', count: '54 รายการ', example: 'เครื่องชงกาแฟ, ตู้แช่สเตนเลส, ปั๊มลม' },
    { id: 'packaging', name: 'บรรจุภัณฑ์และพาเลทขนส่ง', count: '210 รายการ', example: 'กล่องลูกฟูก 5 ชั้น, พาเลทไม้ EPAL' },
    { id: 'textiles', name: 'เศษผ้าอุตสาหกรรมและหนัง', count: '76 รายการ', example: 'ม้วนผ้ายีนส์เดนิม, หนังแท้ตัดเศษ' },
    { id: 'electronics', name: 'เครื่องใช้ไฟฟ้าและไอที', count: '98 รายการ', example: 'เซิร์ฟเวอร์แร็ค, จอคอมพิวเตอร์, อุปกรณ์เครือข่าย' },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#1C211F]/10 bg-[#F7F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#164C3A] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#164C3A]" />
                ระบบจับคู่หมุนเวียนสิ่งของและวัสดุเหลือใช้แห่งแรกของไทย
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C211F] leading-[1.15] font-display text-balance">
                Give unused things a new purpose.
              </h1>

              <p className="text-base sm:text-lg text-[#1C211F]/80 leading-relaxed font-normal">
                ค้นหา ขาย แลก ให้ และส่งต่อสิ่งของที่ไม่ใช้ ผ่านระบบ Matching ที่ช่วยให้คุณเจอคนที่ต้องการสิ่งเดียวกัน ลดขยะอุตสาหกรรม สร้างมูลค่าใหม่ให้ทรัพยากร
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('discover')}
                  className="px-6 py-3.5 bg-[#164C3A] text-white text-sm font-semibold rounded-xl hover:bg-[#123e2f] active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>ค้นหาใน Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCreateListingOpen(true)}
                  className="px-6 py-3.5 bg-white text-[#1C211F] text-sm font-semibold rounded-xl border border-[#1C211F]/15 hover:border-[#164C3A] hover:text-[#164C3A] transition-all cursor-pointer"
                >
                  ลงประกาศสิ่งของของคุณ
                </button>
              </div>

              {/* Live Metric Evidence - Adjacent to Claims */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#1C211F]/10 text-xs">
                <div>
                  <div className="text-lg font-bold text-[#164C3A] tabular-nums font-display">14,800+</div>
                  <div className="text-[#1C211F]/60 mt-0.5">สิ่งของหมุนเวียน</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#164C3A] tabular-nums font-display">94.2%</div>
                  <div className="text-[#1C211F]/60 mt-0.5">อัตราความสำเร็จ</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#164C3A] tabular-nums font-display">42.6 ตัน</div>
                  <div className="text-[#1C211F]/60 mt-0.5">ลดการปล่อย CO2e</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual & Verified Preview Cards */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#1C211F]/10 bg-white">
                <img
                  src={HERO_IMAGE}
                  alt="Curated circular items showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-96 object-cover"
                />
                
                {/* Floating Preview Card - Real Listing Spotlight */}
                <div 
                  onClick={() => {
                    setSelectedListing(listings[0]);
                  }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#1C211F]/10 shadow-md cursor-pointer hover:border-[#164C3A]/40 transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-[#1C211F]/60 mb-1">
                    <span className="font-semibold text-[#164C3A]">รายการแนะนำวันนี้</span>
                    <span>2.4 กม. · สุขุมวิท 26</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1C211F]">
                        เก้าอี้สำนักงาน Ergonomic Mesh Chair
                      </h4>
                      <p className="text-xs text-[#1C211F]/70 mt-0.5">
                        สภาพดีมาก · ประหยัดกว่ามือหนึ่ง 77%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#164C3A] tabular-nums">฿850</div>
                      <span className="text-[10px] text-[#1C211F]/50 line-through">฿3,800</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. How Matching Works: Serious, Professional, Non-Dating-App */}
      <section className="py-16 md:py-24 bg-white border-b border-[#1C211F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C211F] font-display">
              01. ระบบ Mutual Matching เพื่อเศรษฐกิจหมุนเวียน
            </h2>
            <p className="text-base text-[#1C211F]/70 mt-2">
              ไม่ใช่แค่การลงประกาศทิ้งไว้ แต่เป็นอัลกอริทึมที่จับคู่สิ่งที่คนหนึ่งต้องการส่งต่อ กับสิ่งที่อีกคนกำลังตามหา โดยคำนวณจากระยะทาง งบประมาณ และความน่าเชื่อถือ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10">
              <div className="w-10 h-10 rounded-lg bg-[#164C3A] text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-semibold text-[#1C211F] mb-1">
                กำหนดความต้องการ
              </h3>
              <p className="text-xs text-[#1C211F]/70 leading-relaxed">
                เลือกระบุวัสดุหรือของที่คุณมี หรือตั้งรายการ "ตามหา (Wanted)" พร้อมระบุเงื่อนไขและงบประมาณ
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10">
              <div className="w-10 h-10 rounded-lg bg-[#164C3A] text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-semibold text-[#1C211F] mb-1">
                ปัดสำรวจความเข้ากันได้
              </h3>
              <p className="text-xs text-[#1C211F]/70 leading-relaxed">
                ปัดขวาเมื่อสนใจ หรือปัดซ้ายเพื่อข้าม โดยระบบจะแสดงเหตุผลความเข้ากันได้ เช่น ระยะทาง 2.4 กม. หรือราคาที่ตรงงบ
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10">
              <div className="w-10 h-10 rounded-lg bg-[#164C3A] text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-semibold text-[#1C211F] mb-1">
                Mutual Match & แชทเจรจา
              </h3>
              <p className="text-xs text-[#1C211F]/70 leading-relaxed">
                ห้องแชทจะเปิดขึ้นเฉพาะเมื่อทั้งสองฝ่ายมีความสนใจตรงกัน ป้องกันสแปมและลดเวลาเจรจา
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F7F5EF] border border-[#1C211F]/10">
              <div className="w-10 h-10 rounded-lg bg-[#164C3A] text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h3 className="text-base font-semibold text-[#1C211F] mb-1">
                นัดหมายจุดปลอดภัย (Deal)
              </h3>
              <p className="text-xs text-[#1C211F]/70 leading-relaxed">
                ส่งมอบผ่านจุด Safe Handover Zone พร้อมรหัสยืนยันตัวตน ตรวจสอบความถูกต้องและบันทึกคะแนน Eco Points
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Marketplace Categories with Direct Links */}
      <section className="py-16 md:py-24 bg-[#F7F5EF] border-b border-[#1C211F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C211F] font-display">
                02. หมวดหมู่สินค้าและวัสดุหมุนเวียน
              </h2>
              <p className="text-sm text-[#1C211F]/70 mt-1">
                ครอบคลุมทั้งสิ่งของสำนักงาน อุปกรณ์เครื่องจักร และวัสดุอุตสาหกรรม
              </p>
            </div>
            <button
              onClick={() => setActiveTab('discover')}
              className="text-xs font-semibold text-[#164C3A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>ดูรายการทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveTab('discover')}
                className="p-6 bg-white rounded-xl border border-[#1C211F]/10 hover:border-[#164C3A]/50 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-[#1C211F]/50 mb-2">
                  <span>หมวดหมู่ตลาด</span>
                  <span className="font-semibold text-[#164C3A]">{cat.count}</span>
                </div>
                <h3 className="text-base font-semibold text-[#1C211F] group-hover:text-[#164C3A] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#1C211F]/60 mt-2">
                  ตัวอย่าง: {cat.example}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Three Pillars: Individuals, Businesses, Organizations */}
      <section className="py-16 md:py-24 bg-white border-b border-[#1C211F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C211F] font-display">
              03. แพลตฟอร์มสำหรับทุกคนในระบบนิเวศ
            </h2>
            <p className="text-sm text-[#1C211F]/70 mt-1">
              WasteMatch ออกแบบสถาปัตยกรรมรองรับความต้องการที่หลากหลายของภาคประชาชน ภาคธุรกิจ และองค์กรเพื่อสังคม
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Individuals */}
            <div className="p-8 rounded-2xl bg-[#F7F5EF] border border-[#1C211F]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#1C211F]/10 flex items-center justify-center text-[#164C3A] mb-6">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1C211F] mb-2">
                  บุคคลทั่วไป (Individuals)
                </h3>
                <p className="text-xs text-[#1C211F]/75 leading-relaxed mb-6">
                  ย้ายบ้าน ปรับปรุงห้อง หรือมีเครื่องใช้ไฟฟ้าที่ไม่ได้ใช้ สามารถส่งต่อ ขาย หรือแลกเปลี่ยนได้อย่างสบายใจ ผ่านระบบตรวจสอบตัวตนและรีวิวจากชุมชนจริง
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#1C211F]/70 border-t border-[#1C211F]/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ค้นหาสิ่งของใกล้ตัวในระยะ 5 กม.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ระบบส่งมอบปลอดภัย Safe Handover Code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>สะสมคะแนน Eco Points แลกรับสิทธิประโยชน์</span>
                </li>
              </ul>
            </div>

            {/* Businesses */}
            <div className="p-8 rounded-2xl bg-[#F7F5EF] border border-[#1C211F]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#1C211F]/10 flex items-center justify-center text-[#164C3A] mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1C211F] mb-2">
                  ภาคธุรกิจและโรงงาน (Businesses)
                </h3>
                <p className="text-xs text-[#1C211F]/75 leading-relaxed mb-6">
                  เปลี่ยนวัสดุเหลือใช้ พาเลท ลังบรรจุภัณฑ์ และเศษวัสดุจากการผลิตให้เป็นรายได้ ลดต้นทุนการกำจัดขยะ พร้อมระบบออกรายงาน ESG และลดการปล่อยคาร์บอน
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#1C211F]/70 border-t border-[#1C211F]/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ลงประกาศแบบล็อตใหญ่ (Bulk Inventory)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ใบยืนยันการหมุนเวียนวัสดุ Circular Chain</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ลดหย่อนภาษีจากการส่งต่อทรัพยากร</span>
                </li>
              </ul>
            </div>

            {/* Organizations */}
            <div className="p-8 rounded-2xl bg-[#F7F5EF] border border-[#1C211F]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#1C211F]/10 flex items-center justify-center text-[#164C3A] mb-6">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1C211F] mb-2">
                  มูลนิธิและองค์กร (Organizations)
                </h3>
                <p className="text-xs text-[#1C211F]/75 leading-relaxed mb-6">
                  จับคู่รับบริจาคคอมพิวเตอร์เพื่อการศึกษา เฟอร์นิเจอร์ หรือสิ่งของยังชีพอย่างตรงจุด ลดปัญหาการได้รับของบริจาคที่ไม่ตรงกับความต้องการของพื้นที่
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#1C211F]/70 border-t border-[#1C211F]/10 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ป้ายสัญลักษณ์ Verified NGO ได้รับความเชื่อถือ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ตั้งรับรายการบริจาคตามพื้นที่เป้าหมาย</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ติดตามการเดินทางของของบริจาคแบบเรียลไทม์</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Trust & Community Verification Section */}
      <section className="py-16 md:py-24 bg-[#164C3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#DCE9E2]">
                Community Verification & Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                ความปลอดภัยและประวัติการส่งมอบโปร่งใส ไร้การตัดสินคะแนน
              </h2>
              <p className="text-sm text-[#DCE9E2]/80 leading-relaxed">
                แทนที่จะให้คะแนนตัดสินผู้คน WasteMatch มุ่งเน้นการแสดงข้อมูลเชิงประจักษ์: อัตราการตอบกลับที่รวดเร็ว ประวัติการส่งมอบจริงที่สำเร็จโดยไร้ข้อพิพาท และการยืนยันเอกสารตัวตน 3 ชั้น
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#DCE9E2] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">ยืนยันตัวตน 3 ชั้น (Identity Verification)</h4>
                    <p className="text-xs text-[#DCE9E2]/70 mt-0.5">ตรวจสอบอีเมล เบอร์โทรศัพท์ และบัตรประจำตัวประชาชนหรือหนังสือรับรองนิติบุคคล</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#DCE9E2] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">จุดนัดรับปลอดภัย (Safe Handover Zones)</h4>
                    <p className="text-xs text-[#DCE9E2]/70 mt-0.5">แนะนำจุดส่งมอบในพื้นที่สาธารณะที่มีกล้องวงจรปิด เช่น สถานีรถไฟฟ้า หรือปั๊มน้ำมันพันธมิตร</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#DCE9E2] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">รหัสยืนยันการรับมอบ (Handover Security Code)</h4>
                    <p className="text-xs text-[#DCE9E2]/70 mt-0.5">ปิดการซื้อขายผ่านรหัสยืนยัน 6 หลัก ป้องกันการกดยืนยันเท็จ</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <h3 className="text-sm font-semibold text-white mb-4">ตัวชี้วัดความพร้อมของสมาชิก (Community Indicators)</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">การยืนยันตัวตน (Identity Verified)</div>
                      <div className="text-[11px] text-[#DCE9E2]/70">ตรวจสอบหลักฐานบุคคลหรือหนังสือรับรองกระทรวงพาณิชย์</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-300">ยืนยันแล้ว 100%</span>
                  </div>

                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">อัตราการตอบกลับเฉลี่ย (Response Rate)</div>
                      <div className="text-[11px] text-[#DCE9E2]/70">ตอบกลับผู้สนใจภายใน 10-15 นาที</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-300">98% ตอบไว</span>
                  </div>

                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">อัตราการแนะนำบอกต่อ (Community Satisfaction)</div>
                      <div className="text-[11px] text-[#DCE9E2]/70">จากรีวิวการส่งมอบจริงโดยไม่มีข้อพิพาท</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-300">99% แนะนำ</span>
                  </div>

                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">ส่งมอบและช่วยลดคาร์บอน (Eco Impact)</div>
                      <div className="text-[11px] text-[#DCE9E2]/70">บันทึกปริมาณขยะที่ลดลงสู่หลุมฝังกลบ</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-300">42.6 ตัน CO₂e</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="text-white/80">ความพึงพอใจการใช้งานภาพรวมชุมชน</span>
                  <span className="text-base font-bold text-white tabular-nums">★ 4.95 / 5.0</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-16 bg-[#F7F5EF] text-center border-b border-[#1C211F]/10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C211F] font-display">
            ร่วมเป็นส่วนหนึ่งของการลดขยะและหมุนเวียนทรัพยากร
          </h2>
          <p className="text-sm text-[#1C211F]/70 mt-3 max-w-xl mx-auto">
            เริ่มต้นค้นหาสิ่งของที่คุณต้องการ หรือลงประกาศส่งต่อสิ่งของที่ไม่ใช้แล้วได้ฟรีตั้งแต่วันนี้
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('discover')}
              className="px-6 py-3 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer shadow-sm"
            >
              เริ่มต้นใช้งาน Marketplace
            </button>
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-6 py-3 bg-white text-[#1C211F] text-xs font-semibold rounded-xl border border-[#1C211F]/15 hover:border-[#164C3A] transition-all cursor-pointer"
            >
              ทดลอง Onboarding แนะนำตัว
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-white py-12 text-[#1C211F]/70 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold text-[#164C3A] font-display">
              WasteMatch
            </span>
            <p className="mt-2 text-xs leading-relaxed text-[#1C211F]/60">
              แพลตฟอร์มตลาดหมุนเวียนสิ่งของและวัสดุเหลือใช้แห่งประเทศไทย เพื่อสิ่งแวดล้อมที่ยั่งยืนและเศรษฐกิจหมุนเวียน
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1C211F] mb-3">การใช้งาน</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('discover')} className="hover:text-[#164C3A] cursor-pointer">ค้นหาและแมตช์</button></li>
              <li><button onClick={() => setActiveTab('wanted')} className="hover:text-[#164C3A] cursor-pointer">ประกาศตามหา (Wanted)</button></li>
              <li><button onClick={() => setIsCreateListingOpen(true)} className="hover:text-[#164C3A] cursor-pointer">ลงประกาศสินค้า</button></li>
              <li><button onClick={() => setActiveTab('subscription')} className="hover:text-[#164C3A] cursor-pointer">แผนสมาชิกองค์กร</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1C211F] mb-3">ความปลอดภัย</h4>
            <ul className="space-y-2">
              <li><span className="text-[#1C211F]/60">ระบบ Safe Handover</span></li>
              <li><span className="text-[#1C211F]/60">มาตรฐานการยืนยันตัวตน</span></li>
              <li><span className="text-[#1C211F]/60">แนวทางการแลกเปลี่ยนวัสดุ</span></li>
              <li><span className="text-[#1C211F]/60">นโยบายความเป็นส่วนตัว</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1C211F] mb-3">ติดต่อและเครือข่าย</h4>
            <p className="text-xs leading-relaxed text-[#1C211F]/60">
              WasteMatch Thailand Co., Ltd.<br />
              Bangkok, Thailand<br />
              support@wastematch.local
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-[#1C211F]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#1C211F]/50">
          <div>© 2026 WasteMatch Thailand. All rights reserved.</div>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <span>Circular Economy Standard</span>
            <span>·</span>
            <span>Zero Slop Compliance</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
