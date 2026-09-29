import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { LandingPage } from './components/landing/LandingPage';
import { DiscoverView } from './components/discover/DiscoverView';
import { WantedView } from './components/wanted/WantedView';
import { MatchesView } from './components/matches/MatchesView';
import { ChatView } from './components/chat/ChatView';
import { DealsView } from './components/deals/DealsView';
import { MyListingsView } from './components/listings/MyListingsView';
import { SubscriptionView } from './components/subscription/SubscriptionView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Global Modals
import { MatchModal } from './components/discover/MatchModal';
import { ItemDetailModal } from './components/common/ItemDetailModal';
import { CreateListingModal } from './components/create/CreateListingModal';
import { ReviewModal } from './components/deals/ReviewModal';
import { ReportModal } from './components/common/ReportModal';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { SellerProfileModal } from './components/profile/SellerProfileModal';

const AppContent: React.FC = () => {
  const { activeTab, isAdminMode, viewingSeller, setViewingSeller } = useMarketplace();

  if (isAdminMode) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#1C211F]">
      
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-0">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'discover' && <DiscoverView />}
        {activeTab === 'wanted' && <WantedView />}
        {activeTab === 'matches' && <MatchesView />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'deals' && <DealsView />}
        {activeTab === 'listings' && <MyListingsView />}
        {activeTab === 'subscription' && <SubscriptionView />}
        {(activeTab === 'profile' || activeTab === 'impact') && <ProfileView />}
      </main>

      {/* Mobile-first Thumb Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals & Drawers */}
      <MatchModal />
      <ItemDetailModal />
      <CreateListingModal />
      <ReviewModal />
      <ReportModal />
      <NotificationsDrawer />
      <AuthModal />
      <OnboardingModal />

      {/* Seller Profile Modal */}
      {viewingSeller && (
        <SellerProfileModal 
          seller={viewingSeller} 
          onClose={() => setViewingSeller(null)} 
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <AppContent />
    </MarketplaceProvider>
  );
}
