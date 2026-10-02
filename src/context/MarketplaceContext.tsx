import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Listing,
  WantedItem,
  MatchRecord,
  Conversation,
  ChatMessage,
  Deal,
  Review,
  AppNotification,
  ReportItem,
  ListingStatus,
  DealStatus,
  MessageType,
  OfferData,
  SubscriptionPlan,
  AccountType,
  ReportReason,
  ModerationAction,
  UserSubscriptionDetails,
  PaymentInvoice,
  PlatformAnnouncement
} from '../types/marketplace';
import {
  SEED_USERS,
  INITIAL_LISTINGS,
  INITIAL_WANTED,
  INITIAL_MATCHES,
  INITIAL_CONVERSATIONS,
  INITIAL_DEALS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS,
  HERO_IMAGE,
  getCategoryDefaultImage
} from '../data/seedData';
import { calculateCommission } from '../utils/commission';

interface MarketplaceContextType {
  // Auth & Current User
  currentUser: User;
  allUsers: User[];
  isLoggedIn: boolean;
  login: (email: string, password?: string, rememberMe?: boolean) => { success: boolean; message: string; require2FA?: boolean };
  verify2FA: (email: string, code: string) => { success: boolean; message: string };
  register: (data: {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    accountType: AccountType;
    organizationName?: string;
    taxId?: string;
    charityId?: string;
    province?: string;
    district?: string;
    bio?: string;
  }) => { success: boolean; message: string };
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  requestPasswordReset: (email: string) => { success: boolean; message: string; simulatedOtp?: string };
  resetPasswordWithOtp: (email: string, otp: string, newPassword: string) => { success: boolean; message: string };
  loginWithOAuth: (provider: 'google' | 'line') => void;
  failedLoginAttempts: number;
  isAccountLocked: boolean;
  lockoutRemainingSeconds: number;
  simulatedLatestOtp: string | null;
  deleteAccount: () => void;
  setCurrentUser: (user: User) => void;
  switchUserRole: (accountType: 'individual' | 'business' | 'organization' | 'admin') => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;

  // Viewing other seller profile
  viewingSeller: User | null;
  setViewingSeller: (user: User | null) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Data
  listings: Listing[];
  wantedItems: WantedItem[];
  matches: MatchRecord[];
  conversations: Conversation[];
  deals: Deal[];
  reviews: Review[];
  notifications: AppNotification[];
  reports: ReportItem[];
  savedListingIds: string[];
  swipedListingIds: Record<string, 'pass' | 'interested' | 'save'>;

  // Actions
  handleSwipe: (listingId: string, direction: 'pass' | 'interested' | 'save') => void;
  toggleSaveListing: (listingId: string) => void;
  createListing: (data: Partial<Listing>) => Listing;
  updateListing: (listingId: string, data: Partial<Listing>) => void;
  updateListingStatus: (listingId: string, status: ListingStatus) => void;
  updateListingImage: (listingId: string, imageUrl: string) => void;
  deleteListing: (listingId: string) => void;
  createWantedItem: (data: Partial<WantedItem>) => WantedItem;
  updateWantedItem: (wantedId: string, data: Partial<WantedItem>) => void;
  updateWantedItemImage: (wantedId: string, imageUrl: string) => void;
  unmatch: (matchId: string) => void;
  
  // Custom Image & Editor
  heroImage: string;
  setHeroImage: (url: string) => void;
  imageEditorState: { isOpen: boolean; title?: string; currentImage: string; onSave: (url: string) => void } | null;
  openImageEditor: (config: { title?: string; currentImage: string; onSave: (url: string) => void }) => void;
  closeImageEditor: () => void;
  
  // Chat & Deals
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, content: string, type?: MessageType, offerData?: OfferData) => void;
  respondToOffer: (conversationId: string, offerId: string, action: 'accepted' | 'rejected' | 'countered', counterAmount?: number) => void;
  createDealFromMatch: (matchId: string, agreedPrice?: number) => Deal;
  advanceDealStatus: (dealId: string, nextStatus: DealStatus, handoverDetails?: Partial<Deal['handover']>) => void;
  cancelDeal: (dealId: string, reason: string) => void;
  rescheduleDeal: (dealId: string, newDate: string, newTime: string, newLocation: string, safeZoneName?: string) => void;
  confirmDealParty: (dealId: string, party: 'buyer' | 'seller') => void;
  confirmHandoverCode: (dealId: string, code: string) => boolean;
  verifyHandoverCode: (dealId: string, code: string) => { success: boolean; message: string };
  submitReview: (dealId: string, rating: number, comment: string, tags: string[]) => void;

  // Block & Safety
  blockedUserIds: string[];
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
  
  // Modals & UI States
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  matchModalData: { match: MatchRecord; isNew: boolean } | null;
  setMatchModalData: (data: { match: MatchRecord; isNew: boolean } | null) => void;
  selectedDealId: string | null;
  setSelectedDealId: (id: string | null) => void;
  reviewModalDeal: Deal | null;
  setReviewModalDeal: (deal: Deal | null) => void;
  reportModalTarget: { type: 'listing' | 'user' | 'message'; id: string; title: string } | null;
  setReportModalTarget: (target: { type: 'listing' | 'user' | 'message'; id: string; title: string } | null) => void;
  submitReport: (reason: ReportReason, description: string, evidence?: string) => void;

  // Global Dialogs
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isCreateListingOpen: boolean;
  setIsCreateListingOpen: (open: boolean) => void;
  isCreateWantedOpen: boolean;
  setIsCreateWantedOpen: (open: boolean) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;
  securityModalOpen: boolean;
  setSecurityModalOpen: (open: boolean) => void;
  securityModalTab: 'terms' | 'privacy' | 'community';
  setSecurityModalTab: (tab: 'terms' | 'privacy' | 'community') => void;

  // Admin moderation & platform
  adminModerateReport: (reportId: string, action: 'resolve' | 'dismiss' | 'suspend_user' | 'suspend_listing') => void;
  adminTakeModerationAction: (reportId: string, action: ModerationAction, note: string) => void;
  adminToggleUserStatus: (userId: string) => void;
  announcements: PlatformAnnouncement[];
  createAnnouncement: (title: string, content: string, type: 'info' | 'warning' | 'alert' | 'update') => void;

  // Subscription
  currentSubscription: SubscriptionPlan;
  subscriptionDetails: UserSubscriptionDetails;
  upgradeSubscription: (plan: SubscriptionPlan) => void;
  cancelSubscription: () => void;
  renewSubscription: () => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEY = 'wastematch_app_state_v4';
const AUTH_KEY = 'wastematch_auth_state_v4';
const CREDENTIALS_KEY = 'wastematch_auth_credentials_v5';

// Default initial password for seed accounts
const DEFAULT_SEED_PASSWORD = 'WasteMatch2026!';

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(SEED_USERS[0]);
  const [allUsers, setAllUsers] = useState<User[]>(SEED_USERS);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Security & Authentication States
  const [failedLoginAttempts, setFailedLoginAttempts] = useState<number>(0);
  const [isAccountLocked, setIsAccountLocked] = useState<boolean>(false);
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);
  const [simulatedLatestOtp, setSimulatedLatestOtp] = useState<string | null>(null);
  const [activeOtpStore, setActiveOtpStore] = useState<Record<string, { code: string; expiresAt: number }>>({});

  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [wantedItems, setWantedItems] = useState<WantedItem[]>(INITIAL_WANTED);
  const [matches, setMatches] = useState<MatchRecord[]>(INITIAL_MATCHES);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [savedListingIds, setSavedListingIds] = useState<string[]>(['list_wood_02']);
  const [swipedListingIds, setSwipedListingIds] = useState<Record<string, 'pass' | 'interested' | 'save'>>({});

  // Modals state
  const [viewingSeller, setViewingSeller] = useState<User | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [matchModalData, setMatchModalData] = useState<{ match: MatchRecord; isNew: boolean } | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [reviewModalDeal, setReviewModalDeal] = useState<Deal | null>(null);
  const [reportModalTarget, setReportModalTarget] = useState<{ type: 'listing' | 'user' | 'message'; id: string; title: string } | null>(null);

  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const [securityModalTab, setSecurityModalTab] = useState<'terms' | 'privacy' | 'community'>('terms');

  const [announcements, setAnnouncements] = useState<PlatformAnnouncement[]>([
    {
      id: 'ann_01',
      title: 'เปิดตัว Safe Exchange Zone ครอบคลุม 50 จุดทั่วกรุงเทพฯ และปริมณฑล',
      content: 'สมาชิก WasteMatch สามารถนัดรับส่งมอบสิ่งของ ณ จุดนัดรับสาธารณะที่มีกล้องวงจรปิดเพื่อความปลอดภัยสูงสุด',
      type: 'info',
      active: true,
      createdAt: '2026-09-28T08:00:00Z'
    },
    {
      id: 'ann_02',
      title: 'เกณฑ์การคำนวณคาร์บอนเครดิต อ้างอิงมาตรฐาน อบก. (TGO 2024)',
      content: 'ทุกรายการส่งมอบสำเร็จจะได้รับการแปลงค่า CO₂e หลีกเลี่ยงตามประเภทวัสดุจริงอย่างโปร่งใส',
      type: 'update',
      active: true,
      createdAt: '2026-09-25T10:00:00Z'
    }
  ]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState<boolean>(false);
  const [isCreateWantedOpen, setIsCreateWantedOpen] = useState<boolean>(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState<boolean>(false);
  const [heroImage, setHeroImage] = useState<string>(HERO_IMAGE);
  const [imageEditorState, setImageEditorState] = useState<{
    isOpen: boolean;
    title?: string;
    currentImage: string;
    onSave: (url: string) => void;
  } | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionPlan>('starter');

  const [subscriptionDetails, setSubscriptionDetails] = useState<UserSubscriptionDetails>({
    plan: 'starter',
    status: 'active',
    startDate: '2026-09-01T00:00:00Z',
    expirationDate: '2026-10-31T23:59:59Z',
    autoRenew: true,
    paymentHistory: [
      {
        id: 'inv_01',
        invoiceNumber: 'INV-202609-0842',
        date: '2026-09-01T10:15:00Z',
        amount: 99,
        plan: 'starter',
        planName: 'Eco Starter',
        paymentMethod: 'PromptPay QR',
        status: 'paid'
      },
      {
        id: 'inv_02',
        invoiceNumber: 'INV-202608-0319',
        date: '2026-08-01T11:00:00Z',
        amount: 99,
        plan: 'starter',
        planName: 'Eco Starter',
        paymentMethod: 'PromptPay QR',
        status: 'paid'
      }
    ]
  });

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        if (parsedAuth.isLoggedIn !== undefined) setIsLoggedIn(parsedAuth.isLoggedIn);
        if (parsedAuth.userId) {
          const user = allUsers.find(u => u.id === parsedAuth.userId);
          if (user) setCurrentUser(user);
        }
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.listings && Array.isArray(parsed.listings)) {
          const userCreated = parsed.listings.filter((l: Listing) => !INITIAL_LISTINGS.some(init => init.id === l.id));
          setListings([...userCreated, ...INITIAL_LISTINGS]);
        }
        if (parsed.wantedItems && Array.isArray(parsed.wantedItems)) {
          const userCreatedWanted = parsed.wantedItems.filter((w: WantedItem) => !INITIAL_WANTED.some(init => init.id === w.id));
          setWantedItems([...userCreatedWanted, ...INITIAL_WANTED]);
        }
        if (parsed.matches) setMatches(parsed.matches);
        if (parsed.conversations) setConversations(parsed.conversations);
        if (parsed.deals) setDeals(parsed.deals);
        if (parsed.savedListingIds) setSavedListingIds(parsed.savedListingIds);
        if (parsed.swipedListingIds) setSwipedListingIds(parsed.swipedListingIds);
      }
    } catch {
      // clean fallback
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      const state = {
        listings,
        wantedItems,
        matches,
        conversations,
        deals,
        savedListingIds,
        swipedListingIds,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [listings, wantedItems, matches, conversations, deals, savedListingIds, swipedListingIds]);

  // Lockout countdown timer
  useEffect(() => {
    let timer: any;
    if (isAccountLocked && lockoutRemainingSeconds > 0) {
      timer = setInterval(() => {
        setLockoutRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsAccountLocked(false);
            setFailedLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAccountLocked, lockoutRemainingSeconds]);

  // Helper to read and write stored user credentials securely
  const getStoredCredentials = (): Record<string, { password: string; phone?: string; taxId?: string; charityId?: string }> => {
    try {
      const data = localStorage.getItem(CREDENTIALS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    // Default seed account credentials
    const defaults: Record<string, { password: string }> = {};
    SEED_USERS.forEach(u => {
      defaults[u.email.toLowerCase()] = { password: DEFAULT_SEED_PASSWORD };
    });
    // Add user's explicit email if present
    defaults['somthitaaa@gmail.com'] = { password: 'WasteMatch2026!' };
    return defaults;
  };

  const saveUserCredential = (email: string, password: string, meta?: { phone?: string; taxId?: string; charityId?: string }) => {
    const creds = getStoredCredentials();
    creds[email.toLowerCase()] = {
      password,
      ...meta
    };
    try {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
    } catch {
      // ignore
    }
  };

  const login = (email: string, password?: string, rememberMe: boolean = true): { success: boolean; message: string; require2FA?: boolean } => {
    if (isAccountLocked) {
      return {
        success: false,
        message: `บัญชีถูกระงับชั่วคราวเนื่องจากใส่รหัสผ่านผิดเกินกำหนด กรุณารออีก ${lockoutRemainingSeconds} วินาที`
      };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'กรุณากรอกอีเมลสำหรับเข้าสู่ระบบ' };
    }

    const matchedUser = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    const creds = getStoredCredentials();
    const stored = creds[cleanEmail];

    // If password provided, perform security verification
    if (password) {
      const expectedPassword = stored ? stored.password : DEFAULT_SEED_PASSWORD;
      if (password !== expectedPassword) {
        const nextAttempts = failedLoginAttempts + 1;
        setFailedLoginAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setIsAccountLocked(true);
          setLockoutRemainingSeconds(60);
          return {
            success: false,
            message: 'คุณกรอกรหัสผ่านผิดติดต่อกันครบ 5 ครั้ง เพื่อความปลอดภัย ระบบได้ล็อกการเข้าถึงชั่วคราว 60 วินาที'
          };
        }

        return {
          success: false,
          message: `รหัสผ่านไม่ถูกต้อง (กรอกผิด ${nextAttempts}/5 ครั้ง)`
        };
      }
    }

    // Reset failed counter on successful password match
    setFailedLoginAttempts(0);

    if (matchedUser) {
      setCurrentUser(matchedUser);
      setIsLoggedIn(true);
      if (rememberMe) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: matchedUser.id }));
      }
      return { success: true, message: `ยินดีต้อนรับคุณ ${matchedUser.name}` };
    }

    // New user dynamic active session
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      accountType: 'individual',
      verifiedBadges: { identity: true, phone: true, email: true },
      responseRate: 100,
      responseSpeed: 'ตอบกลับภายใน 15 นาที',
      recommendationRate: 100,
      completedDeals: 0,
      reviewsCount: 0,
      rating: 5.0,
      ecoPoints: 100,
      carbonSavedKg: 0,
      itemsReused: 0,
      location: {
        district: 'วัฒนา',
        province: 'กรุงเทพมหานคร'
      },
      bio: 'สมาชิกใหม่แห่งเครือข่าย WasteMatch Circular Network',
      memberSince: 'ปัจจุบัน'
    };

    if (password) {
      saveUserCredential(cleanEmail, password);
    }

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    if (rememberMe) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: newUser.id }));
    }
    return { success: true, message: `ยินดีต้อนรับคุณ ${newUser.name} สู่ WasteMatch` };
  };

  // 2-Factor Authentication (OTP Verification)
  const verify2FA = (email: string, code: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const activeOtp = activeOtpStore[cleanEmail];

    // Allow simulated default code 123456 or matching dynamic OTP
    if ((activeOtp && activeOtp.code === code && Date.now() < activeOtp.expiresAt) || code === '123456' || code === simulatedLatestOtp) {
      const user = allUsers.find(u => u.email.toLowerCase() === cleanEmail) || currentUser;
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: user.id }));
      setSimulatedLatestOtp(null);
      return { success: true, message: 'ยืนยันรหัส OTP 2FA สำเร็จ เข้าสู่ระบบปลอดภัยเรียบร้อย' };
    }

    return { success: false, message: 'รหัส OTP ไม่ถูกต้องหรือหมดอายุการใช้งาน กรุณาตรวจสอบอีกครั้ง' };
  };

  const register = (data: {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    accountType: AccountType;
    organizationName?: string;
    taxId?: string;
    charityId?: string;
    province?: string;
    district?: string;
    bio?: string;
  }): { success: boolean; message: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (!data.name.trim() || !cleanEmail) {
      return { success: false, message: 'กรุณากรอกชื่อและอีเมลให้ครบถ้วน' };
    }

    // Check duplicate
    if (allUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'อีเมลนี้ถูกใช้งานในระบบแล้ว กรุณาเข้าสู่ระบบหรือใช้อีเมลอื่น' };
    }

    // Check password rules
    if (data.password && data.password.length < 8) {
      return { success: false, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name.trim(),
      organizationName: data.organizationName?.trim(),
      email: cleanEmail,
      phone: data.phone?.trim() || '+66 81 000 0000',
      avatar: data.accountType === 'business'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        : data.accountType === 'organization'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      accountType: data.accountType,
      verifiedBadges: {
        identity: true,
        phone: !!data.phone,
        email: true,
        businessRegistry: data.accountType === 'business' && !!data.taxId,
        charityRegistry: data.accountType === 'organization' && !!data.charityId
      },
      responseRate: 100,
      responseSpeed: 'พร้อมตอบกลับ',
      recommendationRate: 100,
      completedDeals: 0,
      reviewsCount: 0,
      rating: 5.0,
      ecoPoints: 250,
      carbonSavedKg: 0,
      itemsReused: 0,
      location: {
        district: data.district?.trim() || 'เมือง',
        province: data.province?.trim() || 'กรุงเทพมหานคร'
      },
      bio: data.bio?.trim() || `สมาชิกผู้ขับเคลื่อนเศรษฐกิจหมุนเวียนประเภท ${data.accountType === 'business' ? 'นิติบุคคล' : data.accountType === 'organization' ? 'มูลนิธิ' : 'บุคคลทั่วไป'} บน WasteMatch`,
      memberSince: 'ตุลาคม 2026'
    };

    if (data.password) {
      saveUserCredential(cleanEmail, data.password, {
        phone: data.phone,
        taxId: data.taxId,
        charityId: data.charityId
      });
    }

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: newUser.id }));

    // Send welcome security notification
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: newUser.id,
      type: 'security',
      title: 'ยินดีต้อนรับสู่ WasteMatch! บัญชีของคุณได้รับการคุ้มครอง',
      body: 'ระบบยืนยันตัวตนและการเข้ารหัส 256-bit พร้อมคุ้มครองข้อมูลส่วนบุคคลของคุณตามมาตรฐาน PDPA',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    return { success: true, message: 'สร้างบัญชีผู้ใช้และยืนยันข้อมูลเรียบร้อยแล้ว' };
  };

  // Password Reset / Forgot Password
  const requestPasswordReset = (email: string): { success: boolean; message: string; simulatedOtp?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'กรุณากรอกอีเมลสำหรับขอรีเซ็ตรหัสผ่าน' };
    }

    // Generate simulated 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedLatestOtp(generatedOtp);
    setActiveOtpStore(prev => ({
      ...prev,
      [cleanEmail]: { code: generatedOtp, expiresAt: Date.now() + 5 * 60 * 1000 }
    }));

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      type: 'security',
      title: 'รหัส OTP กู้คืนรหัสผ่าน WasteMatch',
      body: `รหัส OTP สำหรับรีเซ็ตรหัสผ่านของคุณคือ [ ${generatedOtp} ] (รหัสมีอายุ 5 นาที)`,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);

    return {
      success: true,
      message: `ส่งรหัส OTP 6 หลักไปยังอีเมล ${cleanEmail} เรียบร้อยแล้ว`,
      simulatedOtp: generatedOtp
    };
  };

  const resetPasswordWithOtp = (email: string, otp: string, newPassword: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const active = activeOtpStore[cleanEmail];

    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร' };
    }

    if ((active && active.code === otp) || otp === '123456' || otp === simulatedLatestOtp) {
      saveUserCredential(cleanEmail, newPassword);
      setSimulatedLatestOtp(null);

      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        type: 'security',
        title: 'รีเซ็ตรหัสผ่านสำเร็จเรียบร้อยแล้ว',
        body: 'คุณสามารถใช้รหัสผ่านใหม่ในการเข้าสู่ระบบได้อย่างปลอดภัย',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);

      return { success: true, message: 'เปลี่ยนรหัสผ่านใหม่สำเร็จแล้ว สามารถเข้าสู่ระบบได้ทันที' };
    }

    return { success: false, message: 'รหัส OTP ไม่ถูกต้องหรือหมดอายุแล้ว' };
  };

  // Social & SSO OAuth simulation
  const loginWithOAuth = (provider: 'google' | 'line') => {
    const providerName = provider === 'google' ? 'Google Account' : 'LINE ID';
    const ssoUser: User = {
      id: `user_oauth_${provider}_${Date.now()}`,
      name: provider === 'google' ? 'ผู้ใช้ Google Verified' : 'ผู้ใช้ LINE Connect',
      email: provider === 'google' ? 'user.google@gmail.com' : 'user.line@line.me',
      avatar: provider === 'google'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      accountType: 'individual',
      verifiedBadges: { identity: true, phone: true, email: true },
      responseRate: 100,
      responseSpeed: 'ตอบกลับภายใน 5 นาที',
      recommendationRate: 100,
      completedDeals: 1,
      reviewsCount: 1,
      rating: 5.0,
      ecoPoints: 150,
      carbonSavedKg: 12,
      itemsReused: 2,
      location: {
        district: 'ปทุมวัน',
        province: 'กรุงเทพมหานคร'
      },
      bio: `เข้าสู่ระบบอย่างปลอดภัยผ่าน ${providerName} (Single Sign-On)`,
      memberSince: 'ปัจจุบัน'
    };

    setAllUsers(prev => [ssoUser, ...prev]);
    setCurrentUser(ssoUser);
    setIsLoggedIn(true);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: ssoUser.id }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (oldPassword && newPassword && newPassword.length >= 8) {
      saveUserCredential(currentUser.email, newPassword);
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        type: 'security',
        title: 'รหัสผ่านของคุณได้รับการเปลี่ยนแปลงเรียบร้อยแล้ว',
        body: 'การเปลี่ยนแปลงรหัสผ่านสำหรับบัญชีของคุณเสร็จสมบูรณ์เมื่อสักครู่',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
      return true;
    }
    return false;
  };

  const deleteAccount = () => {
    setAllUsers(prev => prev.filter(u => u.id !== currentUser.id));
    setListings(prev => prev.filter(l => l.sellerId !== currentUser.id));
    logout();
  };

  const switchUserRole = (accountType: 'individual' | 'business' | 'organization' | 'admin') => {
    if (accountType === 'admin') {
      setIsAdminMode(true);
      setActiveTab('admin');
      return;
    }
    setIsAdminMode(false);
    const target = allUsers.find(u => u.accountType === accountType) || SEED_USERS[0];
    setCurrentUser(target);
    setIsLoggedIn(true);
  };

  const handleSwipe = (listingId: string, direction: 'pass' | 'interested' | 'save') => {
    setSwipedListingIds(prev => ({ ...prev, [listingId]: direction }));
    const targetListing = listings.find(l => l.id === listingId);
    if (!targetListing) return;

    if (direction === 'save') {
      toggleSaveListing(listingId);
      return;
    }

    if (direction === 'interested') {
      // Simulate Mutual Match scenario
      const isMutualMatch = true; 

      if (isMutualMatch) {
        const newMatchId = `match_${Date.now()}`;
        const newMatch: MatchRecord = {
          id: newMatchId,
          listingId: targetListing.id,
          listing: targetListing,
          buyerId: currentUser.id,
          sellerId: targetListing.sellerId,
          buyer: currentUser,
          seller: targetListing.seller,
          matchReason: `คุณและ ${targetListing.seller.name} มีความสนใจตรงกันในรายการ ${targetListing.title}`,
          status: 'matched',
          createdAt: new Date().toISOString()
        };

        setMatches(prev => [newMatch, ...prev]);
        setMatchModalData({ match: newMatch, isNew: true });

        // Add auto notification
        const newNotif: AppNotification = {
          id: `notif_${Date.now()}`,
          userId: currentUser.id,
          type: 'match',
          title: 'ยินดีด้วย! เกิดการ Mutual Match สำเร็จ',
          body: `คุณได้จับคู่กับ ${targetListing.title} เรียบร้อยแล้ว`,
          referenceId: newMatchId,
          targetTab: 'matches',
          read: false,
          createdAt: new Date().toISOString()
        };
        setNotifications(prev => [newNotif, ...prev]);

        // Create or get conversation
        const existingConv = conversations.find(c => c.listingId === targetListing.id && c.buyerId === currentUser.id);
        if (!existingConv) {
          const newConvId = `conv_${Date.now()}`;
          const newConversation: Conversation = {
            id: newConvId,
            matchId: newMatchId,
            listingId: targetListing.id,
            listing: targetListing,
            buyerId: currentUser.id,
            sellerId: targetListing.sellerId,
            otherUser: targetListing.seller,
            lastMessage: 'ระบบสร้างห้องเจรจาอัตโนมัติเมื่อเกิดการจับคู่สำเร็จ',
            lastMessageAt: 'เพิ่งส่ง',
            unreadCount: 0,
            messages: [
              {
                id: `msg_sys_${Date.now()}`,
                conversationId: newConvId,
                senderId: 'system',
                senderName: 'WasteMatch Matchmaker',
                type: 'system',
                content: `จับคู่สำเร็จแล้ว! คุณสามารถเจรจาราคา วิธีส่งมอบ หรือนัดจุดส่งมอบที่ปลอดภัยได้ที่นี่`,
                createdAt: new Date().toISOString()
              }
            ]
          };
          setConversations(prev => [newConversation, ...prev]);
        }
      }
    }
  };

  const toggleSaveListing = (listingId: string) => {
    setSavedListingIds(prev => {
      const exists = prev.includes(listingId);
      if (exists) {
        return prev.filter(id => id !== listingId);
      } else {
        return [...prev, listingId];
      }
    });
  };

  const createListing = (data: Partial<Listing>): Listing => {
    const price = data.price || 0;
    const txType = data.transactionType || 'sell';
    const comm = calculateCommission(price, txType, currentSubscription);

    const newListing: Listing = {
      id: `list_${Date.now()}`,
      sellerId: currentUser.id,
      seller: currentUser,
      title: data.title || 'รายการวัสดุหมุนเวียน',
      description: data.description || '',
      category: data.category || 'furniture_home',
      transactionType: txType,
      price: price,
      originalPrice: data.originalPrice,
      conditionGrade: data.conditionGrade || 'good',
      conditionPercentage: data.conditionPercentage || 85,
      conditionLabel: data.conditionLabel || `สภาพ ${data.conditionPercentage || 85}%`,
      quantity: data.quantity || 1,
      unit: data.unit || 'ชิ้น',
      images: data.images && data.images.length > 0 ? data.images : [getCategoryDefaultImage(data.category)],
      location: data.location || {
        district: currentUser.location.district,
        province: currentUser.location.province,
        distanceKm: 1.5
      },
      deliveryOptions: data.deliveryOptions || ['pickup'],
      status: 'active',
      matchExplanation: {
        reasons: ['สร้างประกาศโดยสมาชิกที่ยืนยันตัวตนแล้ว', 'พร้อมสำหรับการจับคู่ในพื้นที่'],
        compatibilityScore: 90,
        categoryMatch: true,
        distanceKm: 1.5,
        budgetMatch: true,
        verifiedSeller: true
      },
      views: 1,
      saves: 0,
      interestedCount: 0,
      commissionRate: comm.effectiveRate,
      platformFee: comm.commissionFee,
      sellerNetPayout: comm.sellerNetPayout,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);
    return newListing;
  };

  const updateListing = (listingId: string, data: Partial<Listing>) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, ...data, updatedAt: new Date().toISOString() } : l));
  };

  const updateListingImage = (listingId: string, imageUrl: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        return {
          ...l,
          images: [imageUrl, ...(l.images ? l.images.slice(1) : [])],
          updatedAt: new Date().toISOString()
        };
      }
      return l;
    }));
    setSelectedListing(prev => (prev && prev.id === listingId ? { ...prev, images: [imageUrl, ...(prev.images ? prev.images.slice(1) : [])] } : prev));
  };

  const updateListingStatus = (listingId: string, status: ListingStatus) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, status, updatedAt: new Date().toISOString() } : l));
  };

  const deleteListing = (listingId: string) => {
    setListings(prev => prev.filter(l => l.id !== listingId));
  };

  const updateWantedItem = (wantedId: string, data: Partial<WantedItem>) => {
    setWantedItems(prev => prev.map(w => w.id === wantedId ? { ...w, ...data } : w));
  };

  const updateWantedItemImage = (wantedId: string, imageUrl: string) => {
    setWantedItems(prev => prev.map(w => {
      if (w.id === wantedId) {
        return {
          ...w,
          images: [imageUrl, ...(w.images ? w.images.slice(1) : [])]
        };
      }
      return w;
    }));
  };

  const openImageEditor = (config: { title?: string; currentImage: string; onSave: (url: string) => void }) => {
    setImageEditorState({
      isOpen: true,
      title: config.title || 'แก้ไขและเปลี่ยนรูปภาพ',
      currentImage: config.currentImage,
      onSave: config.onSave
    });
  };

  const closeImageEditor = () => {
    setImageEditorState(null);
  };

  const createWantedItem = (data: Partial<WantedItem>): WantedItem => {
    const newItem: WantedItem = {
      id: `wanted_${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      title: data.title || 'รายการตามหา',
      category: data.category || 'furniture_home',
      quantity: data.quantity || 1,
      unit: data.unit || 'ชิ้น',
      budget: data.budget || 0,
      images: data.images && data.images.length > 0 ? data.images : [getCategoryDefaultImage(data.category)],
      location: data.location || {
        district: currentUser.location.district,
        province: currentUser.location.province
      },
      description: data.description || '',
      expirationDate: data.expirationDate || '30 วันข้างหน้า',
      matchingListingsCount: 0,
      createdAt: new Date().toISOString()
    };

    setWantedItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const unmatch = (matchId: string) => {
    setMatches(prev => prev.filter(m => m.id !== matchId));
    setConversations(prev => prev.filter(c => c.matchId !== matchId));
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      type: 'match',
      title: 'ยกเลิกการจับคู่ (Unmatched)',
      body: 'คุณได้ยกเลิกการจับคู่รายการดังกล่าวเรียบร้อยแล้ว',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const sendMessage = (conversationId: string, content: string, type: MessageType = 'text', offerData?: OfferData) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      type,
      content,
      offerData,
      createdAt: new Date().toISOString()
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: type === 'offer' ? `ข้อเสนอราคา ฿${offerData?.amount || 0}` : content,
          lastMessageAt: 'เพิ่งส่ง',
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const respondToOffer = (conversationId: string, offerId: string, action: 'accepted' | 'rejected' | 'countered', counterAmount?: number) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = conv.messages.map(m => {
          if (m.offerData && m.offerData.offerId === offerId) {
            return {
              ...m,
              offerData: {
                ...m.offerData,
                status: action
              }
            };
          }
          return m;
        });

        const statusText = action === 'accepted' ? 'ยอมรับข้อเสนอแล้ว' : action === 'rejected' ? 'ปฏิเสธข้อเสนอ' : `ยื่นข้อเสนอใหม่ ฿${counterAmount}`;
        
        const systemMessage: ChatMessage = {
          id: `msg_${Date.now()}`,
          conversationId,
          senderId: 'system',
          senderName: 'ระบบเจรจา WasteMatch',
          type: 'deal_update',
          content: `${currentUser.name} ได้${statusText}`,
          createdAt: new Date().toISOString()
        };

        return {
          ...conv,
          lastMessage: statusText,
          lastMessageAt: 'เพิ่งส่ง',
          messages: [...updatedMessages, systemMessage]
        };
      }
      return conv;
    }));

    if (action === 'accepted') {
      const conv = conversations.find(c => c.id === conversationId);
      if (conv) {
        createDealFromMatch(conv.matchId);
      }
    }
  };

  const createDealFromMatch = (matchId: string, agreedPrice?: number): Deal => {
    const match = matches.find(m => m.id === matchId);
    const finalPrice = agreedPrice !== undefined ? agreedPrice : (match?.listing.price || 0);
    const comm = calculateCommission(finalPrice, match?.listing.transactionType || 'sell', currentSubscription);

    const newDeal: Deal = {
      id: `deal_${Date.now()}`,
      matchId,
      listingId: match?.listingId || '',
      listing: match?.listing || INITIAL_LISTINGS[0],
      buyerId: match?.buyerId || currentUser.id,
      sellerId: match?.sellerId || SEED_USERS[0].id,
      buyer: match?.buyer || currentUser,
      seller: match?.seller || SEED_USERS[0],
      agreedPrice: finalPrice,
      commissionFee: comm.commissionFee,
      sellerPayout: comm.sellerNetPayout,
      transactionType: match?.listing.transactionType || 'sell',
      deliveryMethod: 'pickup',
      status: 'deal_confirmed',
      handover: {
        scheduledDate: '2026-10-02',
        scheduledTime: '15:00',
        meetingLocation: 'จุดนัดรับสาธารณะหรือศูนย์หมุนเวียนวัสดุ',
        safeZoneName: 'Community Exchange SafeHub',
        safetyChecklistAgreed: true,
        confirmationCode: `WM-${Math.floor(1000 + Math.random() * 9000)}`,
        codeUsed: false
      },
      buyerConfirmed: true,
      sellerConfirmed: true,
      hasBuyerReviewed: false,
      hasSellerReviewed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setDeals(prev => [newDeal, ...prev]);
    setSelectedDealId(newDeal.id);
    setActiveTab('deals');
    return newDeal;
  };

  const advanceDealStatus = (dealId: string, nextStatus: DealStatus, handoverDetails?: Partial<Deal['handover']>) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === dealId) {
        return {
          ...deal,
          status: nextStatus,
          handover: handoverDetails ? { ...deal.handover, ...handoverDetails } : deal.handover,
          updatedAt: new Date().toISOString()
        };
      }
      return deal;
    }));
  };

  const cancelDeal = (dealId: string, reason: string) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          status: 'cancelled',
          cancellationReason: reason,
          cancelledBy: currentUser.id,
          updatedAt: new Date().toISOString()
        };
      }
      return d;
    }));

    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      const otherUserId = currentUser.id === deal.buyerId ? deal.sellerId : deal.buyerId;
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: otherUserId,
        type: 'deal',
        title: 'ข้อตกลงถูกยกเลิก (Deal Cancelled)',
        body: `ข้อตกลงสำหรับ "${deal.listing.title}" ถูกยกเลิกโดย ${currentUser.name} (เหตุผล: ${reason})`,
        referenceId: deal.id,
        targetTab: 'deals',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const rescheduleDeal = (dealId: string, newDate: string, newTime: string, newLocation: string, safeZoneName?: string) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        const isBuyer = currentUser.id === d.buyerId;
        return {
          ...d,
          status: 'scheduled',
          handover: {
            ...d.handover,
            scheduledDate: newDate,
            scheduledTime: newTime,
            meetingLocation: newLocation,
            safeZoneName: safeZoneName || d.handover.safeZoneName
          },
          buyerConfirmed: isBuyer,
          sellerConfirmed: !isBuyer,
          rescheduledCount: (d.rescheduledCount || 0) + 1,
          updatedAt: new Date().toISOString()
        };
      }
      return d;
    }));

    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      const otherUserId = currentUser.id === deal.buyerId ? deal.sellerId : deal.buyerId;
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: otherUserId,
        type: 'deal',
        title: 'มีการปรับเปลี่ยนเวลานัดหมายหรือสถานที่',
        body: `${currentUser.name} ได้ปรับเปลี่ยนเวลานัดหมายเป็น ${newDate} เวลา ${newTime} น. ณ ${newLocation} กรุณากดตรวจสอบและยืนยัน`,
        referenceId: deal.id,
        targetTab: 'deals',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const confirmDealParty = (dealId: string, party: 'buyer' | 'seller') => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        const nextBuyer = party === 'buyer' ? true : d.buyerConfirmed;
        const nextSeller = party === 'seller' ? true : d.sellerConfirmed;
        const bothConfirmed = nextBuyer && nextSeller;
        return {
          ...d,
          buyerConfirmed: nextBuyer,
          sellerConfirmed: nextSeller,
          status: bothConfirmed && (d.status === 'negotiating' || d.status === 'scheduled') ? 'deal_confirmed' : d.status,
          updatedAt: new Date().toISOString()
        };
      }
      return d;
    }));

    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      const otherUserId = party === 'buyer' ? deal.sellerId : deal.buyerId;
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: otherUserId,
        type: 'deal',
        title: `${party === 'buyer' ? 'ผู้รับ (Buyer)' : 'ผู้ส่งมอบ (Seller)'} ยืนยันข้อตกลงแล้ว`,
        body: `${currentUser.name} ได้กดยืนยันเงื่อนไขการส่งมอบเรียบร้อยแล้ว`,
        referenceId: deal.id,
        targetTab: 'deals',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const confirmHandoverCode = (dealId: string, code: string): boolean => {
    const res = verifyHandoverCode(dealId, code);
    return res.success;
  };

  const verifyHandoverCode = (dealId: string, code: string): { success: boolean; message: string } => {
    const targetDeal = deals.find(d => d.id === dealId);
    if (!targetDeal) return { success: false, message: 'ไม่พบข้อมูลข้อตกลงนี้ในระบบ' };

    if (targetDeal.status === 'completed' || targetDeal.handover.codeUsed) {
      return { success: false, message: 'รหัสความปลอดภัยนี้ถูกใช้งานยืนยันการรับมอบไปแล้ว ไม่สามารถใช้ซ้ำได้' };
    }

    const cleanInput = code.trim().toUpperCase();
    const cleanTarget = targetDeal.handover.confirmationCode.trim().toUpperCase();

    if (cleanInput === cleanTarget) {
      const handoverTime = new Date().toISOString();
      setDeals(prev => prev.map(d => {
        if (d.id === dealId) {
          return {
            ...d,
            status: 'completed',
            handover: {
              ...d.handover,
              codeUsed: true,
              handoverTime
            },
            updatedAt: handoverTime
          };
        }
        return d;
      }));

      // Update user stats
      setCurrentUser(prev => ({
        ...prev,
        completedDeals: prev.completedDeals + 1,
        ecoPoints: prev.ecoPoints + 50,
        itemsReused: prev.itemsReused + (targetDeal.listing.quantity || 1)
      }));

      // Notifications
      const notifBuyer: AppNotification = {
        id: `notif_${Date.now()}_b`,
        userId: targetDeal.buyerId,
        type: 'deal',
        title: 'การส่งมอบเสร็จสมบูรณ์เรียบร้อย (Deal Completed)',
        body: `ตรวจรับ "${targetDeal.listing.title}" เรียบร้อยแล้ว ณ เวลา ${new Date().toLocaleTimeString('th-TH')}`,
        referenceId: targetDeal.id,
        targetTab: 'deals',
        read: false,
        createdAt: handoverTime
      };

      const notifSeller: AppNotification = {
        id: `notif_${Date.now()}_s`,
        userId: targetDeal.sellerId,
        type: 'deal',
        title: 'ผู้รับยืนยันรหัสความปลอดภัยสำเร็จแล้ว',
        body: `ปิดการส่งมอบเรียบร้อย รับคะแนน 50 EcoPoints เข้าสู่บัญชี`,
        referenceId: targetDeal.id,
        targetTab: 'deals',
        read: false,
        createdAt: handoverTime
      };

      setNotifications(prev => [notifBuyer, notifSeller, ...prev]);

      return { success: true, message: 'ยืนยันรหัสความปลอดภัยสำเร็จ! การส่งมอบเสร็จสมบูรณ์เรียบร้อยแล้ว' };
    }

    return { success: false, message: 'รหัสยืนยันไม่ถูกต้อง กรุณาตรวจสอบรหัส 6 หลักจากผู้ส่งมอบอีกครั้ง' };
  };

  const blockUser = (userId: string) => {
    if (!blockedUserIds.includes(userId)) {
      setBlockedUserIds(prev => [...prev, userId]);
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        type: 'security',
        title: 'ระงับการติดต่อผู้ใช้ (Blocked User)',
        body: 'คุณได้ระงับการติดต่อกับผู้ใช้นี้เรียบร้อยแล้ว ผู้ใช้จะไม่สามารถส่งข้อความหรือจับคู่กับคุณได้',
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const unblockUser = (userId: string) => {
    setBlockedUserIds(prev => prev.filter(id => id !== userId));
  };

  const isUserBlocked = (userId: string): boolean => {
    return blockedUserIds.includes(userId);
  };

  const submitReview = (dealId: string, rating: number, comment: string, tags: string[]) => {
    const targetDeal = deals.find(d => d.id === dealId);
    if (!targetDeal) return;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      dealId,
      listingId: targetDeal.listingId,
      reviewerId: currentUser.id,
      reviewer: currentUser,
      targetUserId: currentUser.id === targetDeal.buyerId ? targetDeal.sellerId : targetDeal.buyerId,
      rating,
      comment,
      tags,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);

    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          hasBuyerReviewed: currentUser.id === d.buyerId ? true : d.hasBuyerReviewed,
          hasSellerReviewed: currentUser.id === d.sellerId ? true : d.hasSellerReviewed
        };
      }
      return d;
    }));
  };

  const submitReport = (reason: ReportReason, description: string, evidence?: string) => {
    if (!reportModalTarget) return;

    const newReport: ReportItem = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      targetType: reportModalTarget.type,
      targetId: reportModalTarget.id,
      targetTitle: reportModalTarget.title,
      reason,
      description,
      evidence,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setReports(prev => [newReport, ...prev]);
    setReportModalTarget(null);
  };

  const adminModerateReport = (reportId: string, action: 'resolve' | 'dismiss' | 'suspend_user' | 'suspend_listing') => {
    let act: ModerationAction = 'dismissed';
    if (action === 'resolve') act = 'warning_issued';
    if (action === 'suspend_user') act = 'account_suspended';
    if (action === 'suspend_listing') act = 'removed_listing';
    adminTakeModerationAction(reportId, act, 'ดำเนินการโดยแอดมินระบบส่วนกลาง');
  };

  const adminTakeModerationAction = (reportId: string, action: ModerationAction, note: string) => {
    const targetReport = reports.find(r => r.id === reportId);
    const resolvedTime = new Date().toISOString();

    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: action === 'dismissed' ? 'dismissed' : 'resolved',
          actionTaken: action,
          moderationNote: note,
          resolvedAt: resolvedTime
        };
      }
      return r;
    }));

    if (targetReport) {
      if (action === 'removed_listing' && targetReport.targetType === 'listing') {
        updateListingStatus(targetReport.targetId, 'suspended');
      } else if (action === 'account_suspended' || action === 'account_banned') {
        adminToggleUserStatus(targetReport.targetId);
      }
    }
  };

  const adminToggleUserStatus = (userId: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          verifiedBadges: {
            ...u.verifiedBadges,
            identity: !u.verifiedBadges.identity
          }
        };
      }
      return u;
    }));
  };

  const upgradeSubscription = (plan: SubscriptionPlan) => {
    setCurrentSubscription(plan);
    const planNames: Record<SubscriptionPlan, string> = {
      free: 'Free Plan',
      starter: 'Eco Starter',
      pro: 'Circular Pro',
      enterprise: 'Enterprise Partner'
    };
    const planPrices: Record<SubscriptionPlan, number> = {
      free: 0,
      starter: 99,
      pro: 299,
      enterprise: 499
    };

    const newInvoice: PaymentInvoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      amount: planPrices[plan],
      plan,
      planName: planNames[plan],
      paymentMethod: plan === 'free' ? 'None (Free)' : 'PromptPay QR',
      status: 'paid'
    };

    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);

    setSubscriptionDetails(prev => ({
      ...prev,
      plan,
      status: 'active',
      startDate: new Date().toISOString(),
      expirationDate: expDate.toISOString(),
      autoRenew: plan !== 'free',
      paymentHistory: [newInvoice, ...prev.paymentHistory]
    }));
  };

  const cancelSubscription = () => {
    setSubscriptionDetails(prev => ({
      ...prev,
      status: 'cancelled',
      autoRenew: false
    }));
  };

  const renewSubscription = () => {
    setSubscriptionDetails(prev => ({
      ...prev,
      status: 'active',
      autoRenew: true
    }));
  };

  const createAnnouncement = (title: string, content: string, type: 'info' | 'warning' | 'alert' | 'update' = 'info') => {
    const ann: PlatformAnnouncement = {
      id: `ann_${Date.now()}`,
      title,
      content,
      type,
      active: true,
      createdAt: new Date().toISOString()
    };
    setAnnouncements(prev => [ann, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        allUsers,
        isLoggedIn,
        login,
        verify2FA,
        register,
        logout,
        changePassword,
        requestPasswordReset,
        resetPasswordWithOtp,
        loginWithOAuth,
        failedLoginAttempts,
        isAccountLocked,
        lockoutRemainingSeconds,
        simulatedLatestOtp,
        deleteAccount,
        setCurrentUser,
        switchUserRole,
        isAdminMode,
        setIsAdminMode,

        viewingSeller,
        setViewingSeller,

        activeTab,
        setActiveTab,

        listings,
        wantedItems,
        matches,
        conversations,
        deals,
        reviews,
        notifications,
        reports,
        savedListingIds,
        swipedListingIds,

        handleSwipe,
        toggleSaveListing,
        createListing,
        updateListing,
        updateListingStatus,
        updateListingImage,
        deleteListing,
        createWantedItem,
        updateWantedItem,
        updateWantedItemImage,
        unmatch,

        heroImage,
        setHeroImage,
        imageEditorState,
        openImageEditor,
        closeImageEditor,

        activeConversationId,
        setActiveConversationId,
        sendMessage,
        respondToOffer,
        createDealFromMatch,
        advanceDealStatus,
        cancelDeal,
        rescheduleDeal,
        confirmDealParty,
        confirmHandoverCode,
        verifyHandoverCode,
        submitReview,

        blockedUserIds,
        blockUser,
        unblockUser,
        isUserBlocked,

        selectedListing,
        setSelectedListing,
        matchModalData,
        setMatchModalData,
        selectedDealId,
        setSelectedDealId,
        reviewModalDeal,
        setReviewModalDeal,
        reportModalTarget,
        setReportModalTarget,
        submitReport,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isCreateListingOpen,
        setIsCreateListingOpen,
        isCreateWantedOpen,
        setIsCreateWantedOpen,
        isNotificationsDrawerOpen,
        setIsNotificationsDrawerOpen,
        securityModalOpen,
        setSecurityModalOpen,
        securityModalTab,
        setSecurityModalTab,

        adminModerateReport,
        adminTakeModerationAction,
        adminToggleUserStatus,
        announcements,
        createAnnouncement,

        currentSubscription,
        subscriptionDetails,
        upgradeSubscription,
        cancelSubscription,
        renewSubscription,

        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
