import React, { useState } from 'react';
import { MEASUREMENT_UNITS, UNIT_CATEGORY_NAMES, UnitOption } from '../../data/units';
import { ChevronDown, Check, Plus } from 'lucide-react';

interface UnitSelectorProps {
  value: string;
  onChange: (unit: string) => void;
  className?: string;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');

  // Popular quick pills
  const popularUnits = ['ชิ้น', 'ตัว', 'เครื่อง', 'กิโลกรัม', 'ตัน', 'กล่อง', 'แผ่น', 'มัด', 'กระสอบ', 'พาเลท', 'ลิตร', 'เมตร'];

  const filteredUnits = selectedCategoryTab === 'all'
    ? MEASUREMENT_UNITS
    : MEASUREMENT_UNITS.filter(u => u.category === selectedCategoryTab);

  const handleSelect = (u: string) => {
    onChange(u);
    setIsCustom(false);
    setIsOpen(false);
  };

  const handleApplyCustom = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setIsCustom(false);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Quick pill presets */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {popularUnits.slice(0, 7).map(unit => (
          <button
            key={unit}
            type="button"
            onClick={() => handleSelect(unit)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              value === unit
                ? 'bg-[#164C3A] text-white font-bold'
                : 'bg-[#F7F5EF] text-[#1C211F]/70 hover:bg-[#DCE9E2] hover:text-[#164C3A] border border-[#1C211F]/10'
            }`}
          >
            {unit}
          </button>
        ))}
      </div>

      {/* Main Dropdown trigger */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 px-3 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs sm:text-sm text-[#1C211F] focus:outline-none focus:border-[#164C3A] flex items-center justify-between cursor-pointer"
        >
          <span className="font-semibold">{value ? `หน่วย: ${value}` : 'เลือกหน่วยนับ...'}</span>
          <ChevronDown className="w-4 h-4 text-[#1C211F]/50" />
        </button>

        <button
          type="button"
          onClick={() => {
            setIsCustom(true);
            setIsOpen(true);
          }}
          className="px-2.5 py-2 bg-[#F7F5EF] hover:bg-[#DCE9E2] text-[#164C3A] text-xs font-semibold rounded-xl border border-[#1C211F]/15 flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>กำหนดเอง</span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl border border-[#1C211F]/15 shadow-xl p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Custom Input Mode */}
          {isCustom ? (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1C211F] block">พิมพ์ชื่อหน่วยนับเฉพาะ</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="เช่น หลอด, ถุงฟอยล์, คันรถ, กะบะ..."
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-[#1C211F]/20 rounded-lg focus:outline-none focus:border-[#164C3A]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleApplyCustom}
                  className="px-3 py-1.5 bg-[#164C3A] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#123e2f]"
                >
                  ใช้หน่วยนี้
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsCustom(false)}
                className="text-[11px] text-[#164C3A] hover:underline"
              >
                ← กลับไปเลือกหน่วยมาตรฐาน
              </button>
            </div>
          ) : (
            <>
              {/* Category selector pills */}
              <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryTab('all')}
                  className={`px-2 py-1 rounded-md whitespace-nowrap font-medium ${
                    selectedCategoryTab === 'all' ? 'bg-[#164C3A] text-white' : 'bg-[#F7F5EF] text-[#1C211F]/70'
                  }`}
                >
                  ทั้งหมด ({MEASUREMENT_UNITS.length})
                </button>
                {Object.entries(UNIT_CATEGORY_NAMES).map(([key, name]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCategoryTab(key)}
                    className={`px-2 py-1 rounded-md whitespace-nowrap font-medium ${
                      selectedCategoryTab === key ? 'bg-[#164C3A] text-white' : 'bg-[#F7F5EF] text-[#1C211F]/70'
                    }`}
                  >
                    {name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Units List */}
              <div className="max-h-52 overflow-y-auto space-y-1 divide-y divide-[#1C211F]/5 pr-1">
                {filteredUnits.map(unit => (
                  <button
                    key={unit.value}
                    type="button"
                    onClick={() => handleSelect(unit.value)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      value === unit.value ? 'bg-[#DCE9E2] text-[#164C3A] font-bold' : 'hover:bg-[#F7F5EF] text-[#1C211F]'
                    }`}
                  >
                    <span>{unit.labelTh}</span>
                    {value === unit.value && <Check className="w-3.5 h-3.5 text-[#164C3A]" />}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="pt-2 border-t border-[#1C211F]/10 flex justify-between items-center text-[11px] text-[#1C211F]/50">
            <span>ครอบคลุมทั้งสินค้าชิ้นเดี่ยว น้ำหนัก ปริมาตร และอุตสาหกรรม</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#164C3A] font-semibold hover:underline"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
