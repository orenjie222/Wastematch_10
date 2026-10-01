import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { WantedItem, ListingCategory, CATEGORY_DEFINITIONS } from '../../types/marketplace';
import { THAI_PROVINCES } from '../../data/thaiProvinces';
import { UnitSelector } from '../common/UnitSelector';
import { getCategoryDefaultImage } from '../../data/seedData';
import { 
  Search, 
  Plus, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  X, 
  Coins,
  Navigation,
  Compass,
  ImageIcon
} from 'lucide-react';

export const WantedView: React.FC = () => {
  const { 
    wantedItems, 
    createWantedItem, 
    setActiveTab, 
    currentUser 
  } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [filterDistanceKm, setFilterDistanceKm] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Wanted Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ListingCategory>('furniture_home');
  const [newQuantity, setNewQuantity] = useState(1);
  const [newUnit, setNewUnit] = useState('ชิ้น');
  const [newBudget, setNewBudget] = useState<number>(0);
  const [newDistrict, setNewDistrict] = useState(currentUser.location.district);
  const [newProvince, setNewProvince] = useState(currentUser.location.province || 'กรุงเทพมหานคร');
  const [newMaxDistanceKm, setNewMaxDistanceKm] = useState<number>(30);
  const [newCoverageArea, setNewCoverageArea] = useState<string>('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const filteredItems = wantedItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedProvince !== 'all' && item.location.province !== selectedProvince) return false;
    if (filterDistanceKm > 0 && item.location.maxDistanceKm && item.location.maxDistanceKm > filterDistanceKm) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchDist = item.location.district.toLowerCase().includes(q);
      const matchProv = item.location.province.toLowerCase().includes(q);
      const matchUnit = item.unit.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDist && !matchProv && !matchUnit) return false;
    }
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createWantedItem({
      title: newTitle,
      category: newCategory,
      quantity: Number(newQuantity),
      unit: newUnit,
      budget: Number(newBudget),
      images: newImageUrl.trim() ? [newImageUrl.trim()] : [getCategoryDefaultImage(newCategory)],
      location: {
        district: newDistrict || 'เมือง',
        province: newProvince,
        maxDistanceKm: newMaxDistanceKm,
        coverageArea: newCoverageArea.trim() || (newMaxDistanceKm === 0 ? 'ยินดีรับของจากทั่วประเทศ' : `สะดวกรับของภายในรัศมี ${newMaxDistanceKm} กม.`)
      },
      description: newDescription
    });

    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewBudget(0);
    setNewCoverageArea('');
    setNewImageUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C211F]/10 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C211F] font-display flex items-center gap-2">
            <span>กระดานประกาศตามหา (Wanted Items)</span>
            <span className="text-xs font-normal text-[#164C3A] bg-[#DCE9E2] px-2 py-0.5 rounded font-sans">
              {wantedItems.length} รายการ
            </span>
          </h1>
          <p className="text-xs text-[#1C211F]/60 mt-0.5">
            ลงประกาศสิ่งของที่คุณกำลังต้องการ เพื่อให้ผู้ที่มีของแมตช์ส่งต่อให้คุณโดยตรงทั่วประเทศไทย
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างประกาศตามหา</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="ค้นหาประกาศตามหา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2 bg-white text-xs text-[#1C211F] border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Distance Filter */}
          <div className="w-full sm:w-48">
            <select
              value={filterDistanceKm}
              onChange={(e) => setFilterDistanceKm(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white text-xs text-[#1C211F] border border-[#1C211F]/15 rounded-xl focus:outline-none focus:border-[#164C3A]"
            >
              <option value="0">ทุกระยะทาง (ทั่วไทย)</option>
              <option value="5">รัศมีรับ ≤ 5 กม.</option>
              <option value="15">รัศมีรับ ≤ 15 กม.</option>
              <option value="30">รัศมีรับ ≤ 30 กม.</option>
              <option value="50">รัศมีรับ ≤ 50 กม.</option>
              <option value="100">รัศมีรับ ≤ 100 กม.</option>
            </select>
          </div>

          {/* Province Filter */}
          <div className="w-full sm:w-56">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2 bg-white text-xs text-[#1C211F] border border-[#1C211F]/15 rounded-xl focus:outline-none focus:border-[#164C3A]"
            >
              <option value="all">ทุกจังหวัดทั่วไทย</option>
              {THAI_PROVINCES.map(p => (
                <option key={p.nameTh} value={p.nameTh}>
                  {p.nameTh}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Wanted Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const categoryMeta = CATEGORY_DEFINITIONS.find(c => c.id === item.category);
            const categoryName = categoryMeta?.nameTh || item.category;
            const itemImage = (item.images && item.images[0]) || getCategoryDefaultImage(item.category);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#1C211F]/10 overflow-hidden hover:border-[#164C3A]/40 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header Container */}
                  <div className="relative aspect-16/10 bg-[#F7F5EF] overflow-hidden">
                    <img
                      src={itemImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(item.category);
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Top Left Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded shadow-xs bg-[#164C3A] text-white uppercase tracking-wider">
                        ตามหา (Wanted)
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/95 text-[#1C211F] shadow-xs backdrop-blur-xs">
                        {categoryName}
                      </span>
                    </div>

                    {/* Top Right Budget Tag */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/95 text-[#164C3A] shadow-xs backdrop-blur-xs">
                        {item.budget > 0 ? `งบ ฿${item.budget.toLocaleString()}` : 'ขอรับฟรี/แลกเปลี่ยน'}
                      </span>
                    </div>

                    {/* Bottom overlay with location */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-medium text-white px-2.5 py-1 rounded-md bg-[#1C211F]/75 backdrop-blur-xs">
                      <span className="flex items-center gap-1 truncate max-w-[65%]">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.location.province} ({item.location.district})</span>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-emerald-300 shrink-0">
                        <Navigation className="w-3 h-3" />
                        <span>{item.location.maxDistanceKm ? `≤ ${item.location.maxDistanceKm} กม.` : 'ทั่วไทย'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    {/* User and expiration info */}
                    <div className="flex items-center justify-between text-xs text-[#1C211F]/60">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={item.user.avatar}
                          alt={item.user.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                          }}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-[#1C211F]/10"
                        />
                        <span className="font-medium text-[#1C211F] truncate max-w-[120px]">{item.user.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-[#1C211F]/40" />
                        <span>หมดอายุ {item.expirationDate}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#1C211F] group-hover:text-[#164C3A] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#1C211F]/70 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Specs Box */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#F7F5EF] rounded-xl text-xs">
                      <div>
                        <span className="text-[#1C211F]/50 block text-[10px]">จำนวนที่ต้องการ</span>
                        <span className="font-semibold text-[#1C211F]">
                          {item.quantity.toLocaleString()} {item.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#1C211F]/50 block text-[10px]">พื้นที่ครอบคลุม</span>
                        <span className="font-semibold text-[#164C3A] truncate block text-[11px]" title={item.location.coverageArea || 'รับของได้ทั่วไป'}>
                          {item.location.coverageArea || 'รับของได้ทั่วไป'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-[#1C211F]/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#164C3A] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>มี {item.matchingListingsCount} รายการตรงกัน</span>
                    </div>

                    <button
                      onClick={() => setActiveTab('discover')}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#164C3A] rounded-lg hover:bg-[#123e2f] transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>ดู Matches</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 bg-white rounded-2xl border border-[#1C211F]/10 text-center space-y-3">
          <h3 className="text-base font-semibold text-[#1C211F]">ยังไม่มีประกาศตามหาในเงื่อนไขนี้</h3>
          <p className="text-xs text-[#1C211F]/60">คุณสามารถเป็นคนแรกที่สร้างประกาศตามหาสิ่งของที่คุณต้องการได้ทันที</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-lg hover:bg-[#123e2f] cursor-pointer"
          >
            สร้างประกาศตามหาใหม่
          </button>
        </div>
      )}

      {/* Create Wanted Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">สร้างประกาศตามหาสิ่งของ (Create Wanted)</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                  หัวข้อสิ่งที่ต้องการตามหา *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ตามหาเก้าอี้สำนักงานสภาพดี 2 ตัว, พาเลทไม้เก่า 50 ตัว"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ListingCategory)}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  >
                    {CATEGORY_DEFINITIONS.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.nameTh}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    งบประมาณที่ตั้งไว้ (บาท)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="ใส่ 0 หากเป็นขอรับบริจาค"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>
              </div>

              {/* Quantity and Unit with rich UnitSelector */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                      จำนวนที่ต้องการ *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                      หน่วยนับ (หลากหลายประเภท) *
                    </label>
                    <UnitSelector
                      value={newUnit}
                      onChange={(u) => setNewUnit(u)}
                    />
                  </div>
                </div>
              </div>

              {/* Province and District */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    จังหวัดที่ต้องการรับของ *
                  </label>
                  <select
                    value={newProvince}
                    onChange={(e) => setNewProvince(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl bg-white focus:outline-none focus:border-[#164C3A]"
                  >
                    {THAI_PROVINCES.map(p => (
                      <option key={p.nameTh} value={p.nameTh}>
                        {p.nameTh}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    อำเภอ/เขต หรือพื้นที่นัดรับ *
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น คลองเตย, เมืองระยอง"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>
              </div>

              {/* Distance Radius & Area Coverage */}
              <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1C211F] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#164C3A]" />
                    <span>รัศมีระยะทางที่ยินดีเดินทางไปรับของ</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#164C3A] bg-white px-2 py-0.5 rounded border border-[#1C211F]/10">
                    {newMaxDistanceKm === 0 ? 'ทั่วประเทศ' : `ไม่เกิน ${newMaxDistanceKm} กม.`}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                  {[
                    { km: 5, label: '5 กม.' },
                    { km: 15, label: '15 กม.' },
                    { km: 30, label: '30 กม.' },
                    { km: 50, label: '50 กม.' },
                    { km: 100, label: '100 กม.' },
                    { km: 0, label: 'ทั่วไทย' }
                  ].map(p => (
                    <button
                      key={p.km}
                      type="button"
                      onClick={() => setNewMaxDistanceKm(p.km)}
                      className={`py-1 text-xs rounded-lg border font-medium cursor-pointer ${
                        newMaxDistanceKm === p.km
                          ? 'bg-[#164C3A] text-white border-[#164C3A]'
                          : 'bg-white text-[#1C211F]/70 border-[#1C211F]/10 hover:border-[#164C3A]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="เงื่อนไขพื้นที่ เช่น ยินดีไปรับถึงที่ หรือ สะดวกรับตามแนวรถไฟฟ้า"
                  value={newCoverageArea}
                  onChange={(e) => setNewCoverageArea(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#1C211F]/15 rounded-lg focus:outline-none focus:border-[#164C3A]"
                />
              </div>

              {/* Reference Image or Category Photo */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1C211F] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#164C3A]" />
                    <span>รูปภาพตัวอย่างสิ่งที่ตามหา (ใส่ URL หรือใช้รูปหมวดหมู่อัตโนมัติ)</span>
                  </span>
                  <span className="text-[10px] text-[#164C3A] font-normal">รูปหมวดหมู่อัตโนมัติ</span>
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F7F5EF] border border-[#1C211F]/10 shrink-0">
                    <img
                      src={newImageUrl.trim() || getCategoryDefaultImage(newCategory)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = getCategoryDefaultImage(newCategory);
                      }}
                    />
                  </div>
                  <input
                    type="url"
                    placeholder="วางลิงก์รูปภาพ (หรือเว้นว่างเพื่อใช้ภาพตามหมวดหมู่อัตโนมัติ)"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                  รายละเอียดเพิ่มเติมและเงื่อนไข
                </label>
                <textarea
                  rows={3}
                  placeholder="อธิบายสภาพที่รับได้ วัตถุประสงค์การนำไปใช้งาน หรือเงื่อนไขการขนย้าย..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#1C211F]/70 hover:bg-[#F7F5EF] rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer shadow-sm"
                >
                  บันทึกประกาศตามหา
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
