import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { ReportItem } from '../../types/marketplace';

export const ReportModal: React.FC = () => {
  const { reportModalTarget, setReportModalTarget, submitReport } = useMarketplace();

  const [reason, setReason] = useState<ReportItem['reason']>('inaccurate_info');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!reportModalTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(reason, description, evidence);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setReportModalTarget(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        <div className="px-6 py-4 bg-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-300" />
            <h3 className="text-sm font-semibold">รายงานปัญหาความปลอดภัย (Trust Report)</h3>
          </div>
          <button 
            onClick={() => setReportModalTarget(null)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-[#1C211F]">ส่งรายงานเรียบร้อยแล้ว</h4>
            <p className="text-xs text-[#1C211F]/60">
              ทีมผู้ดูแลระบบของ WasteMatch จะตรวจสอบหลักฐานและดำเนินการภายใน 24 ชั่วโมง
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-[#F7F5EF] rounded-xl text-xs space-y-0.5">
              <span className="text-[#1C211F]/50 block text-[10px]">เป้าหมายที่รายงาน:</span>
              <span className="font-bold text-[#1C211F]">{reportModalTarget.title}</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                สาเหตุที่รายงาน *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
              >
                <option value="inaccurate_info">ข้อมูลหรือภาพถ่ายไม่ตรงกับความเป็นจริง</option>
                <option value="prohibited_item">สิ่งของต้องห้าม / ผิดกฎหมาย</option>
                <option value="scam_suspicion">พฤติกรรมน่าสงสัย / หลอกโอนเงินมัดจำ</option>
                <option value="unresponsive">ไม่มาตามนัดหมายส่งมอบ / ติดต่อไม่ได้</option>
                <option value="harassment">ใช้ถ้อยคำไม่สุภาพ / คุกคาม</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                รายละเอียดเหตุการณ์ *
              </label>
              <textarea
                rows={3}
                required
                placeholder="ระบุข้อเท็จจริงที่เกิดขึ้น เพื่อประกอบการพิจารณาของทีมแอดมิน..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                ลิงก์หรือหลักฐานเพิ่มเติม (ถ้ามี)
              </label>
              <input
                type="text"
                placeholder="เช่น ลิงก์รูปภาพ หรือหมายเลขอ้างอิงการแชท"
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReportModalTarget(null)}
                className="px-4 py-2 text-xs text-[#1C211F]/70 hover:bg-[#F7F5EF] rounded-xl cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-800 text-white text-xs font-semibold rounded-xl hover:bg-rose-900 transition-all cursor-pointer shadow-sm"
              >
                ส่งรายงาน
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
