import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Send, 
  Tag, 
  Image as ImageIcon, 
  ShieldCheck, 
  MapPin, 
  ArrowLeft, 
  Check, 
  X, 
  RotateCcw,
  FileCheck,
  Calendar,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { OfferData } from '../../types/marketplace';

export const ChatView: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    currentUser, 
    sendMessage, 
    respondToOffer,
    createDealFromMatch,
    setSelectedDealId,
    setActiveTab 
  } = useMarketplace();

  const [messageInput, setMessageInput] = useState('');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  
  // Offer modal state
  const [offerType, setOfferType] = useState<'price' | 'swap' | 'mixed'>('price');
  const [offerAmount, setOfferAmount] = useState<number>(750);
  const [swapItemTitle, setSwapItemTitle] = useState('');
  const [offerNote, setOfferNote] = useState('');

  // Counter offer state
  const [counteringOfferId, setCounteringOfferId] = useState<string | null>(null);
  const [counterAmount, setCounterAmount] = useState<number>(0);

  const selectedConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleSendTextMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversation) return;
    sendMessage(selectedConversation.id, messageInput.trim(), 'text');
    setMessageInput('');
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation) return;

    const offerData: OfferData = {
      offerId: `off_${Date.now()}`,
      type: offerType,
      amount: offerType !== 'swap' ? Number(offerAmount) : undefined,
      swapItemTitle: offerType !== 'price' ? swapItemTitle : undefined,
      note: offerNote,
      status: 'pending'
    };

    sendMessage(
      selectedConversation.id, 
      offerType === 'price' ? `ยื่นข้อเสนอราคา ฿${offerAmount}` : `ยื่นข้อเสนอแลกเปลี่ยน: ${swapItemTitle}`,
      'offer', 
      offerData
    );

    setIsOfferModalOpen(false);
    setSwapItemTitle('');
    setOfferNote('');
  };

  const handleCounterSubmit = (offerId: string) => {
    if (!selectedConversation) return;
    respondToOffer(selectedConversation.id, offerId, 'countered', counterAmount);
    setCounteringOfferId(null);
  };

  if (conversations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#1C211F]/10 space-y-4">
          <h2 className="text-lg font-bold text-[#1C211F]">ยังไม่มีบทสนทนา</h2>
          <p className="text-xs text-[#1C211F]/60">
            ระบบความปลอดภัยของ WasteMatch ไม่อนุญาตให้เปิดแชทหากยังไม่เกิด Mutual Match กรุณาไปที่หน้า Discover เพื่อค้นหาและแมตช์รายการที่ตรงกัน
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] cursor-pointer"
          >
            ค้นหาใน Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-[calc(100vh-80px)] flex flex-col">
      
      {/* 3-Pane Desktop Layout / Tabbed on Mobile */}
      <div className="bg-white rounded-2xl border border-[#1C211F]/10 shadow-sm flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        
        {/* Pane 1: Conversations List (Cols 1-4) */}
        <div className={`md:col-span-4 border-r border-[#1C211F]/10 flex flex-col ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#1C211F]/10">
            <h2 className="text-base font-bold text-[#1C211F] font-display">กล่องข้อความเจรจา</h2>
            <p className="text-[11px] text-[#1C211F]/50 mt-0.5">ห้องแชทเฉพาะคู่ที่ผ่านการ Mutual Match</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#1C211F]/5">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                  selectedConversation?.id === conv.id ? 'bg-[#F7F5EF]' : 'hover:bg-slate-50'
                }`}
              >
                <img
                  src={conv.otherUser.avatar}
                  alt={conv.otherUser.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#1C211F]/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-semibold text-[#1C211F] truncate">{conv.otherUser.name}</span>
                    <span className="text-[10px] text-[#1C211F]/50 shrink-0">{conv.lastMessageAt}</span>
                  </div>
                  <div className="text-[11px] font-medium text-[#164C3A] truncate mb-1">
                    {conv.listing.title}
                  </div>
                  <p className="text-xs text-[#1C211F]/60 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pane 2: Conversation Window (Cols 5-8 or 5-12) */}
        {selectedConversation && (
          <div className={`md:col-span-5 lg:col-span-5 flex flex-col border-r border-[#1C211F]/10 ${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Chat Header */}
            <div className="px-4 py-3.5 border-b border-[#1C211F]/10 flex items-center justify-between bg-[#F7F5EF]/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1 text-[#1C211F]/60 hover:text-[#1C211F] cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img
                  src={selectedConversation.otherUser.avatar}
                  alt={selectedConversation.otherUser.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xs font-bold text-[#1C211F] flex items-center gap-1">
                    <span>{selectedConversation.otherUser.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#164C3A]" />
                  </h3>
                  <div className="text-[10px] text-[#1C211F]/60">
                    ตอบไว {selectedConversation.otherUser.responseRate}% · {selectedConversation.otherUser.responseSpeed}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOfferModalOpen(true)}
                className="px-3 py-1.5 bg-white border border-[#164C3A]/30 text-[#164C3A] text-xs font-semibold rounded-lg hover:bg-[#F7F5EF] flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>ยื่นข้อเสนอ</span>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F5]">
              {selectedConversation.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;

                if (msg.type === 'system') {
                  return (
                    <div key={msg.id} className="text-center my-2">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] bg-white border border-[#1C211F]/10 text-[#1C211F]/70 shadow-2xs">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                if (msg.type === 'offer' && msg.offerData) {
                  const offer = msg.offerData;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-xs sm:max-w-sm bg-white rounded-2xl border-2 border-[#164C3A] p-4 shadow-sm space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#164C3A] font-semibold border-b border-[#1C211F]/10 pb-2">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" />
                            <span>ข้อเสนออย่างเป็นทางการ (Official Offer)</span>
                          </span>
                          <span className="text-[10px] uppercase">{offer.status}</span>
                        </div>

                        <div className="space-y-1 text-xs">
                          {offer.amount !== undefined && (
                            <div className="flex justify-between items-baseline">
                              <span className="text-[#1C211F]/60">ราคาที่เสนอ:</span>
                              <span className="text-base font-bold text-[#164C3A] tabular-nums">
                                ฿{offer.amount.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {offer.swapItemTitle && (
                            <div className="flex justify-between">
                              <span className="text-[#1C211F]/60">เสนอแลกกับ:</span>
                              <span className="font-semibold text-[#1C211F]">{offer.swapItemTitle}</span>
                            </div>
                          )}
                          {offer.note && (
                            <p className="text-[11px] text-[#1C211F]/70 bg-[#F7F5EF] p-2 rounded-lg mt-2">
                              "{offer.note}"
                            </p>
                          )}
                        </div>

                        {/* Actions if received and still pending */}
                        {!isMe && offer.status === 'pending' && (
                          <div className="pt-2 border-t border-[#1C211F]/10 space-y-2">
                            {counteringOfferId === offer.offerId ? (
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  placeholder="ราคาใหม่..."
                                  value={counterAmount || ''}
                                  onChange={(e) => setCounterAmount(Number(e.target.value))}
                                  className="w-full px-2.5 py-1 text-xs border rounded-lg"
                                />
                                <button
                                  onClick={() => handleCounterSubmit(offer.offerId)}
                                  className="px-2.5 py-1 bg-[#164C3A] text-white text-xs font-semibold rounded-lg"
                                >
                                  ส่ง
                                </button>
                              </div>
                            ) : (
                              <div className="grid grid-cols-3 gap-1.5">
                                <button
                                  onClick={() => respondToOffer(selectedConversation.id, offer.offerId, 'accepted')}
                                  className="px-2 py-1.5 bg-[#164C3A] text-white text-xs font-semibold rounded-lg hover:bg-[#123e2f] transition-colors cursor-pointer"
                                >
                                  ยอมรับ
                                </button>
                                <button
                                  onClick={() => {
                                    setCounteringOfferId(offer.offerId);
                                    setCounterAmount(offer.amount ? offer.amount + 50 : 0);
                                  }}
                                  className="px-2 py-1.5 bg-white border border-[#1C211F]/20 text-[#1C211F] text-xs font-semibold rounded-lg hover:bg-[#F7F5EF] transition-colors cursor-pointer"
                                >
                                  ต่อรอง
                                </button>
                                <button
                                  onClick={() => respondToOffer(selectedConversation.id, offer.offerId, 'rejected')}
                                  className="px-2 py-1.5 bg-white border border-rose-200 text-rose-600 text-xs font-semibold rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                >
                                  ปฏิเสธ
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#164C3A] text-white rounded-br-xs'
                          : 'bg-white border border-[#1C211F]/10 text-[#1C211F] rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className={`block text-[10px] mt-1 ${isMe ? 'text-white/60 text-right' : 'text-[#1C211F]/40'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <form onSubmit={handleSendTextMessage} className="p-3 border-t border-[#1C211F]/10 bg-white flex items-center gap-2 shrink-0">
              <input
                type="text"
                placeholder="พิมพ์ข้อความสอบถามสภาพ นัดหมาย หรือเงื่อนไข..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-2 bg-[#164C3A] text-white rounded-xl hover:bg-[#123e2f] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* Pane 3: Deal Summary (Cols 9-12) */}
        {selectedConversation && (
          <div className="hidden lg:flex lg:col-span-3 flex-col bg-[#F7F5EF] p-5 space-y-5 overflow-y-auto">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#164C3A] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span>สรุปข้อตกลง (Deal Summary)</span>
              </h3>
              <p className="text-xs text-[#1C211F]/60 mt-0.5">
                รายละเอียดสินค้าและข้อมูลการนัดหมาย
              </p>
            </div>

            {/* Item Card */}
            <div className="p-3.5 bg-white rounded-xl border border-[#1C211F]/10 space-y-2">
              <img
                src={selectedConversation.listing.images[0]}
                alt={selectedConversation.listing.title}
                referrerPolicy="no-referrer"
                className="w-full h-28 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1C211F] line-clamp-2">
                  {selectedConversation.listing.title}
                </h4>
                <div className="text-xs font-bold text-[#164C3A] mt-1 tabular-nums">
                  ราคาป้าย: {selectedConversation.listing.price > 0 ? `฿${selectedConversation.listing.price.toLocaleString()}` : 'ส่งต่อฟรี'}
                </div>
              </div>
            </div>

            {/* Handover & Safety Checklist */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-[#1C211F] block">ข้อแนะนำความปลอดภัย:</span>
              <ul className="space-y-1.5 text-[11px] text-[#1C211F]/70">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#164C3A] shrink-0 mt-0.5" />
                  <span>นัดหมายในที่สาธารณะที่มีผู้คนและกล้องวงจรปิด</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>ตรวจเช็กสภาพสินค้าจริงก่อนให้รหัสยืนยัน</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#164C3A]" />
                  <span>หลีกเลี่ยงการโอนเงินมัดจำล่วงหน้าเข้าบัญชีส่วนตัว</span>
                </li>
              </ul>
            </div>

            {/* Deal Starter CTA */}
            <div className="pt-2">
              <button
                onClick={() => createDealFromMatch(selectedConversation.matchId)}
                className="w-full py-2.5 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>ไปที่หน้าข้อตกลง (Deals)</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Offer Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C211F]/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#1C211F]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#164C3A] text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">ส่งข้อเสนอต่อรอง (Make an Offer)</h3>
              <button 
                onClick={() => setIsOfferModalOpen(false)}
                className="text-white/80 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                  รูปแบบข้อเสนอ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'price', label: 'เสนอราคา' },
                    { id: 'swap', label: 'แลกเปลี่ยน' },
                    { id: 'mixed', label: 'ราคา+ของ' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setOfferType(opt.id as any)}
                      className={`py-2 text-xs font-medium rounded-lg text-center cursor-pointer transition-colors ${
                        offerType === opt.id
                          ? 'bg-[#164C3A] text-white'
                          : 'bg-[#F7F5EF] text-[#1C211F]/70 hover:bg-[#DCE9E2]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {offerType !== 'swap' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#1C211F]">จำนวนเงินที่เสนอ (บาท)</span>
                    <span className="text-[#1C211F]/50">ราคาป้าย: ฿{selectedConversation.listing.price.toLocaleString()}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    required
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>
              )}

              {offerType !== 'price' && (
                <div>
                  <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                    สิ่งของหรือวัสดุที่คุณต้องการนำมาแลก
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น โครงเหล็กกล่อง 10 ท่อน, กาแฟคั่ว 5 กก."
                    value={swapItemTitle}
                    onChange={(e) => setSwapItemTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#1C211F] block mb-1">
                  ข้อความหรือเงื่อนไขเพิ่มเติม
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น ยินดีไปรับเองถึงที่, พร้อมเข้ารับภายในวันเสาร์นี้..."
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#1C211F]/15 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164C3A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#1C211F]/70 hover:bg-[#F7F5EF] rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#164C3A] text-white text-xs font-semibold rounded-xl hover:bg-[#123e2f] transition-all cursor-pointer shadow-sm"
                >
                  ส่งข้อเสนอ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
