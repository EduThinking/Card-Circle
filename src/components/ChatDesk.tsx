import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Image as ImageIcon, 
  Smile, 
  MapPin, 
  Barcode, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle, 
  BookmarkCheck, 
  Calendar, 
  Lock, 
  ArrowLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Inquiry, ChatMessage, CardItem } from '../types';

interface ChatDeskProps {
  inquiries: Inquiry[];
  activeInquiryId: string;
  onSelectInquiry: (inqId: string) => void;
  messages: Record<string, ChatMessage[]>;
  onSendMessage: (inquiryId: string, text: string) => void;
  onUpdateReservation: (inquiryId: string, details?: { time: string; place: string }) => void;
  onCompleteTrade: (inquiryId: string) => void;
  onViewCardDetail: (cardId: string) => void;
  onBack: () => void;
  onShowToast: (message: string) => void;
  cards: CardItem[];
}

export const ChatDesk: React.FC<ChatDeskProps> = ({
  inquiries,
  activeInquiryId,
  onSelectInquiry,
  messages,
  onSendMessage,
  onUpdateReservation,
  onCompleteTrade,
  onViewCardDetail,
  onBack,
  onShowToast,
  cards: _cards,
}) => {
  const [inputText, setInputText] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'sale' | 'trade' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveTime, setReserveTime] = useState('목요일 19:00');
  const [reservePlace, setReservePlace] = useState('잠실새내역 4번출구');
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentInquiry = inquiries.find((i) => i.id === activeInquiryId) || inquiries[0];
  const currentMessages = currentInquiry ? messages[currentInquiry.id] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length]);

  const handleSend = () => {
    if (!inputText.trim() || !currentInquiry) return;
    onSendMessage(currentInquiry.id, inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (text: string) => {
    if (!currentInquiry) return;
    onSendMessage(currentInquiry.id, text);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (filterTab === 'sale' && inq.tradeType !== 'sale') return false;
    if (filterTab === 'trade' && inq.tradeType !== 'trade') return false;
    if (filterTab === 'completed' && inq.tradeStatus !== 'completed') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inq.counterparty.nickname.toLowerCase().includes(q) ||
        inq.listing.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto p-3 sm:p-4 gap-4 h-[calc(100vh-135px)] select-none">
      {/* ================= LEFT SIDEBAR (Chat Room List & Filters) ================= */}
      <section
        className={`w-full md:w-[380px] lg:w-[420px] bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden shrink-0 ${
          isMobileConversationOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Top Title & Filter Segment */}
        <div className="p-4 border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">거래 대화함</h1>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {inquiries.filter((i) => i.tradeStatus !== 'completed').length}건 진행중
              </span>
            </div>
            <button
              onClick={() => onShowToast('최신 대화순으로 정렬되었습니다.')}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition cursor-pointer"
            >
              정렬
            </button>
          </div>

          {/* Segmented Filter Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium text-slate-600">
            <button
              onClick={() => setFilterTab('all')}
              className={`py-1.5 text-center rounded-lg transition cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-white text-blue-600 font-semibold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              전체 ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterTab('sale')}
              className={`py-1.5 text-center rounded-lg transition cursor-pointer ${
                filterTab === 'sale'
                  ? 'bg-white text-blue-600 font-semibold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              판매 (2)
            </button>
            <button
              onClick={() => setFilterTab('trade')}
              className={`py-1.5 text-center rounded-lg transition cursor-pointer ${
                filterTab === 'trade'
                  ? 'bg-white text-blue-600 font-semibold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              교환 (1)
            </button>
            <button
              onClick={() => setFilterTab('completed')}
              className={`py-1.5 text-center rounded-lg transition cursor-pointer ${
                filterTab === 'completed'
                  ? 'bg-white text-blue-600 font-semibold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              완료됨
            </button>
          </div>

          {/* Chat Search */}
          <div className="relative mt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="상대방 닉네임, 카드명 검색"
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg pl-3 pr-3 py-2 focus:bg-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Active Chat List (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scroll divide-y divide-slate-100">
          {filteredInquiries.map((inq) => {
            const isActive = inq.id === activeInquiryId;
            return (
              <article
                key={inq.id}
                onClick={() => {
                  onSelectInquiry(inq.id);
                  setIsMobileConversationOpen(true);
                }}
                className={`p-3.5 transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/60 border-l-4 border-blue-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Counterparty Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-300 text-sky-700 font-black text-xs flex items-center justify-center">
                      {inq.counterparty.nickname.slice(0, 2)}
                    </div>
                    {inq.counterparty.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </div>

                  {/* Chat Summary Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {inq.counterparty.nickname}
                        </span>
                        {inq.counterparty.verified && (
                          <span className="text-[10px] text-blue-500 font-bold" title="인증 회원">
                            ✓
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {inq.counterparty.rating}점
                        </span>
                      </div>
                      <time className="text-[10px] text-slate-400 font-medium">
                        {inq.lastMessageTime}
                      </time>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 truncate mb-1">
                      {inq.listing.title}
                    </p>

                    <p className="text-[11px] text-slate-500 truncate">
                      {inq.lastMessage}
                    </p>

                    {/* Status Tag Row */}
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          inq.tradeStatus === 'reserved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : inq.tradeStatus === 'completed'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {inq.tradeStatus === 'reserved'
                          ? '예약중'
                          : inq.tradeStatus === 'completed'
                          ? '거래완료'
                          : '문의중'}
                      </span>
                      {inq.listing.price > 0 && (
                        <span className="text-[10px] text-slate-500 font-medium">
                          ₩{inq.listing.price.toLocaleString()}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 truncate">
                        · {inq.tradeMethod}
                      </span>
                    </div>
                  </div>

                  {/* Mini Slab Preview */}
                  <div className="w-11 h-14 bg-slate-100 border border-slate-200 rounded-md p-0.5 flex flex-col shrink-0 items-center justify-center overflow-hidden">
                    <div
                      className={`w-full text-[6px] text-white font-bold text-center leading-none py-0.5 rounded-t-[2px] ${
                        inq.listing.gradingCompany === 'PSA'
                          ? 'bg-red-600'
                          : inq.listing.gradingCompany === 'BGS'
                          ? 'bg-amber-600'
                          : 'bg-slate-800'
                      }`}
                    >
                      {inq.listing.gradingCompany} {inq.listing.gradeScore || ''}
                    </div>
                    <div className="w-full flex-1 bg-gradient-to-br from-slate-900 to-blue-950 rounded-b-[2px] flex items-center justify-center p-0.5 text-center">
                      <span className="text-[7px] text-white font-black tracking-tighter truncate">
                        {inq.listing.title.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Quick Info Footer for Left Rail */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 직거래 안심케어 가동 중
          </span>
          <button
            onClick={() => onShowToast('안전한 거래를 위해 공공장소(지하철역 등) 직거래를 권장합니다.')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            거래 주의사항
          </button>
        </div>
      </section>

      {/* ================= RIGHT MAIN PANEL (Chat Desk & Trade Controls) ================= */}
      {currentInquiry ? (
        <section
          className={`flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden relative ${
            !isMobileConversationOpen ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Sticky Top Trade Card Toolbar */}
          <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Left: Card Info & Seller Details */}
              <div className="flex items-center gap-3">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setIsMobileConversationOpen(false)}
                  className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Mini Realistic Slab Thumbnail */}
                <div className="w-12 h-16 bg-slate-50 border-2 border-slate-300 rounded-lg p-0.5 shadow-xs flex flex-col shrink-0 relative">
                  <div
                    className={`w-full text-[7px] text-white font-black text-center rounded-t-sm py-0.5 ${
                      currentInquiry.listing.gradingCompany === 'PSA'
                        ? 'bg-red-600'
                        : currentInquiry.listing.gradingCompany === 'BGS'
                        ? 'bg-amber-600'
                        : 'bg-slate-800'
                    }`}
                  >
                    {currentInquiry.listing.gradingCompany} {currentInquiry.listing.gradeScore || ''}
                  </div>
                  <div className="w-full flex-1 bg-gradient-to-b from-slate-900 to-blue-950 rounded-b-sm flex flex-col items-center justify-center text-center p-0.5">
                    <span className="text-[7px] text-amber-300 font-black leading-none">
                      CARD
                    </span>
                  </div>
                </div>

                {/* Title, Badge, and Price */}
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        currentInquiry.tradeStatus === 'reserved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : currentInquiry.tradeStatus === 'completed'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {currentInquiry.tradeStatus === 'reserved'
                        ? '예약중'
                        : currentInquiry.tradeStatus === 'completed'
                        ? '거래완료'
                        : '판매중'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      직거래 / 택배 거래
                    </span>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="font-semibold text-slate-700">
                        {currentInquiry.counterparty.nickname}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        (응답률 {currentInquiry.counterparty.responseRate}% · 평점 {currentInquiry.counterparty.rating})
                      </span>
                    </div>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
                    {currentInquiry.listing.title}
                  </h2>

                  <div className="flex items-baseline gap-2 mt-0.5">
                    {currentInquiry.listing.price > 0 ? (
                      <>
                        <span className="text-base sm:text-lg font-black text-slate-900">
                          ₩{currentInquiry.listing.price.toLocaleString()}
                        </span>
                        {currentInquiry.listing.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₩{currentInquiry.listing.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {currentInquiry.listing.discountRate && (
                          <span className="text-xs font-semibold text-red-500">
                            {currentInquiry.listing.discountRate}% OFF
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-base font-black text-emerald-600">
                        {currentInquiry.tradeType === 'trade' ? '교환 희망' : '₩0 (나눔)'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions Group (Reservation & Request Complete) */}
              <div className="flex items-center flex-wrap gap-2 justify-end">
                {/* Reservation Change Button */}
                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(true)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
                    currentInquiry.tradeStatus === 'reserved'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{currentInquiry.tradeStatus === 'reserved' ? '예약 관리' : '예약 지정'}</span>
                </button>

                {/* Complete Trade Request Button */}
                <button
                  type="button"
                  onClick={() => setIsCompleteModalOpen(true)}
                  disabled={currentInquiry.tradeStatus === 'completed'}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                    currentInquiry.tradeStatus === 'completed'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{currentInquiry.tradeStatus === 'completed' ? '거래 완료됨' : '거래 완료'}</span>
                </button>

                <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

                {/* View card detail */}
                <button
                  type="button"
                  onClick={() => onViewCardDetail(currentInquiry.listingId)}
                  title="매물 상세 보기"
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Report */}
                <button
                  type="button"
                  onClick={() => onShowToast('신고가 접수되었습니다. 운영팀이 감사 로그와 함께 검토합니다.')}
                  title="채팅방 신고"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Chat Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#f8fafc]/50 to-white">
            {/* Safety Guide Notice Banner */}
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-blue-100 p-3.5 sm:p-4 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed text-slate-600">
                <span className="font-bold text-slate-900 block mb-0.5">
                  비공개 1:1 안전 거래 가이드
                </span>
                비공개 1:1 문의가 시작되었습니다. 실제 거래 방식과 결제는 당사자가 안전하게 합의해주세요. 슬랩 카드 직거래 시 위조 방지 홀로그램 확인과 공공장소(지하철 역사 고객안내센터 앞 등) 이용을 적극 권장합니다.
              </div>
            </div>

            {/* Date Marker */}
            <div className="flex items-center justify-center my-3">
              <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full border border-slate-200/60">
                2024년 10월 24일 목요일
              </span>
            </div>

            {/* Message Thread */}
            {currentMessages.map((msg) => {
              if (msg.isSystemEvent) {
                return (
                  <div key={msg.id} className="max-w-xl mx-auto my-3">
                    <div className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-4 shadow-xs flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xl">
                        🎉
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                          예약 상태로 변경되었습니다
                        </h3>
                        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                          등록자가 <strong className="font-bold text-emerald-950">'{currentInquiry.counterparty.nickname}'</strong> 님에게 매물을 <span className="font-bold underline decoration-emerald-400">[예약]</span>으로 지정했습니다.
                        </p>
                        <div className="mt-2.5 pt-2.5 border-t border-emerald-200/70 flex items-center justify-between text-xs text-emerald-900">
                          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                            <Calendar className="w-3.5 h-3.5" />
                            예약 일시: {msg.eventPayload?.dateTime || '목요일 19:00'} {msg.eventPayload?.location || '잠실새내역 4번출구'}
                          </span>
                          <button
                            onClick={() => setIsReserveModalOpen(true)}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                          >
                            일정 변경
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              const isMine = msg.senderId === 'current-user';

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {!isMine && (
                    <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-300 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 mb-1">
                      {msg.senderNickname.slice(0, 2)}
                    </div>
                  )}

                  <div className={`space-y-1 max-w-lg ${isMine ? 'items-end' : 'items-start'}`}>
                    {!isMine && (
                      <span className="text-xs font-semibold text-slate-600 ml-1">
                        {msg.senderNickname}
                      </span>
                    )}

                    <div className="flex items-end gap-2">
                      {isMine && (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-blue-600 font-semibold mb-0.5">읽음</span>
                          <time className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                            {msg.createdAt}
                          </time>
                        </div>
                      )}

                      <div
                        className={`text-xs leading-relaxed p-3.5 shadow-xs ${
                          isMine
                            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-xs'
                            : 'bg-white border border-slate-200/90 text-slate-800 rounded-2xl rounded-tl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {!isMine && (
                        <time className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          {msg.createdAt}
                        </time>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />

            {/* Quick Response Chips */}
            <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
              <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" /> 빠른 답장:
              </span>
              <button
                type="button"
                onClick={() => handleQuickReply('📍 약속 장소에 도착했습니다!')}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>📍</span> 도착했습니다!
              </button>
              <button
                type="button"
                onClick={() => handleQuickReply('📸 슬랩 뒷면 및 라벨 추가 상세 사진 전송해드립니다.')}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>📸</span> 추가 사진 요청
              </button>
              <button
                type="button"
                onClick={() => handleQuickReply('⌛ 지하철 이동 중이라 5분 정도 늦을 것 같습니다. 죄송합니다!')}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 shadow-2xs transition flex items-center gap-1 cursor-pointer"
              >
                <span>⌛</span> 조금 늦을 것 같습니다
              </button>
            </div>
          </div>

          {/* Message Input Area */}
          <footer className="border-t border-slate-200 bg-white p-3 sm:p-4">
            {/* Safety Mini Warning Strip */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-red-500" />
                <span>개인 계좌번호나 상세 거주지 주소 노출에 유의하세요.</span>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Card Circle 안심수칙: 대금 보관 없이 당사자 간 안전 직거래를 진행합니다.')}
                className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                안전수칙 확인 <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Desktop Rich Input Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all p-2.5">
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요... (줄바꿈 Shift + Enter, 전송 Enter)"
                className="w-full bg-transparent border-0 text-xs text-slate-800 placeholder:text-slate-400 focus:ring-0 resize-none p-1 outline-none"
              />

              {/* Utility Toolbar & Send */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 mt-1">
                <div className="flex items-center gap-1 text-slate-500">
                  <button
                    type="button"
                    onClick={() => onShowToast('사진 첨부 준비 완료')}
                    title="카드 실물 사진 첨부"
                    className="p-1.5 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputText((prev) => prev + ' 😊')}
                    title="이모티콘"
                    className="p-1.5 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputText((prev) => prev + ' 📍 서울 강남역 4번출구')}
                    title="직거래 장소 핀 공유"
                    className="p-1.5 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onShowToast('PSA 슬랩 #84920194 진품 바코드 인증서 첨부됨')}
                    title="슬랩 시리얼 정품 조회 첨부"
                    className="p-1.5 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <Barcode className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 hidden sm:inline">Enter로 전송</span>
                  <button
                    type="button"
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <span>전송</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </section>
      ) : (
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
          대화할 문의방을 선택해주세요.
        </div>
      )}

      {/* Reservation Modal */}
      {isReserveModalOpen && currentInquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              {currentInquiry.counterparty.nickname} 님과 거래 예약 설정
            </h3>
            <p className="text-xs text-slate-500">
              예약으로 지정하면 피드에서 '예약중' 뱃지가 부여되며 다른 사용자의 신규 문의가 제한됩니다.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">약속 일시</label>
                <input
                  type="text"
                  value={reserveTime}
                  onChange={(e) => setReserveTime(e.target.value)}
                  placeholder="예: 이번 주 목요일 19:00"
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">직거래 장소 또는 택배</label>
                <input
                  type="text"
                  value={reservePlace}
                  onChange={(e) => setReservePlace(e.target.value)}
                  placeholder="예: 잠실새내역 4번출구 개찰구 앞"
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {currentInquiry.tradeStatus === 'reserved' ? (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateReservation(currentInquiry.id, undefined);
                    setIsReserveModalOpen(false);
                    onShowToast('예약이 취소되고 판매중으로 복귀했습니다.');
                  }}
                  className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  예약 취소
                </button>
              ) : <div></div>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateReservation(currentInquiry.id, { time: reserveTime, place: reservePlace });
                    setIsReserveModalOpen(false);
                    onShowToast('예약이 설정되었습니다.');
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-sm"
                >
                  예약 확정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {isCompleteModalOpen && currentInquiry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              거래 완료 확인
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              상대방과 실물 카드 전달 및 대금 정산이 모두 정상적으로 마무리되었습니까?
              완료 처리 시 매물은 피드에서 <strong className="text-slate-900">거래완료</strong> 상태로 전환됩니다.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
              <div>매물: <strong>{currentInquiry.listing.title}</strong></div>
              <div>거래 상대방: <strong>{currentInquiry.counterparty.nickname}</strong></div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCompleteModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  onCompleteTrade(currentInquiry.id);
                  setIsCompleteModalOpen(false);
                  onShowToast('거래가 성공적으로 완료 처리되었습니다!');
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer shadow-sm"
              >
                거래 완료 확정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
