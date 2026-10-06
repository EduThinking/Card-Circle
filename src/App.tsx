import React, { useState, useEffect, useMemo } from 'react';
import { 
  Grid, 
  List, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  X,
  Sparkles
} from 'lucide-react';
import { CardItem, Inquiry, ChatMessage, FilterState, Category } from './types';
import { INITIAL_CARDS, INITIAL_INQUIRIES, INITIAL_MESSAGES } from './data/initialData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SidebarFilters } from './components/SidebarFilters';
import { CardGridItem } from './components/CardGridItem';
import { DetailView } from './components/DetailView';
import { RegisterForm } from './components/RegisterForm';
import { ChatDesk } from './components/ChatDesk';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { GuideModal } from './components/GuideModal';

const STORAGE_KEYS = {
  CARDS: 'cardcircle_cards_v1',
  FAVORITES: 'cardcircle_favorites_v1',
  INQUIRIES: 'cardcircle_inquiries_v1',
  MESSAGES: 'cardcircle_messages_v1',
};

export default function App() {
  // Persistence state
  const [cards, setCards] = useState<CardItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
      return saved ? JSON.parse(saved) : INITIAL_CARDS;
    } catch {
      return INITIAL_CARDS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['card-1', 'card-2'];
    } catch {
      return ['card-1', 'card-2'];
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  // Navigation State
  const [activeView, setActiveView] = useState<'explore' | 'detail' | 'register' | 'chat' | 'profile'>('explore');
  const [selectedCardId, setSelectedCardId] = useState<string>('card-1');
  const [activeInquiryId, setActiveInquiryId] = useState<string>('inq-1');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    tradeType: 'all',
    gradingCompany: 'all',
    condition: 'all',
    minPrice: '',
    maxPrice: '',
    meetupOnly: false,
    deliveryOnly: false,
    sortBy: 'latest',
    viewMode: 'grid',
  });

  // UI helpers
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [guideTopic, setGuideTopic] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync cards with favorite flag
  const cardsWithLikes = useMemo(() => {
    return cards.map((c) => ({
      ...c,
      isLiked: favorites.includes(c.id),
    }));
  }, [cards, favorites]);

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    } catch {}
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle favorite heart
  const handleToggleLike = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(cardId);
      const next = exists ? prev.filter((id) => id !== cardId) : [...prev, cardId];
      
      // Also update like count on card
      setCards((oldCards) =>
        oldCards.map((c) =>
          c.id === cardId
            ? { ...c, likes: exists ? Math.max(0, c.likes - 1) : c.likes + 1 }
            : c
        )
      );

      showToast(exists ? '관심 매물에서 제거되었습니다.' : '관심 매물에 추가되었습니다.');
      return next;
    });
  };

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return cardsWithLikes.filter((card) => {
      // Category
      if (filters.category !== 'all' && card.category !== filters.category) {
        return false;
      }
      // Trade Type
      if (filters.tradeType !== 'all') {
        if (filters.tradeType !== card.tradeType) return false;
      }
      // Grading Company
      if (filters.gradingCompany !== 'all') {
        if (filters.gradingCompany === 'raw') {
          if (card.isGraded) return false;
        } else if (card.gradingCompany.toLowerCase() !== filters.gradingCompany) {
          return false;
        }
      }
      // Condition
      if (filters.condition !== 'all') {
        if (card.condition.toLowerCase() !== filters.condition.toLowerCase()) {
          return false;
        }
      }
      // Price range
      if (filters.minPrice !== '' && card.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice !== '' && card.price > Number(filters.maxPrice)) {
        return false;
      }
      // Delivery
      if (filters.meetupOnly && !card.meetupAvailable) {
        return false;
      }
      if (filters.deliveryOnly && !card.deliveryAvailable) {
        return false;
      }
      // Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matches =
          card.title.toLowerCase().includes(query) ||
          card.player.toLowerCase().includes(query) ||
          card.setName.toLowerCase().includes(query) ||
          (card.cardNumber && card.cardNumber.toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'likes') return b.likes - a.likes;
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'grade_desc') {
        const scoreA = parseFloat(a.gradeScore || '0');
        const scoreB = parseFloat(b.gradeScore || '0');
        return scoreB - scoreA;
      }
      // default: latest (preserve id order or created)
      return 0;
    });
  }, [cardsWithLikes, filters]);

  // Counts for sidebar
  const counts = useMemo(() => {
    return {
      total: cards.length,
      psa: cards.filter((c) => c.gradingCompany === 'PSA').length,
      bgs: cards.filter((c) => c.gradingCompany === 'BGS').length,
      cgc: cards.filter((c) => c.gradingCompany === 'CGC').length,
      raw: cards.filter((c) => !c.isGraded || c.gradingCompany === 'RAW').length,
    };
  }, [cards]);

  const selectedCard = useMemo(() => {
    return cardsWithLikes.find((c) => c.id === selectedCardId) || cardsWithLikes[0];
  }, [cardsWithLikes, selectedCardId]);

  const relatedCards = useMemo(() => {
    return cardsWithLikes.filter((c) => c.id !== selectedCardId);
  }, [cardsWithLikes, selectedCardId]);

  // Actions
  const handleSelectCard = (card: CardItem) => {
    setSelectedCardId(card.id);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInquiry = (card: CardItem) => {
    // Check if inquiry already exists
    let existing = inquiries.find((i) => i.listingId === card.id);
    if (!existing) {
      existing = {
        id: `inq-${Date.now()}`,
        listingId: card.id,
        listing: {
          id: card.id,
          title: card.title,
          price: card.price,
          status: card.status,
          frontImage: card.frontImage,
          gradingCompany: card.gradingCompany,
          gradeScore: card.gradeScore,
          meetupLocation: card.meetupLocation,
        },
        counterparty: {
          id: card.seller.id,
          nickname: card.seller.nickname,
          rating: 4.9,
          responseRate: 98,
          online: true,
          verified: card.seller.verified,
        },
        lastMessage: '1:1 문의가 시작되었습니다.',
        lastMessageTime: '방금 전',
        unreadCount: 0,
        tradeType: card.tradeType,
        tradeStatus: card.status === 'reserved' ? 'reserved' : card.status === 'completed' ? 'completed' : 'inquiry',
        tradeMethod: card.meetupAvailable ? '직거래' : '택배거래',
      };
      setInquiries([existing, ...inquiries]);
      setMessages({
        ...messages,
        [existing.id]: [
          {
            id: `msg-${Date.now()}`,
            inquiryId: existing.id,
            senderId: 'current-user',
            senderNickname: '슬러거콜렉터',
            text: `안녕하세요! '${card.title}' 매물 문의드립니다.`,
            createdAt: '방금 전',
            read: true,
          },
        ],
      });
    }

    setActiveInquiryId(existing.id);
    setActiveView('chat');
  };

  const handleSendMessage = (inquiryId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      inquiryId,
      senderId: 'current-user',
      senderNickname: '슬러거콜렉터',
      text,
      createdAt: '방금 전',
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [inquiryId]: [...(prev[inquiryId] || []), newMessage],
    }));

    // Update last message in inquiry
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? {
              ...inq,
              lastMessage: text,
              lastMessageTime: '방금 전',
            }
          : inq
      )
    );

    // Simulate instant counterparty reply after 1.5s
    setTimeout(() => {
      const replyMessage: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        inquiryId,
        senderId: 'counterparty',
        senderNickname: inquiries.find((i) => i.id === inquiryId)?.counterparty.nickname || '판매자',
        text: '네 확인했습니다! 상세 내용 확인 후 바로 답변드리겠습니다.',
        createdAt: '방금 전',
        read: true,
      };

      setMessages((prev) => ({
        ...prev,
        [inquiryId]: [...(prev[inquiryId] || []), replyMessage],
      }));

      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === inquiryId
            ? {
                ...inq,
                lastMessage: replyMessage.text,
                lastMessageTime: '방금 전',
              }
            : inq
        )
      );
    }, 1500);
  };

  const handleUpdateReservation = (inquiryId: string, details?: { time: string; place: string }) => {
    const targetInq = inquiries.find((i) => i.id === inquiryId);
    if (!targetInq) return;

    const isReserving = !!details;

    // Update inquiry
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? {
              ...inq,
              tradeStatus: isReserving ? 'reserved' : 'inquiry',
              reservedDetails: details,
            }
          : inq
      )
    );

    // Update card status
    setCards((prev) =>
      prev.map((c) =>
        c.id === targetInq.listingId
          ? {
              ...c,
              status: isReserving ? 'reserved' : 'available',
            }
          : c
      )
    );

    // Add system event message
    if (isReserving) {
      const eventMsg: ChatMessage = {
        id: `msg-evt-${Date.now()}`,
        inquiryId,
        senderId: 'system',
        senderNickname: '시스템',
        text: `등록자가 '${targetInq.counterparty.nickname}' 님에게 매물을 [예약]으로 지정했습니다.`,
        createdAt: '방금 전',
        read: true,
        isSystemEvent: true,
        eventType: 'reservation',
        eventPayload: {
          dateTime: details.time,
          location: details.place,
        },
      };
      setMessages((prev) => ({
        ...prev,
        [inquiryId]: [...(prev[inquiryId] || []), eventMsg],
      }));
    }
  };

  const handleCompleteTrade = (inquiryId: string) => {
    const targetInq = inquiries.find((i) => i.id === inquiryId);
    if (!targetInq) return;

    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId ? { ...inq, tradeStatus: 'completed' } : inq
      )
    );

    setCards((prev) =>
      prev.map((c) =>
        c.id === targetInq.listingId ? { ...c, status: 'completed' } : c
      )
    );

    const eventMsg: ChatMessage = {
      id: `msg-complete-${Date.now()}`,
      inquiryId,
      senderId: 'system',
      senderNickname: '시스템',
      text: '상호 거래가 완료되었습니다! 소중한 카드가 새 수집가에게 안전하게 전달되었습니다.',
      createdAt: '방금 전',
      read: true,
      isSystemEvent: true,
      eventType: 'completion_confirmed',
    };

    setMessages((prev) => ({
      ...prev,
      [inquiryId]: [...(prev[inquiryId] || []), eventMsg],
    }));
  };

  const handleAddNewCard = (newCard: CardItem) => {
    setCards([newCard, ...cards]);
    showToast('새 카드가 성공적으로 등록되었습니다!');
    setSelectedCardId(newCard.id);
    setActiveView('detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] antialiased">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-slate-900/95 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentCategory={filters.category}
        onSelectCategory={(cat: Category) => setFilters((prev) => ({ ...prev, category: cat }))}
        searchQuery={filters.searchQuery}
        onSearchChange={(q: string) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        onOpenRegister={() => setActiveView('register')}
        onOpenChat={() => setActiveView('chat')}
        onOpenProfile={() => setActiveView('profile')}
        onOpenGuide={(t: string) => setGuideTopic(t)}
        unreadCount={inquiries.reduce((acc, curr) => acc + curr.unreadCount, 0)}
        favoritesCount={favorites.length}
        activeView={activeView}
        onGoHome={() => setActiveView('explore')}
      />

      {/* Main Content Router */}
      <div className="flex-1 w-full">
        {activeView === 'explore' && (
          <>
            {/* Hero Promotional Banner */}
            <HeroBanner
              onFilterGradedSpecial={() =>
                setFilters((prev) => ({ ...prev, gradingCompany: 'psa' }))
              }
              onOpenGuide={(t: string) => setGuideTopic(t)}
              onSelectCard={(cId: string) => {
                setSelectedCardId(cId);
                setActiveView('detail');
              }}
              cards={cards}
            />

            {/* Main Content Grid: Sidebar + Listings Feed */}
            <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Desktop Left Sidebar Filters */}
                <div className="hidden lg:block lg:col-span-3">
                  <SidebarFilters
                    filters={filters}
                    onChangeFilters={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
                    onResetFilters={() =>
                      setFilters({
                        searchQuery: '',
                        category: 'all',
                        tradeType: 'all',
                        gradingCompany: 'all',
                        condition: 'all',
                        minPrice: '',
                        maxPrice: '',
                        meetupOnly: false,
                        deliveryOnly: false,
                        sortBy: 'latest',
                        viewMode: 'grid',
                      })
                    }
                    counts={counts}
                  />
                </div>

                {/* Right Listings Section */}
                <section className="lg:col-span-9 space-y-5">
                  {/* Listings Control Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-slate-900">등록된 매물</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-700">
                        {filteredCards.length}개
                      </span>
                      <span className="text-xs text-slate-400 ml-1 hidden sm:inline">
                        실시간 검증 거래 매물 피드
                      </span>

                      {/* Mobile filter button trigger */}
                      <button
                        onClick={() => setMobileFilterOpen(true)}
                        className="lg:hidden ml-auto px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold flex items-center gap-1.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>필터</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      {/* Sort Dropdown */}
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-slate-400">정렬:</span>
                        <select
                          value={filters.sortBy}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              sortBy: e.target.value as any,
                            }))
                          }
                          className="border-0 bg-transparent text-xs font-bold text-slate-800 focus:ring-0 cursor-pointer py-1 pl-1 pr-6 outline-none"
                        >
                          <option value="latest">최신 등록순</option>
                          <option value="likes">인기 찜 많은순</option>
                          <option value="price_asc">낮은 가격순</option>
                          <option value="price_desc">높은 가격순</option>
                          <option value="grade_desc">PSA/BGS 고등급순</option>
                        </select>
                      </div>

                      <div className="w-[1px] h-4 bg-slate-200"></div>

                      {/* Grid / List View Toggle */}
                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'grid' }))}
                          className={`p-1 rounded transition cursor-pointer ${
                            filters.viewMode === 'grid'
                              ? 'bg-white text-blue-600 shadow-xs'
                              : 'text-slate-400 hover:text-slate-700'
                          }`}
                          title="그리드 보기"
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'list' }))}
                          className={`p-1 rounded transition cursor-pointer ${
                            filters.viewMode === 'list'
                              ? 'bg-white text-blue-600 shadow-xs'
                              : 'text-slate-400 hover:text-slate-700'
                          }`}
                          title="리스트 보기"
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  {filteredCards.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
                      <p className="text-sm font-semibold text-slate-600">
                        선택하신 조건에 부합하는 카드 매물이 없습니다.
                      </p>
                      <p className="text-xs text-slate-400">
                        필터를 초기화하거나 다른 검색어로 찾아보세요.
                      </p>
                      <button
                        onClick={() =>
                          setFilters({
                            searchQuery: '',
                            category: 'all',
                            tradeType: 'all',
                            gradingCompany: 'all',
                            condition: 'all',
                            minPrice: '',
                            maxPrice: '',
                            meetupOnly: false,
                            deliveryOnly: false,
                            sortBy: 'latest',
                            viewMode: 'grid',
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
                      >
                        필터 전체 초기화
                      </button>
                    </div>
                  ) : (
                    <div
                      className={
                        filters.viewMode === 'grid'
                          ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'
                          : 'grid grid-cols-1 gap-4'
                      }
                    >
                      {filteredCards.map((card) => (
                        <CardGridItem
                          key={card.id}
                          card={card}
                          onSelect={handleSelectCard}
                          onToggleLike={handleToggleLike}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination Controls */}
                  <div className="pt-6 pb-2 flex flex-col items-center justify-center gap-3">
                    <button
                      onClick={() => showToast('등록된 최신 카드 매물을 모두 불러왔습니다.')}
                      className="px-8 py-3 rounded-xl border-2 border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600 font-bold text-sm flex items-center gap-2 bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>카드 매물 더 불러오기 ({filteredCards.length}개 표시중)</span>
                    </button>

                    <nav aria-label="페이지 네비게이션" className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                          currentPage === 1 ? 'bg-blue-600 text-white' : 'border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        1
                      </button>
                      <button
                        onClick={() => setCurrentPage(2)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                          currentPage === 2 ? 'bg-blue-600 text-white' : 'border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        2
                      </button>
                      <button
                        onClick={() => setCurrentPage(3)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold cursor-pointer ${
                          currentPage === 3 ? 'bg-blue-600 text-white' : 'border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        3
                      </button>
                      <span className="px-1 text-slate-400">...</span>
                      <button
                        onClick={() => setCurrentPage(12)}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                      >
                        12
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </nav>
                  </div>
                </section>
              </div>
            </main>
          </>
        )}

        {/* Detail View */}
        {activeView === 'detail' && (
          <DetailView
            card={selectedCard}
            relatedCards={relatedCards}
            onSelectCard={handleSelectCard}
            onStartInquiry={handleStartInquiry}
            onToggleLike={handleToggleLike}
            onBack={() => setActiveView('explore')}
            onViewSellerProfile={() => setActiveView('profile')}
            onShowToast={showToast}
          />
        )}

        {/* Registration View */}
        {activeView === 'register' && (
          <RegisterForm
            onSubmitCard={handleAddNewCard}
            onCancel={() => setActiveView('explore')}
            onOpenGuide={(t: string) => setGuideTopic(t)}
            onShowToast={showToast}
          />
        )}

        {/* 1:1 Chat View */}
        {activeView === 'chat' && (
          <ChatDesk
            inquiries={inquiries}
            activeInquiryId={activeInquiryId}
            onSelectInquiry={setActiveInquiryId}
            messages={messages}
            onSendMessage={handleSendMessage}
            onUpdateReservation={handleUpdateReservation}
            onCompleteTrade={handleCompleteTrade}
            onViewCardDetail={(cId: string) => {
              setSelectedCardId(cId);
              setActiveView('detail');
            }}
            onBack={() => setActiveView('explore')}
            onShowToast={showToast}
            cards={cards}
          />
        )}

        {/* Profile View */}
        {activeView === 'profile' && (
          <ProfileView
            cards={cardsWithLikes}
            favorites={favorites}
            onSelectCard={handleSelectCard}
            onOpenRegister={() => setActiveView('register')}
            onOpenChat={() => setActiveView('chat')}
            onToggleLike={handleToggleLike}
            onShowToast={showToast}
          />
        )}
      </div>

      {/* Global Footer (Visible on explore and detail views) */}
      {(activeView === 'explore' || activeView === 'detail' || activeView === 'profile') && (
        <Footer
          onOpenGuide={(t: string) => setGuideTopic(t)}
          onSelectCategory={(cat: Category) => {
            setFilters((prev) => ({ ...prev, category: cat }));
            setActiveView('explore');
          }}
          onFilterGradedSpecial={() => {
            setFilters((prev) => ({ ...prev, gradingCompany: 'psa' }));
            setActiveView('explore');
          }}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeView={activeView}
        onChangeView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={inquiries.reduce((acc, curr) => acc + curr.unreadCount, 0)}
      />

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto shadow-2xl p-4">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">필터 설정</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarFilters
              filters={filters}
              onChangeFilters={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
              onResetFilters={() =>
                setFilters({
                  searchQuery: '',
                  category: 'all',
                  tradeType: 'all',
                  gradingCompany: 'all',
                  condition: 'all',
                  minPrice: '',
                  maxPrice: '',
                  meetupOnly: false,
                  deliveryOnly: false,
                  sortBy: 'latest',
                  viewMode: 'grid',
                })
              }
              counts={counts}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Information Guide Modal */}
      <GuideModal topic={guideTopic} onClose={() => setGuideTopic(null)} />
    </div>
  );
}
