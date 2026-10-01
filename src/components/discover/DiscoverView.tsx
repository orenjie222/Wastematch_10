import React, { useState, useEffect, useCallback } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Listing, ListingCategory, TransactionType, CATEGORY_DEFINITIONS } from '../../types/marketplace';
import { THAI_PROVINCES } from '../../data/thaiProvinces';
import { getCategoryDefaultImage, FALLBACK_IMAGE } from '../../data/seedData';
import { 
  X, 
  Bookmark, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  SlidersHorizontal,
  Info,
  Layers,
  ArrowRight,
  Eye,
  Building2,
  User as UserIcon,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  CreditCard,
  Percent,
  Clock,
  CheckCircle2,
  Tag,
  Compass,
  Navigation
} from 'lucide-react';

export const DiscoverView: React.FC = () => {
  const { 
    listings, 
    handleSwipe, 
    savedListingIds, 
    setSelectedListing,
    setViewingSeller
  } = useMarketplace();

  // View Mode: 'grid' (browse multiple items) vs 'deck' (mutual match swipe cards)
  const [viewMode, setViewMode] = useState<'grid' | 'deck'>('grid');

  // Master Filter Panel Visibility (to keep page clean)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  // Collapsible Accordion States for Each Filter Category
  const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(true);
  const [isTypeAccordionOpen, setIsTypeAccordionOpen] = useState(true);
  const [isProvinceAccordionOpen, setIsProvinceAccordionOpen] = useState(true);
  const [isDistanceAccordionOpen, setIsDistanceAccordionOpen] = useState(true);
  const [isConditionAccordionOpen, setIsConditionAccordionOpen] = useState(false);
  const [isCommissionAccordionOpen, setIsCommissionAccordionOpen] = useState(false);

  // Filter Values
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTxType, setSelectedTxType] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(0); // 0 means unlimited
  const [minConditionPct, setMinConditionPct] = useState<number>(0);
  const [priceTier, setPriceTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'nearest' | 'newest' | 'price_asc' | 'price_desc'>('recommended');

  // Deck Mode State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeAnimation, setSwipeAnimation] = useState<'pass' | 'interested' | 'save' | null>(null);

  // Filter listings
  const filteredListings = listings.filter(item => {
    if (item.status !== 'active') return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedTxType !== 'all' && item.transactionType !== selectedTxType) return false;
    if (selectedProvince !== 'all' && item.location.province !== selectedProvince) return false;
    if (maxDistanceKm > 0 && item.location.distanceKm > maxDistanceKm) return false;
    if (item.conditionPercentage < minConditionPct) return false;
    
    if (priceTier === 'low' && item.price >= 1000) return false;
    if (priceTier === 'mid' && (item.price < 1000 || item.price >= 5000)) return false;
    if (priceTier === 'high' && (item.price < 5000 || item.price >= 20000)) return false;
    if (priceTier === 'bulk' && item.price < 20000) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchDistrict = item.location.district.toLowerCase().includes(q);
      const matchProvince = item.location.province.toLowerCase().includes(q);
      const matchUnit = item.unit.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDistrict && !matchProvince && !matchUnit) return false;
    }
    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'nearest') {
      return a.location.distanceKm - b.location.distanceKm;
    }
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.matchExplanation.compatibilityScore - a.matchExplanation.compatibilityScore;
  });

  const activeDeck = sortedListings;
  const currentItem: Listing | undefined = activeDeck[currentIndex];

  const triggerSwipe = useCallback((direction: 'pass' | 'interested' | 'save') => {
    if (!currentItem) return;
    setSwipeAnimation(direction);
    
    setTimeout(() => {
      handleSwipe(currentItem.id, direction);
      setSwipeAnimation(null);
      if (direction !== 'save') {
        setCurrentIndex(prev => prev + 1);
      }
    }, 180);
  }, [currentItem, handleSwipe]);

  // Keyboard navigation for deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (viewMode !== 'deck') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        triggerSwipe('pass');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        triggerSwipe('interested');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        triggerSwipe('save');
      } else if (e.key === 'Enter' && currentItem) {
        e.preventDefault();
        setSelectedListing(currentItem);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSwipe, currentItem, setSelectedListing, viewMode]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTxType('all');
    setSelectedProvince('all');
    setMaxDistanceKm(0);
    setMinConditionPct(0);
    setPriceTier('all');
    setCurrentIndex(0);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedTxType !== 'all' || 
    selectedProvince !== 'all' || 
    maxDistanceKm > 0 ||
    minConditionPct > 0 || 
    priceTier !== 'all' || 
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1. Header with Search, Mode Switcher, & Master Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C211F] font-display">
            ค้นพบและจับคู่สิ่งของหมุนเวียน
          </h1>
          <p className="text-xs sm:text-sm text-[#1C211F]/70 mt-1">
            ค้นหาสิ่งของเหลือใช้ เศษวัสดุอุตสาหกรรม หรือสินค้ามือสองทั่วไทย — กรองตามระยะทาง พื้นที่ และจังหวัด
          </p>
        </div>

        {/* View Switcher & Filter Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Toggle Filters Button */}
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              isFilterPanelOpen 
                ? 'bg-[#164C3A] text-white border-[#164C3A]' 
                : 'bg-white text-[#1C211F]/80 border-[#1C211F]/15 hover:border-[#164C3A]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isFilterPanelOpen ? 'ซ่อนตัวกรอง' : 'เปิดตัวกรอง'}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>

          {/* Grid vs Deck Toggle */}
          <div className="flex items-center bg-white border border-[#1C211F]/15 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#164C3A] text-white'
                  : 'text-[#1C211F]/70 hover:text-[#164C3A]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>ตารางสินค้า</span>
            </button>
            <button
              onClick={() => setViewMode('deck')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                viewMode === 'deck'
                  ? 'bg-[#164C3A] text-white'
                  : 'text-[#1C211F]/70 hover:text-[#164C3A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>โหมดแมตช์การ์ด</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Fast-Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentIndex(0);
          }}
          placeholder="ค้นหาชื่อสิ่งของ หมวดหมู่ เขต/จังหวัด หรือหน่วยนับ เช่น ไม้สัก, กิโลกรัม, พลาสติก, ตัน, เชียงใหม่..."
          className="w-full pl-4 pr-10 py-3 bg-white border border-[#1C211F]/15 rounded-xl text-xs sm:text-sm text-[#1C211F] placeholder-[#1C211F]/40 focus:outline-none focus:border-[#164C3A] shadow-2xs"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3.5 text-[#1C211F]/40 hover:text-[#1C211F] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. Main Layout: Filters Column + Product Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* ================= Collapsible Filter Panel ================= */}
        {isFilterPanelOpen && (
          <div className="lg:col-span-1 bg-white border border-[#1C211F]/10 rounded-2xl p-4 shadow-2xs space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C211F]/10">
              <span className="text-xs font-bold text-[#1C211F] uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#164C3A]" />
                <span>ตัวกรองค้นหาละเอียด</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-[#164C3A] hover:underline cursor-pointer"
                >
                  ล้างค่าทั้งหมด
                </button>
              )}
            </div>

            {/* Accordion 1: Distance / Area Radius (ระยะทางและรัศมีพื้นที่) */}
            <div className="border-b border-[#1C211F]/10 pb-3">
              <button
                onClick={() => setIsDistanceAccordionOpen(!isDistanceAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ระยะทางและรัศมีพื้นที่</span>
                </span>
                {isDistanceAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isDistanceAccordionOpen && (
                <div className="space-y-2 mt-2">
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { km: 0, label: 'ทั่วไทย (ไม่จำกัด)' },
                      { km: 5, label: 'ในรัศมี 5 กม.' },
                      { km: 15, label: 'ในรัศมี 15 กม.' },
                      { km: 30, label: 'ในรัศมี 30 กม.' },
                      { km: 50, label: 'ในรัศมี 50 กม.' },
                      { km: 100, label: 'ในรัศมี 100 กม.' },
                    ].map(r => (
                      <button
                        key={r.km}
                        onClick={() => {
                          setMaxDistanceKm(r.km);
                          setCurrentIndex(0);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-center cursor-pointer ${
                          maxDistanceKm === r.km
                            ? 'bg-[#164C3A] text-white font-bold'
                            : 'bg-[#F7F5EF] text-[#1C211F]/70 hover:bg-[#DCE9E2] border border-[#1C211F]/10'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#1C211F]/50 pt-0.5">
                    กรองสิ่งของที่อยู่ใกล้คุณเพื่อความสะดวกในการนัดรับและประหยัดค่าขนส่ง
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Listing Types (Exchange, Sell, Free, Donate) */}
            <div className="border-b border-[#1C211F]/10 pb-3">
              <button
                onClick={() => setIsTypeAccordionOpen(!isTypeAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <span>ประเภทการส่งต่อ (Listing Type)</span>
                {isTypeAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isTypeAccordionOpen && (
                <div className="space-y-1.5 mt-2">
                  {[
                    { id: 'all', label: 'ทั้งหมด (ทุกประเภท)' },
                    { id: 'swap', label: 'แลกเปลี่ยน (Exchange)', badge: 'Mutual Swap' },
                    { id: 'sell', label: 'ขาย (Sell)', badge: 'คอมมิชชั่น 15%-10%' },
                    { id: 'free', label: 'ให้ฟรี (Free)', badge: 'ฟรีค่าธรรมเนียม 0%' },
                    { id: 'donate', label: 'บริจาค (Donate)', badge: 'เฉพาะมูลนิธิ/กุศล' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTxType(t.id);
                        setCurrentIndex(0);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedTxType === t.id
                          ? 'bg-[#164C3A] text-white font-semibold'
                          : 'text-[#1C211F]/80 hover:bg-[#F7F5EF]'
                      }`}
                    >
                      <span>{t.label}</span>
                      {t.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                          selectedTxType === t.id ? 'bg-white/20 text-white' : 'bg-[#DCE9E2] text-[#164C3A]'
                        }`}>
                          {t.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 3: Province (All 77 Provinces of Thailand) */}
            <div className="border-b border-[#1C211F]/10 pb-3">
              <button
                onClick={() => setIsProvinceAccordionOpen(!isProvinceAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <span>จังหวัด (ทั่วไทย 77 จังหวัด)</span>
                {isProvinceAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isProvinceAccordionOpen && (
                <div className="mt-2 space-y-2">
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setCurrentIndex(0);
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#1C211F]/15 rounded-lg text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A] cursor-pointer"
                  >
                    <option value="all">ทั่วประเทศ (ทุกจังหวัด)</option>
                    {THAI_PROVINCES.map(p => (
                      <option key={p.nameTh} value={p.nameTh}>
                        {p.nameTh} ({p.nameEn})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-[#1C211F]/50">
                    เลือกจังหวัดปลายทางหรือพื้นที่ที่คุณสะดวกนัดรับ
                  </p>
                </div>
              )}
            </div>

            {/* Accordion: Distance & Service Area Radius (ระยะทางและรัศมีพื้นที่บริการ) */}
            <div className="border-b border-[#1C211F]/10 pb-3">
              <button
                onClick={() => setIsDistanceAccordionOpen(!isDistanceAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ระยะทางและรัศมีพื้นที่</span>
                </div>
                {isDistanceAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isDistanceAccordionOpen && (
                <div className="mt-2 space-y-2.5">
                  {/* Preset Quick Buttons */}
                  <div className="space-y-1">
                    {[
                      { km: 0, label: 'ไม่จำกัดระยะทาง (ทั่วไทย)', badge: 'ทุกพื้นที่' },
                      { km: 5, label: 'ภายใน 5 กม. (เดินเท้า/ใกล้มาก)', badge: '≤ 5 km' },
                      { km: 15, label: 'ภายใน 15 กม. (ในอำเภอ/เมือง)', badge: '≤ 15 km' },
                      { km: 30, label: 'ภายใน 30 กม. (ทั้งจังหวัด/ปริมณฑล)', badge: '≤ 30 km' },
                      { km: 50, label: 'ภายใน 50 กม. (ข้ามอำเภอ)', badge: '≤ 50 km' },
                      { km: 100, label: 'ภายใน 100 กม. (กลุ่มจังหวัด/ภูมิภาค)', badge: '≤ 100 km' }
                    ].map(d => (
                      <button
                        key={d.km}
                        onClick={() => {
                          setMaxDistanceKm(d.km);
                          setCurrentIndex(0);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          maxDistanceKm === d.km
                            ? 'bg-[#164C3A] text-white font-semibold'
                            : 'text-[#1C211F]/80 hover:bg-[#F7F5EF]'
                        }`}
                      >
                        <span className="truncate">{d.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded shrink-0 ml-1 ${
                          maxDistanceKm === d.km ? 'bg-white/20 text-white' : 'bg-[#DCE9E2] text-[#164C3A]'
                        }`}>
                          {d.badge}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Interactive Distance Slider */}
                  <div className="pt-2 border-t border-[#1C211F]/10">
                    <div className="flex justify-between text-[11px] text-[#1C211F]/70 mb-1">
                      <span>กำหนดระยะทางเอง:</span>
                      <span className="font-bold text-[#164C3A]">
                        {maxDistanceKm === 0 ? 'ทั่วประเทศ' : `ไม่เกิน ${maxDistanceKm} กม.`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="5"
                      value={maxDistanceKm}
                      onChange={(e) => {
                        setMaxDistanceKm(parseInt(e.target.value) || 0);
                        setCurrentIndex(0);
                      }}
                      className="w-full accent-[#164C3A] cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-[#1C211F]/40 mt-0.5">
                      <span>0 (ทั่วไทย)</span>
                      <span>50 กม.</span>
                      <span>100 กม.</span>
                      <span>150 กม.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Categories (24+ Circular & Consumer Categories) */}
            <div className="border-b border-[#1C211F]/10 pb-3">
              <button
                onClick={() => setIsCategoryAccordionOpen(!isCategoryAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <span>หมวดหมู่สินค้า ({CATEGORY_DEFINITIONS.length})</span>
                {isCategoryAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isCategoryAccordionOpen && (
                <div className="mt-2 space-y-1 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCurrentIndex(0);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#164C3A] text-white font-semibold'
                        : 'text-[#1C211F]/80 hover:bg-[#F7F5EF]'
                    }`}
                  >
                    ทุกหมวดหมู่สินค้า
                  </button>
                  {CATEGORY_DEFINITIONS.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentIndex(0);
                      }}
                      className={`w-full text-left px-2.5 py-1 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#164C3A] text-white font-semibold'
                          : 'text-[#1C211F]/80 hover:bg-[#F7F5EF]'
                      }`}
                    >
                      <span className="truncate">{cat.nameTh}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 5: Physical Condition with Percentage */}
            <div className="border-b border-[#1C211F]/10 pb-3">
              <button
                onClick={() => setIsConditionAccordionOpen(!isConditionAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <span>สภาพสินค้าคงสภาพ (Condition %)</span>
                {isConditionAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isConditionAccordionOpen && (
                <div className="mt-2 space-y-1.5">
                  {[
                    { pct: 0, label: 'ทุกระดับสภาพ (All)' },
                    { pct: 90, label: 'สภาพ 90%+ เหมือนใหม่ (Like New)' },
                    { pct: 80, label: 'สภาพ 80%+ ใช้งานได้ดีมาก' },
                    { pct: 70, label: 'สภาพ 70%+ ปานกลาง' },
                    { pct: 50, label: 'สภาพ 50%+ ต้องซ่อมแซม/แยกชิ้นส่วน' }
                  ].map(c => (
                    <button
                      key={c.pct}
                      onClick={() => {
                        setMinConditionPct(c.pct);
                        setCurrentIndex(0);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        minConditionPct === c.pct
                          ? 'bg-[#164C3A] text-white font-semibold'
                          : 'text-[#1C211F]/80 hover:bg-[#F7F5EF]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 6: Price & Commission Tier */}
            <div>
              <button
                onClick={() => setIsCommissionAccordionOpen(!isCommissionAccordionOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1C211F] py-1 cursor-pointer"
              >
                <span>อัตราค่าธรรมเนียมแพลตฟอร์ม</span>
                {isCommissionAccordionOpen ? <ChevronUp className="w-4 h-4 text-[#1C211F]/50" /> : <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />}
              </button>

              {isCommissionAccordionOpen && (
                <div className="mt-2 space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'ทุกระดับราคา' },
                    { id: 'low', label: 'ต่ำกว่า ฿1,000 (คอมมิชชั่น 15%)' },
                    { id: 'mid', label: '฿1,000 - ฿4,999 (ลดเหลือ 13.5%)' },
                    { id: 'high', label: '฿5,000 - ฿19,999 (ลดเหลือ 12%)' },
                    { id: 'bulk', label: '฿20,000 ขึ้นไป (ลดต่ำสุด 10%)' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPriceTier(p.id);
                        setCurrentIndex(0);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        priceTier === p.id
                          ? 'bg-[#164C3A] text-white font-semibold'
                          : 'text-[#1C211F]/80 hover:bg-[#F7F5EF]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= Products Display Area ================= */}
        <div className={isFilterPanelOpen ? 'lg:col-span-3' : 'lg:col-span-4'}>
          
          {/* Quick Active Filter Badges & Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#1C211F]">
                พบ {sortedListings.length} รายการ
              </span>
              {selectedProvince !== 'all' && (
                <span className="px-2 py-0.5 bg-[#DCE9E2] text-[#164C3A] rounded font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedProvince}</span>
                </span>
              )}
              {maxDistanceKm > 0 && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  <span>ระยะทาง ≤ {maxDistanceKm} กม.</span>
                  <button 
                    onClick={() => setMaxDistanceKm(0)} 
                    className="ml-0.5 text-emerald-900 hover:text-black font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedTxType !== 'all' && (
                <span className="px-2 py-0.5 bg-[#F7F5EF] text-[#1C211F] rounded font-medium border border-[#1C211F]/10">
                  {selectedTxType === 'sell' ? 'ขาย' : selectedTxType === 'swap' ? 'แลกเปลี่ยน' : selectedTxType === 'donate' ? 'บริจาค' : 'ให้ฟรี'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-[#1C211F]/70">
                <span className="shrink-0 font-medium">จัดเรียง:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1 bg-white border border-[#1C211F]/15 rounded-lg text-xs font-semibold text-[#1C211F] focus:outline-none focus:border-[#164C3A] cursor-pointer shadow-2xs"
                >
                  <option value="recommended">ความเข้ากันได้แนะนำ</option>
                  <option value="nearest">📍 ระยะทางใกล้ที่สุด (Nearest)</option>
                  <option value="newest">รายการใหม่ล่าสุด</option>
                  <option value="price_asc">ราคา: ต่ำไปสูง</option>
                  <option value="price_desc">ราคา: สูงไปต่ำ</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[#164C3A] hover:underline font-semibold cursor-pointer text-xs whitespace-nowrap"
                >
                  รีเซ็ตตัวกรอง
                </button>
              )}
            </div>
          </div>

          {/* ================= 1. MULTI-PRODUCT GRID VIEW ================= */}
          {viewMode === 'grid' && (
            <>
              {sortedListings.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#1C211F]/10 space-y-3">
                  <p className="text-sm font-semibold text-[#1C211F]">ไม่พบรายการที่ตรงกับเงื่อนไขตัวกรอง</p>
                  <p className="text-xs text-[#1C211F]/60">ลองขยายระยะทางพื้นที่ หรือเปลี่ยนจังหวัดเพื่อค้นหาเพิ่มเติม</p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-lg hover:bg-[#123e2f] transition-all cursor-pointer"
                  >
                    ดูสินค้าทั้งหมดทั่วไทย (ไม่จำกัดระยะทาง)
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {sortedListings.map(item => {
                    const isSaved = savedListingIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-[#1C211F]/10 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#164C3A]/40 transition-all flex flex-col group"
                      >
                        {/* Image Container with Badges */}
                        <div 
                          className="relative aspect-4/3 bg-[#F7F5EF] overflow-hidden cursor-pointer"
                          onClick={() => setSelectedListing(item)}
                        >
                          <img
                            src={item.images[0] || getCategoryDefaultImage(item.category)}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = getCategoryDefaultImage(item.category);
                            }}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          />

                          {/* Top Tag: Transaction Type */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider ${
                              item.transactionType === 'sell'
                                ? 'bg-amber-600 text-white'
                                : item.transactionType === 'swap'
                                  ? 'bg-[#164C3A] text-white'
                                  : item.transactionType === 'donate'
                                    ? 'bg-rose-700 text-white'
                                    : 'bg-emerald-700 text-white'
                            }`}>
                              {item.transactionType === 'sell' ? 'ขาย' : item.transactionType === 'swap' ? 'แลกเปลี่ยน' : item.transactionType === 'donate' ? 'บริจาค' : 'ให้ฟรี'}
                            </span>

                            {/* Condition Percentage Pill */}
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/95 text-[#164C3A] shadow-xs backdrop-blur-xs">
                              {item.conditionPercentage}% {item.conditionGrade === 'like_new' ? 'ใหม่มาก' : item.conditionGrade === 'raw_material' ? 'วัสดุหมุนเวียน' : 'สภาพดี'}
                            </span>
                          </div>

                          {/* Quick Bookmark Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSwipe(item.id, 'save');
                            }}
                            className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                              isSaved 
                                ? 'bg-[#164C3A] text-white' 
                                : 'bg-white/80 text-[#1C211F]/70 hover:bg-white hover:text-[#1C211F]'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>

                          {/* Province & Distance Badge on bottom of image */}
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-medium text-white px-2.5 py-1 rounded-md bg-[#1C211F]/75 backdrop-blur-xs">
                            <span className="flex items-center gap-1 truncate max-w-[65%]">
                              <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{item.location.province} ({item.location.district})</span>
                            </span>
                            <span className="flex items-center gap-1 font-bold text-emerald-300 shrink-0">
                              <Navigation className="w-3 h-3" />
                              <span>ห่าง {item.location.distanceKm} กม.</span>
                            </span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-1.5">
                            <h3 
                              onClick={() => setSelectedListing(item)}
                              className="text-sm font-bold text-[#1C211F] group-hover:text-[#164C3A] transition-colors line-clamp-2 cursor-pointer leading-snug"
                            >
                              {item.title}
                            </h3>

                            <p className="text-xs text-[#1C211F]/70 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Quantity & Unit and Distance Area */}
                          <div className="flex items-center justify-between text-[11px] bg-[#F7F5EF] px-2.5 py-1.5 rounded-lg border border-[#1C211F]/5">
                            <span className="font-semibold text-[#164C3A]">
                              ปริมาณ: {item.quantity.toLocaleString()} {item.unit}
                            </span>
                            <span className="text-[#1C211F]/70 flex items-center gap-1 font-medium">
                              <Compass className="w-3 h-3 text-[#164C3A]" />
                              <span>{item.location.radiusKm ? `รัศมี ${item.location.radiusKm} กม.` : 'ทั่วประเทศ'}</span>
                            </span>
                          </div>

                          {/* Pricing & Platform Commission Info */}
                          <div className="pt-2 border-t border-[#1C211F]/10 flex items-end justify-between">
                            <div>
                              <div className="text-base font-bold text-[#164C3A] tabular-nums font-display">
                                {item.price > 0 ? `฿${item.price.toLocaleString()}` : 'ส่งต่อฟรี/แลกเปลี่ยน'}
                              </div>
                              {item.transactionType === 'sell' && (
                                <div className="text-[10px] text-[#1C211F]/50 flex items-center gap-1">
                                  <span>ค่าคอมฯ {item.commissionRate}%</span>
                                  {item.commissionRate < 15 && (
                                    <span className="text-emerald-700 font-semibold">(ส่วนลดตามยอด)</span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Seller Snippet with Click to Profile Modal */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingSeller(item.seller);
                              }}
                              className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-[#F7F5EF] transition-colors cursor-pointer text-left group/seller"
                              title="คลิกเพื่อดูโปรไฟล์ผู้ส่งต่อ"
                            >
                              <img
                                src={item.seller.avatar}
                                alt={item.seller.name}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                                }}
                                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#1C211F]/10"
                              />
                              <div className="text-right">
                                <div className="text-[11px] font-bold text-[#1C211F] group-hover/seller:text-[#164C3A] truncate max-w-[85px]">
                                  {item.seller.name}
                                </div>
                                <div className="text-[10px] text-emerald-700 font-medium">
                                  ตอบไว {item.seller.responseRate}%
                                </div>
                              </div>
                            </button>
                          </div>

                          {/* Action Bar */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => setSelectedListing(item)}
                              className="px-3 py-1.5 text-xs font-semibold text-[#1C211F]/80 bg-[#F7F5EF] hover:bg-[#eceae2] rounded-lg transition-colors cursor-pointer text-center"
                            >
                              ดูรายละเอียด
                            </button>

                            <button
                              onClick={() => handleSwipe(item.id, 'interested')}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#164C3A] hover:bg-[#123e2f] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>สนใจ (Match)</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ================= 2. MUTUAL MATCH DECK / SWIPE VIEW ================= */}
          {viewMode === 'deck' && (
            <div className="flex flex-col items-center">
              {!currentItem ? (
                <div className="w-full max-w-md p-10 bg-white rounded-3xl border border-[#1C211F]/10 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#DCE9E2] text-[#164C3A] flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C211F] font-display">
                    คุณได้ดูรายการในหมวดและระยะทางนี้ครบแล้ว
                  </h3>
                  <p className="text-xs text-[#1C211F]/70">
                    รีเซ็ตตัวกรองเพื่อค้นหาวัสดุหรือสินค้าใหม่จากผู้ส่งต่อในรัศมีที่กว้างขึ้น
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] cursor-pointer"
                  >
                    รีเซ็ตตัวกรองทั้งหมด
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-lg space-y-4">
                  {/* The Deck Card */}
                  <div 
                    className={`bg-white rounded-3xl border border-[#1C211F]/10 overflow-hidden shadow-lg transition-transform duration-200 ${
                      swipeAnimation === 'pass' ? '-translate-x-12 opacity-50 rotate-[-4deg]' :
                      swipeAnimation === 'interested' ? 'translate-x-12 opacity-50 rotate-[4deg]' :
                      swipeAnimation === 'save' ? '-translate-y-8 opacity-70' : ''
                    }`}
                  >
                    {/* Image Area */}
                    <div 
                      className="relative aspect-16/10 bg-[#F7F5EF] cursor-pointer"
                      onClick={() => setSelectedListing(currentItem)}
                    >
                      <img
                        src={currentItem.images[0] || getCategoryDefaultImage(currentItem.category)}
                        alt={currentItem.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = getCategoryDefaultImage(currentItem.category);
                        }}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#164C3A] text-white shadow-xs uppercase">
                          {currentItem.transactionType === 'sell' ? 'ขาย' : currentItem.transactionType === 'swap' ? 'แลกเปลี่ยน' : currentItem.transactionType === 'donate' ? 'บริจาค' : 'ให้ฟรี'}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/95 text-[#164C3A] shadow-xs">
                          สภาพ {currentItem.conditionPercentage}%
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-medium text-white px-3 py-1.5 rounded-md bg-[#1C211F]/80 backdrop-blur-xs">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{currentItem.location.province} ({currentItem.location.district})</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-emerald-300">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>ห่าง {currentItem.location.distanceKm} กม.</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#164C3A] uppercase tracking-wider">
                            {currentItem.category} · จำนวน {currentItem.quantity} {currentItem.unit}
                          </span>
                          <span className="text-lg font-bold text-[#164C3A] tabular-nums font-display">
                            {currentItem.price > 0 ? `฿${currentItem.price.toLocaleString()}` : 'ฟรี/แลกเปลี่ยน'}
                          </span>
                        </div>
                        <h2 
                          onClick={() => setSelectedListing(currentItem)}
                          className="text-lg font-bold text-[#1C211F] hover:text-[#164C3A] cursor-pointer transition-colors"
                        >
                          {currentItem.title}
                        </h2>
                        <p className="text-xs text-[#1C211F]/75 line-clamp-3 mt-1.5 leading-relaxed">
                          {currentItem.description}
                        </p>
                      </div>

                      {/* Match Analysis Pill with Distance */}
                      <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#164C3A]/15 text-xs space-y-1">
                        <div className="font-semibold text-[#164C3A] flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>คะแนนความเข้ากันได้ {currentItem.matchExplanation.compatibilityScore}%</span>
                          </span>
                          <span className="text-emerald-800 font-bold">
                            ระยะทาง {currentItem.location.distanceKm} กม.
                          </span>
                        </div>
                        <p className="text-[11px] text-[#1C211F]/70">
                          {currentItem.matchExplanation.reasons[0]}
                        </p>
                      </div>

                      {/* Seller Profile Button */}
                      <div 
                        onClick={() => setViewingSeller(currentItem.seller)}
                        className="p-3 bg-white border border-[#1C211F]/10 rounded-xl flex items-center justify-between hover:border-[#164C3A] transition-colors cursor-pointer group/seller"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={currentItem.seller.avatar}
                            alt={currentItem.seller.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-[#1C211F]/10"
                          />
                          <div>
                            <div className="text-xs font-bold text-[#1C211F] group-hover/seller:text-[#164C3A] flex items-center gap-1">
                              <span>{currentItem.seller.name}</span>
                              <ShieldCheck className="w-3.5 h-3.5 text-[#164C3A]" />
                            </div>
                            <div className="text-[11px] text-[#1C211F]/60">
                              ตอบกลับไว {currentItem.seller.responseRate}% · ส่งมอบแล้ว {currentItem.seller.completedDeals} ครั้ง
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold text-[#164C3A] flex items-center gap-0.5">
                          <span>ดูโปรไฟล์</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                    </div>

                    {/* Deck Actions: Pass, Save, Interested */}
                    <div className="p-4 bg-[#F7F5EF] border-t border-[#1C211F]/10 flex items-center justify-center gap-6">
                      <button
                        onClick={() => triggerSwipe('pass')}
                        className="w-12 h-12 rounded-full bg-white border border-[#1C211F]/15 flex items-center justify-center text-[#1C211F]/60 hover:text-rose-600 hover:border-rose-400 hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="ข้าม (Pass - Arrow Left)"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => triggerSwipe('save')}
                        className="w-10 h-10 rounded-full bg-white border border-[#1C211F]/15 flex items-center justify-center text-[#1C211F]/60 hover:text-[#164C3A] hover:border-[#164C3A] hover:scale-105 transition-all shadow-xs cursor-pointer"
                        title="บันทึก (Save - Arrow Up)"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => triggerSwipe('interested')}
                        className="w-14 h-14 rounded-full bg-[#164C3A] text-white flex items-center justify-center hover:bg-[#123e2f] hover:scale-105 transition-all shadow-md cursor-pointer"
                        title="สนใจ (Interested - Arrow Right)"
                      >
                        <Sparkles className="w-6 h-6" />
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
