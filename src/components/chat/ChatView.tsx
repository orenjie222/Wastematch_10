import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Send, 
  Tag, 
  Image as ImageIcon, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  X, 
  FileCheck,
  Calendar,
  AlertCircle,
  MoreVertical,
  Flag,
  UserX,
  MapPin,
  Clock
} from 'lucide-react';
import { OfferData } from '../../types/marketplace';
import { getCategoryDefaultImage } from '../../data/seedData';

export const ChatView: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    currentUser, 
    sendMessage, 
    respondToOffer,
    createDealFromMatch,
    setActiveTab,
    blockUser,
    setReportModalTarget 
  } = useMarketplace();

  const [messageInput, setMessageInput] = useState('');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageInputUrl, setImageInputUrl] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  const handleSendImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageInputUrl.trim() || !selectedConversation) return;
    sendMessage(selectedConversation.id, imageInputUrl.trim(), 'image');
    setImageInputUrl('');
    setIsImageModalOpen(false);
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

  const handleBlockThisUser = () => {
    if (!selectedConversation) return;
    if (window.confirm(`คุณต้องการระงับการติดต่อ (Block) กับ ${selectedConversation.otherUser.name} ใช่หรือไม่?`)) {
      blockUser(selectedConversation.otherUser.id);
      setIsMenuOpen(false);
    }
  };

  const handleReportThisUser = () => {
    if (!selectedConversation) return;
    setReportModalTarget({
      type: 'user',
      id: selectedConversation.otherUser.id,
      title: selectedConversation.otherUser.name
    });
    setIsMenuOpen(false);
  };

  if (conversations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E4DFD5] space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#EEEAE1] text-[#344634] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#252722]">ยังไม่มีบทสนทนา</h2>
          <p className="text-xs sm:text-sm text-[#252722]/65 font-sans leading-relaxed">
            ระบบความปลอดภัยของ WasteMatch ไม่อนุญาตให้เปิดแชทหากยังไม่เกิด Mutual Match กรุณาไปที่หน้า Marketplace เพื่อค้นหาและแมตช์รายการที่ตรงกัน
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-6 py-3 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
          >
            ค้นหาใน Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-[calc(100vh-80px)] flex flex-col">
      
      {/* 3-Pane Desktop Layout / Tabbed on Mobile */}
      <div className="bg-white rounded-2xl border border-[#E4DFD5] shadow-2xs flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        
        {/* Pane 1: Conversations List (Cols 1-4) */}
        <div className={`md:col-span-4 border-r border-[#E4DFD5] flex flex-col ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#E4DFD5] bg-[#F7F5F0]">
            <h2 className="text-base font-serif font-bold text-[#252722]">กล่องข้อความเจรจา</h2>
            <p className="text-[11px] text-[#252722]/55 mt-0.5 font-sans">ห้องแชทเฉพาะคู่ที่ผ่านการ Mutual Match</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E4DFD5]/60">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                  selectedConversation?.id === conv.id ? 'bg-[#EEEAE1]' : 'hover:bg-[#F7F5F0]'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.otherUser.avatar}
                    alt={conv.otherUser.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#E4DFD5]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-semibold text-[#252722] truncate">{conv.otherUser.name}</span>
                    <span className="text-[10px] text-[#252722]/50 shrink-0">{conv.lastMessageAt}</span>
                  </div>
                  <div className="text-[11px] font-medium text-[#344634] truncate mb-0.5 font-serif">
                    {conv.listing.title}
                  </div>
                  <p className="text-xs text-[#252722]/65 truncate font-sans">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pane 2: Conversation Window (Cols 5-8 or 5-12) */}
        {selectedConversation && (
          <div className={`md:col-span-5 lg:col-span-5 flex flex-col border-r border-[#E4DFD5] ${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Chat Header */}
            <div className="px-4 py-3.5 border-b border-[#E4DFD5] flex items-center justify-between bg-[#F7F5F0] shrink-0">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1 text-[#252722]/60 hover:text-[#252722] cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={selectedConversation.otherUser.avatar}
                    alt={selectedConversation.otherUser.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E4DFD5]"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1.5 ring-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#252722] flex items-center gap-1 font-sans">
                    <span>{selectedConversation.otherUser.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#344634]" />
                  </h3>
                  <div className="text-[10px] text-[#7C8B72] font-sans">
                    ตอบไว {selectedConversation.otherUser.responseRate}% · ออนไลน์ขณะนี้
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOfferModalOpen(true)}
                  className="px-3 py-1.5 bg-white border border-[#E4DFD5] text-[#344634] text-xs font-semibold rounded-xl hover:bg-[#EEEAE1] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>ยื่นข้อเสนอ</span>
                </button>

                {/* More / Safety Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1.5 text-[#252722]/60 hover:text-[#252722] hover:bg-[#EEEAE1] rounded-lg cursor-pointer"
                    title="ตัวเลือกความปลอดภัย"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#E4DFD5] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                      <button
                        onClick={handleReportThisUser}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#252722] hover:bg-[#F7F5F0] flex items-center gap-2 cursor-pointer"
                      >
                        <Flag className="w-3.5 h-3.5 text-rose-600" />
                        <span>รายงานการสนทนา</span>
                      </button>

                      <button
                        onClick={handleBlockThisUser}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <UserX className="w-3.5 h-3.5 text-rose-700" />
                        <span>ระงับการติดต่อ (Block)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F5]">
              {selectedConversation.messages.map(msg => {
                const isMe = msg.senderId === currentUser.id;

                if (msg.type === 'system') {
                  return (
                    <div key={msg.id} className="text-center my-2">
                      <span className="inline-block px-3.5 py-1 rounded-full text-[11px] bg-white border border-[#E4DFD5] text-[#252722]/70 shadow-2xs font-sans">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                if (msg.type === 'image') {
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-xs rounded-2xl overflow-hidden border border-[#E4DFD5] shadow-2xs bg-white p-1">
                        <img
                          src={msg.content}
                          alt="Attachment"
                          referrerPolicy="no-referrer"
                          className="w-full h-44 object-cover rounded-xl"
                        />
                        <span className="block text-[10px] px-2 py-1 text-[#252722]/50 text-right font-mono">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
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
                      <div className="max-w-xs sm:max-w-sm bg-white rounded-2xl border-2 border-[#344634] p-4 shadow-sm space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#344634] font-semibold border-b border-[#E4DFD5] pb-2">
                          <span className="flex items-center gap-1 font-serif">
                            <Tag className="w-3.5 h-3.5" />
                            <span>ข้อเสนออย่างเป็นทางการ (Official Offer)</span>
                          </span>
                          <span className="text-[10px] uppercase font-mono">{offer.status}</span>
                        </div>

                        <div className="space-y-1 text-xs">
                          {offer.amount !== undefined && (
                            <div className="flex justify-between items-baseline">
                              <span className="text-[#252722]/65">ราคาที่เสนอ:</span>
                              <span className="text-base font-serif font-bold text-[#344634] tabular-nums">
                                ฿{offer.amount.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {offer.swapItemTitle && (
                            <div className="flex justify-between">
                              <span className="text-[#252722]/65">เสนอแลกกับ:</span>
                              <span className="font-semibold text-[#252722]">{offer.swapItemTitle}</span>
                            </div>
                          )}
                          {offer.note && (
                            <p className="text-[11px] text-[#252722]/70 bg-[#F7F5F0] p-2.5 rounded-xl mt-2 font-sans">
                              "{offer.note}"
                            </p>
                          )}
                        </div>

                        {/* Actions if received and still pending */}
                        {!isMe && offer.status === 'pending' && (
                          <div className="pt-2 border-t border-[#E4DFD5] space-y-2">
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
                                  className="px-2.5 py-1 bg-[#344634] text-white text-xs font-semibold rounded-lg"
                                >
                                  ส่ง
                                </button>
                              </div>
                            ) : (
                              <div className="grid grid-cols-3 gap-1.5">
                                <button
                                  onClick={() => respondToOffer(selectedConversation.id, offer.offerId, 'accepted')}
                                  className="px-2 py-1.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] transition-colors cursor-pointer"
                                >
                                  ยอมรับ
                                </button>
                                <button
                                  onClick={() => {
                                    setCounteringOfferId(offer.offerId);
                                    setCounterAmount(offer.amount ? offer.amount + 50 : 0);
                                  }}
                                  className="px-2 py-1.5 bg-white border border-[#E4DFD5] text-[#252722] text-xs font-semibold rounded-xl hover:bg-[#EEEAE1] transition-colors cursor-pointer"
                                >
                                  ต่อรอง
                                </button>
                                <button
                                  onClick={() => respondToOffer(selectedConversation.id, offer.offerId, 'rejected')}
                                  className="px-2 py-1.5 bg-white border border-rose-200 text-rose-600 text-xs font-semibold rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
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
                          ? 'bg-[#344634] text-white rounded-br-xs'
                          : 'bg-white border border-[#E4DFD5] text-[#252722] rounded-bl-xs shadow-2xs font-sans'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className={`block text-[10px] mt-1 ${isMe ? 'text-white/60 text-right' : 'text-[#252722]/40'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <form onSubmit={handleSendTextMessage} className="p-3 border-t border-[#E4DFD5] bg-white flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="p-2 text-[#252722]/60 hover:text-[#344634] hover:bg-[#EEEAE1] rounded-xl cursor-pointer transition-colors"
                title="ส่งรูปภาพ"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="พิมพ์ข้อความสอบถามสภาพ นัดหมาย หรือเงื่อนไข..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634] font-sans"
              />

              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-2.5 bg-[#344634] text-white rounded-xl hover:bg-[#263426] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* Pane 3: Deal Summary (Cols 9-12) */}
        {selectedConversation && (
          <div className="hidden lg:flex lg:col-span-3 flex-col bg-[#F7F5F0] p-5 space-y-5 overflow-y-auto">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#344634] flex items-center gap-1.5 font-serif">
                <FileCheck className="w-4 h-4" />
                <span>สรุปข้อตกลง (Deal Summary)</span>
              </h3>
              <p className="text-xs text-[#252722]/60 mt-0.5 font-sans">
                รายละเอียดสินค้าและข้อมูลการนัดหมาย
              </p>
            </div>

            {/* Item Card */}
            <div className="p-4 bg-white rounded-2xl border border-[#E4DFD5] space-y-2 shadow-2xs">
              <img
                src={selectedConversation.listing.images[0] || getCategoryDefaultImage(selectedConversation.listing.category)}
                alt={selectedConversation.listing.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = getCategoryDefaultImage(selectedConversation.listing.category);
                }}
                className="w-full h-32 object-cover rounded-xl"
              />
              <div>
                <h4 className="text-xs font-bold text-[#252722] line-clamp-2 font-serif">
                  {selectedConversation.listing.title}
                </h4>
                <div className="text-xs font-serif font-bold text-[#344634] mt-1 tabular-nums">
                  ราคาป้าย: {selectedConversation.listing.price > 0 ? `฿${selectedConversation.listing.price.toLocaleString()}` : 'ส่งต่อฟรี'}
                </div>
              </div>
            </div>

            {/* Handover & Safety Checklist */}
            <div className="space-y-2 text-xs font-sans">
              <span className="font-semibold text-[#252722] block">ข้อแนะนำความปลอดภัย:</span>
              <ul className="space-y-1.5 text-[11px] text-[#252722]/70">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#344634] shrink-0 mt-0.5" />
                  <span>นัดหมายในที่สาธารณะที่มีผู้คนและกล้องวงจรปิด</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#344634]" />
                  <span>ตรวจเช็กสภาพสินค้าจริงก่อนให้รหัสยืนยัน</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#344634]" />
                  <span>หลีกเลี่ยงการโอนเงินมัดจำล่วงหน้าเข้าบัญชีส่วนตัว</span>
                </li>
              </ul>
            </div>

            {/* Deal Starter CTA */}
            <div className="pt-2">
              <button
                onClick={() => createDealFromMatch(selectedConversation.matchId)}
                className="w-full py-3 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>ไปที่หน้าข้อตกลง (Deals)</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Image Attachment Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252722]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E4DFD5] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-3">
              <h3 className="text-sm font-serif font-bold text-[#252722]">ส่งรูปภาพแนบในแชท</h3>
              <button onClick={() => setIsImageModalOpen(false)} className="text-[#252722]/60 hover:text-[#252722]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendImage} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#252722] block mb-1 font-sans">
                  ใส่ URL รูปภาพสินค้าหรือจุดนัดพบ
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageInputUrl}
                  onChange={(e) => setImageInputUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#252722]/70 hover:bg-[#EEEAE1] rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426]"
                >
                  ส่งรูปภาพ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252722]/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E4DFD5] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#344634] text-white flex items-center justify-between">
              <h3 className="text-sm font-serif font-semibold">ส่งข้อเสนอต่อรอง (Make an Offer)</h3>
              <button 
                onClick={() => setIsOfferModalOpen(false)}
                className="text-white/80 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="p-6 space-y-4 font-sans">
              <div>
                <label className="text-xs font-semibold text-[#252722] block mb-1">
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
                      className={`py-2 text-xs font-medium rounded-xl text-center cursor-pointer transition-colors ${
                        offerType === opt.id
                          ? 'bg-[#344634] text-white font-semibold'
                          : 'bg-[#EEEAE1] text-[#252722]/70 hover:bg-[#E4DFD5]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {offerType !== 'swap' && (
                <div>
                  <label className="text-xs font-semibold text-[#252722] block mb-1">
                    จำนวนเงินที่ต้องการเสนอ (บาท)
                  </label>
                  <input
                    type="number"
                    value={offerAmount || ''}
                    onChange={(e) => setOfferAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634] tabular-nums font-serif text-base"
                    required
                  />
                </div>
              )}

              {offerType !== 'price' && (
                <div>
                  <label className="text-xs font-semibold text-[#252722] block mb-1">
                    ระบุสิ่งของที่ต้องการนำมาแลกเปลี่ยน
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น ไม้สนพาเลท 10 ท่อน, กากกาแฟ 5 กก."
                    value={swapItemTitle}
                    onChange={(e) => setSwapItemTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#252722] block mb-1">
                  หมายเหตุเพิ่มเติม (สถานที่นัดรับ หรือเงื่อนไข)
                </label>
                <textarea
                  placeholder="เช่น สะดวกนัดรับบ่ายสองวันเสาร์ที่สถานี BTS อ่อนนุช"
                  value={offerNote}
                  onChange={(e) => setOfferNote(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 text-xs border border-[#E4DFD5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#344634]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#252722]/70 hover:bg-[#EEEAE1] rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#344634] text-white text-xs font-semibold rounded-xl hover:bg-[#263426] cursor-pointer shadow-2xs"
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
