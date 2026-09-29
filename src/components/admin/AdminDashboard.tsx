import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Users, 
  Layers, 
  Sparkles, 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ShieldAlert, 
  ArrowLeft,
  X,
  Search,
  Lock,
  Unlock,
  Trash2,
  Eye,
  Check
} from 'lucide-react';
import { ReportItem } from '../../types/marketplace';

export const AdminDashboard: React.FC = () => {
  const { 
    listings, 
    allUsers, 
    matches, 
    deals, 
    reports, 
    adminModerateReport, 
    adminToggleUserStatus,
    updateListingStatus,
    deleteListing,
    setIsAdminMode,
    setActiveTab,
    setSelectedListing 
  } = useMarketplace();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'reports' | 'listings' | 'users'>('overview');
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const completedDealsCount = deals.filter(d => d.status === 'completed').length;
  const activeListingsCount = listings.filter(l => l.status === 'active').length;
  const pendingReportsCount = reports.filter(r => r.status === 'pending' || r.status === 'under_review').length;

  return (
    <div className="min-h-screen bg-[#141A18] text-[#F7F5EF] pb-16">
      
      {/* Admin Top Navigation */}
      <header className="border-b border-[#F7F5EF]/10 bg-[#0E1311] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-[#DCE9E2] font-display">
            WasteMatch
          </span>
          <span className="text-[11px] font-mono uppercase bg-amber-900/60 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
            Admin Moderation Console
          </span>
        </div>

        <button
          onClick={() => {
            setIsAdminMode(false);
            setActiveTab('landing');
          }}
          className="px-3 py-1.5 bg-[#1C211F] hover:bg-[#252E2B] text-xs font-medium text-[#DCE9E2] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-[#F7F5EF]/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่หน้าร้านค้า Marketplace</span>
        </button>
      </header>

      {/* Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#F7F5EF]/10 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'ภาพรวมระบบ (Metrics Overview)' },
            { id: 'reports', label: `รายการรายงานปัญหา (${pendingReportsCount})` },
            { id: 'listings', label: `ตรวจสอบสินค้า (${listings.length})` },
            { id: 'users', label: `จัดการผู้ใช้งาน (${allUsers.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeAdminTab === tab.id
                  ? 'bg-[#164C3A] text-white shadow-sm'
                  : 'text-[#DCE9E2]/70 hover:bg-[#1C211F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-[#1C2320] p-5 rounded-xl border border-[#F7F5EF]/10">
                <div className="flex items-center justify-between text-xs text-[#DCE9E2]/60 mb-2">
                  <span>ผู้ใช้งานทั้งหมด</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  1,248
                </div>
                <span className="text-[10px] text-emerald-400 mt-1 block">+14% ในรอบ 30 วัน</span>
              </div>

              <div className="bg-[#1C2320] p-5 rounded-xl border border-[#F7F5EF]/10">
                <div className="flex items-center justify-between text-xs text-[#DCE9E2]/60 mb-2">
                  <span>รายการ Active</span>
                  <Layers className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {activeListingsCount}
                </div>
                <span className="text-[10px] text-[#DCE9E2]/50 mt-1 block">หมุนเวียนใน กทม. และปริมณฑล</span>
              </div>

              <div className="bg-[#1C2320] p-5 rounded-xl border border-[#F7F5EF]/10">
                <div className="flex items-center justify-between text-xs text-[#DCE9E2]/60 mb-2">
                  <span>Mutual Matches</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {matches.length}
                </div>
                <span className="text-[10px] text-amber-300 mt-1 block">อัตราตอบกลับแชท 88%</span>
              </div>

              <div className="bg-[#1C2320] p-5 rounded-xl border border-[#F7F5EF]/10">
                <div className="flex items-center justify-between text-xs text-[#DCE9E2]/60 mb-2">
                  <span>Deals สำเร็จแล้ว</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {completedDealsCount}
                </div>
                <span className="text-[10px] text-emerald-400 mt-1 block">100% ผ่าน Handover Code</span>
              </div>

            </div>

            {/* Recent System Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-[#1C2320] p-6 rounded-xl border border-[#F7F5EF]/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>รายงานที่ต้องตรวจสอบด่วน (Pending Moderation)</span>
                </h3>

                <div className="space-y-3">
                  {reports.map(rep => (
                    <div
                      key={rep.id}
                      onClick={() => setSelectedReport(rep)}
                      className="p-3 bg-[#141A18] rounded-lg border border-[#F7F5EF]/10 hover:border-amber-400/40 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-amber-300 capitalize">{rep.reason.replace('_', ' ')}</span>
                        <span className="text-[10px] text-[#DCE9E2]/40">{new Date(rep.createdAt).toLocaleDateString('th-TH')}</span>
                      </div>
                      <p className="text-xs text-[#DCE9E2]/80 font-medium">{rep.targetTitle}</p>
                      <p className="text-[11px] text-[#DCE9E2]/50 line-clamp-1 mt-0.5">{rep.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C2320] p-6 rounded-xl border border-[#F7F5EF]/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>รายได้และสมาชิกองค์กร (Revenue & Subscriptions)</span>
                </h3>

                <div className="p-4 bg-[#141A18] rounded-lg border border-[#F7F5EF]/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#DCE9E2]/60">รายได้สะสมเดือนนี้ (จำลอง):</span>
                    <span className="font-mono font-bold text-white">฿48,650</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCE9E2]/60">สมาชิกแบบ Standard:</span>
                    <span className="font-mono font-bold text-white">45 บัญชี</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCE9E2]/60">สมาชิกแบบ Gold (SME):</span>
                    <span className="font-mono font-bold text-white">18 บัญชี</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#DCE9E2]/60">สมาชิกแบบ Premium (โรงงาน):</span>
                    <span className="font-mono font-bold text-white">6 บัญชี</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. REPORTS MODERATION TAB (Section 33) */}
        {activeAdminTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-[#1C2320] rounded-xl border border-[#F7F5EF]/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141A18] border-b border-[#F7F5EF]/10 text-[#DCE9E2]/60 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">เป้าหมายรายงาน</th>
                    <th className="p-4">ผู้รายงาน</th>
                    <th className="p-4">สาเหตุ</th>
                    <th className="p-4">สถานะ</th>
                    <th className="p-4 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F5EF]/5">
                  {reports.map(r => (
                    <tr key={r.id} className="hover:bg-[#252E2B]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white">{r.targetTitle}</div>
                        <div className="text-[10px] text-[#DCE9E2]/50">ประเภท: {r.targetType}</div>
                      </td>
                      <td className="p-4 text-[#DCE9E2]/80">{r.reporterName}</td>
                      <td className="p-4 text-amber-300 capitalize">{r.reason.replace('_', ' ')}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          r.status === 'resolved' 
                            ? 'bg-emerald-950 text-emerald-400' 
                            : r.status === 'dismissed'
                            ? 'bg-stone-800 text-stone-400'
                            : 'bg-amber-950 text-amber-400'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedReport(r)}
                          className="px-2.5 py-1 bg-[#164C3A] text-white rounded text-[11px] hover:bg-[#123e2f] cursor-pointer"
                        >
                          ตรวจสอบรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. LISTINGS MODERATION TAB */}
        {activeAdminTab === 'listings' && (
          <div className="space-y-6">
            <div className="bg-[#1C2320] rounded-xl border border-[#F7F5EF]/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141A18] border-b border-[#F7F5EF]/10 text-[#DCE9E2]/60 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">รายการสินค้า</th>
                    <th className="p-4">ผู้ขาย</th>
                    <th className="p-4">หมวดหมู่</th>
                    <th className="p-4">ราคา</th>
                    <th className="p-4">สถานะ</th>
                    <th className="p-4 text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F5EF]/5">
                  {listings.map(l => (
                    <tr key={l.id} className="hover:bg-[#252E2B]/50 transition-colors">
                      <td className="p-4 font-semibold text-white max-w-xs truncate">{l.title}</td>
                      <td className="p-4 text-[#DCE9E2]/80">{l.seller.name}</td>
                      <td className="p-4 uppercase text-[11px] text-[#DCE9E2]/60">{l.category}</td>
                      <td className="p-4 tabular-nums font-mono text-white">
                        {l.price > 0 ? `฿${l.price.toLocaleString()}` : 'ฟรี'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          l.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400'
                            : l.status === 'suspended'
                            ? 'bg-rose-950 text-rose-400'
                            : 'bg-stone-800 text-stone-400'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {l.status === 'active' ? (
                          <button
                            onClick={() => updateListingStatus(l.id, 'suspended')}
                            className="px-2 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[11px] cursor-pointer"
                          >
                            ระงับประกาศ
                          </button>
                        ) : (
                          <button
                            onClick={() => updateListingStatus(l.id, 'active')}
                            className="px-2 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[11px] cursor-pointer"
                          >
                            เปิดใช้งาน
                          </button>
                        )}
                        <button
                          onClick={() => deleteListing(l.id)}
                          className="px-2 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[11px] cursor-pointer"
                        >
                          ลบถาวร
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. USERS TAB */}
        {activeAdminTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-[#1C2320] rounded-xl border border-[#F7F5EF]/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141A18] border-b border-[#F7F5EF]/10 text-[#DCE9E2]/60 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">ชื่อผู้ใช้ / องค์กร</th>
                    <th className="p-4">ประเภทบัญชี</th>
                    <th className="p-4">อัตราตอบกลับ</th>
                    <th className="p-4">ส่งมอบสำเร็จ</th>
                    <th className="p-4">สถานะ KYC</th>
                    <th className="p-4 text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F5EF]/5">
                  {allUsers.map(u => (
                    <tr key={u.id} className="hover:bg-[#252E2B]/50 transition-colors">
                      <td className="p-4 font-semibold text-white">{u.name}</td>
                      <td className="p-4 capitalize text-[#DCE9E2]/70">{u.accountType}</td>
                      <td className="p-4 tabular-nums font-mono text-emerald-400 font-bold">{u.responseRate}%</td>
                      <td className="p-4 tabular-nums font-mono text-white">{u.completedDeals} ครั้ง</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          u.verifiedBadges.identity ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {u.verifiedBadges.identity ? 'Verified KYC' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => adminToggleUserStatus(u.id)}
                          className="px-2.5 py-1 bg-[#141A18] border border-[#F7F5EF]/20 text-[#DCE9E2] rounded text-[11px] hover:bg-[#1C211F] cursor-pointer"
                        >
                          {u.verifiedBadges.identity ? 'เพิกถอนสิทธิ์' : 'อนุมัติ KYC'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Report Moderation Modal (Section 33) */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#1C2320] text-white rounded-2xl border border-[#F7F5EF]/20 shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#F7F5EF]/10 pb-3">
              <h3 className="text-sm font-bold text-amber-300">
                รายละเอียดการรายงานความผิด (Report Moderation)
              </h3>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-[#DCE9E2]/50 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#DCE9E2]/60">เป้าหมายที่ถูกรายงาน:</span>
                <span className="font-bold text-white">{selectedReport.targetTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#DCE9E2]/60">ผู้แจ้งรายงาน:</span>
                <span className="text-white">{selectedReport.reporterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#DCE9E2]/60">เหตุผล:</span>
                <span className="text-amber-400 capitalize">{selectedReport.reason.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-[#DCE9E2]/60 block mb-1">คำอธิบายเหตุการณ์:</span>
                <p className="p-3 bg-[#141A18] rounded-xl text-[#DCE9E2]/80 leading-relaxed border border-[#F7F5EF]/5">
                  "{selectedReport.description}"
                </p>
              </div>
              {selectedReport.evidence && (
                <div>
                  <span className="text-[#DCE9E2]/60 block mb-1">หลักฐานเพิ่มเติม:</span>
                  <p className="p-3 bg-[#141A18] rounded-xl text-[#DCE9E2]/80 leading-relaxed border border-[#F7F5EF]/5">
                    {selectedReport.evidence}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#F7F5EF]/10 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => {
                  adminModerateReport(selectedReport.id, 'dismiss');
                  setSelectedReport(null);
                }}
                className="px-3 py-1.5 bg-[#141A18] hover:bg-[#252E2B] text-xs text-[#DCE9E2] rounded-lg cursor-pointer border border-[#F7F5EF]/10"
              >
                ยกฟ้อง (Dismiss)
              </button>
              <button
                onClick={() => {
                  adminModerateReport(selectedReport.id, 'suspend_listing');
                  setSelectedReport(null);
                }}
                className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-xs text-rose-200 rounded-lg cursor-pointer border border-rose-800"
              >
                ระงับประกาศทันที
              </button>
              <button
                onClick={() => {
                  adminModerateReport(selectedReport.id, 'resolve');
                  setSelectedReport(null);
                }}
                className="px-4 py-1.5 bg-[#164C3A] hover:bg-[#123e2f] text-xs font-semibold text-white rounded-lg cursor-pointer"
              >
                แก้ไขแล้ว (Resolve)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
