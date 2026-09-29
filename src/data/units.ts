export interface UnitOption {
  id: string;
  nameTh: string;
  nameEn: string;
  category: 'general' | 'weight' | 'packaging' | 'dimension_volume';
  symbol?: string;
  example?: string;
}

export interface UnitCategoryGroup {
  id: 'general' | 'weight' | 'packaging' | 'dimension_volume';
  nameTh: string;
  nameEn: string;
  iconName: string;
  units: UnitOption[];
}

export const UNIT_OPTIONS: UnitOption[] = [
  // 1. สิ่งของเครื่องใช้ทั่วไป (General Items)
  { id: 'piece', nameTh: 'ชิ้น', nameEn: 'Pieces (pcs)', category: 'general', symbol: 'ชิ้น', example: 'ของใช้ทั่วไป อะไหล่' },
  { id: 'unit', nameTh: 'ตัว', nameEn: 'Units', category: 'general', symbol: 'ตัว', example: 'เสื้อผ้า เฟอร์นิเจอร์ เก้าอี้' },
  { id: 'set', nameTh: 'ชุด', nameEn: 'Sets', category: 'general', symbol: 'ชุด', example: 'ชุดคอมพิวเตอร์ โต๊ะประชุม' },
  { id: 'machine', nameTh: 'เครื่อง', nameEn: 'Machines / Appliances', category: 'general', symbol: 'เครื่อง', example: 'เครื่องใช้ไฟฟ้า เครื่องจักร' },
  { id: 'pair', nameTh: 'คู่', nameEn: 'Pairs', category: 'general', symbol: 'คู่', example: 'รองเท้า อุปกรณ์คู่' },
  { id: 'book', nameTh: 'เล่ม', nameEn: 'Volumes / Books', category: 'general', symbol: 'เล่ม', example: 'หนังสือ นิตยสาร แคตตาล็อก' },
  { id: 'sheet', nameTh: 'แผ่น', nameEn: 'Sheets / Panels', category: 'general', symbol: 'แผ่น', example: 'ไม้อัด แผ่นเหล็ก กระจก อะคริลิก' },
  { id: 'item_general', nameTh: 'อัน', nameEn: 'Items', category: 'general', symbol: 'อัน', example: 'เครื่องมือ ของใช้ชิ้นเล็ก' },
  { id: 'container_bag', nameTh: 'ใบ', nameEn: 'Bags / Containers', category: 'general', symbol: 'ใบ', example: 'กระเป๋า ภาชนะ' },
  { id: 'strip_line', nameTh: 'เส้น', nameEn: 'Lines / Tires / Wires', category: 'general', symbol: 'เส้น', example: 'ยางรถยนต์ สายไฟ ท่อ' },

  // 2. น้ำหนัก (Weight - สำหรับขยะรีไซเคิล โลหะ ชีวมวล เศษพลาสติก การเกษตร)
  { id: 'kg', nameTh: 'กิโลกรัม (กก.)', nameEn: 'Kilograms (kg)', category: 'weight', symbol: 'กก.', example: 'เศษเหล็ก พลาสติก กระดาษ เศษอาหาร' },
  { id: 'ton', nameTh: 'ตัน (1,000 กก.)', nameEn: 'Metric Tons (t)', category: 'weight', symbol: 'ตัน', example: 'ชีวมวลเกษตร เศษเหล็กโรงงาน ข้าวโพดซัง' },
  { id: 'gram', nameTh: 'กรัม (ก.)', nameEn: 'Grams (g)', category: 'weight', symbol: 'ก.', example: 'ขยะอิเล็กทรอนิกส์ แผงวงจร' },
  { id: 'keed', nameTh: 'ขีด (100 กรัม)', nameEn: '100g (Keed)', category: 'weight', symbol: 'ขีด', example: 'เมล็ดพันธุ์ สมุนไพรแห้ง' },

  // 3. บรรจุภัณฑ์ กอง และการขนถ่าย (Packaging, Piles & Bulk Logistics)
  { id: 'sack', nameTh: 'กระสอบ', nameEn: 'Sacks (25-50 kg)', category: 'packaging', symbol: 'กระสอบ', example: 'ปุ๋ย แกลบ ขี้เลื่อย เม็ดพลาสติก' },
  { id: 'bigbag', nameTh: 'บิ๊กแบ็ค (Jumbo Bag 1 ตัน)', nameEn: 'Big Bags (1 Ton)', category: 'packaging', symbol: 'บิ๊กแบ็ค', example: 'แร่ ขี้เถ้า เม็ดพลาสติกรีไซเคิล' },
  { id: 'pallet', nameTh: 'พาเลท', nameEn: 'Pallets', category: 'packaging', symbol: 'พาเลท', example: 'พาเลทไม้ สินค้าจัดวางพาเลท' },
  { id: 'box', nameTh: 'กล่อง', nameEn: 'Boxes / Cartons', category: 'packaging', symbol: 'กล่อง', example: 'กล่องกระดาษ อุปกรณ์รวมกล่อง' },
  { id: 'crate', nameTh: 'ลัง', nameEn: 'Crates / Cases', category: 'packaging', symbol: 'ลัง', example: 'ขวดแก้ว ลังพลาสติกผลไม้' },
  { id: 'drum', nameTh: 'ถัง / บาร์เรล (200 ลิตร)', nameEn: 'Drums / Barrels (200L)', category: 'packaging', symbol: 'ถัง', example: 'น้ำมันเก่า กากน้ำตาล สารเคมีชีวภาพ' },
  { id: 'bag', nameTh: 'ถุง', nameEn: 'Bags', category: 'packaging', symbol: 'ถุง', example: 'ถุงขยะรีไซเคิล เศษโฟม' },
  { id: 'bundle', nameTh: 'มัด', nameEn: 'Bundles', category: 'packaging', symbol: 'มัด', example: 'ฟางข้าวอัดมัด เศษไม้ ลวดทองแดง' },
  { id: 'roll', nameTh: 'ม้วน', nameEn: 'Rolls', category: 'packaging', symbol: 'ม้วน', example: 'เศษผ้า สายไฟ พลาสติกชีท พรม' },
  { id: 'pile', nameTh: 'กอง', nameEn: 'Piles / Heaps', category: 'packaging', symbol: 'กอง', example: 'เศษกิ่งไม้ กองทราย กองหิน' },
  { id: 'pickup_truck', nameTh: 'คันรถกระบะ', nameEn: 'Pickup Truck Loads', category: 'packaging', symbol: 'คันกระบะ', example: 'เศษวัสดุก่อสร้าง กิ่งไม้ ขยะอินทรีย์' },
  { id: 'six_wheel_truck', nameTh: 'คันรถหกล้อ', nameEn: '6-Wheel Truckloads', category: 'packaging', symbol: 'คันหกล้อ', example: 'วัสดุรีไซเคิลโรงงาน กากอุตสาหกรรม' },
  { id: 'trailer_truck', nameTh: 'คันรถสิบล้อ/พ่วง', nameEn: '10-Wheel / Trailer Loads', category: 'packaging', symbol: 'คันสิบล้อ', example: 'ชีวมวลปริมาณมาก ชานอ้อย' },

  // 4. ความยาว พื้นที่ และปริมาตร (Dimensions, Area & Volume)
  { id: 'meter', nameTh: 'เมตร (ม.)', nameEn: 'Meters (m)', category: 'dimension_volume', symbol: 'ม.', example: 'ท่อ ผ้า ไม้เส้น สายไฟ' },
  { id: 'sq_meter', nameTh: 'ตารางเมตร (ตร.ม.)', nameEn: 'Square Meters (sq.m)', category: 'dimension_volume', symbol: 'ตร.ม.', example: 'แผ่นปูพื้น กระเบื้อง หญ้าเทียม แผ่นหลังคา' },
  { id: 'cbm', nameTh: 'ลูกบาศก์เมตร / คิว (ลบ.ม.)', nameEn: 'Cubic Meters (CBM)', category: 'dimension_volume', symbol: 'คิว', example: 'ดินปลูก ทราย เศษไม้สับ' },
  { id: 'liter', nameTh: 'ลิตร (ล.)', nameEn: 'Liters (L)', category: 'dimension_volume', symbol: 'ลิตร', example: 'น้ำมันปรุงอาหารใช้แล้ว น้ำหมักจุลินทรีย์' }
];

export const UNIT_CATEGORY_GROUPS: UnitCategoryGroup[] = [
  {
    id: 'general',
    nameTh: 'สิ่งของเครื่องใช้ทั่วไป',
    nameEn: 'General Items',
    iconName: 'Package',
    units: UNIT_OPTIONS.filter(u => u.category === 'general')
  },
  {
    id: 'weight',
    nameTh: 'น้ำหนัก (รีไซเคิล/เกษตร/โลหะ)',
    nameEn: 'Weight (kg, Tons)',
    iconName: 'Scale',
    units: UNIT_OPTIONS.filter(u => u.category === 'weight')
  },
  {
    id: 'packaging',
    nameTh: 'บรรจุภัณฑ์ กอง และการขนถ่าย',
    nameEn: 'Packaging & Logistics',
    iconName: 'Boxes',
    units: UNIT_OPTIONS.filter(u => u.category === 'packaging')
  },
  {
    id: 'dimension_volume',
    nameTh: 'ขนาด พื้นที่ และปริมาตร',
    nameEn: 'Dimensions & Volume',
    iconName: 'Ruler',
    units: UNIT_OPTIONS.filter(u => u.category === 'dimension_volume')
  }
];

// Quick popular unit presets for fast 1-click selection:
export const POPULAR_UNITS = [
  { label: 'ชิ้น', value: 'ชิ้น', desc: 'ชิ้นทั่วไป' },
  { label: 'กก.', value: 'กิโลกรัม', desc: 'กิโลกรัม' },
  { label: 'ตัน', value: 'ตัน', desc: '1,000 กิโลกรัม' },
  { label: 'กระสอบ', value: 'กระสอบ', desc: 'กระสอบ 25-50 กก.' },
  { label: 'กล่อง', value: 'กล่อง', desc: 'กล่องพัสดุ' },
  { label: 'พาเลท', value: 'พาเลท', desc: 'พาเลทสินค้า' },
  { label: 'มัด', value: 'มัด', desc: 'มัด/ห่อ' },
  { label: 'ม้วน', value: 'ม้วน', desc: 'ผ้าม้วน/สายไฟ' },
  { label: 'ตร.ม.', value: 'ตารางเมตร', desc: 'ตารางเมตร' },
  { label: 'คิว', value: 'ลูกบาศก์เมตร', desc: 'คิว / ลบ.ม.' },
  { label: 'ลิตร', value: 'ลิตร', desc: 'ของเหลว/น้ำมัน' },
  { label: 'คันรถ', value: 'คันรถกระบะ', desc: 'ขนส่งคันรถ' },
];

export interface DistanceRadiusOption {
  value: number;        // in km (0 = all / nationwide)
  labelTh: string;
  labelEn: string;
  shortLabel: string;
  descriptionTh: string;
}

export const DISTANCE_RADIUS_OPTIONS: DistanceRadiusOption[] = [
  {
    value: 0,
    labelTh: 'ไม่จำกัดระยะทาง (ทั่วไทย)',
    labelEn: 'Nationwide (Any distance)',
    shortLabel: 'ทั่วประเทศ',
    descriptionTh: 'ค้นหาและส่งมอบได้ทุกพื้นที่ทั่วประเทศไทย'
  },
  {
    value: 5,
    labelTh: 'ภายใน 5 กม. (ละแวกใกล้เคียง / เดินเท้า)',
    labelEn: 'Within 5 km (Neighborhood)',
    shortLabel: '5 กม.',
    descriptionTh: 'ระยะใกล้เคียง สะดวกนัดรับด้วยตัวเองหรือเดินเท้า'
  },
  {
    value: 15,
    labelTh: 'ภายใน 15 กม. (ในอำเภอเดียวกัน / แมสเซนเจอร์)',
    labelEn: 'Within 15 km (District / City)',
    shortLabel: '15 กม.',
    descriptionTh: 'เดินทางในเขตอำเภอหรือเมืองเดียวกัน ค่าส่งแมสเซนเจอร์ประหยัด'
  },
  {
    value: 30,
    labelTh: 'ภายใน 30 กม. (ทั้งจังหวัด / ปริมณฑล)',
    labelEn: 'Within 30 km (Metropolitan)',
    shortLabel: '30 กม.',
    descriptionTh: 'ครอบคลุมทั่วจังหวัดและพื้นที่รอยต่อปริมณฑล'
  },
  {
    value: 50,
    labelTh: 'ภายใน 50 กม. (ข้ามอำเภอ / เขตอุตสาหกรรม)',
    labelEn: 'Within 50 km (Sub-region)',
    shortLabel: '50 กม.',
    descriptionTh: 'เหมาะสำหรับขนส่งด้วยรถกระบะหรือผู้รับซื้อรีไซเคิล'
  },
  {
    value: 100,
    labelTh: 'ภายใน 100 กม. (ระดับกลุ่มจังหวัด / ภูมิภาค)',
    labelEn: 'Within 100 km (Regional)',
    shortLabel: '100 กม.',
    descriptionTh: 'เหมาะสำหรับวัสดุอุตสาหกรรม ชีวมวลเกษตร รถบรรทุกหกล้อ'
  },
  {
    value: 200,
    labelTh: 'ภายใน 200 กม. (ระหว่างภาค)',
    labelEn: 'Within 200 km (Inter-provincial)',
    shortLabel: '200 กม.',
    descriptionTh: 'ขนส่งล็อตใหญ่ด้วยรถสิบล้อหรือรถพ่วง'
  }
];

export interface MeasurementUnit {
  value: string;
  labelTh: string;
  labelEn: string;
  category: 'general' | 'weight' | 'packaging' | 'dimension' | 'industrial';
}

export const UNIT_CATEGORY_NAMES: Record<string, string> = {
  general: 'สิ่งของทั่วไป (General)',
  weight: 'น้ำหนัก (Weight/Bulk)',
  packaging: 'บรรจุภัณฑ์/กอง (Packaging)',
  dimension: 'มิติ/พื้นที่/ปริมาตร (Dimensions)'
};

export const MEASUREMENT_UNITS: MeasurementUnit[] = UNIT_OPTIONS.map(u => ({
  value: u.symbol || u.nameTh.split(' ')[0],
  labelTh: `${u.nameTh}${u.example ? ` (${u.example})` : ''}`,
  labelEn: u.nameEn,
  category: u.category === 'dimension_volume' ? 'dimension' : u.category as any
}));
