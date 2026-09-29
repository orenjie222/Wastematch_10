import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { AccountType } from '../../types/marketplace';
import { THAI_PROVINCES } from '../../data/thaiProvinces';
import { WasteMatchLogo } from '../common/WasteMatchLogo';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Building2, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    login, 
    register, 
    currentUser,
    switchUserRole 
  } = useMarketplace();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [organizationName, setOrganizationName] = useState('');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      if (!email.trim()) {
        setErrorMsg('กรุณากรอกอีเมลสำหรับเข้าสู่ระบบ');
        return;
      }
      const success = login(email.trim(), password);
      if (success) {
        setIsSuccessMessage(true);
        setTimeout(() => {
          setIsSuccessMessage(false);
          setIsAuthModalOpen(false);
        }, 1000);
      }
    } else {
      if (!name.trim() || !email.trim()) {
        setErrorMsg('กรุณากรอกชื่อและอีเมลให้ครบถ้วน');
        return;
      }
      register({
        name: name.trim(),
        email: email.trim(),
        accountType,
        organizationName: organizationName.trim() || undefined,
        province,
      });
      setIsSuccessMessage(true);
      setTimeout(() => {
        setIsSuccessMessage(false);
        setIsAuthModalOpen(false);
      }, 1000);
    }
  };

  const handleQuickDemoLogin = (role: 'individual' | 'business' | 'organization') => {
    switchUserRole(role);
    setIsSuccessMessage(true);
    setTimeout(() => {
      setIsSuccessMessage(false);
      setIsAuthModalOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-display">WasteMatch Thailand</span>
            <span className="text-xs text-[#DCE9E2] border-l border-white/20 pl-2">
              {authMode === 'login' ? 'เข้าสู่ระบบจริง' : 'สมัครสมาชิกใหม่'}
            </span>
          </div>
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccessMessage ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-[#1C211F]">เข้าสู่ระบบสำเร็จ</h4>
            <p className="text-xs text-[#1C211F]/60">
              ยินดีต้อนรับคุณ {currentUser.name} สู่เครือข่าย WasteMatch
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#F7F5EF] rounded-xl text-xs">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                }}
                className={`py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  authMode === 'login' ? 'bg-white text-[#164C3A] shadow-2xs font-semibold' : 'text-[#1C211F]/60'
                }`}
              >
                เข้าสู่ระบบ (Sign In)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMsg('');
                }}
                className={`py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  authMode === 'register' ? 'bg-white text-[#164C3A] shadow-2xs font-semibold' : 'text-[#1C211F]/60'
                }`}
              >
                สมัครสมาชิก (Register)
              </button>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                      ประเภทบัญชีผู้ใช้ *
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'individual', label: 'บุคคลทั่วไป', icon: UserIcon },
                        { id: 'business', label: 'ธุรกิจ/โรงงาน', icon: Building2 },
                        { id: 'organization', label: 'มูลนิธิ/NGO', icon: HeartHandshake },
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setAccountType(type.id as AccountType)}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            accountType === type.id
                              ? 'border-[#164C3A] bg-[#F7F5EF] text-[#164C3A] font-bold'
                              : 'border-[#1C211F]/10 text-[#1C211F]/60 hover:border-[#1C211F]/30'
                          }`}
                        >
                          <type.icon className="w-4 h-4 mx-auto mb-1" />
                          <span className="text-[11px] block">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                      ชื่อ-นามสกุล หรือชื่อผู้ติดต่อ *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="เช่น สมชาย ใจดี"
                      className="w-full px-3 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                    />
                  </div>

                  {(accountType === 'business' || accountType === 'organization') && (
                    <div>
                      <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                        ชื่อนิติบุคคล / ชื่อมูลนิธิ
                      </label>
                      <input
                        type="text"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        placeholder="เช่น บริษัท กรีนครราฟท์ จำกัด"
                        className="w-full px-3 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                      จังหวัดที่ตั้ง (เลือกได้ครบ 77 จังหวัด)
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                    >
                      {THAI_PROVINCES.map(p => (
                        <option key={p.nameTh} value={p.nameTh}>
                          {p.nameTh} ({p.nameEn})
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                  อีเมล (Email) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#1C211F]/40 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                  รหัสผ่าน (Password) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#1C211F]/40 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#1C211F]/20 rounded-xl text-xs text-[#1C211F] focus:outline-none focus:border-[#164C3A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#164C3A] text-white text-xs font-bold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer shadow-sm"
              >
                {authMode === 'login' ? 'เข้าสู่ระบบ WasteMatch' : 'ยืนยันการสมัครสมาชิก'}
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div className="pt-3 border-t border-[#1C211F]/10 space-y-2">
              <span className="text-[11px] text-[#1C211F]/50 uppercase tracking-wider block text-center font-semibold">
                หรือทดลองเข้าสู่ระบบจำลองบัญชีผู้ใช้
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('individual')}
                  className="p-1.5 bg-[#F7F5EF] hover:bg-[#DCE9E2] rounded-lg text-[10px] font-semibold text-[#164C3A] transition-colors cursor-pointer"
                >
                  บุคคลทั่วไป
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('business')}
                  className="p-1.5 bg-[#F7F5EF] hover:bg-[#DCE9E2] rounded-lg text-[10px] font-semibold text-[#164C3A] transition-colors cursor-pointer"
                >
                  ธุรกิจหมุนเวียน
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('organization')}
                  className="p-1.5 bg-[#F7F5EF] hover:bg-[#DCE9E2] rounded-lg text-[10px] font-semibold text-[#164C3A] transition-colors cursor-pointer"
                >
                  มูลนิธิ/NGO
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
