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
  AccountType
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
  INITIAL_REPORTS
} from '../data/seedData';
import { calculateCommission } from '../utils/commission';

interface MarketplaceContextType {
  // Auth & Current User
  currentUser: User;
  allUsers: User[];
  isLoggedIn: boolean;
  login: (email: string, password?: string) => boolean;
  register: (data: {
    name: string;
    email: string;
    accountType: AccountType;
    organizationName?: string;
    province?: string;
    district?: string;
    bio?: string;
  }) => void;
  logout: () => void;
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
  updateListingStatus: (listingId: string, status: ListingStatus) => void;
  deleteListing: (listingId: string) => void;
  createWantedItem: (data: Partial<WantedItem>) => WantedItem;
  
  // Chat & Deals
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, content: string, type?: MessageType, offerData?: OfferData) => void;
  respondToOffer: (conversationId: string, offerId: string, action: 'accepted' | 'rejected' | 'countered', counterAmount?: number) => void;
  createDealFromMatch: (matchId: string, agreedPrice?: number) => Deal;
  advanceDealStatus: (dealId: string, nextStatus: DealStatus, handoverDetails?: Partial<Deal['handover']>) => void;
  confirmHandoverCode: (dealId: string, code: string) => boolean;
  submitReview: (dealId: string, rating: number, comment: string, tags: string[]) => void;
  
  // Modals & UI States
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  matchModalData: { match: MatchRecord; isNew: boolean } | null;
  setMatchModalData: (data: { match: MatchRecord; isNew: boolean } | null) => void;
  selectedDealId: string | null;
  setSelectedDealId: (id: string | null) => void;
  reviewModalDeal: Deal | null;
  setReviewModalDeal: (deal: Deal | null) => void;
  reportModalTarget: { type: 'listing' | 'user'; id: string; title: string } | null;
  setReportModalTarget: (target: { type: 'listing' | 'user'; id: string; title: string } | null) => void;
  submitReport: (reason: ReportItem['reason'], description: string, evidence?: string) => void;

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

  // Admin moderation
  adminModerateReport: (reportId: string, action: 'resolve' | 'dismiss' | 'suspend_user' | 'suspend_listing') => void;
  adminToggleUserStatus: (userId: string) => void;

  // Subscription
  currentSubscription: SubscriptionPlan;
  upgradeSubscription: (plan: SubscriptionPlan) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEY = 'wastematch_app_state_v2';
const AUTH_KEY = 'wastematch_auth_state_v2';

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(SEED_USERS[0]);
  const [allUsers, setAllUsers] = useState<User[]>(SEED_USERS);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('landing');

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
  const [reportModalTarget, setReportModalTarget] = useState<{ type: 'listing' | 'user'; id: string; title: string } | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState<boolean>(false);
  const [isCreateWantedOpen, setIsCreateWantedOpen] = useState<boolean>(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState<boolean>(false);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionPlan>('starter');

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
        if (parsed.listings) setListings(parsed.listings);
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
  }, [listings, matches, conversations, deals, savedListingIds, swipedListingIds]);

  const login = (email: string) => {
    const matchedUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setIsLoggedIn(true);
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: matchedUser.id }));
      return true;
    }
    // If not found in seeds, create an active session for the email
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: email.split('@')[0],
      email: email,
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
    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: newUser.id }));
    return true;
  };

  const register = (data: {
    name: string;
    email: string;
    accountType: AccountType;
    organizationName?: string;
    province?: string;
    district?: string;
    bio?: string;
  }) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name,
      organizationName: data.organizationName,
      email: data.email,
      avatar: data.accountType === 'business'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        : data.accountType === 'organization'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      accountType: data.accountType,
      verifiedBadges: {
        identity: true,
        phone: true,
        email: true,
        businessRegistry: data.accountType === 'business',
        charityRegistry: data.accountType === 'organization'
      },
      responseRate: 100,
      responseSpeed: 'พร้อมตอบกลับ',
      recommendationRate: 100,
      completedDeals: 0,
      reviewsCount: 0,
      rating: 5.0,
      ecoPoints: 200,
      carbonSavedKg: 0,
      itemsReused: 0,
      location: {
        district: data.district || 'เมือง',
        province: data.province || 'กรุงเทพมหานคร'
      },
      bio: data.bio || `ผู้ใช้ประเภท ${data.accountType} ในชุมชน WasteMatch`,
      memberSince: 'ปัจจุบัน'
    };

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, userId: newUser.id }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: false }));
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
      images: data.images && data.images.length > 0 ? data.images : [INITIAL_LISTINGS[0].images[0]],
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

  const updateListingStatus = (listingId: string, status: ListingStatus) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, status, updatedAt: new Date().toISOString() } : l));
  };

  const deleteListing = (listingId: string) => {
    setListings(prev => prev.filter(l => l.id !== listingId));
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
        confirmationCode: `WM-${Math.floor(1000 + Math.random() * 9000)}`
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

  const confirmHandoverCode = (dealId: string, code: string): boolean => {
    const targetDeal = deals.find(d => d.id === dealId);
    if (!targetDeal) return false;

    if (targetDeal.handover.confirmationCode.trim().toLowerCase() === code.trim().toLowerCase()) {
      advanceDealStatus(dealId, 'completed');
      return true;
    }
    return false;
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

  const submitReport = (reason: ReportItem['reason'], description: string, evidence?: string) => {
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
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: action === 'dismiss' ? 'dismissed' : 'resolved'
        };
      }
      return r;
    }));
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
        register,
        logout,
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
        updateListingStatus,
        deleteListing,
        createWantedItem,

        activeConversationId,
        setActiveConversationId,
        sendMessage,
        respondToOffer,
        createDealFromMatch,
        advanceDealStatus,
        confirmHandoverCode,
        submitReview,

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

        adminModerateReport,
        adminToggleUserStatus,

        currentSubscription,
        upgradeSubscription,

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
