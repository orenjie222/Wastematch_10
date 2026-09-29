import { 
  User, 
  Listing, 
  WantedItem, 
  MatchRecord, 
  Conversation, 
  Deal, 
  Review, 
  AppNotification, 
  ReportItem 
} from '../types/marketplace';
import { calculateCommission } from '../utils/commission';

export const HERO_IMAGE = '/src/assets/images/marketplace_hero_circular_1790719356549.jpg';
export const CHAIR_IMAGE = '/src/assets/images/listing_office_chair_1790719370776.jpg';
export const WOOD_IMAGE = '/src/assets/images/listing_reclaimed_wood_1790719381562.jpg';
export const ESPRESSO_IMAGE = '/src/assets/images/listing_espresso_machine_1790719393151.jpg';
export const BIOMASS_IMAGE = '/src/assets/images/agri_biomass_1790721500456.jpg';
export const PLASTIC_IMAGE = '/src/assets/images/recycled_plastic_granules_1790722179621.jpg';
export const METAL_IMAGE = '/src/assets/images/scrap_metal_aluminum_1790722198202.jpg';

export const SEED_USERS: User[] = [
  {
    id: 'user_kittipong',
    name: 'กิตติพงษ์ วัฒนาเสถียร',
    organizationName: 'K-Studio Design & Upcycle',
    email: 'kittipong.w@wastematch.local',
    phone: '+66 81 923 4410',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    accountType: 'individual',
    verifiedBadges: {
      identity: true,
      phone: true,
      email: true,
      businessRegistry: false
    },
    responseRate: 98,
    responseSpeed: 'ตอบกลับภายใน 10 นาที',
    recommendationRate: 99,
    completedDeals: 19,
    reviewsCount: 17,
    rating: 4.95,
    ecoPoints: 1480,
    carbonSavedKg: 412,
    itemsReused: 26,
    location: {
      district: 'คลองเตย',
      province: 'กรุงเทพมหานคร',
      lat: 13.722,
      lng: 100.582,
    },
    bio: 'สถาปนิกและนักออกแบบภายใน สนใจวัสดุหมุนเวียน เฟอร์นิเจอร์ และงานไม้สักเก่าเพื่อนำมา upcycle',
    memberSince: 'มกราคม 2025'
  },
  {
    id: 'user_greencraft',
    name: 'GreenCraft Studio BKK',
    organizationName: 'บริษัท กรีนครราฟท์ สตูดิโอ จำกัด',
    email: 'supply@greencraft.th',
    phone: '+66 2 456 7890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    accountType: 'business',
    verifiedBadges: {
      identity: true,
      phone: true,
      email: true,
      businessRegistry: true
    },
    responseRate: 100,
    responseSpeed: 'ตอบกลับทันที (เฉลี่ย 5 นาที)',
    recommendationRate: 99,
    completedDeals: 46,
    reviewsCount: 42,
    rating: 4.98,
    ecoPoints: 3950,
    carbonSavedKg: 1380,
    itemsReused: 94,
    location: {
      district: 'บางซื่อ (บางโพ)',
      province: 'กรุงเทพมหานคร',
      lat: 13.805,
      lng: 100.521,
    },
    bio: 'ศูนย์รวบรวมไม้เก่า วัสดุก่อสร้างเหลือใช้ และโครงสร้างเหล็กเพื่อสถาปัตยกรรมยั่งยืน',
    memberSince: 'พฤศจิกายน 2024'
  },
  {
    id: 'user_mirror_fdn',
    name: 'มูลนิธิกระจกเงา (ศูนย์แบ่งต่อ)',
    organizationName: 'The Mirror Foundation Circular Hub',
    email: 'sharing@mirror.or.th',
    phone: '+66 2 973 2236',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    accountType: 'organization',
    verifiedBadges: {
      identity: true,
      phone: true,
      email: true,
      charityRegistry: true
    },
    responseRate: 97,
    responseSpeed: 'ตอบกลับภายใน 30 นาที',
    recommendationRate: 100,
    completedDeals: 168,
    reviewsCount: 154,
    rating: 5.0,
    ecoPoints: 9600,
    carbonSavedKg: 4920,
    itemsReused: 340,
    location: {
      district: 'หลักสี่',
      province: 'กรุงเทพมหานคร',
      lat: 13.887,
      lng: 100.579,
    },
    bio: 'รับบริจาคและส่งต่อสิ่งของเหลือใช้คุณภาพดีเพื่อช่วยเหลือชุมชนและนักเรียนด้อยโอกาสทั่วประเทศ',
    memberSince: 'สิงหาคม 2024'
  },
  {
    id: 'user_somchai',
    name: 'สมชาย พิพัฒน์เจริญ',
    organizationName: 'Roast & Co. Lab',
    email: 'somchai.roast@gmail.com',
    phone: '+66 89 112 3344',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    accountType: 'individual',
    verifiedBadges: {
      identity: true,
      phone: true,
      email: true
    },
    responseRate: 95,
    responseSpeed: 'ตอบกลับภายใน 1 ชั่วโมง',
    recommendationRate: 98,
    completedDeals: 12,
    reviewsCount: 10,
    rating: 4.89,
    ecoPoints: 920,
    carbonSavedKg: 240,
    itemsReused: 17,
    location: {
      district: 'วัฒนา (ทองหล่อ)',
      province: 'กรุงเทพมหานคร',
      lat: 13.734,
      lng: 100.583,
    },
    bio: 'เจ้าของคาเฟ่ กำลังปรับปรุงสาขา มีอุปกรณ์บาริสต้าและเครื่องใช้ไฟฟ้าคุณภาพสูงส่งต่อ',
    memberSince: 'ธันวาคม 2024'
  },
  {
    id: 'user_agri_coop',
    name: 'สหกรณ์การเกษตรอินทรีย์ล้านนา',
    organizationName: 'Lanna Organic Biomass Cooperative',
    email: 'contact@lanna-agri.th',
    phone: '+66 53 123 456',
    avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=200&q=80',
    accountType: 'business',
    verifiedBadges: {
      identity: true,
      phone: true,
      email: true,
      businessRegistry: true
    },
    responseRate: 96,
    responseSpeed: 'ตอบกลับภายใน 20 นาที',
    recommendationRate: 99,
    completedDeals: 28,
    reviewsCount: 25,
    rating: 4.92,
    ecoPoints: 2850,
    carbonSavedKg: 3200,
    itemsReused: 82,
    location: {
      district: 'แม่ริม',
      province: 'เชียงใหม่',
      lat: 18.916,
      lng: 98.943
    },
    bio: 'ส่งเสริมการจัดการเศษซากพืช ฟางข้าว ซังข้าวโพด และกากกาแฟ ไม่ให้เกิดการเผา เพื่อลดปัญหาฝุ่นควัน PM 2.5',
    memberSince: 'มกราคม 2025'
  },
  {
    id: 'user_recycle_hub',
    name: 'สยาม รีไซเคิล แมททีเรียลส์',
    organizationName: 'Siam Circular Polymers & Metals',
    email: 'trade@siamcircular.com',
    phone: '+66 38 678 990',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    accountType: 'business',
    verifiedBadges: {
      identity: true,
      phone: true,
      email: true,
      businessRegistry: true
    },
    responseRate: 99,
    responseSpeed: 'ตอบกลับภายใน 15 นาที',
    recommendationRate: 99,
    completedDeals: 74,
    reviewsCount: 68,
    rating: 4.96,
    ecoPoints: 6800,
    carbonSavedKg: 8500,
    itemsReused: 190,
    location: {
      district: 'เมืองระยอง',
      province: 'ระยอง',
      lat: 12.683,
      lng: 101.281
    },
    bio: 'ผู้รวบรวมและคัดแยกเกล็ดพลาสติก PET/HDPE และเศษอลูมิเนียม โลหะอุตสาหกรรมสำหรับโรงงานแปรรูป',
    memberSince: 'ตุลาคม 2024'
  }
];

// Helper to make listing with correct commission
function createSeedListing(
  item: Omit<Listing, 'commissionRate' | 'platformFee' | 'sellerNetPayout'>
): Listing {
  const comm = calculateCommission(item.price, item.transactionType, 'free');
  return {
    ...item,
    commissionRate: comm.effectiveRate,
    platformFee: comm.commissionFee,
    sellerNetPayout: comm.sellerNetPayout
  };
}

export const INITIAL_LISTINGS: Listing[] = [
  createSeedListing({
    id: 'list_chair_01',
    sellerId: 'user_kittipong',
    seller: SEED_USERS[0],
    title: 'เก้าอี้สำนักงานตามหลักสรีรศาสตร์ Ergonomic Mesh Chair',
    description: 'เก้าอี้ทำงานสรีรศาสตร์ปรับระดับได้รอบทิศทาง พนักพิงผ้าตาข่ายระบายอากาศได้ดีเยี่ยม โครงสร้างไนลอนเกรดวิศวกรรม ฐานเหล็กชุบโครเมียม สภาพดีมาก ใช้งานในสตูดิโอออกแบบเพียง 8 เดือน ไม่มีรอยฉีกขาดหรือชำรุด พร้อมส่งต่อสำหรับคนที่ต้องการเก้าอี้นั่งทำงานดูแลหลัง',
    category: 'furniture_home',
    transactionType: 'sell',
    price: 850,
    originalPrice: 3800,
    conditionGrade: 'good',
    conditionPercentage: 88,
    conditionLabel: 'สภาพ 88% ใช้งานได้ดีมาก',
    quantity: 2,
    unit: 'ตัว',
    images: [
      CHAIR_IMAGE,
      HERO_IMAGE
    ],
    location: {
      district: 'คลองเตย',
      province: 'กรุงเทพมหานคร',
      distanceKm: 2.4,
      radiusKm: 15,
      coverageArea: 'สะดวกนัดรับแนวรถไฟฟ้า BTS พร้อมพงษ์-ทองหล่อ หรือจัดส่งแมสเซนเจอร์ใน กทม.'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'ตรงกับความต้องการในรายการตามหา (เก้าอี้สำนักงาน)',
        'ระยะทางใกล้เพียง 2.4 กม. (สะดวกนัดรับ)',
        'ราคาอยู่ในงบประมาณ (< ฿1,500)',
        'ผู้ขายได้รับการยืนยันตัวตน และอัตราตอบกลับไว 98%'
      ],
      compatibilityScore: 94,
      categoryMatch: true,
      distanceKm: 2.4,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 142,
    saves: 28,
    interestedCount: 6,
    createdAt: '2026-09-28T09:15:00Z',
    updatedAt: '2026-09-28T09:15:00Z'
  }),

  createSeedListing({
    id: 'list_wood_02',
    sellerId: 'user_greencraft',
    seller: SEED_USERS[1],
    title: 'ไม้สักทองเก่า Reclaimed Teak Planks ขัดผิวพร้อมใช้งาน',
    description: 'ไม้สักทองเก่าแท้จากโครงการรื้อถอนอาคารอนุรักษ์ คัดเกรดเฉพาะไม้เนื้อแน่น ไร้มอดปลวก ผ่านกระบวนการอบแห้งและขัดไสเรียบร้อย ขนาดหน้ากว้าง 6 นิ้ว หนา 1 นิ้ว ความยาว 2.0-2.4 เมตร เหมาะสำหรับงานปูพื้น ท็อปโต๊ะ หรือตกแต่งผนังสไตล์โมเดิร์นคราฟท์',
    category: 'wood',
    transactionType: 'swap',
    price: 0,
    originalPrice: 12000,
    conditionGrade: 'raw_material',
    conditionPercentage: 92,
    conditionLabel: 'สภาพ 92% ไม้เก่าคัดเกรดเนื้อแน่น',
    quantity: 45,
    unit: 'แผ่น',
    images: [
      WOOD_IMAGE,
      HERO_IMAGE
    ],
    location: {
      district: 'บางซื่อ (บางโพ)',
      province: 'กรุงเทพมหานคร',
      distanceKm: 5.8,
      radiusKm: 30,
      coverageArea: 'สะดวกนัดรับที่โรงไม้บางโพ หรือจัดส่งรถกระบะทั่วกรุงเทพฯ-ปริมณฑล'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'หมวดหมู่วัสดุหมุนเวียนตรงกับสิ่งที่คุณกำลังสร้างโปรเจกต์',
        'ผู้ขายยินดีรับแลกกับวัสดุงานเหล็ก หรือเครื่องมืองานช่าง',
        'ผ่านการตรวจประเมินคุณภาพและรับรองความชื้นไม้แล้ว',
        'ลดการตัดไม้ใหม่ คิดเป็นคาร์บอนเครดิตเทียบเท่า 180 kg CO2e'
      ],
      compatibilityScore: 91,
      categoryMatch: true,
      distanceKm: 5.8,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 298,
    saves: 64,
    interestedCount: 14,
    createdAt: '2026-09-27T14:20:00Z',
    updatedAt: '2026-09-27T14:20:00Z'
  }),

  createSeedListing({
    id: 'list_coffee_03',
    sellerId: 'user_somchai',
    seller: SEED_USERS[3],
    title: 'เครื่องชงกาแฟเอสเปรสโซสเตนเลส Semi-Commercial Dual Boiler',
    description: 'เครื่องชงกาแฟระบบ 2 หม้อต้ม สเตนเลสสตีลเกรด 304 สภาพดีเยี่ยม อุ่นเครื่องเร็ว แรงดันเสถียร 9 บาร์ เหมาะสำหรับเปิดบาร์กาแฟขนาดเล็ก สตูดิโอ หรือใช้งานในบ้าน บำรุงรักษาโดยศูนย์บริการสม่ำเสมอ มีด้ามชง 58mm และตะแกรงคัดไซส์ให้ครบชุด',
    category: 'business_office',
    transactionType: 'sell',
    price: 18500,
    originalPrice: 45000,
    conditionGrade: 'good',
    conditionPercentage: 85,
    conditionLabel: 'สภาพ 85% บำรุงรักษาดี สเตนเลสสวย',
    quantity: 1,
    unit: 'เครื่อง',
    images: [
      ESPRESSO_IMAGE,
      HERO_IMAGE
    ],
    location: {
      district: 'วัฒนา (ทองหล่อ)',
      province: 'กรุงเทพมหานคร',
      distanceKm: 3.1,
      radiusKm: 25,
      coverageArea: 'ทดลองชงและตรวจเช็คเครื่องได้ที่หน้าร้านทองหล่อ หรือนัดส่งในรัศมี 25 กม.'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'รายการเครื่องใช้ไฟฟ้าและเครื่องจักรที่ได้รับความสนใจสูง',
        'ระยะทางเพียง 3.1 กม. ในโซนสุขุมวิท',
        'ราคาประหยัดกว่าของใหม่อย่างน้อย 58%',
        'ผู้ขายส่งมอบแล้ว 12 ครั้ง แนะนำบอกต่อ 98%'
      ],
      compatibilityScore: 89,
      categoryMatch: true,
      distanceKm: 3.1,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 412,
    saves: 85,
    interestedCount: 18,
    createdAt: '2026-09-26T11:00:00Z',
    updatedAt: '2026-09-26T11:00:00Z'
  }),

  createSeedListing({
    id: 'list_biomass_04',
    sellerId: 'user_agri_coop',
    seller: SEED_USERS[4],
    title: 'ฟางข้าวอัดก้อนและซังข้าวโพดบดละเอียดสำหรับเพาะเห็ดและคลุมดิน (5 ตัน)',
    description: 'เศษซากพืชชีวมวลจากแปลงเกษตรอินทรีย์ ปราศจากสารเคมีตกค้างและไม่ผ่านการเผา ฟางแห้งความชื้นต่ำกว่า 14% อัดก้อนแน่น 15 กก./ก้อน เหมาะสำหรับกลุ่มเกษตรกรเพาะเห็ดฟาง คลุมแปลงพืช หรือนำไปแปรรูปเป็นเชื้อเพลิงชีวมวลอัดเม็ด',
    category: 'agricultural_waste',
    transactionType: 'sell',
    price: 6500,
    originalPrice: 11000,
    conditionGrade: 'raw_material',
    conditionPercentage: 95,
    conditionLabel: 'สภาพ 95% แห้งสะอาด ไร้สารเคมี',
    quantity: 5,
    unit: 'ตัน',
    images: [
      BIOMASS_IMAGE
    ],
    location: {
      district: 'แม่ริม',
      province: 'เชียงใหม่',
      distanceKm: 14.2,
      radiusKm: 50,
      coverageArea: 'บริการส่งด้วยรถหกล้อในเขตเชียงใหม่-ลำพูน หรือมารับที่สหกรณ์'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'โครงการลดการเผาในที่โล่งเพื่อลดมลพิษฝุ่นควันภาคเหนือ',
        'วัสดุชีวมวลคุณภาพสูง คัดแยกความชื้นได้ตามมาตรฐาน',
        'ซื้อตรงจากกลุ่มสหกรณ์ชุมชน เกษตรกรได้รับรายได้เต็มจำนวน',
        'ลดการปล่อยก๊าซเรือนกระจกได้กว่า 4,200 kg CO2e'
      ],
      compatibilityScore: 93,
      categoryMatch: true,
      distanceKm: 14.2,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 310,
    saves: 52,
    interestedCount: 11,
    createdAt: '2026-09-26T08:00:00Z',
    updatedAt: '2026-09-26T08:00:00Z'
  }),

  createSeedListing({
    id: 'list_plastic_05',
    sellerId: 'user_recycle_hub',
    seller: SEED_USERS[5],
    title: 'เกล็ดพลาสติกรีไซเคิล rPET Flakes ล้างสะอาดพร้อมขึ้นรูป (1,000 กก.)',
    description: 'เกล็ดพลาสติกชนิด rPET ใส (Clear Flakes) จากขวดบรรจุภัณฑ์เครื่องดื่ม ผ่านการบด ล้างน้ำร้อนแยกกาว และคัดแยกสิ่งแปลกปลอมด้วยระบบ Optical Sorter ค่าความชื้น < 1% เหมาะสำหรับโรงงานฉีดพลาสติก เส้นใยโพลีเอสเตอร์ หรือผลิตแผ่นชีทบรรจุภัณฑ์',
    category: 'plastic',
    transactionType: 'sell',
    price: 24000,
    originalPrice: 32000,
    conditionGrade: 'raw_material',
    conditionPercentage: 98,
    conditionLabel: 'สภาพ 98% สะอาดมาตรฐานอุตสาหกรรม',
    quantity: 1,
    unit: 'ตัน',
    images: [
      PLASTIC_IMAGE
    ],
    location: {
      district: 'เมืองระยอง',
      province: 'ระยอง',
      distanceKm: 160.0,
      radiusKm: 100,
      coverageArea: 'ส่งมอบด้วยรถบรรทุกครอบคลุมเขต EEC ระยอง ชลบุรี ฉะเชิงเทรา'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'วัสดุเกรดอุตสาหกรรม เข้าเกณฑ์ค่าคอมมิชชั่นขั้นต่ำสุด 10% (มูลค่า ฿20,000+)',
        'มีใบรับรองผลตรวจ Lab และ MSDS ชัดเจน',
        'ส่งมอบตรงจากศูนย์คัดแยกในนิคมอุตสาหกรรมระยอง',
        'ผู้ขายตอบกลับเฉลี่ยไว 15 นาที ยืนยันเอกสารธุรกิจครบถ้วน'
      ],
      compatibilityScore: 96,
      categoryMatch: true,
      distanceKm: 160.0,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 640,
    saves: 95,
    interestedCount: 22,
    createdAt: '2026-09-25T14:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z'
  }),

  createSeedListing({
    id: 'list_metal_06',
    sellerId: 'user_recycle_hub',
    seller: SEED_USERS[5],
    title: 'เศษอลูมิเนียมแผ่นและชิ้นงานตัดขอบเกรด 6061 อัดมัดเรียบร้อย',
    description: 'เศษอลูมิเนียมอุตสาหกรรม สะอาด ปราศจากสิ่งเจือปนเหล็กและน้ำมันหล่อลื่น มัดเป็นก้อนขนาดมาตรฐานพร้อมชั่งน้ำหนัก ชนิดเกรด 6061-T6 ค่าความบริสุทธิ์สูง เหมาะสำหรับโรงหลอมหรือโรงรีไซเคิลโลหะ สามารถนัดเข้าดูหน้างานได้',
    category: 'iron_metal',
    transactionType: 'sell',
    price: 38000,
    originalPrice: 48000,
    conditionGrade: 'raw_material',
    conditionPercentage: 100,
    conditionLabel: 'สภาพ 100% เศษโลหะอุตสาหกรรมเกรดบริสุทธิ์',
    quantity: 800,
    unit: 'กิโลกรัม',
    images: [
      METAL_IMAGE
    ],
    location: {
      district: 'เมืองระยอง',
      province: 'ระยอง',
      distanceKm: 160.0,
      radiusKm: 150,
      coverageArea: 'รองรับการขนถ่ายเข้าโรงหลอมทั่วภาคตะวันออกและกรุงเทพฯ'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'อัตราค่าธรรมเนียมแพลตฟอร์มต่ำสุด 10% (ตามเกณฑ์ยอดสูงเกิน ฿20,000)',
        'ตรงกับความต้องการของโรงหลอมในเครือข่าย Circular Network',
        'เอกสารใบกำกับการขนส่ง (DIW Manifest) ออกให้ถูกต้อง',
        'ผู้ขายส่งมอบสำเร็จ 74 รายการ ไร้ประวัติข้อพิพาท'
      ],
      compatibilityScore: 95,
      categoryMatch: true,
      distanceKm: 160.0,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 490,
    saves: 78,
    interestedCount: 16,
    createdAt: '2026-09-25T10:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z'
  }),

  createSeedListing({
    id: 'list_boxes_07',
    sellerId: 'user_mirror_fdn',
    seller: SEED_USERS[2],
    title: 'กล่องกระดาษลูกฟูก 5 ชั้นสภาพสะอาด สำหรับย้ายบ้านหรือคลังสินค้า (200 กล่อง)',
    description: 'กล่องกระดาษลูกฟูกหนา 5 ชั้น แข็งแรงรับน้ำหนักได้ 25-30 กก. ต่อกล่อง ใช้บรรจุสินค้าแห้งเพียงครั้งเดียว สะอาดมาก ไม่มีกลิ่นอับ พับเก็บแบนราบพร้อมขนส่ง แจกฟรีสำหรับองค์กรไม่แสวงหากำไร หรือส่งต่อเพื่อส่งเสริมการนำกลับมาใช้ซ้ำ',
    category: 'packaging_materials',
    transactionType: 'free',
    price: 0,
    originalPrice: 6000,
    conditionGrade: 'like_new',
    conditionPercentage: 92,
    conditionLabel: 'สภาพ 92% สะอาดเหมือนใหม่',
    quantity: 200,
    unit: 'กล่อง',
    images: [
      HERO_IMAGE
    ],
    location: {
      district: 'หลักสี่',
      province: 'กรุงเทพมหานคร',
      distanceKm: 8.5,
      radiusKm: 20,
      coverageArea: 'นัดรับที่มูลนิธิกระจกเงา หลักสี่ หรือส่งผ่านขนส่งเอกชน'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'รายการแจกฟรี (Free) ยกเว้นค่าธรรมเนียม 100% เพื่อลดขยะบรรจุภัณฑ์',
        'ตรงกับความต้องการของกลุ่มคนย้ายที่พักหรือพ่อค้าแม่ค้าออนไลน์',
        'ส่งมอบโดยองค์กรมูลนิธิที่ได้รับการรับรองโปร่งใส',
        'ลดการผลิตกล่องใหม่ ช่วยประหยัดคาร์บอนได้กว่า 95 kg CO2e'
      ],
      compatibilityScore: 97,
      categoryMatch: true,
      distanceKm: 8.5,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 520,
    saves: 110,
    interestedCount: 32,
    createdAt: '2026-09-25T16:45:00Z',
    updatedAt: '2026-09-25T16:45:00Z'
  }),

  createSeedListing({
    id: 'list_textiles_08',
    sellerId: 'user_kittipong',
    seller: SEED_USERS[0],
    title: 'เศษผ้ายีนส์เดนิมคอตตอนแท้ 100% สำหรับงานบริจาควิสาหกิจชุมชน (40 กก.)',
    description: 'ผ้ายีนส์หนา 12-14 ออนซ์ สีอินดิโก้และฟอกสนิม เศษผ้าชิ้นใหญ่ขนาด 0.5 - 1.5 เมตร จากโรงตัดเย็บเสื้อผ้าแฟชั่น ไม่ใช่เศษผอย จุดประสงค์รายการนี้มีไว้เพื่อ "บริจาคให้มูลนิธิ/องค์กรสาธารณกุศล" นำไปสอนอาชีพและสร้างรายได้แก่กลุ่มแม่บ้านเท่านั้น ห้ามนำไปจำหน่ายต่อ',
    category: 'fabric_textile',
    transactionType: 'donate',
    price: 0,
    originalPrice: 4800,
    conditionGrade: 'raw_material',
    conditionPercentage: 90,
    conditionLabel: 'สภาพ 90% เศษผ้าสะอาดผืนใหญ่',
    quantity: 40,
    unit: 'กิโลกรัม',
    images: [
      HERO_IMAGE
    ],
    location: {
      district: 'คลองเตย',
      province: 'กรุงเทพมหานคร',
      distanceKm: 2.4,
      radiusKm: 15,
      coverageArea: 'สะดวกนัดรับย่านคลองเตย หรือส่งมอบที่ศูนย์รับบริจาค'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'รายการบริจาคเพื่อสังคม (Donate) เฉพาะมูลนิธิ/องค์กรกุศลเท่านั้น',
        'ยกเว้นค่าคอมมิชชั่นแพลตฟอร์ม 0%',
        'ลดการนำผ้าไปเผาทำลายในเตาขยะอุตสาหกรรม',
        'ผู้ส่งต่อมีประวัติการบริจาคโปร่งใส สมาชิกตั้งแต่ต้นปี 2025'
      ],
      compatibilityScore: 94,
      categoryMatch: true,
      distanceKm: 2.4,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 240,
    saves: 45,
    interestedCount: 12,
    createdAt: '2026-09-24T10:30:00Z',
    updatedAt: '2026-09-24T10:30:00Z'
  }),

  createSeedListing({
    id: 'list_books_09',
    sellerId: 'user_mirror_fdn',
    seller: SEED_USERS[2],
    title: 'ชุดหนังสือวรรณกรรมเยาวชน สารคดี และแบบเรียนภาษาอังกฤษเสริมทักษะ (60 เล่ม)',
    description: 'หนังสือสภาพดีมาก กระดาษถนอมสายตา ไม่มีรอยขีดเขียน คัดแยกชุดพร้อมส่งมอบให้ห้องสมุดชุมชนหรือโรงเรียนในชนบท โครงการเปิดรับการส่งต่อแบบบริจาคเท่านั้น',
    category: 'used_school_materials',
    transactionType: 'donate',
    price: 0,
    originalPrice: 15000,
    conditionGrade: 'good',
    conditionPercentage: 85,
    conditionLabel: 'สภาพ 85% กระดาษสมบูรณ์ ไร้รอยขีดเขียน',
    quantity: 60,
    unit: 'เล่ม',
    images: [
      HERO_IMAGE
    ],
    location: {
      district: 'หลักสี่',
      province: 'กรุงเทพมหานคร',
      distanceKm: 8.5,
      radiusKm: 0,
      coverageArea: 'บริการจัดส่งพัสดุการศึกษาฟรีทั่วประเทศไทย'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'บริจาคเพื่อการศึกษาเด็กด้อยโอกาส (Non-Profit Donation)',
        'โครงการภายใต้มูลนิธิกระจกเงา มีเอกสารการรับบริจาคถูกต้อง',
        'คัดแยกคุณภาพแล้ว 100% พร้อมใช้งานทันที',
        'คะแนนแนะนำองค์กร 100% เต็ม'
      ],
      compatibilityScore: 98,
      categoryMatch: true,
      distanceKm: 8.5,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 380,
    saves: 88,
    interestedCount: 19,
    createdAt: '2026-09-24T08:00:00Z',
    updatedAt: '2026-09-24T08:00:00Z'
  })
];

export const INITIAL_WANTED: WantedItem[] = [
  {
    id: 'wanted_01',
    userId: 'user_kittipong',
    user: SEED_USERS[0],
    title: 'ตามหาเก้าอี้ทำงานสรีรศาสตร์ หรือโครงเก้าอี้สำนักงานสภาพโครงสร้างแข็งแรง',
    category: 'furniture_home',
    quantity: 2,
    unit: 'ตัว',
    budget: 1500,
    location: {
      district: 'คลองเตย',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 15,
      coverageArea: 'สะดวกนัดรับของในเขตสุขุมวิท คลองเตย หรือใกล้สถานี BTS'
    },
    description: 'ต้องการเก้าอี้นั่งทำงานปรับระดับได้ สำหรับสตูดิโอฝึกงาน สภาพโครงสร้างไม่แตกหัก หากมีรอยถลอกเล็กน้อยรับได้ ยินดีรับของด้วยตัวเอง',
    expirationDate: '15 ต.ค. 2026',
    matchingListingsCount: 3,
    createdAt: '2026-09-27T08:00:00Z'
  },
  {
    id: 'wanted_02',
    userId: 'user_greencraft',
    user: SEED_USERS[1],
    title: 'รับแลกไม้เก่าหรือเศษไม้เนื้อแข็ง แลกกับงานโครงสร้างเหล็กกล่อง',
    category: 'wood',
    quantity: 30,
    unit: 'แผ่น',
    budget: 0,
    location: {
      district: 'บางซื่อ',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 30,
      coverageArea: 'มีรถกระบะพร้อมวิ่งไปขนส่งเองในเขตกรุงเทพฯ และนนทบุรี'
    },
    description: 'มีเหล็กโครงสร้างเหลือใช้จากไซต์งาน ต้องการแลกเปลี่ยนกับไม้สัก ไม้แดง หรือไม้เต็ง เพื่อนำมาทำท็อปโต๊ะกาแฟและงานตกแต่งภายใน',
    expirationDate: '20 ต.ค. 2026',
    matchingListingsCount: 5,
    createdAt: '2026-09-26T12:00:00Z'
  },
  {
    id: 'wanted_03',
    userId: 'user_mirror_fdn',
    user: SEED_USERS[2],
    title: 'รับบริจาคกล่องพัสดุ กระดาษลูกฟูก และอุปกรณ์แพ็คเกจจิ้งเพื่อส่งต่อของบริจาค',
    category: 'packaging_materials',
    quantity: 500,
    unit: 'กล่อง',
    budget: 0,
    location: {
      district: 'หลักสี่',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 50,
      coverageArea: 'ยินดีรับของบริจาคทั้งที่มูลนิธิ หรือส่งผ่านพัสดุไปรษณีย์ทั่วไทย'
    },
    description: 'มูลนิธิต้องการกล่องกระดาษสะอาดเพื่อบรรจุเครื่องนุ่งห่มและอุปกรณ์การเรียนส่งต่อให้โรงเรียน ตชด. ทั่วประเทศ',
    expirationDate: '30 ต.ค. 2026',
    matchingListingsCount: 2,
    createdAt: '2026-09-25T09:30:00Z'
  }
];

export const INITIAL_MATCHES: MatchRecord[] = [
  {
    id: 'match_01',
    listingId: 'list_chair_01',
    listing: INITIAL_LISTINGS[0],
    buyerId: 'user_somchai',
    sellerId: 'user_kittipong',
    buyer: SEED_USERS[3],
    seller: SEED_USERS[0],
    matchReason: 'สมชายกำลังมองหาเก้าอี้สำนักงานในระยะ 5 กม. และกิตติพงษ์มีเก้าอี้ Mesh Chair ตรงสเปก',
    status: 'negotiating',
    createdAt: '2026-09-28T10:30:00Z'
  },
  {
    id: 'match_02',
    listingId: 'list_wood_02',
    listing: INITIAL_LISTINGS[1],
    buyerId: 'user_kittipong',
    sellerId: 'user_greencraft',
    buyer: SEED_USERS[0],
    seller: SEED_USERS[1],
    matchReason: 'กิตติพงษ์มีเศษผ้ายีนส์และงานออกแบบที่ GreenCraft สนใจแลกเปลี่ยนกับไม้สักเก่า',
    status: 'matched',
    createdAt: '2026-09-27T16:00:00Z'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_01',
    matchId: 'match_01',
    listingId: 'list_chair_01',
    listing: INITIAL_LISTINGS[0],
    buyerId: 'user_somchai',
    sellerId: 'user_kittipong',
    otherUser: SEED_USERS[3],
    lastMessage: 'สวัสดีครับ สนใจเก้าอี้ Mesh Chair ครับ นัดรับวันพรุ่งนี้บ่ายสองสะดวกไหมครับ?',
    lastMessageAt: '10:45 น.',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_01',
        conversationId: 'conv_01',
        senderId: 'system',
        senderName: 'WasteMatch Matchmaker',
        type: 'system',
        content: 'ยินดีด้วย! คุณทั้งสองมีความสนใจตรงกันในรายการเก้าอี้สำนักงาน Ergonomic Mesh Chair ระบบเปิดห้องแชทเพื่อเจรจาส่งมอบแล้ว',
        createdAt: '2026-09-28T10:30:00Z'
      },
      {
        id: 'msg_02',
        conversationId: 'conv_01',
        senderId: 'user_somchai',
        senderName: 'สมชาย พิพัฒน์เจริญ',
        type: 'text',
        content: 'สวัสดีครับ สนใจเก้าอี้ Mesh Chair ครับ นัดรับวันพรุ่งนี้บ่ายสองสะดวกไหมครับ?',
        createdAt: '2026-09-28T10:32:00Z'
      },
      {
        id: 'msg_03',
        conversationId: 'conv_01',
        senderId: 'user_somchai',
        senderName: 'สมชาย พิพัฒน์เจริญ',
        type: 'offer',
        content: 'ยื่นข้อเสนอซื้อสินค้าในราคา ฿800 (ค่าคอมมิชชั่นระบบคำนวณอัตโนมัติ 15%)',
        offerData: {
          offerId: 'off_01',
          type: 'price',
          amount: 800,
          status: 'pending',
          note: 'นัดรับสินค้าด้วยตนเองที่สตูดิโอคลองเตย'
        },
        createdAt: '2026-09-28T10:33:00Z'
      }
    ]
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal_01',
    matchId: 'match_01',
    listingId: 'list_chair_01',
    listing: INITIAL_LISTINGS[0],
    buyerId: 'user_somchai',
    sellerId: 'user_kittipong',
    buyer: SEED_USERS[3],
    seller: SEED_USERS[0],
    agreedPrice: 850,
    commissionFee: 127.50, // 15%
    sellerPayout: 722.50,
    transactionType: 'sell',
    deliveryMethod: 'pickup',
    status: 'deal_confirmed',
    handover: {
      scheduledDate: '2026-09-30',
      scheduledTime: '14:00',
      meetingLocation: 'K-Studio Design ซอยสุขุมวิท 26 คลองเตย กรุงเทพฯ',
      safeZoneName: 'Community Exchange Point - Sukhumvit Hub',
      safetyChecklistAgreed: true,
      confirmationCode: 'WM-8492'
    },
    buyerConfirmed: true,
    sellerConfirmed: true,
    hasBuyerReviewed: false,
    hasSellerReviewed: false,
    createdAt: '2026-09-28T11:00:00Z',
    updatedAt: '2026-09-28T11:30:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    dealId: 'deal_prev_01',
    listingId: 'list_chair_01',
    reviewerId: 'user_greencraft',
    reviewer: SEED_USERS[1],
    targetUserId: 'user_kittipong',
    rating: 5,
    comment: 'คุณกิตติพงษ์ตรงเวลามาก วัสดุสภาพตรงตามที่ลงประกาศไว้ 100% สภาพดีเยี่ยม อัธยาศัยดี แนะนำเลยครับ!',
    tags: ['ตรงต่อเวลา', 'สภาพตรงปก', 'ตอบกลับรวดเร็ว', 'จัดการมืออาชีพ'],
    createdAt: '2026-09-20T15:00:00Z'
  },
  {
    id: 'rev_02',
    dealId: 'deal_prev_02',
    listingId: 'list_wood_02',
    reviewerId: 'user_somchai',
    reviewer: SEED_USERS[3],
    targetUserId: 'user_greencraft',
    rating: 5,
    comment: 'ไม้เก่าขัดเนียน คุณภาพเยี่ยมมาก ช่วยประหยัดต้นทุนงานรีโนเวทคาเฟ่ได้เยอะ บริการจัดส่งเร็วมากครับ',
    tags: ['วัสดุพรีเมียม', 'ลดคาร์บอนจริง', 'แพ็คเกจแน่นหนา'],
    createdAt: '2026-09-18T11:30:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    userId: 'user_kittipong',
    type: 'match',
    title: 'มีรายการแมตช์ใหม่!',
    body: 'คุณสมชาย สนใจเก้าอี้สำนักงาน Ergonomic Mesh Chair ของคุณ',
    referenceId: 'match_01',
    targetTab: 'matches',
    read: false,
    createdAt: '2026-09-28T10:30:00Z'
  },
  {
    id: 'notif_02',
    userId: 'user_kittipong',
    type: 'offer',
    title: 'ได้รับข้อเสนอใหม่ ฿800',
    body: 'คุณสมชาย ยื่นข้อเสนอราคาสำหรับเก้าอี้ทำงาน',
    referenceId: 'conv_01',
    targetTab: 'chat',
    read: false,
    createdAt: '2026-09-28T10:33:00Z'
  }
];

export const INITIAL_REPORTS: ReportItem[] = [];
