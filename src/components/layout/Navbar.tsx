import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { WasteMatchLogo } from '../common/WasteMatchLogo';
import { 
  Bell, 
  Plus, 
  ShieldCheck, 
  ChevronDown, 
  SlidersHorizontal,
  Building2,
  User as UserIcon,
  HeartHandshake,
  Check,
  LogIn,
  LogOut,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchUserRole, 
    activeTab, 
    setActiveTab, 
    setIsCreateListingOpen, 
    unreadNotificationsCount, 
    setIsNotificationsDrawerOpen,
    isAdminMode,
    setIsAdminMode,
    isLoggedIn,
    logout,
    setIsAuthModalOpen
  } = useMarketplace();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'discover', label: 'ค้นพบและจับคู่' },
    { id: 'wanted', label: 'ประกาศตามหา' },
    { id: 'matches', label: 'รายการแมตช์' },
    { id: 'chat', label: 'แชทเจรจา' },
    { id: 'deals', label: 'ข้อตกลง (Deals)' },
    { id: 'impact', label: 'ผลกระทบสิ่งแวดล้อม' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1C211F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Distinctive Modern Vector Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsAdminMode(false);
              setActiveTab('landing');
            }}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <WasteMatchLogo size="md" showSubtitle={false} />
          </button>
        </div>

        {/* Zone 2: Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1C211F]/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setIsAdminMode(false);
                setActiveTab(link.id);
              }}
              className={`transition-colors py-1 cursor-pointer relative ${
                !isAdminMode && activeTab === link.id
                  ? 'text-[#164C3A] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#164C3A]'
                  : 'hover:text-[#164C3A]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              setIsAdminMode(false);
              setActiveTab('subscription');
            }}
            className={`transition-colors py-1 cursor-pointer text-xs uppercase tracking-wider font-semibold ${
              !isAdminMode && activeTab === 'subscription'
                ? 'text-[#164C3A] font-bold'
                : 'text-[#1C211F]/60 hover:text-[#164C3A]'
            }`}
          >
            แผนสมาชิก (0-499)
          </button>
        </nav>

        {/* Zone 3: Post Action + Auth / User Menu */}
        <div className="flex items-center gap-3">
          {/* Post Listing CTA */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setIsAuthModalOpen(true);
              } else {
                setIsCreateListingOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#164C3A] rounded-lg hover:bg-[#123e2f] active:scale-[0.98] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>ลงประกาศ</span>
          </button>

          {/* Notifications Button */}
          {isLoggedIn && (
            <button
              onClick={() => setIsNotificationsDrawerOpen(true)}
              aria-label="แจ้งเตือน"
              className="relative p-2 text-[#1C211F]/70 hover:text-[#164C3A] hover:bg-[#164C3A]/5 rounded-lg transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#164C3A] rounded-full ring-2 ring-[#F7F5EF]" />
              )}
            </button>
          )}

          {/* If Logged Out: Show Login / Register button */}
          {!isLoggedIn ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#164C3A] bg-white border border-[#164C3A]/20 hover:border-[#164C3A] rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              <LogIn className="w-4 h-4" />
              <span>เข้าสู่ระบบ</span>
            </button>
          ) : (
            /* If Logged In: Role / User Menu */
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-[#164C3A]/5 rounded-lg transition-colors cursor-pointer text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#1C211F]/10"
                />
                <div className="hidden sm:block text-left leading-tight">
                  <div className="text-xs font-semibold text-[#1C211F] truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-[#1C211F]/60 capitalize flex items-center gap-1">
                    <span>{currentUser.accountType === 'individual' ? 'บุคคลทั่วไป' : currentUser.accountType === 'business' ? 'ธุรกิจ' : 'มูลนิธิ'}</span>
                    <ChevronDown className="w-3 h-3 text-[#1C211F]/40" />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#1C211F]/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#1C211F]/10">
                    <p className="text-[11px] text-[#1C211F]/50 uppercase tracking-wider font-medium">สลับบทบาทจำลอง (Role Simulator)</p>
                    <p className="text-xs text-[#1C211F]/80 mt-0.5">เลือกเพื่อทดสอบมุมมองผู้ใช้แต่ละประเภท</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        switchUserRole('individual');
                        setIsRoleDropdownOpen(false);
                        setActiveTab('profile');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#F7F5EF] text-xs font-medium cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-[#164C3A]" />
                        <div>
                          <div className="text-[#1C211F]">บุคคลทั่วไป (Individual)</div>
                          <div className="text-[11px] text-[#1C211F]/50">กิตติพงษ์ วัฒนาเสถียร</div>
                        </div>
                      </div>
                      {currentUser.accountType === 'individual' && !isAdminMode && (
                        <Check className="w-4 h-4 text-[#164C3A]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        switchUserRole('business');
                        setIsRoleDropdownOpen(false);
                        setActiveTab('profile');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#F7F5EF] text-xs font-medium cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#164C3A]" />
                        <div>
                          <div className="text-[#1C211F]">ธุรกิจหมุนเวียน (Business)</div>
                          <div className="text-[11px] text-[#1C211F]/50">GreenCraft Studio BKK</div>
                        </div>
                      </div>
                      {currentUser.accountType === 'business' && !isAdminMode && (
                        <Check className="w-4 h-4 text-[#164C3A]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        switchUserRole('organization');
                        setIsRoleDropdownOpen(false);
                        setActiveTab('profile');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#F7F5EF] text-xs font-medium cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-[#164C3A]" />
                        <div>
                          <div className="text-[#1C211F]">องค์กรไม่แสวงหากำไร (NGO)</div>
                          <div className="text-[11px] text-[#1C211F]/50">มูลนิธิกระจกเงา</div>
                        </div>
                      </div>
                      {currentUser.accountType === 'organization' && !isAdminMode && (
                        <Check className="w-4 h-4 text-[#164C3A]" />
                      )}
                    </button>
                  </div>

                  <div className="border-t border-[#1C211F]/10 pt-1 mt-1">
                    <button
                      onClick={() => {
                        switchUserRole('admin');
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#F7F5EF] text-xs font-medium text-amber-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        <span>Admin Moderation Console</span>
                      </div>
                      {isAdminMode && <Check className="w-4 h-4 text-amber-700" />}
                    </button>

                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        setActiveTab('profile');
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#164C3A] hover:bg-[#F7F5EF] cursor-pointer flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>จัดการโปรไฟล์และความปลอดภัย</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-700 hover:bg-rose-50 cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>ออกจากระบบ (Sign Out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
