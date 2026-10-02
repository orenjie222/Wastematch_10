import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  HERO_IMAGE, 
  CHAIR_IMAGE, 
  WOOD_IMAGE, 
  ELECTRONICS_IMAGE,
  CLOTHES_IMAGE,
  KITCHEN_IMAGE,
  BOXES_IMAGE,
  FALLBACK_IMAGE,
  getCategoryDefaultImage
} from '../../data/seedData';
import { 
  ArrowRight, 
  ShieldCheck, 
  RotateCw, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Bookmark,
  HeartHandshake,
  Repeat,
  Heart,
  TrendingDown,
  ArrowUpRight,
  Target,
  Lightbulb,
  Compass,
  Leaf,
  Plus,
  Lock,
  Award,
  Edit3
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    setActiveTab, 
    setIsCreateListingOpen, 
    setSelectedListing,
    listings,
    wantedItems,
    savedListingIds,
    toggleSaveListing,
    setViewingSeller,
    heroImage,
    setHeroImage,
    openImageEditor
  } = useMarketplace();

  // Curated visual categories for Explore by Category ("Find what you need. Give what you don't.")
  const categoryHighlights = [
    { 
      id: 'furniture_home', 
      name: 'เฟอร์นิเจอร์สำนักงาน & บ้าน', 
      nameEn: 'Furniture', 
      count: '142 รายการ', 
      image: CHAIR_IMAGE,
      desc: 'เก้าอี้ Ergonomic, โต๊ะประชุมไม้โอ๊ค, โซฟา' 
    },
    { 
      id: 'electronics', 
      name: 'เครื่องใช้ไฟฟ้า & อุปกรณ์ไอที', 
      nameEn: 'Electronics', 
      count: '98 รายการ', 
      image: ELECTRONICS_IMAGE,
      desc: 'จอคอมพิวเตอร์, เซิร์ฟเวอร์, แท็บเล็ต, แป้นพิมพ์' 
    },
    { 
      id: 'clothing_fashion', 
      name: 'เสื้อผ้า & สิ่งทออุตสาหกรรม', 
      nameEn: 'Clothing', 
      count: '115 รายการ', 
      image: CLOTHES_IMAGE,
      desc: 'ยูนิฟอร์ม, เศษผ้ายีนส์, เสื้อผ้าเด็ก' 
    },
    { 
      id: 'kitchen_appliances', 
      name: 'เครื่องใช้ในบ้าน & ครัวเรือน', 
      nameEn: 'Household', 
      count: '64 รายการ', 
      image: KITCHEN_IMAGE,
      desc: 'เครื่องชงกาแฟ, ภาชนะสเตนเลส, หม้อทอดไร้น้ำมัน' 
    },
    { 
      id: 'packaging_materials', 
      name: 'บรรจุภัณฑ์ & พาเลทขนส่ง', 
      nameEn: 'Packaging', 
      count: '210 รายการ', 
      image: BOXES_IMAGE,
      desc: 'กล่องลูกฟูก 5 ชั้น, พาเลทไม้ EPAL' 
    },
    { 
      id: 'wood_lumber', 
      name: 'วัสดุ & โครงสร้างหมุนเวียน', 
      nameEn: 'Materials', 
      count: '89 รายการ', 
      image: WOOD_IMAGE,
      desc: 'ไม้สักเก่า, แผ่นอะคริลิก, ท่อเหล็กกล่อง' 
    }
  ];

  // 4 items for Trending on WasteMatch
  const trendingListings = listings.slice(0, 4);

  // 3 items for Wanted showcase
  const featuredWanted = wantedItems.slice(0, 3);

  return (
    <div className="w-full bg-[#F7F5F0] text-[#252722] selection:bg-[#344634] selection:text-white pb-12 lg:pb-0">
      
      {/* ========================================================================= */}
      {/* 1. Large Split-Screen Hero Section (Optimized for Mobile & Desktop) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-6 pb-12 md:pt-16 md:pb-24 border-b border-[#E4DFD5] bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Headlines & Action Buttons */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#344634] tracking-widest uppercase bg-[#EEEAE1] border border-[#E4DFD5] px-3.5 py-1.5 rounded-full mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-[#344634]" />
                WasteMatch · ตลาดหมุนเวียนทรัพยากรไทย
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#252722] leading-[1.18] sm:leading-[1.12]">
                Give things a <span className="italic font-serif text-[#344634]">second life.</span>
              </h1>

              <p className="text-sm sm:text-lg text-[#252722]/80 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                สิ่งที่คุณไม่ใช้แล้ว อาจเป็นสิ่งล้ำค่าที่คนอื่นกำลังตามหา ร่วมขับเคลื่อนเศรษฐกิจหมุนเวียน (Circular Economy) ส่งต่อ แลกเปลี่ยน และลดขยะสู่หลุมฝังกลบอย่างปลอดภัย
              </p>

              {/* Mobile-Friendly CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('discover')}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-[#344634] text-white text-sm font-semibold rounded-xl hover:bg-[#263426] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
                >
                  <span>สำรวจตลาด Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCreateListingOpen(true)}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white text-[#252722] text-sm font-semibold rounded-xl border border-[#E4DFD5] hover:border-[#344634] hover:text-[#344634] hover:bg-[#EEEAE1]/40 transition-all cursor-pointer shadow-2xs text-center"
                >
                  ลงประกาศส่งต่อสิ่งของ
                </button>
              </div>

              {/* Verified Metrics Counter */}
              <div className="pt-5 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#E4DFD5] text-xs">
                <div>
                  <div className="text-lg sm:text-2xl font-serif text-[#344634] tabular-nums font-bold">14,820+</div>
                  <div className="text-[#252722]/65 mt-0.5 text-[11px] sm:text-xs">สิ่งของหมุนเวียน</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-serif text-[#344634] tabular-nums font-bold">4,120+</div>
                  <div className="text-[#252722]/65 mt-0.5 text-[11px] sm:text-xs">ดีลสำเร็จสมบูรณ์</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-serif text-[#344634] tabular-nums font-bold">42.6 ตัน</div>
                  <div className="text-[#252722]/65 mt-0.5 text-[11px] sm:text-xs">ลดการปล่อย CO₂e</div>
                </div>
              </div>

            </div>

            {/* Right Column: Pure High-End Lifestyle & Environmental Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E4DFD5] bg-white group">
                <img
                  src={heroImage || HERO_IMAGE}
                  alt="Sustainable Circular Economy Lifestyle"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-64 sm:h-96 lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                {/* Edit Photo Trigger Button */}
                <button
                  type="button"
                  onClick={() => openImageEditor({
                    title: 'แก้ไขรูปภาพแบนเนอร์หน้าแรก (Hero Banner)',
                    currentImage: heroImage || HERO_IMAGE,
                    onSave: (newUrl) => setHeroImage(newUrl)
                  })}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#252722]/85 hover:bg-[#344634] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all cursor-pointer z-10"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>เปลี่ยนรูปภาพหน้าแรก</span>
                </button>

                {/* Subtle Editorial Overlay Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#344634]/90 backdrop-blur-xs text-[11px] font-semibold text-emerald-200 border border-white/20">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Circular Economy Community</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-white leading-snug drop-shadow-xs">
                    เชื่อมโยงการส่งต่อสิ่งของอย่างคุ้มค่า และลดผลกระทบต่อสิ่งแวดล้อม
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 font-sans">
                    แพลตฟอร์มตัวกลางเพื่อสังคมไร้ขยะ (Zero Landfill) แห่งประเทศไทย
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. จุดประสงค์ แนวคิด และแนวทางของแพลตฟอร์ม (Platform Purpose, Concept & Guiding Pathway) */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-20 bg-white border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-widest block mb-1">
              Core Principles & Mission
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#252722]">
              จุดประสงค์ แนวคิด และแนวทางของ <span className="italic font-serif text-[#344634]">WasteMatch</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#252722]/75 mt-2.5 font-sans leading-relaxed">
              เรามุ่งมั่นสร้างระบบนิเวศการแลกเปลี่ยนและหมุนเวียนทรัพยากรที่โปร่งใส ปลอดภัย และจับต้องได้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 1. Purpose */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5F0] border border-[#E4DFD5] shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase font-semibold text-[#7C8B72] tracking-wider font-sans">
                  01. จุดประสงค์ (Purpose)
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#252722]">
                  ลดขยะสู่หลุมฝังกลบ และสร้างมูลค่าใหม่
                </h3>
                <p className="text-xs sm:text-sm text-[#252722]/75 leading-relaxed font-sans">
                  เปลี่ยนสิ่งของเหลือใช้ พาเลท ลังบรรจุภัณฑ์ และอุปกรณ์สภาพดีที่ไม่ถูกใช้งาน ให้กลับเข้าสู่ระบบหมุนเวียน เพื่อลดปัญหาขยะล้นเมือง และลดปริมาณก๊าซเรือนกระจกอย่างเป็นรูปธรรม
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DFD5] text-xs font-semibold text-[#344634] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#344634]" />
                <span>เป้าหมาย Zero Waste to Landfill</span>
              </div>
            </div>

            {/* 2. Concept */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5F0] border border-[#E4DFD5] shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center font-bold">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase font-semibold text-[#7C8B72] tracking-wider font-sans">
                  02. แนวคิด (Concept)
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#252722]">
                  เศรษฐกิจหมุนเวียน & การจับคู่ตรงความต้องการ
                </h3>
                <p className="text-xs sm:text-sm text-[#252722]/75 leading-relaxed font-sans">
                  ยึดหลัก Closed-Loop Resource Cycle ผสานระบบ Mutual Match ให้ผู้ส่งต่อและผู้ตามหาพบกัน โดยคำนวณจากระยะทาง งบประมาณ และความพร้อม ไม่ใช่เพียงการลงประกาศทิ้งไว้
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DFD5] text-xs font-semibold text-[#344634] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#344634]" />
                <span>ระบบจับคู่สองทาง (Mutual Match)</span>
              </div>
            </div>

            {/* 3. Pathway */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5F0] border border-[#E4DFD5] shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase font-semibold text-[#7C8B72] tracking-wider font-sans">
                  03. แนวทางปฏิบัติ (Guiding Pathway)
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#252722]">
                  ความปลอดภัย โปร่งใส และมีมาตรฐาน
                </h3>
                <p className="text-xs sm:text-sm text-[#252722]/75 leading-relaxed font-sans">
                  ส่งมอบผ่านจุดปลอดภัย (Safe Handover Zone) ตรวจรับด้วยรหัส WM-Security Code รายงานข้อมูลคาร์บอนตามหลักวิชาการ และมีระบบคุ้มครองความปลอดภัยของผู้ใช้งานทุกคน
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DFD5] text-xs font-semibold text-[#344634] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#344634]" />
                <span>รหัสตรวจสอบตัวตน WM-Security Code</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. Trust / Platform Benefits Section */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-16 bg-[#EEEAE1] border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4DFD5] shadow-2xs hover:border-[#344634]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center mb-3 sm:mb-4 font-bold">
                <Repeat className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#252722] mb-1">
                Reuse (นำกลับมาใช้ซ้ำ)
              </h3>
              <p className="text-xs text-[#252722]/75 leading-relaxed font-sans">
                นำสิ่งของกลับมาใช้ใหม่ ขยายวงจรชีวิตทรัพยากรคุณภาพดี
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4DFD5] shadow-2xs hover:border-[#344634]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center mb-3 sm:mb-4 font-bold">
                <RotateCw className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#252722] mb-1">
                Exchange (แลกเปลี่ยน)
              </h3>
              <p className="text-xs text-[#252722]/75 leading-relaxed font-sans">
                แลกเปลี่ยนสิ่งของและวัสดุตรงตามความต้องการโดยไม่ใช้เงินสด
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4DFD5] shadow-2xs hover:border-[#344634]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center mb-3 sm:mb-4 font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#252722] mb-1">
                Donate (ส่งต่อ/บริจาค)
              </h3>
              <p className="text-xs text-[#252722]/75 leading-relaxed font-sans">
                ส่งมอบสิ่งของให้แก่มูลนิธิ โรงเรียน และชุมชนที่ขาดแคลน
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4DFD5] shadow-2xs hover:border-[#344634]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EEEAE1] text-[#344634] flex items-center justify-center mb-3 sm:mb-4 font-bold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#252722] mb-1">
                Reduce Waste (ลดขยะ)
              </h3>
              <p className="text-xs text-[#252722]/75 leading-relaxed font-sans">
                ลดปริมาณขยะสู่หลุมฝังกลบ และลดการปล่อยคาร์บอน (CO₂e)
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. Explore by Category Section ("Find what you need. Give what you don't.") */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#F7F5F0] border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-widest block mb-1">
                Curated Categories
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#252722]">
                Find what you need. <span className="italic font-serif text-[#344634]">Give what you don't.</span>
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('discover')}
              className="text-xs font-semibold text-[#344634] hover:text-[#263426] flex items-center gap-1.5 cursor-pointer pb-1 self-start sm:self-auto"
            >
              <span>สำรวจครบทั้ง 24 หมวดหมู่</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {categoryHighlights.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveTab('discover')}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E4DFD5] hover:border-[#344634] hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#EEEAE1]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-[#344634] px-2.5 py-1 rounded-full shadow-2xs">
                    {cat.count}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#7C8B72] tracking-wider">
                      {cat.nameEn}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#252722] group-hover:text-[#344634] transition-colors mt-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#252722]/65 mt-1.5 line-clamp-1 font-sans">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#E4DFD5]/70 flex items-center justify-between text-xs font-medium text-[#344634]">
                    <span>ดูรายการในหมวดนี้</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. Trending on WasteMatch (Marketplace Listings) */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#EEEAE1] border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-widest block mb-1">
                Live Marketplace
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#252722]">
                Trending on <span className="italic font-serif text-[#344634]">WasteMatch</span>
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('discover')}
              className="text-xs font-semibold text-[#344634] hover:text-[#263426] flex items-center gap-1.5 cursor-pointer pb-1 self-start sm:self-auto"
            >
              <span>ดูสินค้าทั้งหมด ({listings.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {trendingListings.map((item) => {
              const isSaved = savedListingIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E4DFD5] hover:border-[#344634] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div 
                    className="relative cursor-pointer overflow-hidden bg-[#F7F5F0]"
                    onClick={() => setSelectedListing(item)}
                  >
                    <img
                      src={item.images[0] || getCategoryDefaultImage(item.category)}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(item.category);
                      }}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-104"
                    />

                    {/* Bookmark action button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveListing(item.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#252722] hover:text-[#344634] shadow-2xs transition-colors cursor-pointer"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#344634] text-[#344634]' : ''}`} />
                    </button>

                    {/* Transaction type tag */}
                    <div className="absolute bottom-3 left-3 bg-[#252722]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.transactionType === 'free' ? 'ส่งต่อฟรี' : item.transactionType === 'swap' ? 'แลกเปลี่ยน' : item.transactionType === 'donate' ? 'บริจาค' : 'ขาย'}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#252722]/60 mb-1">
                        <span className="font-medium text-[#7C8B72]">{item.conditionLabel}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#7C8B72]" />
                          {item.location.district} · {item.location.distanceKm} กม.
                        </span>
                      </div>

                      <h3 
                        onClick={() => setSelectedListing(item)}
                        className="text-sm font-bold text-[#252722] line-clamp-2 hover:text-[#344634] cursor-pointer transition-colors mt-0.5 font-serif"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E4DFD5]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-base font-serif font-bold text-[#344634] tabular-nums">
                            {item.price > 0 ? `฿${item.price.toLocaleString()}` : 'แจกฟรี'}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-[10px] text-[#252722]/40 line-through">
                              ฿{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Seller mini snippet */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingSeller(item.seller);
                          }}
                          className="flex items-center gap-1.5 cursor-pointer group/seller"
                        >
                          <img
                            src={item.seller.avatar}
                            alt={item.seller.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                            className="w-6 h-6 rounded-full object-cover ring-1 ring-[#E4DFD5]"
                          />
                          <div className="text-right">
                            <span className="text-[10px] font-semibold text-[#252722] group-hover/seller:text-[#344634] block max-w-[70px] truncate">
                              {item.seller.name}
                            </span>
                            <span className="text-[9px] text-[#7C8B72] block">★ {item.seller.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. How WasteMatch Works (Horizontal Flow) */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#F7F5F0] border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-widest block mb-1">
              Seamless Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#252722]">
              ขั้นตอนการทำงานของ <span className="italic font-serif text-[#344634]">WasteMatch</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#252722]/70 mt-2 font-sans">
              กระบวนการจับคู่และส่งมอบสิ่งของที่ออกแบบมาเพื่อความโปร่งใส รวดเร็ว และปลอดภัยสูงสุด
            </p>
          </div>

          {/* 5-Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
            
            {[
              {
                step: '01',
                title: 'Post',
                subtitle: 'ลงประกาศสิ่งของ',
                desc: 'ระบุสิ่งของที่มี หรือสร้างรายการ "ตามหา (Wanted)" พร้อมเงื่อนไข'
              },
              {
                step: '02',
                title: 'Match',
                subtitle: 'จับคู่ตรงความต้องการ',
                desc: 'ระบบคำนวณระยะทาง งบประมาณ และจับคู่ Mutual Match เมื่อสนใจตรงกัน'
              },
              {
                step: '03',
                title: 'Chat',
                subtitle: 'เจรจาอย่างปลอดภัย',
                desc: 'ห้องแชทเปิดขึ้นเฉพาะผู้ที่แมตช์ ยื่นข้อเสนอราคาหรือแลกเปลี่ยนได้ในตัว'
              },
              {
                step: '04',
                title: 'Handover',
                subtitle: 'นัดรับ Safe Zone',
                desc: 'ส่งมอบ ณ จุดปลอดภัย พร้อมรับรหัสยืนยันความปลอดภัย WM-Security Code'
              },
              {
                step: '05',
                title: 'Complete',
                subtitle: 'ยืนยันรหัส & บันทึก CO₂',
                desc: 'ผู้รับกรอกรหัสยืนยัน ปิดดีลสำเร็จทันทีและบันทึกคะแนนลดคาร์บอน'
              },
            ].map((st, idx) => (
              <div 
                key={st.step}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4DFD5] flex flex-col justify-between relative shadow-2xs hover:border-[#344634]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl font-serif font-bold text-[#344634]">
                      {st.step}
                    </span>
                    <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-wider">
                      {st.title}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#252722] mb-1.5 font-sans">
                    {st.subtitle}
                  </h3>
                  <p className="text-xs text-[#252722]/70 leading-relaxed font-sans">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4DFD5]/60 flex items-center gap-1.5 text-[11px] font-medium text-[#344634]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ขั้นตอนที่ {idx + 1}</span>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. Wanted Items Section */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#EEEAE1] border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-widest block mb-1">
                Demand & Needs
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[#252722]">
                Someone is <span className="italic font-serif text-[#344634]">looking for this.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveTab('wanted')}
                className="px-4 py-2 bg-white text-[#252722] text-xs font-semibold rounded-xl border border-[#E4DFD5] hover:border-[#344634] cursor-pointer"
              >
                ดูรายการตามหาทั้งหมด
              </button>
              <button
                onClick={() => {
                  setActiveTab('wanted');
                }}
                className="px-4 py-2 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>สร้างประกาศตามหา</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {featuredWanted.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab('wanted')}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4DFD5] hover:border-[#344634] transition-all shadow-2xs cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-semibold text-[#344634] bg-[#EEEAE1] px-2.5 py-0.5 rounded-full">
                      ตามหา {item.quantity} {item.unit}
                    </span>
                    <span className="text-[11px] text-[#252722]/60">
                      {item.location.district}, {item.location.province}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#252722] line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#252722]/70 line-clamp-2 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E4DFD5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#252722]/50 block font-sans">งบประมาณ</span>
                    <span className="text-sm font-bold text-[#344634] tabular-nums font-serif">
                      {item.budget && item.budget > 0 ? `฿${item.budget.toLocaleString()}` : 'ขอรับบริจาค / แลกเปลี่ยน'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-[#E4DFD5]"
                    />
                    <span className="text-xs font-medium text-[#252722] truncate max-w-[80px]">
                      {item.user.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. Environmental Impact Section (Deep Forest Green #344634) */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-24 bg-[#344634] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#EEEAE1] tracking-widest uppercase bg-white/10 px-3.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Verified Environmental Impact
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif leading-[1.18] text-white">
                ผลกระทบสิ่งแวดล้อมที่วัดผลได้ <span className="italic font-serif text-[#B8AA96]">ตามหลักวิทยาศาสตร์</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#EEEAE1]/80 leading-relaxed font-sans">
                ทุกสิ่งของที่ถูกส่งต่อและหมุนเวียนบน WasteMatch ถูกคำนวณผลกระทบด้านสิ่งแวดล้อมด้วยตัวคูณ Emission Conversion Factor ที่ชัดเจน ปราศจากตัวเลขสุ่ม
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('impact')}
                  className="px-6 py-3 bg-[#EEEAE1] text-[#344634] text-xs font-bold rounded-xl hover:bg-white transition-all cursor-pointer shadow-sm w-full sm:w-auto"
                >
                  ดูรายงานผลกระทบสิ่งแวดล้อมฉบับเต็ม
                </button>
              </div>
            </div>

            {/* Impact Metric Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#EEEAE1]/70 font-semibold font-sans">
                  สิ่งของหมุนเวียน (Items Reused)
                </div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-white tabular-nums">
                  14,820+ <span className="text-xs font-sans font-normal text-[#EEEAE1]/70">ชิ้น</span>
                </div>
                <p className="text-[11px] text-[#EEEAE1]/75 pt-1">สิ่งของที่ถูกนำกลับมาใช้งานซ้ำในระบบเศรษฐกิจ</p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#EEEAE1]/70 font-semibold font-sans">
                  สิ่งของบริจาค (Items Donated)
                </div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-white tabular-nums">
                  3,450+ <span className="text-xs font-sans font-normal text-[#EEEAE1]/70">รายการ</span>
                </div>
                <p className="text-[11px] text-[#EEEAE1]/75 pt-1">ส่งต่อให้แก่มูลนิธิและโรงเรียนที่ขาดแคลน</p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#EEEAE1]/70 font-semibold font-sans">
                  ดีลสำเร็จ (Completed Deals)
                </div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-white tabular-nums">
                  4,120+ <span className="text-xs font-sans font-normal text-[#EEEAE1]/70">ดีล</span>
                </div>
                <p className="text-[11px] text-[#EEEAE1]/75 pt-1">ธุรกรรมส่งมอบสำเร็จผ่านรหัสความปลอดภัย</p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#EEEAE1]/70 font-semibold font-sans">
                  ลดคาร์บอน (CO₂e Avoided)
                </div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-emerald-300 tabular-nums">
                  42.6 <span className="text-xs font-sans font-normal text-white/70">ตัน CO₂e</span>
                </div>
                <p className="text-[11px] text-[#EEEAE1]/75 pt-1">ลดการปล่อยก๊าซเรือนกระจกเทียบเท่าปลูกต้นไม้ 4,260 ต้น</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. Final CTA Section */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#EEEAE1] text-center border-b border-[#E4DFD5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold text-[#7C8B72] uppercase tracking-widest block mb-2 font-sans">
            Circular Thailand Movement
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#252722] leading-tight">
            What you no longer need could be <span className="italic font-serif text-[#344634]">useful to someone else.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#252722]/75 mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            เริ่มต้นเปลี่ยนสิ่งของเหลือใช้ให้เป็นประโยชน์ ค้นหาของที่คุณต้องการ หรือส่งต่อสิ่งที่คุณมีได้ฟรีวันนี้
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('discover')}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-[#344634] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#263426] transition-all cursor-pointer shadow-sm"
            >
              เริ่มต้นจับคู่ค้นหา (Start Matching)
            </button>
            <button
              onClick={() => setIsCreateListingOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-[#252722] text-xs sm:text-sm font-semibold rounded-xl border border-[#E4DFD5] hover:border-[#344634] hover:text-[#344634] transition-all cursor-pointer"
            >
              ลงประกาศส่งต่อสิ่งของ
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. Multi-Column Editorial Footer */}
      {/* ========================================================================= */}
      <footer className="bg-white py-12 sm:py-14 text-[#252722]/75 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xl font-serif font-bold text-[#344634]">
              WasteMatch
            </span>
            <p className="text-xs leading-relaxed text-[#252722]/70 max-w-sm font-sans">
              แพลตฟอร์มตลาดหมุนเวียนสิ่งของและวัสดุเหลือใช้แห่งประเทศไทย เพื่อเศรษฐกิจหมุนเวียน (Circular Economy) และสังคมคาร์บอนต่ำ
            </p>
            <div className="pt-2 text-[11px] text-[#7C8B72] font-sans">
              มาตรฐานลดขยะหลุมฝังกลบและคำนวณคาร์บอนฟุตพริ้นท์จริง
            </div>
          </div>

          {/* Marketplace Col */}
          <div>
            <h4 className="font-serif font-bold text-[#252722] mb-3 text-sm">ตลาดสินค้า</h4>
            <ul className="space-y-2 font-sans">
              <li><button onClick={() => setActiveTab('discover')} className="hover:text-[#344634] cursor-pointer">ค้นหาสินค้าและวัสดุ</button></li>
              <li><button onClick={() => setActiveTab('wanted')} className="hover:text-[#344634] cursor-pointer">รายการตามหา (Wanted)</button></li>
              <li><button onClick={() => setActiveTab('discover')} className="hover:text-[#344634] cursor-pointer">หมวดหมู่ทั้งหมด 24 ประเภท</button></li>
              <li><button onClick={() => setIsCreateListingOpen(true)} className="hover:text-[#344634] cursor-pointer">ลงประกาศส่งต่อ</button></li>
            </ul>
          </div>

          {/* Community Col */}
          <div>
            <h4 className="font-serif font-bold text-[#252722] mb-3 text-sm">ชุมชน & ความยั่งยืน</h4>
            <ul className="space-y-2 font-sans">
              <li><button onClick={() => setActiveTab('landing')} className="hover:text-[#344634] cursor-pointer">แนวคิดและขั้นตอน</button></li>
              <li><button onClick={() => setActiveTab('impact')} className="hover:text-[#344634] cursor-pointer">รายงานผลกระทบสิ่งแวดล้อม</button></li>
              <li><button onClick={() => setActiveTab('subscription')} className="hover:text-[#344634] cursor-pointer">แผนสมาชิกบุคคลและองค์กร</button></li>
              <li><button onClick={() => setActiveTab('profile')} className="hover:text-[#344634] cursor-pointer">My Dashboard</button></li>
            </ul>
          </div>

          {/* Support & Legal Col */}
          <div>
            <h4 className="font-serif font-bold text-[#252722] mb-3 text-sm">ความปลอดภัย & นโยบาย</h4>
            <ul className="space-y-2 font-sans">
              <li><span className="text-[#252722]/70">คู่มือการส่งมอบ Safe Handover</span></li>
              <li><span className="text-[#252722]/70">นโยบายความเป็นส่วนตัว</span></li>
              <li><span className="text-[#252722]/70">ข้อกำหนดการใช้งาน</span></li>
              <li><span className="text-[#252722]/70">แนวทางปฏิบัติชุมชน</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-[#E4DFD5] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#252722]/50 font-sans gap-2 text-center sm:text-left">
          <div>© 2026 WasteMatch Thailand Co., Ltd. สงวนลิขสิทธิ์ทุกประการ</div>
          <div className="flex gap-3 justify-center">
            <span>Circular Economy Platform</span>
            <span>·</span>
            <span>Zero Landfill Initiative</span>
            <span>·</span>
            <span>Bangkok, Thailand</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
