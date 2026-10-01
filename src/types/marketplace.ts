export type AccountType = 'individual' | 'business' | 'organization';

export type TransactionType = 'swap' | 'sell' | 'free' | 'donate';

export type ConditionGrade = 'like_new' | 'good' | 'fair' | 'salvage' | 'raw_material';

export interface ItemConditionInfo {
  grade: ConditionGrade;
  percentage: number; // e.g. 95, 85, 70, 50, 100
  labelTh: string;
}

export type ListingCategory = 
  | 'furniture_home'
  | 'clothing_fashion'
  | 'electronics'
  | 'household_items'
  | 'books_stationery'
  | 'baby_kids'
  | 'sports_outdoor'
  | 'hobbies_collectibles'
  | 'automotive'
  | 'plants_gardening'
  | 'business_office'
  | 'agricultural_waste'
  | 'agricultural_materials'
  | 'used_school_materials'
  | 'paper_cardboard'
  | 'plastic'
  | 'glass'
  | 'iron_metal'
  | 'fabric_textile'
  | 'wood'
  | 'packaging_materials'
  | 'recyclable_materials'
  | 'industrial_materials'
  | 'construction_materials';

export interface CategoryMeta {
  id: ListingCategory;
  nameTh: string;
  nameEn: string;
  group: 'consumer' | 'materials' | 'industrial';
}

export const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  // สินค้าทั่วไป / ของใช้ในชีวิตประจำวัน
  { id: 'furniture_home', nameTh: 'เฟอร์นิเจอร์และของใช้ในบ้าน', nameEn: 'Furniture & Home', group: 'consumer' },
  { id: 'clothing_fashion', nameTh: 'เสื้อผ้าและแฟชั่น', nameEn: 'Clothing & Fashion', group: 'consumer' },
  { id: 'electronics', nameTh: 'เครื่องใช้ไฟฟ้าและอิเล็กทรอนิกส์', nameEn: 'Electronics & Gadgets', group: 'consumer' },
  { id: 'household_items', nameTh: 'ของใช้ในครัวเรือน', nameEn: 'Household Items', group: 'consumer' },
  { id: 'books_stationery', nameTh: 'หนังสือและเครื่องเขียน', nameEn: 'Books & Stationery', group: 'consumer' },
  { id: 'used_school_materials', nameTh: 'ตำราเรียนและสื่อการเรียน', nameEn: 'Books & Used School Materials', group: 'consumer' },
  { id: 'baby_kids', nameTh: 'แม่และเด็ก', nameEn: 'Baby & Kids', group: 'consumer' },
  { id: 'sports_outdoor', nameTh: 'กีฬาและกิจกรรมกลางแจ้ง', nameEn: 'Sports & Outdoor', group: 'consumer' },
  { id: 'hobbies_collectibles', nameTh: 'ของสะสมและงานอดิเรก', nameEn: 'Hobbies & Collectibles', group: 'consumer' },
  { id: 'automotive', nameTh: 'ยานยนต์และอะไหล่', nameEn: 'Automotive & Parts', group: 'consumer' },
  { id: 'plants_gardening', nameTh: 'ต้นไม้และอุปกรณ์ทำสวน', nameEn: 'Plants & Gardening', group: 'consumer' },
  { id: 'business_office', nameTh: 'อุปกรณ์สำนักงานและธุรกิจ', nameEn: 'Business & Office Equipment', group: 'consumer' },

  // วัสดุเหลือใช้ เกษตร และบรรจุภัณฑ์
  { id: 'agricultural_waste', nameTh: 'เศษวัสดุเกษตรและชีวมวล', nameEn: 'Agricultural Waste & Biomass', group: 'materials' },
  { id: 'agricultural_materials', nameTh: 'วัสดุการเกษตรและปุ๋ยอินทรีย์', nameEn: 'Agricultural Materials', group: 'materials' },
  { id: 'packaging_materials', nameTh: 'บรรจุภัณฑ์และกันกระแทก', nameEn: 'Packaging Materials', group: 'materials' },
  { id: 'paper_cardboard', nameTh: 'กระดาษและกล่องกระดาษ', nameEn: 'Paper & Cardboard', group: 'materials' },
  { id: 'plastic', nameTh: 'พลาสติกรีไซเคิลและเศษพลาสติก', nameEn: 'Plastic & Resin Flakes', group: 'materials' },
  { id: 'glass', nameTh: 'แก้วและขวดแก้ว', nameEn: 'Glass & Bottles', group: 'materials' },
  { id: 'wood', nameTh: 'เศษไม้และไม้แปรรูป', nameEn: 'Wood & Timber Scraps', group: 'materials' },
  { id: 'fabric_textile', nameTh: 'เศษผ้าและสิ่งทอ', nameEn: 'Fabric & Textile Scraps', group: 'materials' },
  { id: 'iron_metal', nameTh: 'เหล็กและโลหะรีไซเคิล', nameEn: 'Iron & Scrap Metal', group: 'materials' },

  // อุตสาหกรรมและการก่อสร้าง
  { id: 'recyclable_materials', nameTh: 'วัสดุรีไซเคิลทั่วไป', nameEn: 'Recyclable Materials', group: 'industrial' },
  { id: 'industrial_materials', nameTh: 'วัสดุโรงงานและอุตสาหกรรม', nameEn: 'Industrial Materials', group: 'industrial' },
  { id: 'construction_materials', nameTh: 'วัสดุก่อสร้างและสุขภัณฑ์', nameEn: 'Construction Materials', group: 'industrial' }
];

export type ListingStatus = 'active' | 'reserved' | 'completed' | 'expired' | 'suspended';

export type DeliveryMethod = 'pickup' | 'local_courier' | 'freight';

export interface VerifiedBadges {
  identity: boolean;
  phone: boolean;
  email: boolean;
  charityRegistry?: boolean;
  businessRegistry?: boolean;
}

export interface User {
  id: string;
  name: string;
  organizationName?: string;
  email: string;
  phone?: string;
  avatar: string;
  accountType: AccountType;
  verifiedBadges: VerifiedBadges;
  
  // Replaced arbitrary trust score with valuable authentic community metrics:
  responseRate: number;        // e.g. 98 (% response rate)
  responseSpeed: string;       // e.g. 'ตอบกลับไวใน 15 นาที'
  recommendationRate: number;  // e.g. 99 (% positive recommendation)
  completedDeals: number;
  reviewsCount: number;
  rating: number;              // 1.0 - 5.0
  
  ecoPoints: number;
  carbonSavedKg: number;
  itemsReused: number;
  location: {
    district: string;
    province: string;
    lat?: number;
    lng?: number;
  };
  bio: string;
  memberSince: string;
}

export interface MatchExplanation {
  reasons: string[];
  compatibilityScore: number;
  categoryMatch: boolean;
  distanceKm: number;
  budgetMatch: boolean;
  verifiedSeller: boolean;
}

export interface Listing {
  id: string;
  sellerId: string;
  seller: User;
  title: string;
  description: string;
  category: ListingCategory;
  transactionType: TransactionType;
  price: number;
  originalPrice?: number;
  
  // Physical condition with percentage rating
  conditionGrade: ConditionGrade;
  conditionPercentage: number; // e.g. 95, 85, 70, 50, 100
  conditionLabel: string;      // e.g. 'สภาพ 95% เหมือนใหม่'

  quantity: number;
  unit: string;
  images: string[];
  location: {
    district: string;
    province: string;
    distanceKm: number;
    radiusKm?: number;        // Service or delivery/pickup radius (e.g. 5, 15, 30, 50, 100 km, or nationwide)
    coverageArea?: string;    // e.g. 'ครอบคลุมรัศมี 25 กม. ในเขตจังหวัด'
  };
  deliveryOptions: DeliveryMethod[];
  status: ListingStatus;
  matchExplanation: MatchExplanation;
  views: number;
  saves: number;
  interestedCount: number;

  // Platform commission tracking (15% down to 10% for sell, 0% for free/donate)
  commissionRate: number;      // e.g. 15, 13.5, 12, 10
  platformFee: number;         // THB
  sellerNetPayout: number;     // THB

  createdAt: string;
  updatedAt: string;
}

export interface WantedItem {
  id: string;
  userId: string;
  user: User;
  title: string;
  category: ListingCategory;
  quantity: number;
  unit: string;
  budget: number;
  images?: string[];
  location: {
    district: string;
    province: string;
    maxDistanceKm?: number;    // Maximum pickup/delivery radius wanted
    coverageArea?: string;
  };
  description: string;
  expirationDate: string;
  matchingListingsCount: number;
  createdAt: string;
}

export interface SwipeRecord {
  id: string;
  userId: string;
  listingId: string;
  direction: 'pass' | 'interested' | 'save';
  timestamp: string;
}

export interface MatchRecord {
  id: string;
  listingId: string;
  listing: Listing;
  buyerId: string;
  sellerId: string;
  buyer: User;
  seller: User;
  matchReason: string;
  status: 'matched' | 'negotiating' | 'deal_created' | 'completed' | 'closed';
  createdAt: string;
}

export type MessageType = 'text' | 'image' | 'offer' | 'deal_update' | 'system';

export interface OfferData {
  offerId: string;
  type: 'price' | 'swap' | 'mixed';
  amount?: number;
  swapItemTitle?: string;
  note?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  type: MessageType;
  content: string;
  offerData?: OfferData;
  createdAt: string;
}

export interface Conversation {
  id: string;
  matchId: string;
  listingId: string;
  listing: Listing;
  buyerId: string;
  sellerId: string;
  otherUser: User;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export type DealStatus = 
  | 'matched'
  | 'negotiating'
  | 'deal_confirmed'
  | 'scheduled'
  | 'in_transit'
  | 'completed'
  | 'cancelled';

export interface DealTimelineStep {
  stage: DealStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface Deal {
  id: string;
  matchId: string;
  listingId: string;
  listing: Listing;
  buyerId: string;
  sellerId: string;
  buyer: User;
  seller: User;
  agreedPrice: number;
  commissionFee: number;
  sellerPayout: number;
  transactionType: TransactionType;
  deliveryMethod: DeliveryMethod;
  status: DealStatus;
  handover: {
    scheduledDate?: string;
    scheduledTime?: string;
    meetingLocation?: string;
    safeZoneName?: string;
    safetyChecklistAgreed: boolean;
    confirmationCode: string;
  };
  buyerConfirmed: boolean;
  sellerConfirmed: boolean;
  hasBuyerReviewed: boolean;
  hasSellerReviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  dealId: string;
  listingId: string;
  reviewerId: string;
  reviewer: User;
  targetUserId: string;
  rating: number; // 1-5
  comment: string;
  tags: string[];
  createdAt: string;
}

export type NotificationType = 'match' | 'message' | 'offer' | 'deal' | 'wanted' | 'review' | 'system';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  referenceId?: string;
  targetTab?: 'discover' | 'wanted' | 'matches' | 'chat' | 'deals' | 'listings' | 'profile';
  read: boolean;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'listing' | 'user';
  targetId: string;
  targetTitle: string;
  reason: 'inaccurate_info' | 'prohibited_item' | 'scam_suspicion' | 'unresponsive' | 'harassment' | 'other';
  description: string;
  evidence?: string;
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  createdAt: string;
}

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';
