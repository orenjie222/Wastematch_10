import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Star, X, Check, Award, CheckCircle2 } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { reviewModalDeal, setReviewModalDeal, submitReview, currentUser } = useMarketplace();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'ตรงตามประกาศ',
    'สื่อสารดี',
    'ส่งมอบเรียบร้อย'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!reviewModalDeal) return null;

  const otherUser = currentUser.id === reviewModalDeal.buyerId 
    ? reviewModalDeal.seller 
    : reviewModalDeal.buyer;

  const availableTags = [
    'ตรงตามประกาศ',
    'สื่อสารดี',
    'ตรงเวลา',
    'ส่งมอบเรียบร้อย',
    'วัสดุคุณภาพดี',
    'มีจิตสำนึกสิ่งแวดล้อม'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(reviewModalDeal.id, rating, comment, selectedTags);
    setIsSubmitted(true);
    setTimeout(() => {
      setReviewModalDeal(null);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#DCE9E2]" />
            <h3 className="text-sm font-semibold">ให้คะแนนการส่งมอบ (Review Deal)</h3>
          </div>
          <button
            onClick={() => setReviewModalDeal(null)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-[#1C211F]">บันทึกรีวิวสำเร็จ</h4>
            <p className="text-xs text-[#1C211F]/70">
              ขอบคุณที่ช่วยสร้างความโปร่งใสในชุมชน WasteMatch คุณได้รับ +150 Eco Points!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Target Person */}
            <div className="flex items-center gap-3 p-3 bg-[#F7F5EF] rounded-xl border border-[#1C211F]/10">
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#1C211F]/10"
              />
              <div className="text-xs">
                <span className="text-[#1C211F]/50 block text-[10px]">รีวิวผู้ใช้งาน</span>
                <span className="font-bold text-[#1C211F]">{otherUser.name}</span>
                <span className="text-[#1C211F]/60 block text-[11px] truncate">
                  รายการ: {reviewModalDeal.listing.title}
                </span>
              </div>
            </div>

            {/* Stars */}
            <div className="text-center space-y-1">
              <label className="text-xs font-semibold text-[#1C211F] block">
                ระดับความพึงพอใจโดยรวม
              </label>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-[#1C211F]/20'}`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-[#164C3A]">
                {rating === 5 ? 'ยอดเยี่ยมมาก (5/5)' : rating === 4 ? 'ดีมาก (4/5)' : rating === 3 ? 'พอใช้ (3/5)' : 'ควรปรับปรุง'}
              </span>
            </div>

            {/* Positive Tags */}
            <div>
              <label className="text-xs font-semibold text-[#1C211F] block mb-2">
                จุดเด่นของการส่งมอบ (Tags)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                      selectedTags.includes(tag)
                        ? 'bg-[#164C3A] text-white font-medium'
                        : 'bg-[#F7F5EF] text-[#1C211F]/70 hover:bg-[#DCE9E2]/40'
                    }`}
                  >
                    {selectedTags.includes(tag) && <Check className="w-3 h-3" />}
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                ความคิดเห็นเพิ่มเติม
              </label>
              <textarea
                rows={3}
                required
                placeholder="บอกเล่าประสบการณ์ สภาพสิ่งของจริง และการสื่อสารเพื่อเป็นประโยชน์ต่อผู้ใช้อื่น..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReviewModalDeal(null)}
                className="px-4 py-2 text-xs text-[#1C211F]/70 hover:bg-[#F7F5EF] rounded-xl cursor-pointer"
              >
                ไว้ทีหลัง
              </button>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] disabled:opacity-40 cursor-pointer shadow-sm"
              >
                ส่งคะแนนรีวิว
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
