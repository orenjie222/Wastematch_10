import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  ListingCategory, 
  TransactionType, 
  ConditionGrade,
  DeliveryMethod,
  CATEGORY_DEFINITIONS
} from '../../types/marketplace';
import { THAI_PROVINCES } from '../../data/thaiProvinces';
import { calculateCommission } from '../../utils/commission';
import { UnitSelector } from '../common/UnitSelector';
import { 
  CHAIR_IMAGE, 
  WOOD_IMAGE, 
  ESPRESSO_IMAGE, 
  BIOMASS_IMAGE,
  PLASTIC_IMAGE,
  METAL_IMAGE,
  BOXES_IMAGE,
  TEXTILE_IMAGE,
  BOOKS_IMAGE,
  BICYCLE_IMAGE,
  KITCHEN_IMAGE,
  CLOTHES_IMAGE,
  GLASS_BOTTLES_IMAGE,
  ORGANIC_COMPOST_IMAGE,
  PALLET_WOOD_IMAGE,
  ELECTRONICS_IMAGE,
  GARDEN_IMAGE,
  HERO_IMAGE,
  getCategoryDefaultImage
} from '../../data/seedData';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Eye, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2,
  Bookmark,
  Receipt,
  HeartHandshake,
  Percent,
  Coins,
  Sparkles,
  Navigation
} from 'lucide-react';

export const CreateListingModal: React.FC = () => {
  const { 
    isCreateListingOpen, 
    setIsCreateListingOpen, 
    createListing, 
    currentUser,
    setSelectedListing,
    setActiveTab,
    currentSubscription
  } = useMarketplace();

  const [step, setStep] = useState<number>(1);

  // Form Fields
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');
  const [selectedImage, setSelectedImage] = useState<string>(CHAIR_IMAGE);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ListingCategory>('furniture_home');
  
  // Physical Condition with Percentage
  const [conditionGrade, setConditionGrade] = useState<ConditionGrade>('good');
  const [conditionPercentage, setConditionPercentage] = useState<number>(85);
  const [conditionLabel, setConditionLabel] = useState('สภาพ 85% ใช้งานได้ดีมาก');

  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState('ชิ้น');
  const [price, setPrice] = useState<number>(1200);
  const [originalPrice, setOriginalPrice] = useState<number>(3500);
  const [district, setDistrict] = useState(currentUser.location.district);
  const [province, setProvince] = useState(currentUser.location.province || 'กรุงเทพมหานคร');
  const [handoverRadiusKm, setHandoverRadiusKm] = useState<number>(15);
  const [coverageArea, setCoverageArea] = useState<string>('');
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryMethod[]>(['pickup', 'local_courier']);

  if (!isCreateListingOpen) return null;

  const totalSteps = 6;

  // Live Commission Calculation
  const commissionCalc = calculateCommission(price, transactionType, currentSubscription);

  const toggleDelivery = (opt: DeliveryMethod) => {
    setDeliveryOptions(prev => 
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleConditionSelect = (grade: ConditionGrade, pct: number, label: string) => {
    setConditionGrade(grade);
    setConditionPercentage(pct);
    setConditionLabel(label);
  };

  const handlePublish = (isDraft = false) => {
    const finalPrice = transactionType === 'free' || transactionType === 'donate' ? 0 : price;
    const created = createListing({
      title: title.trim() || 'รายการสิ่งของหมุนเวียน WasteMatch',
      description,
      category,
      transactionType,
      conditionGrade,
      conditionPercentage,
      conditionLabel,
      quantity,
      unit,
      price: finalPrice,
      originalPrice: originalPrice > 0 ? originalPrice : undefined,
      location: {
        district: district || 'เมือง',
        province: province || 'กรุงเทพมหานคร',
        distanceKm: 2.0,
        radiusKm: handoverRadiusKm,
        coverageArea: coverageArea.trim() || (handoverRadiusKm === 0 ? 'ครอบคลุมจัดส่งทั่วประเทศไทย' : `รัศมีส่งมอบภายใน ${handoverRadiusKm} กม.`)
      },
      images: [selectedImage, HERO_IMAGE],
      deliveryOptions: deliveryOptions.length > 0 ? deliveryOptions : ['pickup'],
      status: isDraft ? 'suspended' : 'active'
    });

    setIsCreateListingOpen(false);
    setSelectedListing(created);
    setActiveTab('listings');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-semibold tracking-wide font-display">
              ลงประกาศสิ่งของและวัสดุหมุนเวียน (Create Listing)
            </h3>
            <p className="text-[11px] text-[#DCE9E2]">
              ขั้นตอนที่ {step} จาก {totalSteps}
            </p>
          </div>
          <button 
            onClick={() => setIsCreateListingOpen(false)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#DCE9E2] h-1 shrink-0">
          <div 
            className="bg-emerald-500 h-1 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#1C211F]">
          
          {/* STEP 1: Listing Type (Exchange, Sell, Free, Donate) */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">เลือกประเภทรายการ (Listing Type)</h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  เลือกจุดประสงค์ในการส่งต่อสิ่งของ เพื่อให้ระบบจับคู่ได้อย่างแม่นยำ
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'swap',
                    title: 'แลกเปลี่ยน (Exchange)',
                    desc: 'แลกกับสิ่งของ หรือวัสดุที่คุณกำลังต้องการตามเงื่อนไขตกลงกัน',
                    badge: 'Mutual Match'
                  },
                  {
                    id: 'sell',
                    title: 'ขาย (Sell)',
                    desc: 'จำหน่ายในราคาหมุนเวียนประหยัด คิดค่าคอมมิชชั่น 15% ลดลงต่ำสุด 10%',
                    badge: 'คอมมิชชั่น 15%-10%'
                  },
                  {
                    id: 'free',
                    title: 'ให้ฟรี (Free)',
                    desc: 'ส่งต่อให้ผู้ที่ต้องการใช้งานโดยไม่มีค่าใช้จ่าย ฟรีค่าธรรมเนียม 0%',
                    badge: 'ฟรี 0% ค่าธรรมเนียม'
                  },
                  {
                    id: 'donate',
                    title: 'บริจาคเพื่อสังคม (Donate)',
                    desc: 'สำหรับบริจาคแก่องค์การกุศลหรือมูลนิธิโดยเฉพาะ ห้ามนำไปจำหน่ายต่อ',
                    badge: 'เฉพาะมูลนิธิ/กุศล (0%)'
                  }
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setTransactionType(opt.id as TransactionType)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      transactionType === opt.id 
                        ? 'border-[#164C3A] bg-[#F7F5EF] shadow-2xs' 
                        : 'border-[#1C211F]/10 hover:border-[#164C3A]/50 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#1C211F]">{opt.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#DCE9E2] text-[#164C3A]">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#1C211F]/70 leading-relaxed mt-1">
                        {opt.desc}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        transactionType === opt.id ? 'border-[#164C3A] bg-[#164C3A] text-white' : 'border-[#1C211F]/20'
                      }`}>
                        {transactionType === opt.id && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {transactionType === 'donate' && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-rose-700" />
                    <span>เงื่อนไขเฉพาะการบริจาค (Donation Rules)</span>
                  </div>
                  <p className="text-rose-800 text-[11px] leading-relaxed">
                    สิ่งของที่เลือกประเภท "บริจาค" จะเปิดให้เฉพาะมูลนิธิ องค์กรไม่แสวงหากำไร (NGO) หรือสถานศึกษาเป็นผู้รับเท่านั้น และของบริจาคผู้ส่งจะมีจุดประสงค์เพื่อสาธารณกุศลเท่านั้น ห้ามนำไปจำหน่ายต่อ
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Category & Title */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">หมวดหมู่และชื่อสิ่งของ</h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  เลือกหมวดหมู่ที่ครอบคลุมทั้งสินค้ามือสองและเศษวัสดุรีไซเคิล
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1C211F] block mb-1">
                  หมวดหมู่สินค้า (24+ หมวดหมู่วงจรหมุนเวียน) *
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    const newCat = e.target.value as ListingCategory;
                    setCategory(newCat);
                    setSelectedImage(getCategoryDefaultImage(newCat));
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-xs sm:text-sm text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                >
                  {CATEGORY_DEFINITIONS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nameTh} ({c.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1C211F] block mb-1">
                  ชื่อสิ่งของ/ประกาศ *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="เช่น เก้าอี้ทำงานสรีรศาสตร์, เศษผ้ายีนส์ 40 กก., พาเลทไม้สน..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-xs sm:text-sm text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1C211F] block mb-1">
                  คำอธิบายสภาพและประโยชน์การนำไปใช้
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ระบุขนาด สเปก วัตถุดิบ จุดตำหนิ (ถ้ามี) หรือประโยชน์ที่นำไปใช้ต่อได้..."
                  className="w-full px-3.5 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Authentic Real Photos */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">รูปภาพสินค้าจริง (Authentic Photos)</h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  WasteMatch บังคับใช้รูปภาพสินค้าจริงเท่านั้น ห้ามใช้ภาพกราฟิกหรือภาพโมเดล 3D เพื่อความโปร่งใส
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { img: getCategoryDefaultImage(category), label: 'รูปตามหมวดหมู่ (' + category + ')' },
                  { img: CHAIR_IMAGE, label: 'เก้าอี้สำนักงาน' },
                  { img: WOOD_IMAGE, label: 'ไม้สัก/ไม้แปรรูป' },
                  { img: KITCHEN_IMAGE, label: 'เครื่องครัวสเตนเลส' },
                  { img: BOOKS_IMAGE, label: 'หนังสือ/สื่อการเรียน' },
                  { img: BICYCLE_IMAGE, label: 'จักรยาน/กีฬา' },
                  { img: CLOTHES_IMAGE, label: 'เสื้อผ้า/แฟชั่น' },
                  { img: GLASS_BOTTLES_IMAGE, label: 'ขวดแก้ว/บรรจุภัณฑ์' },
                  { img: ORGANIC_COMPOST_IMAGE, label: 'ปุ๋ยอินทรีย์/กากกาแฟ' },
                  { img: PALLET_WOOD_IMAGE, label: 'พาเลทไม้' },
                  { img: ELECTRONICS_IMAGE, label: 'อุปกรณ์อิเล็กทรอนิกส์' },
                  { img: GARDEN_IMAGE, label: 'ต้นไม้/กระถางสวน' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(item.img)}
                    className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      selectedImage === item.img ? 'border-[#164C3A] ring-2 ring-[#164C3A]/20' : 'border-[#1C211F]/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={item.img} 
                      alt={item.label} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(category);
                      }}
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white bg-black/70 px-1 py-0.5 rounded truncate">
                      {item.label}
                    </span>
                    {selectedImage === item.img && (
                      <div className="absolute top-1.5 right-1.5 bg-[#164C3A] text-white rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Direct Image URL input */}
              <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10 space-y-2">
                <label className="text-xs font-semibold text-[#1C211F] block">
                  หรือระบุลิงก์รูปภาพโดยตรง (Direct Image URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="วางลิงก์รูปภาพ https://images.unsplash.com/..."
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#1C211F]/15 rounded-lg focus:outline-none focus:border-[#164C3A]"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(getCategoryDefaultImage(category))}
                    className="px-3 py-1.5 bg-white border border-[#1C211F]/20 text-[11px] font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    รีเซ็ตเป็นรูปหมวดหมู่
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Physical Condition with Percentage */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">ระดับสภาพสินค้าคงสภาพ (Condition with %)</h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  ระบุสภาพจริงพร้อมเปอร์เซ็นต์ประเมิน เพื่อให้ผู้รับหรือผู้ซื้อตัดสินใจได้ง่าย
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  {
                    grade: 'like_new' as ConditionGrade,
                    pct: 95,
                    title: 'สภาพดีเยี่ยม 95%+ (Like New)',
                    desc: 'ใช้งานน้อยมาก ไม่มีรอยตำหนิหรือริ้วรอย สมบูรณ์เหมือนใหม่'
                  },
                  {
                    grade: 'good' as ConditionGrade,
                    pct: 85,
                    title: 'สภาพดีมาก 85% (Good Condition)',
                    desc: 'ใช้งานได้สมบูรณ์ตามปกติ อาจมีรอยขีดข่วนเล็กน้อย ไม่ส่งผลต่อการใช้งาน'
                  },
                  {
                    grade: 'fair' as ConditionGrade,
                    pct: 70,
                    title: 'สภาพปานกลาง 70% (Fair Condition)',
                    desc: 'ผ่านการใช้งานพอสมควร มีร่องรอยการใช้งานชัดเจน แต่ยังใช้งานได้ดี'
                  },
                  {
                    grade: 'salvage' as ConditionGrade,
                    pct: 50,
                    title: 'สภาพต้องซ่อมแซม 50% (Needs Repair / Salvage)',
                    desc: 'มีจุดชำรุดบางส่วน เหมาะสำหรับช่างหรือผู้ที่ต้องการแยกอะไหล่'
                  },
                  {
                    grade: 'raw_material' as ConditionGrade,
                    pct: 100,
                    title: 'วัสดุหมุนเวียน/รีไซเคิล 100% (Raw / Circular Material)',
                    desc: 'เศษวัสดุ เศษผ้า ไม้เก่า เศษเหล็ก ชีวมวล หรือพลาสติกสำหรับนำไปแปรรูปใหม่'
                  }
                ].map(item => (
                  <div
                    key={item.pct}
                    onClick={() => handleConditionSelect(item.grade, item.pct, item.title)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      conditionPercentage === item.pct
                        ? 'border-[#164C3A] bg-[#F7F5EF]'
                        : 'border-[#1C211F]/10 hover:border-[#164C3A]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1C211F]">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 bg-[#DCE9E2] text-[#164C3A] rounded">
                          {item.pct}%
                        </span>
                      </div>
                      <p className="text-[11px] text-[#1C211F]/70 mt-0.5">{item.desc}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      conditionPercentage === item.pct ? 'border-[#164C3A] bg-[#164C3A] text-white' : 'border-[#1C211F]/20'
                    }`}>
                      {conditionPercentage === item.pct && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity and Unit Selection with rich UnitSelector */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#1C211F] block mb-1">
                      จำนวนสิ่งของ / ปริมาณวัสดุ *
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-sm font-semibold text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1C211F] block mb-1">
                      หน่วยนับ (Unit of Measure) *
                    </label>
                    <UnitSelector
                      value={unit}
                      onChange={(selectedUnit) => setUnit(selectedUnit)}
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10 flex items-center justify-between text-xs">
                  <span className="text-[#1C211F]/70">ปริมาณที่ระบุทั้งหมด:</span>
                  <span className="font-bold text-[#164C3A] font-display text-sm">
                    {quantity.toLocaleString()} {unit}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Province Selection (All 77 Provinces) & Location with Distance Radius */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">สถานที่ตั้ง ระยะทาง และรัศมีพื้นที่บริการ</h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  กำหนดพิกัดจังหวัดและรัศมีระยะทางที่สะดวกส่งมอบ/จัดส่ง เพื่อการแมตช์ที่แม่นยำในพื้นที่ของคุณ
                </p>
              </div>

              {/* Province */}
              <div>
                <label className="text-xs font-bold text-[#1C211F] block mb-1">
                  จังหวัด (เลือกได้ครบทั้ง 77 จังหวัดทั่วประเทศไทย) *
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-xs sm:text-sm text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                >
                  {THAI_PROVINCES.map(p => (
                    <option key={p.nameTh} value={p.nameTh}>
                      {p.nameTh} ({p.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* District & Landmark */}
              <div>
                <label className="text-xs font-bold text-[#1C211F] block mb-1">
                  อำเภอ/เขต และสถานที่นัดรับ *
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="เช่น คลองเตย, อ.แม่ริม, อ.เมืองระยอง, ซอยสุขุมวิท 26..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-xs sm:text-sm text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                />
              </div>

              {/* NEW: Distance Radius & Service Area Input */}
              <div className="p-4 bg-[#F7F5EF] border border-[#1C211F]/15 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#164C3A]" />
                    <label className="text-xs font-bold text-[#1C211F]">
                      รัศมีระยะทางที่สะดวกส่งมอบ / บริการจัดส่ง *
                    </label>
                  </div>
                  <span className="text-xs font-bold text-[#164C3A] bg-white px-2.5 py-1 rounded-lg border border-[#1C211F]/10">
                    {handoverRadiusKm === 0 ? 'ทั่วประเทศ (All Thailand)' : `ภายใน ${handoverRadiusKm} กม.`}
                  </span>
                </div>

                {/* Radius Presets */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[
                    { km: 5, label: '5 กม.', desc: 'ละแวกใกล้เคียง' },
                    { km: 15, label: '15 กม.', desc: 'ในอำเภอ/เมือง' },
                    { km: 30, label: '30 กม.', desc: 'ทั้งจังหวัด' },
                    { km: 50, label: '50 กม.', desc: 'ข้ามอำเภอ' },
                    { km: 100, label: '100 กม.', desc: 'ระดับภูมิภาค' },
                    { km: 0, label: 'ทั่วไทย', desc: 'ไม่จำกัดระยะ' },
                  ].map(item => (
                    <button
                      key={item.km}
                      type="button"
                      onClick={() => setHandoverRadiusKm(item.km)}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        handoverRadiusKm === item.km
                          ? 'border-[#164C3A] bg-[#164C3A] text-white font-bold shadow-xs'
                          : 'border-[#1C211F]/15 bg-white text-[#1C211F]/80 hover:border-[#164C3A]/50'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className={`text-[9px] mt-0.5 ${handoverRadiusKm === item.km ? 'text-white/80' : 'text-[#1C211F]/50'}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Radius Slider */}
                <div className="pt-1">
                  <div className="flex justify-between text-[11px] text-[#1C211F]/60 mb-1">
                    <span>ปรับแต่งรัศมีระยะทางละเอียด:</span>
                    <span>{handoverRadiusKm > 0 ? `${handoverRadiusKm} กิโลเมตร` : 'จัดส่งทั่วประเทศ'}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={handoverRadiusKm}
                    onChange={(e) => setHandoverRadiusKm(parseInt(e.target.value) || 0)}
                    className="w-full accent-[#164C3A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#1C211F]/40 mt-0.5">
                    <span>0 กม. (ทั่วไทย)</span>
                    <span>30 กม. (ตัวเมือง)</span>
                    <span>75 กม.</span>
                    <span>150 กม.</span>
                  </div>
                </div>

                {/* Area Description & Notes */}
                <div>
                  <label className="text-[11px] font-semibold text-[#1C211F]/80 block mb-1">
                    ขอบเขตพื้นที่ / เงื่อนไขระยะทางส่งมอบ (Optional)
                  </label>
                  <input
                    type="text"
                    value={coverageArea}
                    onChange={(e) => setCoverageArea(e.target.value)}
                    placeholder="เช่น จัดส่งฟรีในรัศมี 15 กม. หรือ สะดวกนัดรับแนวรถไฟฟ้า BTS..."
                    className="w-full px-3 py-2 bg-white border border-[#1C211F]/15 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                  />
                </div>
              </div>

              {/* Delivery Methods */}
              <div>
                <label className="text-xs font-bold text-[#1C211F] block mb-1.5">
                  ตัวเลือกการส่งมอบที่สะดวก *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'pickup' as DeliveryMethod, label: 'นัดรับด้วยตนเอง' },
                    { id: 'local_courier' as DeliveryMethod, label: 'แมสเซนเจอร์ในเมือง' },
                    { id: 'freight' as DeliveryMethod, label: 'ขนส่งพัสดุ/รถบรรทุก' },
                  ].map(del => (
                    <div
                      key={del.id}
                      onClick={() => toggleDelivery(del.id)}
                      className={`p-3 rounded-xl border text-xs font-medium cursor-pointer flex items-center justify-between ${
                        deliveryOptions.includes(del.id)
                          ? 'border-[#164C3A] bg-[#DCE9E2] text-[#164C3A] font-bold'
                          : 'border-[#1C211F]/15 bg-white text-[#1C211F]/70'
                      }`}
                    >
                      <span>{del.label}</span>
                      {deliveryOptions.includes(del.id) && <Check className="w-3.5 h-3.5 text-[#164C3A]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Pricing & Transparent Platform Commission */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#1C211F]">ราคาและค่าธรรมเนียมแพลตฟอร์ม</h4>
                <p className="text-xs text-[#1C211F]/60 mt-1">
                  ระบบคำนวณค่าคอมมิชชั่นตามมูลค่าจริงอย่างโปร่งใส
                </p>
              </div>

              {transactionType === 'sell' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#1C211F] block mb-1">
                        ราคาขายที่ต้องการตั้ง (บาท) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-base font-bold text-[#164C3A] focus:outline-none focus:border-[#164C3A] font-display"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#1C211F] block mb-1">
                        ราคามือหนึ่งโดยประมาณ (ไม่บังคับ)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#1C211F]/20 rounded-xl text-xs sm:text-sm text-[#1C211F]/70 focus:outline-none focus:border-[#164C3A]"
                      />
                    </div>
                  </div>

                  {/* Commission Breakdown Box */}
                  <div className="p-4 bg-[#F7F5EF] border border-[#1C211F]/15 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1C211F] flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-[#164C3A]" />
                        <span>การคำนวณค่าคอมมิชชั่นแบบขั้นบันได (Tiered Commission)</span>
                      </span>
                      <span className="font-bold text-emerald-800 bg-[#DCE9E2] px-2 py-0.5 rounded">
                        {commissionCalc.effectiveRate}%
                      </span>
                    </div>

                    <p className="text-[11px] text-[#1C211F]/70">
                      {commissionCalc.tierDiscountReason}
                    </p>

                    <div className="pt-2 border-t border-[#1C211F]/10 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-[#1C211F]/50 block">ค่าธรรมเนียมที่ระบบหัก ({commissionCalc.effectiveRate}%)</span>
                        <span className="text-sm font-bold text-rose-700 font-display">
                          -฿{commissionCalc.commissionFee.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#1C211F]/50 block">ยอดสุทธิที่โอนให้คุณ (Net Payout)</span>
                        <span className="text-base font-bold text-[#164C3A] font-display">
                          ฿{commissionCalc.sellerNetPayout.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <Coins className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h5 className="text-sm font-bold text-emerald-900">
                    {transactionType === 'donate' ? 'บริจาคเพื่อสังคม' : transactionType === 'free' ? 'ส่งต่อให้ฟรี' : 'แลกเปลี่ยนสิ่งของ'}
                  </h5>
                  <p className="text-xs text-emerald-800">
                    รายการนี้ไม่มีการเก็บค่าธรรมเนียมหรือค่าคอมมิชชั่นแพลตฟอร์มใดๆ ทั้งสิ้น (0%) เพื่อสนับสนุนเศรษฐกิจหมุนเวียนและการแบ่งปัน
                  </p>
                </div>
              )}

              {/* Ready to Publish Summary */}
              <div className="p-4 bg-white border border-[#1C211F]/10 rounded-xl space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#1C211F]/50 font-bold block">
                  สรุปรายละเอียดก่อนลงประกาศ
                </span>
                <div className="text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#1C211F]/70">ชื่อสิ่งของ:</span>
                    <span className="font-semibold text-right">{title || 'รายการสิ่งของ'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C211F]/70">ปริมาณและหน่วย:</span>
                    <span className="font-bold text-[#164C3A]">{quantity.toLocaleString()} {unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C211F]/70">สภาพสินค้า:</span>
                    <span className="font-semibold">{conditionLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1C211F]/70">พื้นที่และรัศมีบริการ:</span>
                    <span className="font-semibold text-right">
                      {province} ({district}) · {handoverRadiusKm === 0 ? 'ทั่วประเทศ' : `รัศมี ${handoverRadiusKm} กม.`}
                    </span>
                  </div>
                  {coverageArea && (
                    <div className="flex justify-between text-[11px] text-[#1C211F]/60">
                      <span>เงื่อนไขพื้นที่:</span>
                      <span className="italic">{coverageArea}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F7F5EF] border-t border-[#1C211F]/10 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-[#1C211F]/70 hover:text-[#1C211F] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step === totalSteps ? (
              <>
                <button
                  onClick={() => handlePublish(true)}
                  className="px-4 py-2 text-xs font-semibold text-[#1C211F]/80 hover:bg-[#1C211F]/5 rounded-lg transition-colors cursor-pointer"
                >
                  บันทึกฉบับร่าง
                </button>
                <button
                  onClick={() => handlePublish(false)}
                  className="px-6 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>เผยแพร่ประกาศทันที</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>ถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
