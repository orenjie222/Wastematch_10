import React, { useState, useEffect } from 'react';
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
  MapPin,
  Eye,
  EyeOff,
  AlertTriangle,
  KeyRound,
  RefreshCw,
  Phone,
  FileText,
  Check,
  Smartphone,
  HelpCircle,
  Clock
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    login, 
    verify2FA,
    register, 
    requestPasswordReset,
    resetPasswordWithOtp,
    loginWithOAuth,
    failedLoginAttempts,
    isAccountLocked,
    lockoutRemainingSeconds,
    simulatedLatestOtp,
    currentUser,
    switchUserRole 
  } = useMarketplace();

  // Navigation mode within modal: 'login' | 'register' | '2fa' | 'forgot'
  const [authMode, setAuthMode] = useState<'login' | 'register' | '2fa' | 'forgot'>('login');

  // Form Fields - Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form Fields - Register
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [organizationName, setOrganizationName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [charityId, setCharityId] = useState('');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [district, setDistrict] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Form Fields - 2FA
  const [twoFactorEmail, setTwoFactorEmail] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [otpTimer, setOtpTimer] = useState<number>(180);

  // Form Fields - Forgot Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1); // 1: request, 2: verify and change
  const [resetOtpCode, setResetOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let interval: any;
    if ((authMode === '2fa' || forgotStep === 2) && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authMode, forgotStep, otpTimer]);

  if (!isAuthModalOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'ยังไม่ได้ระบุ', color: 'bg-gray-200' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 33, label: 'ความปลอดภัยต่ำ (ควรเพิ่มตัวเลข/อักษรพิมพ์ใหญ่)', color: 'bg-rose-500' };
    if (score <= 4) return { score: 66, label: 'ความปลอดภัยปานกลาง', color: 'bg-amber-500' };
    return { score: 100, label: 'ความปลอดภัยระดับสูง (รัดกุมมาก)', color: 'bg-emerald-600' };
  };

  const passwordStrength = getPasswordStrength(authMode === 'register' ? regPassword : newPassword);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(email, password, rememberMe);
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setSuccessMsg('');
        }, 800);
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!agreeTerms) {
      setErrorMsg('กรุณายอมรับเงื่อนไขการใช้งานและนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    if (regPassword.length < 8) {
      setErrorMsg('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรเพื่อความปลอดภัย');
      return;
    }

    if (accountType === 'business' && !organizationName.trim()) {
      setErrorMsg('กรุณาระบุชื่อบริษัทหรือร้านค้า');
      return;
    }

    if (accountType === 'organization' && !organizationName.trim()) {
      setErrorMsg('กรุณาระบุชื่อมูลนิธิหรือองค์กรการกุศล');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = register({
        name,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
        accountType,
        organizationName,
        taxId: accountType === 'business' ? taxId : undefined,
        charityId: accountType === 'organization' ? charityId : undefined,
        province,
        district
      });
      setIsSubmitting(false);

      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setSuccessMsg('');
        }, 1000);
      } else {
        setErrorMsg(res.message);
      }
    }, 500);
  };

  // Handle 2FA Verification
  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = verify2FA(twoFactorEmail, twoFactorCode);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setSuccessMsg('');
      }, 800);
    } else {
      setErrorMsg(res.message);
    }
  };

  // Handle Forgot Password Request
  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const res = requestPasswordReset(forgotEmail);
    if (res.success) {
      setSuccessMsg(res.message);
      setForgotStep(2);
      setOtpTimer(180);
    } else {
      setErrorMsg(res.message);
    }
  };

  // Handle Reset Password with OTP
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const res = resetPasswordWithOtp(forgotEmail, resetOtpCode, newPassword);
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setAuthMode('login');
        setEmail(forgotEmail);
        setForgotStep(1);
        setSuccessMsg('');
      }, 1200);
    } else {
      setErrorMsg(res.message);
    }
  };

  // Quick Demo Fast-Login Helper
  const handleQuickDemo = (role: 'individual' | 'business' | 'organization' | 'admin') => {
    switchUserRole(role);
    setSuccessMsg(`เข้าสู่ระบบสาธิตในฐานะ ${role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : role === 'business' ? 'นิติบุคคล' : role === 'organization' ? 'มูลนิธิ' : 'บุคคลทั่วไป'} เรียบร้อย`);
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setSuccessMsg('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-[#F7F5F0] rounded-2xl border border-[#B8AA96]/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with 256-bit SSL security badge */}
        <div className="px-5 py-4 bg-[#344634] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="text-sm font-bold font-serif block leading-none">ระบบเข้าสู่ระบบความปลอดภัยสูง</span>
              <span className="text-[10px] text-[#EEEAE1]/80 mt-0.5 inline-flex items-center gap-1">
                <span>เข้ารหัส 256-bit SSL</span>
                <span>·</span>
                <span>คุ้มครองข้อมูลตาม PDPA</span>
              </span>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="text-white/70 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Success Banner */}
        {successMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3 flex items-center gap-2.5 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Global Error Alert */}
        {errorMsg && (
          <div className="bg-rose-50 border-b border-rose-200 px-5 py-3 flex items-center gap-2.5 text-rose-800 text-xs font-semibold animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Brute force lockout banner */}
        {isAccountLocked && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center gap-2.5 text-amber-900 text-xs font-semibold">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-spin" />
            <span>ระบบล็อกชั่วคราว: กรุณารอ {lockoutRemainingSeconds} วินาที ก่อนลองใหม่อีกครั้ง</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">

          {/* ========================================================================= */}
          {/* TAB 1: LOGIN (เข้าสู่ระบบ) */}
          {/* ========================================================================= */}
          {authMode === 'login' && (
            <div className="space-y-4">
              
              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-1 bg-[#EEEAE1] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                  className="py-2 rounded-lg bg-white text-[#344634] shadow-xs cursor-pointer text-center"
                >
                  เข้าสู่ระบบ (Sign In)
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                  className="py-2 rounded-lg text-[#252722]/70 hover:text-[#252722] cursor-pointer text-center"
                >
                  สมัครสมาชิก (Register)
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                <div>
                  <label className="text-xs font-bold text-[#252722] block mb-1">
                    อีเมลสำหรับเข้าสู่ระบบ (Email Address)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#252722]/40 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="เช่น yourname@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isAccountLocked}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634] disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#252722]">
                      รหัสผ่าน (Password)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setForgotEmail(email);
                        setErrorMsg('');
                      }}
                      className="text-[11px] text-[#344634] hover:underline font-semibold cursor-pointer"
                    >
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#252722]/40 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isAccountLocked}
                      className="w-full pl-9 pr-10 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634] disabled:bg-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#252722]/40 hover:text-[#252722] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-[#252722]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#B8AA96] text-[#344634] focus:ring-[#344634] w-3.5 h-3.5"
                    />
                    <span>จดจำการเข้าสู่ระบบบนอุปกรณ์นี้ (30 วัน)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isAccountLocked}
                  className="w-full py-2.5 bg-[#344634] hover:bg-[#263426] disabled:bg-gray-400 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>กำลังตรวจสอบความปลอดภัย...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>เข้าสู่ระบบอย่างปลอดภัย</span>
                    </>
                  )}
                </button>
              </form>

              {/* Single Sign-On (Google & LINE) */}
              <div className="pt-3 border-t border-[#EEEAE1] space-y-2">
                <span className="text-[10px] font-semibold text-[#252722]/50 uppercase tracking-wider block text-center">
                  หรือเข้าสู่ระบบด่วนผ่านผู้ให้บริการที่เชื่อถือได้
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      loginWithOAuth('google');
                      setIsAuthModalOpen(false);
                    }}
                    className="py-2 px-3 bg-white hover:bg-gray-50 border border-[#B8AA96]/40 rounded-xl text-xs font-semibold text-[#252722] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginWithOAuth('line');
                      setIsAuthModalOpen(false);
                    }}
                    className="py-2 px-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>LINE Login</span>
                  </button>
                </div>
              </div>

              {/* Quick Role Switcher for live testing */}
              <div className="p-3 bg-[#EEEAE1] rounded-xl border border-[#B8AA96]/30 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#252722]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#344634]" />
                    <span>สลับบทบาทบัญชีตัวอย่างเพื่อทดสอบระบบ</span>
                  </span>
                  <span className="text-[10px] text-[#344634]">1-Click Demo</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('individual')}
                    className="py-1 px-2 bg-white hover:bg-[#F7F5F0] rounded-lg border border-[#B8AA96]/30 text-[#252722] font-medium truncate cursor-pointer"
                  >
                    👤 บุคคลทั่วไป
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('business')}
                    className="py-1 px-2 bg-white hover:bg-[#F7F5F0] rounded-lg border border-[#B8AA96]/30 text-[#252722] font-medium truncate cursor-pointer"
                  >
                    🏢 ธุรกิจ/สตูดิโอ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('organization')}
                    className="py-1 px-2 bg-white hover:bg-[#F7F5F0] rounded-lg border border-[#B8AA96]/30 text-[#252722] font-medium truncate cursor-pointer"
                  >
                    🤝 มูลนิธิกระจกเงา
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin')}
                    className="py-1 px-2 bg-[#344634] hover:bg-[#263426] text-white rounded-lg font-bold truncate cursor-pointer"
                  >
                    🛡️ แอดมินระบบ
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: REGISTER (สมัครสมาชิกใหม่) */}
          {/* ========================================================================= */}
          {authMode === 'register' && (
            <div className="space-y-4">
              
              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-1 bg-[#EEEAE1] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                  className="py-2 rounded-lg text-[#252722]/70 hover:text-[#252722] cursor-pointer text-center"
                >
                  เข้าสู่ระบบ (Sign In)
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                  className="py-2 rounded-lg bg-white text-[#344634] shadow-xs cursor-pointer text-center"
                >
                  สมัครสมาชิก (Register)
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-1">
                
                {/* 1. Account Type Selection */}
                <div>
                  <label className="text-xs font-bold text-[#252722] block mb-1.5">
                    เลือกประเภทบัญชีผู้ใช้งาน (Account Type)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'individual' as AccountType, label: 'บุคคลทั่วไป', icon: UserIcon },
                      { type: 'business' as AccountType, label: 'ธุรกิจ / ร้านค้า', icon: Building2 },
                      { type: 'organization' as AccountType, label: 'มูลนิธิ / กุศล', icon: HeartHandshake }
                    ].map(item => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => setAccountType(item.type)}
                        className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          accountType === item.type
                            ? 'border-[#344634] bg-white font-bold text-[#344634] shadow-xs'
                            : 'border-transparent bg-white/60 text-[#252722]/70 hover:bg-white'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-[11px]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Organization Name if Business or Charity */}
                {accountType !== 'individual' && (
                  <div>
                    <label className="text-xs font-bold text-[#252722] block mb-1">
                      {accountType === 'business' ? 'ชื่อนิติบุคคล / ร้านค้า' : 'ชื่อมูลนิธิ / องค์กรไม่แสวงหากำไร'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น บริษัท กรีนครราฟท์ สตูดิโอ จำกัด"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>
                )}

                {/* Optional Tax ID / Charity Registry */}
                {accountType === 'business' && (
                  <div>
                    <label className="text-xs font-semibold text-[#252722] block mb-1">
                      เลขประจำตัวผู้เสียภาษี 13 หลัก (เพื่อรับตรา DBD Verified)
                    </label>
                    <input
                      type="text"
                      maxLength={13}
                      placeholder="0105567XXXXXX"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>
                )}

                {/* 3. Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-bold text-[#252722] block mb-1">
                      ชื่อ-นามสกุล ผู้ดูแล
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น กิตติพงษ์ วัฒนาเสถียร"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#252722] block mb-1">
                      อีเมล (Email)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs font-semibold text-[#252722] block mb-1">
                      เบอร์โทรศัพท์ติดต่อ
                    </label>
                    <input
                      type="tel"
                      placeholder="081-234-5678"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#252722] block mb-1">
                      จังหวัด
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    >
                      {THAI_PROVINCES.map(p => (
                        <option key={p.nameTh} value={p.nameTh}>
                          {p.nameTh}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Password with Strength Meter */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold text-[#252722] block mb-1">
                        รหัสผ่าน (ขั้นต่ำ 8 ตัวอักษร)
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          placeholder="รหัสผ่านอย่างน้อย 8 ตัว"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full pl-3 pr-8 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-2.5 top-2.5 text-[#252722]/40 hover:text-[#252722] cursor-pointer"
                        >
                          {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#252722] block mb-1">
                        ยืนยันรหัสผ่านอีกครั้ง
                      </label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        placeholder="พิมพ์รหัสผ่านซ้ำอีกครั้ง"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                      />
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  {regPassword && (
                    <div className="space-y-1 bg-white p-2.5 rounded-lg border border-[#EEEAE1]">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#252722]">
                        <span>เกณฑ์ความปลอดภัยของรหัสผ่าน:</span>
                        <span className="text-[#344634]">{passwordStrength.label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PDPA & Terms Checkbox */}
                <div className="p-3 bg-white rounded-xl border border-[#B8AA96]/30">
                  <label className="flex items-start gap-2 text-xs text-[#252722]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="rounded border-[#B8AA96] text-[#344634] focus:ring-[#344634] w-4 h-4 mt-0.5 shrink-0"
                    />
                    <span className="leading-snug text-[11px]">
                      ข้าพเจ้ายินยอมปฏิบัติตาม <span className="text-[#344634] font-semibold underline">ข้อกำหนดการใช้งาน</span> และ <span className="text-[#344634] font-semibold underline">นโยบายความเป็นส่วนตัว (PDPA)</span> ในการแลกเปลี่ยนและหมุนเวียนสิ่งของอย่างปลอดภัย
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#344634] hover:bg-[#263426] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>กำลังสร้างบัญชีที่ปลอดภัย...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>ยืนยันการสมัครสมาชิก WasteMatch</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: FORGOT PASSWORD (กู้คืนรหัสผ่าน) */}
          {/* ========================================================================= */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#EEEAE1]">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#344634]" />
                  <span className="text-xs font-bold text-[#252722]">กู้คืนรหัสผ่าน (Password Recovery)</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                  className="text-xs text-[#344634] font-semibold hover:underline cursor-pointer"
                >
                  กลับหน้าเข้าสู่ระบบ
                </button>
              </div>

              {forgotStep === 1 ? (
                <form onSubmit={handleForgotRequest} className="space-y-3.5">
                  <p className="text-xs text-[#252722]/70 leading-relaxed">
                    กรุณากรอกอีเมลของคุณเพื่อรับรหัสยืนยันตัวตน OTP 6 หลัก สำหรับตั้งรหัสผ่านใหม่
                  </p>
                  <div>
                    <label className="text-xs font-bold text-[#252722] block mb-1">
                      อีเมลที่ลงทะเบียนไว้
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#344634] hover:bg-[#263426] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>ขอรับรหัส OTP รีเซ็ตรหัสผ่าน</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetSubmit} className="space-y-3.5">
                  <div className="p-3 bg-[#EEEAE1] rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#252722]">
                      <span>รหัส OTP ถูกส่งไปยังอีเมลแล้ว</span>
                      <span className="text-[#344634] font-mono">
                        {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    {simulatedLatestOtp && (
                      <div className="pt-1 text-[11px] text-[#344634] font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>รหัส OTP ทดสอบด่วนของคุณ: <strong className="font-mono text-sm bg-white px-1.5 py-0.2 rounded border border-[#344634]/30">{simulatedLatestOtp}</strong></span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#252722] block mb-1">
                      กรอกรหัส OTP 6 หลัก
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={resetOtpCode}
                      onChange={(e) => setResetOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-center text-base font-mono tracking-widest text-[#252722] focus:outline-none focus:border-[#344634]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#252722] block mb-1">
                      ตั้งรหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-3 pr-8 py-2 bg-white border border-[#B8AA96]/40 rounded-xl text-xs text-[#252722] focus:outline-none focus:border-[#344634]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2.5 top-2.5 text-[#252722]/40 hover:text-[#252722] cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#344634] hover:bg-[#263426] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>บันทึกรหัสผ่านใหม่และเข้าสู่ระบบ</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer Security Assurance */}
        <div className="px-5 py-3 bg-white border-t border-[#EEEAE1] flex items-center justify-between text-[11px] text-[#252722]/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#344634]" />
            <span>WasteMatch Security Shield</span>
          </div>
          <span>มาตรฐานความปลอดภัยสากล</span>
        </div>

      </div>
    </div>
  );
};
