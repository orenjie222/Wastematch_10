import { 
  User, 
  Listing, 
  WantedItem, 
  MatchRecord, 
  Conversation, 
  Deal, 
  Review, 
  AppNotification, 
  ReportItem,
  ListingCategory
} from '../types/marketplace';
import { calculateCommission } from '../utils/commission';

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80';
export const CHAIR_IMAGE = 'https://images.unsplash.com/photo-1580481077494-e3299ac25e94?auto=format&fit=crop&w=800&q=80';
export const WOOD_IMAGE = 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80';
export const ESPRESSO_IMAGE = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80';
export const BIOMASS_IMAGE = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
export const PLASTIC_IMAGE = 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80';
export const METAL_IMAGE = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80';
export const ELECTRONICS_IMAGE = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';
export const GARDEN_IMAGE = 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80';
export const CONSTRUCTION_IMAGE = 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80';
export const BOXES_IMAGE = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
export const TEXTILE_IMAGE = 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80';
export const BOOKS_IMAGE = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80';
export const BICYCLE_IMAGE = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80';
export const KITCHEN_IMAGE = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80';
export const CLOTHES_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80';
export const GLASS_BOTTLES_IMAGE = 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80';
export const ORGANIC_COMPOST_IMAGE = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80';
export const PALLET_WOOD_IMAGE = 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80';
export const BABY_IMAGE = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80';
export const AUTO_IMAGE = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80';
export const RECYCLE_GENERAL_IMAGE = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80';
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';

export const CATEGORY_DEFAULT_IMAGES: Record<ListingCategory, string> = {
  furniture_home: CHAIR_IMAGE,
  clothing_fashion: CLOTHES_IMAGE,
  electronics: ELECTRONICS_IMAGE,
  household_items: KITCHEN_IMAGE,
  books_stationery: BOOKS_IMAGE,
  used_school_materials: BOOKS_IMAGE,
  baby_kids: BABY_IMAGE,
  sports_outdoor: BICYCLE_IMAGE,
  hobbies_collectibles: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  automotive: AUTO_IMAGE,
  plants_gardening: GARDEN_IMAGE,
  business_office: ESPRESSO_IMAGE,
  agricultural_waste: BIOMASS_IMAGE,
  agricultural_materials: ORGANIC_COMPOST_IMAGE,
  packaging_materials: BOXES_IMAGE,
  paper_cardboard: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
  plastic: PLASTIC_IMAGE,
  glass: GLASS_BOTTLES_IMAGE,
  wood: WOOD_IMAGE,
  fabric_textile: TEXTILE_IMAGE,
  iron_metal: METAL_IMAGE,
  recyclable_materials: RECYCLE_GENERAL_IMAGE,
  industrial_materials: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  construction_materials: CONSTRUCTION_IMAGE
};

export const getCategoryDefaultImage = (category?: ListingCategory | string): string => {
  if (category && (category as ListingCategory) in CATEGORY_DEFAULT_IMAGES) {
    return CATEGORY_DEFAULT_IMAGES[category as ListingCategory];
  }
  return FALLBACK_IMAGE;
};

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
      BOXES_IMAGE
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
      TEXTILE_IMAGE
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
      BOOKS_IMAGE
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
  }),

  createSeedListing({
    id: 'list_server_10',
    sellerId: 'user_somchai',
    seller: SEED_USERS[3],
    title: 'เซิร์ฟเวอร์แร็คและอุปกรณ์เครือข่าย Cisco Switch 24-Port สภาพใช้งานในดาต้าเซ็นเตอร์',
    description: 'อุปกรณ์ไอทีและเซิร์ฟเวอร์สำรองใช้งานในองค์กร ปลดประจำการตามรอบการอัปเกรด ทดสอบระบบไฟและการทำงานแล้วสมบูรณ์ เหมาะสำหรับห้องแล็บ โรงเรียน หรือบริษัทสตาร์ทอัพ',
    category: 'electronics',
    transactionType: 'sell',
    price: 4500,
    originalPrice: 18000,
    conditionGrade: 'good',
    conditionPercentage: 86,
    conditionLabel: 'สภาพ 86% ทดสอบระบบสมบูรณ์',
    quantity: 4,
    unit: 'เครื่อง',
    images: [ELECTRONICS_IMAGE],
    location: {
      district: 'พญาไท',
      province: 'กรุงเทพมหานคร',
      distanceKm: 6.2,
      radiusKm: 20,
      coverageArea: 'นัดรับที่อาคารสำนักงานพญาไท หรือจัดส่งแมสเซนเจอร์'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'หมวดหมู่อุปกรณ์ไอทีและอิเล็กทรอนิกส์ตรงกับความสนใจ',
        'ราคาประหยัดกว่าของใหม่ถึง 75%',
        'ผ่านการทดสอบระบบพอร์ตเชื่อมต่อโดยช่างผู้ชำนาญ',
        'ผู้ขายตอบกลับไวและได้รับการยืนยันตัวตน'
      ],
      compatibilityScore: 92,
      categoryMatch: true,
      distanceKm: 6.2,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 185,
    saves: 34,
    interestedCount: 7,
    createdAt: '2026-09-23T11:00:00Z',
    updatedAt: '2026-09-23T11:00:00Z'
  }),

  createSeedListing({
    id: 'list_pots_11',
    sellerId: 'user_greencraft',
    seller: SEED_USERS[1],
    title: 'กระถางเซรามิกและวัสดุกรีนรูฟสำหรับจัดสวนแนวตั้ง (50 ชุด)',
    description: 'กระถางปลูกต้นไม้เซรามิกและชุดโครงสร้างกรีนรูฟเหลือจากโครงการจัดสวนอาคารสำนักงาน สภาพสวยงามไม่แตกร้าว พร้อมระบบน้ำหยดติดตั้งเบื้องต้น',
    category: 'plants_gardening',
    transactionType: 'free',
    price: 0,
    originalPrice: 7500,
    conditionGrade: 'like_new',
    conditionPercentage: 94,
    conditionLabel: 'สภาพ 94% เหมือนใหม่',
    quantity: 50,
    unit: 'ชุด',
    images: [GARDEN_IMAGE],
    location: {
      district: 'จตุจักร',
      province: 'กรุงเทพมหานคร',
      distanceKm: 7.8,
      radiusKm: 25,
      coverageArea: 'รับของได้ที่คลังสินค้าจตุจักร หรือจัดส่งรถกระบะ'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'รายการแจกฟรี (Free Item) ไม่มีค่าธรรมเนียมแพลตฟอร์ม',
        'เหมาะสำหรับโครงการสวนหย่อมและพื้นที่สีเขียวในเมือง',
        'ผู้ขายจัดเก็บในที่ร่มอย่างดี สภาพเหมือนใหม่',
        'ช่วยส่งเสริมพื้นที่สีเขียวเมืองและลดขยะวัสดุจัดสวน'
      ],
      compatibilityScore: 95,
      categoryMatch: true,
      distanceKm: 7.8,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 310,
    saves: 72,
    interestedCount: 15,
    createdAt: '2026-09-22T09:15:00Z',
    updatedAt: '2026-09-22T09:15:00Z'
  }),

  createSeedListing({
    id: 'list_con_12',
    sellerId: 'user_agri_coop',
    seller: SEED_USERS[4],
    title: 'อิฐมวลเบาและเศษวัสดุก่อสร้างคัดแยกขนาด สำหรับงานถมปรับพื้นที่ (10 พาเลท)',
    description: 'อิฐมวลเบาตัดเศษและวัสดุก่อสร้างไม่ปนเปื้อนสารเคมี เหมาะสำหรับงานถมพื้น ปรับระดับฐานราก หรือนำไปบดเป็นวัสดุผสมคอนกรีตรักษ์โลก',
    category: 'construction_materials',
    transactionType: 'sell',
    price: 3200,
    originalPrice: 9000,
    conditionGrade: 'raw_material',
    conditionPercentage: 88,
    conditionLabel: 'สภาพ 88% คัดแยกสะอาด',
    quantity: 10,
    unit: 'พาเลท',
    images: [CONSTRUCTION_IMAGE],
    location: {
      district: 'ลำลูกกา',
      province: 'ปทุมธานี',
      distanceKm: 22.5,
      radiusKm: 60,
      coverageArea: 'บริการจัดส่งด้วยรถบรรทุก 6 ล้อในเขตปทุมธานีและกรุงเทพฯ รอบนอก'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'วัสดุก่อสร้างหมุนเวียนช่วยประหยัดต้นทุนโครงการกว่า 60%',
        'จัดส่งโดยรถบรรทุกพร้อมยกเทลงหน้างาน',
        'ลดปริมาณเศษปูนลงสู่บ่อฝังกลบ',
        'ยืนยันตัวตนนิติบุคคลเกษตรกรและอุตสาหกรรม'
      ],
      compatibilityScore: 90,
      categoryMatch: true,
      distanceKm: 22.5,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 195,
    saves: 38,
    interestedCount: 9,
    createdAt: '2026-09-21T14:30:00Z',
    updatedAt: '2026-09-21T14:30:00Z'
  }),

  createSeedListing({
    id: 'list_cookware_13',
    sellerId: 'user_somchai',
    seller: SEED_USERS[3],
    title: 'ชุดเครื่องครัวสเตนเลส หม้อต้ม กระทะเคลือบ และถาดเสิร์ฟ (12 ชิ้น)',
    description: 'ชุดอุปกรณ์เครื่องครัวสเตนเลสเกรดอาหาร สภาพดีมาก ใช้งานน้อย ไม่มีคราบฝังลึก เหมาะสำหรับร้านอาหารเปิดใหม่ หอพัก หรือนำไปใช้ต่อในครัวเรือน',
    category: 'household_items',
    transactionType: 'sell',
    price: 350,
    originalPrice: 1800,
    conditionGrade: 'good',
    conditionPercentage: 86,
    conditionLabel: 'สภาพ 86% สเตนเลสเกรดอาหาร ไร้สนิม',
    quantity: 1,
    unit: 'ชุด',
    images: [KITCHEN_IMAGE],
    location: {
      district: 'ดินแดง',
      province: 'กรุงเทพมหานคร',
      distanceKm: 4.5,
      radiusKm: 15,
      coverageArea: 'นัดรับได้แถวดินแดง-อนุสาวรีย์ชัยฯ หรือส่งพัสดุ'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'ของใช้ในครัวเรือนสภาพดี ราคาประหยัดกว่าของใหม่ 80%',
        'ผ่านการทำความสะอาดและฆ่าเชื้อเรียบร้อย',
        'ส่งมอบโดยผู้ขายที่ตอบกลับรวดเร็ว',
        'ช่วยยืดอายุการใช้งานเครื่องครัวสเตนเลส'
      ],
      compatibilityScore: 92,
      categoryMatch: true,
      distanceKm: 4.5,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 220,
    saves: 42,
    interestedCount: 11,
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z'
  }),

  createSeedListing({
    id: 'list_vintage_shirts_14',
    sellerId: 'user_kittipong',
    seller: SEED_USERS[0],
    title: 'เสื้อยืดวินเทจคอตตอนแท้และเสื้อเชิ้ตลายสก็อตคัดเกรด คละลายสภาพสวย (15 ตัว)',
    description: 'เสื้อผ้ามือสองคัดเกรด A ผ้าคอตตอน 100% สภาพดีเยี่ยม ไม่มีรอยขาดหรือคราบเปื้อน ซักอบสะอาดพร้อมใส่ เหมาะสำหรับสายแฟชั่นวินเทจหรือนำไปแต่งตัวสไตล์ circular fashion',
    category: 'clothing_fashion',
    transactionType: 'sell',
    price: 450,
    originalPrice: 1500,
    conditionGrade: 'good',
    conditionPercentage: 88,
    conditionLabel: 'สภาพ 88% ซักทำความสะอาดแล้ว',
    quantity: 15,
    unit: 'ตัว',
    images: [CLOTHES_IMAGE],
    location: {
      district: 'จตุจักร',
      province: 'กรุงเทพมหานคร',
      distanceKm: 6.0,
      radiusKm: 20,
      coverageArea: 'นัดรับที่ตลาดนัดจตุจักร หรือจัดส่งพัสดุด่วน'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'เสื้อผ้ามือสองคุณภาพดี เฉลี่ยเพียงตัวละ 30 บาท',
        'ซักอบสะอาดพร้อมสวมใส่ได้ทันที',
        'ลดการผลิตผ้าใหม่ ประหยัดน้ำกว่า 2,700 ลิตร',
        'ผู้ขายจัดส่งไวและมีประวัติดีเยี่ยม'
      ],
      compatibilityScore: 90,
      categoryMatch: true,
      distanceKm: 6.0,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 310,
    saves: 65,
    interestedCount: 18,
    createdAt: '2026-09-19T15:20:00Z',
    updatedAt: '2026-09-19T15:20:00Z'
  }),

  createSeedListing({
    id: 'list_bicycle_15',
    sellerId: 'user_greencraft',
    seller: SEED_USERS[1],
    title: 'จักรยานแม่บ้านญี่ปุ่นมือสอง โครงเหล็กแข็งแรง มีตะกร้าหน้าพร้อมปั่น (1 คัน)',
    description: 'จักรยานญี่ปุ่นมือสอง สภาพดี ล้อ 24 นิ้ว ยางเพิ่งเปลี่ยนใหม่ เบรคหน้าหลังหนึบ มีตะกร้าหน้ารถและเบาะนั่งนุ่ม เหมาะสำหรับปั่นจ่ายตลาดหรือใช้งานในหมู่บ้าน',
    category: 'sports_outdoor',
    transactionType: 'sell',
    price: 750,
    originalPrice: 2800,
    conditionGrade: 'good',
    conditionPercentage: 82,
    conditionLabel: 'สภาพ 82% ใช้งานได้ปกติ ยางใหม่',
    quantity: 1,
    unit: 'คัน',
    images: [BICYCLE_IMAGE],
    location: {
      district: 'บางแค',
      province: 'กรุงเทพมหานคร',
      distanceKm: 11.2,
      radiusKm: 25,
      coverageArea: 'นัดรับที่บางแค หรือจัดส่งรถกระบะเขตฝั่งธน'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'จักรยานสภาพพร้อมปั่น ลดการปล่อยมลพิษในการเดินทาง',
        'ราคาประหยัดกว่าของใหม่อย่างมาก',
        'เปลี่ยนยางและตรวจระบบโซ่เบรคเรียบร้อย',
        'ผู้ขายเป็นนิติบุคคลสตูดิโอที่เชื่อถือได้'
      ],
      compatibilityScore: 91,
      categoryMatch: true,
      distanceKm: 11.2,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 430,
    saves: 90,
    interestedCount: 24,
    createdAt: '2026-09-18T11:45:00Z',
    updatedAt: '2026-09-18T11:45:00Z'
  }),

  createSeedListing({
    id: 'list_glass_jars_16',
    sellerId: 'user_mirror_fdn',
    seller: SEED_USERS[2],
    title: 'ขวดแก้วและโหลแก้วฝาล็อกสุญญากาศ ล้างสะอาดพร้อมใช้ใส่แยม/เครื่องดื่ม (80 ใบ)',
    description: 'โหลแก้วทรงกลมและขวดแก้วใส ฝาล็อกแน่นหนา ผ่านการต้มล้างฆ่าเชื้อและอบแห้งแล้ว เหมาะสำหรับกลุ่มแม่บ้านทำแยม น้ำพริก เครื่องดื่ม หรือใส่ของแห้งในครัว',
    category: 'glass',
    transactionType: 'sell',
    price: 120,
    originalPrice: 650,
    conditionGrade: 'like_new',
    conditionPercentage: 96,
    conditionLabel: 'สภาพ 96% ล้างอบแห้งสะอาด ปลอดภัย',
    quantity: 80,
    unit: 'ใบ',
    images: [GLASS_BOTTLES_IMAGE],
    location: {
      district: 'ลาดพร้าว',
      province: 'กรุงเทพมหานคร',
      distanceKm: 7.5,
      radiusKm: 15,
      coverageArea: 'นัดรับลาดพร้าว หรือส่งพัสดุกันกระแทกหนาแน่น'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'ขวดแก้วรีไซเคิลเกรดใส สะอาด ปลอดภัยต่ออาหาร',
        'ราคาประหยัดมากเพียงใบละ 1.5 บาท',
        'ส่งเสริมบรรจุภัณฑ์หมุนเวียนลดการใช้พลาสติก',
        'ยืนยันตัวตนมูลนิธิเพื่อสังคม 100%'
      ],
      compatibilityScore: 95,
      categoryMatch: true,
      distanceKm: 7.5,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 280,
    saves: 55,
    interestedCount: 16,
    createdAt: '2026-09-17T09:30:00Z',
    updatedAt: '2026-09-17T09:30:00Z'
  }),

  createSeedListing({
    id: 'list_compost_17',
    sellerId: 'user_agri_coop',
    seller: SEED_USERS[4],
    title: 'กากกาแฟตากแห้งสนิทและปุ๋ยหมักชีวภาพใบก้ามปู สำหรับปรุงดินปลูกต้นไม้ (25 กก.)',
    description: 'กากกาแฟอาราบิก้าจากคาเฟ่ นำมาตากแดดแห้งสนิท ไร้เชื้อรา ผสมกับปุ๋ยหมักใบก้ามปูร่วนซุย ไนโตรเจนสูง เหมาะสำหรับบำรุงไม้ใบ ไม้ดอก และแปลงผักสวนครัวอินทรีย์',
    category: 'agricultural_materials',
    transactionType: 'sell',
    price: 50,
    originalPrice: 250,
    conditionGrade: 'raw_material',
    conditionPercentage: 95,
    conditionLabel: 'สภาพ 95% ตากแห้ง ไร้รา ดินร่วน',
    quantity: 25,
    unit: 'กิโลกรัม',
    images: [ORGANIC_COMPOST_IMAGE],
    location: {
      district: 'บางกะปิ',
      province: 'กรุงเทพมหานคร',
      distanceKm: 8.0,
      radiusKm: 20,
      coverageArea: 'นัดรับที่แปลงผักบางกะปิ หรือจัดส่งพัสดุ'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'ปุ๋ยหมักและกากกาแฟธรรมชาติ 100% ไร้สารเคมี',
        'ราคาจับต้องได้เพียง 50 บาท (กระสอบใหญ่ 25 กก.)',
        'เปลี่ยนของเหลือจากร้านกาแฟให้กลายเป็นอาหารพืช',
        'เกษตรกรชุมชนจัดจำหน่ายโดยตรง'
      ],
      compatibilityScore: 94,
      categoryMatch: true,
      distanceKm: 8.0,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 350,
    saves: 78,
    interestedCount: 22,
    createdAt: '2026-09-16T14:10:00Z',
    updatedAt: '2026-09-16T14:10:00Z'
  }),

  createSeedListing({
    id: 'list_pallets_18',
    sellerId: 'user_greencraft',
    seller: SEED_USERS[1],
    title: 'พาเลทไม้สนยุโรปสภาพแห้งสนิท ลายไม้สวย เหมาะทำโซฟาหรือเตียง DIY (4 ตัว)',
    description: 'พาเลทไม้สนนำเข้า ลายไม้ธรรมชาติสวยงาม แข็งแรง ผ่านการอบแห้งป้องกันมอดปลวก ไม่มีเสี้ยนอันตราย ขนาด 100x120 ซม. พร้อมสำหรับงานเฟอร์นิเจอร์ DIY',
    category: 'wood',
    transactionType: 'sell',
    price: 280,
    originalPrice: 1200,
    conditionGrade: 'good',
    conditionPercentage: 90,
    conditionLabel: 'สภาพ 90% ไม้แห้ง คัดหน้าเรียบ',
    quantity: 4,
    unit: 'ตัว',
    images: [PALLET_WOOD_IMAGE],
    location: {
      district: 'บางขุนเทียน',
      province: 'กรุงเทพมหานคร',
      distanceKm: 15.0,
      radiusKm: 35,
      coverageArea: 'นัดรับที่โรงเก็บไม้ หรือส่งกระบะเขตกรุงเทพฯ-สมุทรปราการ'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'ไม้พาเลทสนคัดเกรด เหมาะสำหรับคนรักงานไม้ DIY',
        'เฉลี่ยเพียงตัวละ 70 บาท ประหยัดต้นทุนงานสร้างสรรค์',
        'ผ่านการอบความร้อนปลอดสารเคมี ปลอดภัยต่อการใช้งาน',
        'ผู้ขายแนะนำบอกต่อ 99%'
      ],
      compatibilityScore: 93,
      categoryMatch: true,
      distanceKm: 15.0,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 480,
    saves: 104,
    interestedCount: 29,
    createdAt: '2026-09-15T16:00:00Z',
    updatedAt: '2026-09-15T16:00:00Z'
  }),

  createSeedListing({
    id: 'list_novels_19',
    sellerId: 'user_mirror_fdn',
    seller: SEED_USERS[2],
    title: 'หนังสือวรรณกรรมเยาวชน นวนิยายแปล และสมุดบันทึกรักษ์โลก (12 เล่ม)',
    description: 'หนังสือสภาพใหม่กริบ อ่านเพียงครั้งเดียว ไม่มีรอยพับมุมหรือไฮไลท์ ประกอบด้วยวรรณกรรมคลาสสิกและหนังสือพัฒนาตนเอง เหมาะสำหรับนักอ่านและสะสม',
    category: 'books_stationery',
    transactionType: 'sell',
    price: 180,
    originalPrice: 950,
    conditionGrade: 'like_new',
    conditionPercentage: 93,
    conditionLabel: 'สภาพ 93% ปกคม ไร้รอยยับ',
    quantity: 12,
    unit: 'เล่ม',
    images: [BOOKS_IMAGE],
    location: {
      district: 'สาทร',
      province: 'กรุงเทพมหานคร',
      distanceKm: 3.8,
      radiusKm: 15,
      coverageArea: 'นัดรับสถานี BTS ช่องนนทรี หรือส่งไปรษณีย์ด่วน'
    },
    deliveryOptions: ['pickup', 'local_courier'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'หนังสือสภาพสะสม ราคาเพียงเล่มละ 15 บาท',
        'ส่งต่อความรู้และจินตนาการ หมุนเวียนหนังสือดีสู่มือนักอ่าน',
        'ระยะทางใกล้ใจกลางเมืองเพียง 3.8 กม.',
        'รายได้สมทบกิจกรรมอ่านหนังสือชุมชน'
      ],
      compatibilityScore: 96,
      categoryMatch: true,
      distanceKm: 3.8,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 290,
    saves: 62,
    interestedCount: 15,
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z'
  }),

  createSeedListing({
    id: 'list_pet_bottles_20',
    sellerId: 'user_recycle_hub',
    seller: SEED_USERS[5],
    title: 'ขวดพลาสติกใส PET บีบแบน คัดแยกฝาและฉลาก สะอาดพร้อมส่งโรงหลอม (50 กก.)',
    description: 'ขวดน้ำดื่ม PET ใส ล้างคัดแยกฉลากและฝาเรียบร้อย อัดบีบแบนบรรจุถุงจัมโบ้ สะอาด ไร้คราบน้ำหวาน เหมาะสำหรับผู้รวบรวมขยะรีไซเคิล หรือโรงงานบดพลาสติก',
    category: 'recyclable_materials',
    transactionType: 'sell',
    price: 250,
    originalPrice: 400,
    conditionGrade: 'raw_material',
    conditionPercentage: 95,
    conditionLabel: 'สภาพ 95% สะอาด ไม่มีเศษขยะปน',
    quantity: 50,
    unit: 'กิโลกรัม',
    images: [RECYCLE_GENERAL_IMAGE],
    location: {
      district: 'มีนบุรี',
      province: 'กรุงเทพมหานคร',
      distanceKm: 18.0,
      radiusKm: 40,
      coverageArea: 'นัดรับที่ศูนย์มีนบุรี หรือส่งพร้อมเที่ยวรถขนส่ง'
    },
    deliveryOptions: ['pickup', 'freight'],
    status: 'active',
    matchExplanation: {
      reasons: [
        'ขวด PET คัดแยกสะอาดมาตรฐาน ตรงตามเกณฑ์โรงหลอม',
        'ราคาหน้าคลังโปร่งใส กิโลกรัมละ 5 บาท',
        'ลดปริมาณขยะพลาสติกสู่หลุมฝังกลบได้ถึง 50 กก.',
        'ผู้ขายมีใบอนุญาตจัดการวัสดุรีไซเคิลถูกต้อง'
      ],
      compatibilityScore: 92,
      categoryMatch: true,
      distanceKm: 18.0,
      budgetMatch: true,
      verifiedSeller: true
    },
    views: 310,
    saves: 48,
    interestedCount: 14,
    createdAt: '2026-09-14T08:30:00Z',
    updatedAt: '2026-09-14T08:30:00Z'
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
    images: [CHAIR_IMAGE],
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
    images: [WOOD_IMAGE],
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
    images: [BOXES_IMAGE],
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
  },
  {
    id: 'wanted_04',
    userId: 'user_mirror_fdn',
    user: SEED_USERS[2],
    title: 'ตามหาหนังสือการ์ตูนความรู้ นิทาน และแบบฝึกหัดเด็ก สำหรับมุมหนังสือชุมชน',
    category: 'books_stationery',
    quantity: 20,
    unit: 'เล่ม',
    budget: 300,
    images: [BOOKS_IMAGE],
    location: {
      district: 'ดุสิต',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 15,
      coverageArea: 'นัดรับย่านดุสิต ราชเทวี หรือจัดส่งพัสดุลงทะเบียน'
    },
    description: 'ต้องการหนังสือนิทาน วรรณกรรม และการ์ตูนวิทยาศาสตร์สำหรับเด็กประถม สภาพอ่านได้ไม่ขาด เพื่อจัดมุมห้องสมุดสร้างสรรค์ในชุมชน',
    expirationDate: '28 ต.ค. 2026',
    matchingListingsCount: 4,
    createdAt: '2026-09-24T14:00:00Z'
  },
  {
    id: 'wanted_05',
    userId: 'user_somchai',
    user: SEED_USERS[3],
    title: 'ตามหาขวดโหลแก้วฝาล็อกสุญญากาศ สำหรับทำเวิร์กช็อปแยมผลไม้แปรรูป',
    category: 'glass',
    quantity: 40,
    unit: 'ใบ',
    budget: 150,
    images: [GLASS_BOTTLES_IMAGE],
    location: {
      district: 'บางพลัด',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 20,
      coverageArea: 'สะดวกรับแถวบางพลัด จรัญสนิทวงศ์ หรือปิ่นเกล้า'
    },
    description: 'มองหาขวดโหลแก้วสะอาด มีฝาปิดสนิท ขนาด 150-300ml เพื่อนำมาใช้ในกิจกรรมสอนแปรรูปผลไม้ลดขยะอาหารของชุมชน',
    expirationDate: '25 ต.ค. 2026',
    matchingListingsCount: 3,
    createdAt: '2026-09-23T11:20:00Z'
  },
  {
    id: 'wanted_06',
    userId: 'user_agri_coop',
    user: SEED_USERS[4],
    title: 'ตามหากากกาแฟแห้ง ขุยมะพร้าว หรือปุ๋ยอินทรีย์ สำหรับผสมดินทำสวนดาดฟ้า',
    category: 'agricultural_materials',
    quantity: 30,
    unit: 'กิโลกรัม',
    budget: 100,
    images: [ORGANIC_COMPOST_IMAGE],
    location: {
      district: 'คลองสาน',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 15,
      coverageArea: 'ยินดีไปรับของถึงหน้าร้านคาเฟ่ในรัศมี 15 กม.'
    },
    description: 'ต้องการกากกาแฟจากร้านกาแฟสด หรือขุยมะพร้าวแห้ง เพื่อนำไปเป็นสารปรับปรุงดินในโครงการสวนเกษตรคนเมือง',
    expirationDate: '22 ต.ค. 2026',
    matchingListingsCount: 6,
    createdAt: '2026-09-22T08:45:00Z'
  },
  {
    id: 'wanted_07',
    userId: 'user_kittipong',
    user: SEED_USERS[0],
    title: 'ตามหาพาเลทไม้สภาพดี 4-6 ตัว สำหรับทำเวทีกิจกรรมชมรมและที่นั่ง DIY',
    category: 'wood',
    quantity: 5,
    unit: 'ตัว',
    budget: 400,
    images: [PALLET_WOOD_IMAGE],
    location: {
      district: 'บางซื่อ',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 25,
      coverageArea: 'มีรถกระบะพร้อมขนย้ายด้วยตนเอง'
    },
    description: 'ต้องการพาเลทไม้สนหรือไม้เนื้อแข็ง สภาพสมบูรณ์ ไม่ผุพัง เพื่อนำมาประกอบเป็นแท่นเวทีดนตรีเปิดหมวกของนักเรียน',
    expirationDate: '24 ต.ค. 2026',
    matchingListingsCount: 4,
    createdAt: '2026-09-21T13:30:00Z'
  },
  {
    id: 'wanted_08',
    userId: 'user_greencraft',
    user: SEED_USERS[1],
    title: 'ตามหาเศษผ้าฝ้าย ผ้ายีนส์ หรือผ้าม่านเหลือใช้ สำหรับนำไปตัดเย็บกระเป๋าผ้า',
    category: 'fabric_textile',
    quantity: 15,
    unit: 'กิโลกรัม',
    budget: 150,
    images: [TEXTILE_IMAGE],
    location: {
      district: 'พระโขนง',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 15,
      coverageArea: 'นัดรับย่านอ่อนนุช สุขุมวิท หรือส่งพัสดุ'
    },
    description: 'วิสาหกิจตัดเย็บชุมชนต้องการเศษผ้าลายสวยหรือผ้ายีนส์ เพื่อนำไปทำกระเป๋าผ้า upcycle สร้างอาชีพให้ผู้สูงอายุ',
    expirationDate: '31 ต.ค. 2026',
    matchingListingsCount: 3,
    createdAt: '2026-09-20T16:15:00Z'
  },
  {
    id: 'wanted_09',
    userId: 'user_somchai',
    user: SEED_USERS[3],
    title: 'ตามหาจักรยานมือสองหรือโครงจักรยาน สำหรับนำมาซ่อมให้นักเรียนใช้เดินทาง',
    category: 'sports_outdoor',
    quantity: 1,
    unit: 'คัน',
    budget: 600,
    images: [BICYCLE_IMAGE],
    location: {
      district: 'ตลิ่งชัน',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 30,
      coverageArea: 'สามารถขับรถไปรับในเขตกรุงเทพฯ และปริมณฑล'
    },
    description: 'รับซื้อจักรยานแม่บ้านหรือจักรยานเสือภูเขามือสอง สภาพโครงไม่คดงอ แม้โซ่หรือยางเสื่อมสภาพก็รับได้ จะนำมาซ่อมแซมให้น้องๆ ใช้งาน',
    expirationDate: '18 ต.ค. 2026',
    matchingListingsCount: 2,
    createdAt: '2026-09-19T09:00:00Z'
  },
  {
    id: 'wanted_10',
    userId: 'user_recycle_hub',
    user: SEED_USERS[5],
    title: 'ตามหาอุปกรณ์เครื่องใช้ไฟฟ้าหรืออะไหล่อิเล็กทรอนิกส์ สำหรับสอนทักษะซ่อมบำรุง',
    category: 'electronics',
    quantity: 3,
    unit: 'เครื่อง',
    budget: 500,
    images: [ELECTRONICS_IMAGE],
    location: {
      district: 'บางกอกน้อย',
      province: 'กรุงเทพมหานคร',
      maxDistanceKm: 20,
      coverageArea: 'นัดรับย่านศิริราช ปิ่นเกล้า หรือสายใต้'
    },
    description: 'วิทยาลัยอาชีวะต้องการบอร์ดคอมพิวเตอร์เก่า เพาเวอร์ซัพพลาย หรือเครื่องใช้ไฟฟ้าชำรุด เพื่อใช้เป็นสื่อการเรียนการสอนซ่อมแซม',
    expirationDate: '26 ต.ค. 2026',
    matchingListingsCount: 3,
    createdAt: '2026-09-18T14:30:00Z'
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
