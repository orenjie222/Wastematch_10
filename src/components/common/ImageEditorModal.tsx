import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Sparkles, 
  Check, 
  Image as ImageIcon,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';
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
  SCHOOL_MATERIALS_IMAGE,
  HOBBY_COLLECTIBLES_IMAGE,
  OFFICE_SUPPLIES_IMAGE,
  PAPER_CARDBOARD_IMAGE,
  INDUSTRIAL_MATS_IMAGE,
  KIDS_TOYS_IMAGE,
  STROLLER_IMAGE,
  TABLE_IMAGE,
  KEYBOARD_IMAGE,
  YOGA_IMAGE,
  VINYL_RECORD_IMAGE,
  HELMET_IMAGE,
  CERAMIC_DISHES_IMAGE,
  INDOOR_PLANTS_IMAGE,
  KIDS_CLOTHES_IMAGE,
  PLASTIC_BOXES_IMAGE
} from '../../data/seedData';

export interface PresetImageItem {
  id: string;
  name: string;
  category: string;
  url: string;
}

export const CURATED_PHOTO_PRESETS: PresetImageItem[] = [
  { id: 'chair_wood', name: 'เก้าอี้ไม้วินเทจ', category: 'เฟอร์นิเจอร์', url: CHAIR_IMAGE },
  { id: 'table_oak', name: 'โต๊ะไม้พับเก็บได้', category: 'เฟอร์นิเจอร์', url: TABLE_IMAGE },
  { id: 'wood_planks', name: 'แผ่นไม้สักทองแปรรูป', category: 'ไม้ & ก่อสร้าง', url: WOOD_IMAGE },
  { id: 'pallet_wood', name: 'พาเลทไม้สนยุโรป', category: 'ไม้ & ก่อสร้าง', url: PALLET_WOOD_IMAGE },
  { id: 'keyboard_mouse', name: 'คีย์บอร์ด & เมาส์ไร้สาย', category: 'อิเล็กทรอนิกส์', url: KEYBOARD_IMAGE },
  { id: 'electronics_lab', name: 'แผงวงจร & อะไหล่คอม', category: 'อิเล็กทรอนิกส์', url: ELECTRONICS_IMAGE },
  { id: 'ceramic_dishes', name: 'เซ็ตจานชามเซรามิก', category: 'ของใช้ในบ้าน', url: CERAMIC_DISHES_IMAGE },
  { id: 'kitchenware', name: 'หม้อ & ภาชนะทำครัว', category: 'ของใช้ในบ้าน', url: KITCHEN_IMAGE },
  { id: 'glass_jars', name: 'โหลแก้วสุญญากาศ', category: 'ของใช้ในบ้าน', url: GLASS_BOTTLES_IMAGE },
  { id: 'boxes_kraft', name: 'กล่องพัสดุคราฟท์รักษ์โลก', category: 'บรรจุภัณฑ์', url: BOXES_IMAGE },
  { id: 'paper_pack', name: 'กระดาษรังผึ้งกันกระแทก', category: 'บรรจุภัณฑ์', url: PAPER_CARDBOARD_IMAGE },
  { id: 'plastic_tubs', name: 'ลังพลาสติกทึบจัดระเบียบ', category: 'บรรจุภัณฑ์', url: PLASTIC_BOXES_IMAGE },
  { id: 'indoor_plants', name: 'ต้นไม้ฟอกอากาศในกระถาง', category: 'ต้นไม้ & เกษตร', url: INDOOR_PLANTS_IMAGE },
  { id: 'organic_compost', name: 'กากกาแฟ & ดินหมักอินทรีย์', category: 'ต้นไม้ & เกษตร', url: ORGANIC_COMPOST_IMAGE },
  { id: 'biomass', name: 'ซังข้าวโพด & ฟางข้าวอัดแท่ง', category: 'ต้นไม้ & เกษตร', url: BIOMASS_IMAGE },
  { id: 'garden_tools', name: 'อุปกรณ์จัดสวน & ดอกไม้', category: 'ต้นไม้ & เกษตร', url: GARDEN_IMAGE },
  { id: 'books_shelf', name: 'หนังสือ & วรรณกรรมสะสม', category: 'หนังสือ & เครื่องเขียน', url: BOOKS_IMAGE },
  { id: 'school_supplies', name: 'ชุดเครื่องเขียน & สมุดโน้ต', category: 'หนังสือ & เครื่องเขียน', url: SCHOOL_MATERIALS_IMAGE },
  { id: 'office_desk', name: 'อุปกรณ์สำนักงาน & แฟ้มเอกสาร', category: 'หนังสือ & เครื่องเขียน', url: OFFICE_SUPPLIES_IMAGE },
  { id: 'vintage_clothes', name: 'เสื้อผ้าคอตตอน & แจ็กเก็ต', category: 'เสื้อผ้า & แฟชั่น', url: CLOTHES_IMAGE },
  { id: 'textile_fabric', name: 'เศษผ้าฝ้าย & ผ้ายีนส์ Upcycle', category: 'เสื้อผ้า & แฟชั่น', url: TEXTILE_IMAGE },
  { id: 'kids_clothes', name: 'เสื้อผ้าเด็กอ่อนสะอาด', category: 'เสื้อผ้า & แฟชั่น', url: KIDS_CLOTHES_IMAGE },
  { id: 'kids_toys', name: 'ของเล่นไม้ Montessori', category: 'แม่และเด็ก', url: KIDS_TOYS_IMAGE },
  { id: 'baby_stroller', name: 'รถเข็นเด็กพับได้', category: 'แม่และเด็ก', url: STROLLER_IMAGE },
  { id: 'bicycle_japan', name: 'จักรยานแม่บ้านมือสอง', category: 'กีฬา & ยานยนต์', url: BICYCLE_IMAGE },
  { id: 'yoga_mat', name: 'เสื่อโยคะ & ยางยืดออกกำลังกาย', category: 'กีฬา & ยานยนต์', url: YOGA_IMAGE },
  { id: 'helmet_safe', name: 'หมวกกันน็อกมอเตอร์ไซค์ มอก.', category: 'กีฬา & ยานยนต์', url: HELMET_IMAGE },
  { id: 'vinyl_record', name: 'แผ่นเสียงไวนิลคลาสสิก', category: 'ของสะสม & งานอดิเรก', url: VINYL_RECORD_IMAGE },
  { id: 'hobby_items', name: 'ของสะสมวินเทจ & โมเดล', category: 'ของสะสม & งานอดิเรก', url: HOBBY_COLLECTIBLES_IMAGE },
  { id: 'espresso_machine', name: 'เครื่องทำกาแฟเอสเปรสโซ', category: 'ของใช้ในบ้าน', url: ESPRESSO_IMAGE },
  { id: 'industrial_mats', name: 'แผ่นยางกันลื่นอุตสาหกรรม', category: 'วัสดุอุตสาหกรรม', url: INDUSTRIAL_MATS_IMAGE },
  { id: 'hero_craft', name: 'ช่างฝีมือหมุนเวียนวัสดุ', category: 'ภาพรวมระบบ', url: HERO_IMAGE }
];

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  title?: string;
  onSave: (newImageUrl: string) => void;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  currentImage = '',
  title = 'แก้ไขและเปลี่ยนรูปภาพ',
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || CHAIR_IMAGE);
  const [inputUrl, setInputUrl] = useState<string>(currentImage || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(CURATED_PHOTO_PRESETS.map(p => p.category)))];

  const filteredPresets = selectedCategory === 'all' 
    ? CURATED_PHOTO_PRESETS 
    : CURATED_PHOTO_PRESETS.filter(p => p.category === selectedCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (!file) return;

    // Check size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('ไฟล์รูปภาพมีขนาดใหญ่เกิน 5MB กรุณาเลือกไฟล์ที่เล็กลง');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewUrl(event.target.result as string);
      }
    };
    reader.onerror = () => {
      setUploadError('เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (!inputUrl.trim()) return;
    setPreviewUrl(inputUrl.trim());
  };

  const handleConfirm = () => {
    if (previewUrl) {
      onSave(previewUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#F7F5F0] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#B8AA96]/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#EEEAE1] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EEEAE1] flex items-center justify-center text-[#344634]">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#252722] font-serif">{title}</h3>
              <p className="text-xs text-[#252722]/60">อัปโหลดรูปจากมือถือ/คอมพิวเตอร์ ใส่ลิงก์ หรือเลือกจากคลังรูปภาพ</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#252722]/50 hover:text-[#252722] hover:bg-[#EEEAE1] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EEEAE1] bg-white px-5 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-[#344634] text-[#344634]'
                : 'border-transparent text-[#252722]/60 hover:text-[#252722]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>อัปโหลดรูปจากอุปกรณ์</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'border-[#344634] text-[#344634]'
                : 'border-transparent text-[#252722]/60 hover:text-[#252722]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>คลังรูปภาพหมวดหมู่ ({CURATED_PHOTO_PRESETS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'border-[#344634] text-[#344634]'
                : 'border-transparent text-[#252722]/60 hover:text-[#252722]'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>ใส่ลิงก์ URL</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Active Tab: Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#B8AA96]/60 hover:border-[#344634] bg-white rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-[#FAF9F5] group"
              >
                <div className="w-12 h-12 rounded-full bg-[#EEEAE1] text-[#344634] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-[#252722]">กดเพื่อเลือกรูปภาพจากมือถือหรือคอมพิวเตอร์</p>
                <p className="text-xs text-[#252722]/60 mt-1">รองรับไฟล์ JPG, PNG, WEBP ขนาดสูงสุด 5MB</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-[#344634] text-white text-xs font-semibold rounded-lg group-hover:bg-[#263426] transition-colors inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>เลือกไฟล์รูปภาพ</span>
                </button>
              </div>

              {uploadError && (
                <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {uploadError}
                </p>
              )}
            </div>
          )}

          {/* Active Tab: Curated Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              {/* Category chips */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#344634] text-white font-bold'
                        : 'bg-white text-[#252722]/70 hover:bg-[#EEEAE1] border border-[#EEEAE1]'
                    }`}
                  >
                    {cat === 'all' ? 'ทั้งหมด' : cat}
                  </button>
                ))}
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto p-1">
                {filteredPresets.map(preset => (
                  <div
                    key={preset.id}
                    onClick={() => setPreviewUrl(preset.url)}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer group transition-all ${
                      previewUrl === preset.url
                        ? 'border-[#344634] ring-2 ring-[#344634]/30 shadow-md'
                        : 'border-transparent hover:border-[#7C8B72]'
                    }`}
                  >
                    <div className="aspect-4/3 bg-[#EEEAE1]">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-1.5 bg-white text-center">
                      <p className="text-[10px] font-medium text-[#252722] truncate">{preset.name}</p>
                    </div>
                    {previewUrl === preset.url && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-[#344634] text-white rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Tab: URL Input */}
          {activeTab === 'url' && (
            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#EEEAE1]">
              <label className="text-xs font-semibold text-[#252722] block">
                วางลิงก์รูปภาพ (Image URL)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#F7F5F0] border border-[#B8AA96]/40 rounded-lg text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  className="px-3.5 py-2 bg-[#7C8B72] hover:bg-[#344634] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  แสดงตัวอย่าง
                </button>
              </div>
              <p className="text-[11px] text-[#252722]/50">
                รองรับลิงก์รูปภาพจาก Unsplash, Imgur, หรือเว็บไซต์ที่เปิดสาธารณะ
              </p>
            </div>
          )}

          {/* Live Preview Box */}
          <div className="bg-white p-3.5 rounded-xl border border-[#EEEAE1] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#252722]">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#344634]" />
                <span>ตัวอย่างรูปภาพที่เลือกใช้งาน (Live Preview)</span>
              </span>
              <span className="text-[10px] text-[#7C8B72] font-medium">ความละเอียดคมชัดสูง</span>
            </div>
            
            <div className="relative aspect-16/9 sm:aspect-21/9 rounded-lg overflow-hidden bg-[#EEEAE1] border border-[#B8AA96]/30">
              <img
                src={previewUrl}
                alt="Preview"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = CHAIR_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#344634]/80 backdrop-blur-xs text-white text-[10px] rounded font-medium">
                พร้อมใช้งานทันที
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#EEEAE1] bg-white flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#252722]/70 hover:text-[#252722] hover:bg-[#EEEAE1] rounded-lg transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-[#344634] hover:bg-[#263426] text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>บันทึกและใช้รูปภาพนี้</span>
          </button>
        </div>
      </div>
    </div>
  );
};
