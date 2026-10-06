import React, { useState } from 'react';
import { 
  Heart, 
  Package, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  MessageSquare,
  Award,
  Sparkles
} from 'lucide-react';
import { CardItem } from '../types';

interface ProfileViewProps {
  cards: CardItem[];
  favorites: string[];
  onSelectCard: (card: CardItem) => void;
  onOpenRegister: () => void;
  onOpenChat: () => void;
  onToggleLike: (cardId: string, e: React.MouseEvent) => void;
  onShowToast: (message: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  cards,
  favorites,
  onSelectCard,
  onOpenRegister,
  onOpenChat,
  onToggleLike,
  onShowToast: _onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'my_listings' | 'wishlist' | 'completed' | 'trust'>('my_listings');

  // Filtered by current user
  const myListings = cards.filter((c) => c.seller.id === 'current-user' || c.seller.nickname === '슬러거콜렉터');
  const wishlistCards = cards.filter((c) => favorites.includes(c.id));
  const completedListings = cards.filter((c) => c.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 select-none">
      {/* User Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-md ring-4 ring-blue-50">
              슬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">슬러거콜렉터</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
                  신뢰 수집가
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 인증회원
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> 활동지역: 서울 (송파/강남/잠실)
                </span>
                <span>·</span>
                <span>가입일: 2026.02</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>새 매물 등록</span>
            </button>
            <button
              onClick={onOpenChat}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>대화함 열기</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Counter Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
          <div className="p-3 bg-slate-50/70 rounded-xl">
            <span className="text-xs text-slate-400 block font-medium">거래 완료 실적</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">23회</span>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl">
            <span className="text-xs text-slate-400 block font-medium">등록한 매물</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{myListings.length}개</span>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl">
            <span className="text-xs text-slate-400 block font-medium">관심 찜 매물</span>
            <span className="text-2xl font-black text-rose-500 mt-1 block">{wishlistCards.length}개</span>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl">
            <span className="text-xs text-slate-400 block font-medium">신뢰도 평가</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">99.4%</span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('my_listings')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'my_listings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            내 등록 매물 ({myListings.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            관심 매물 ({wishlistCards.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'completed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            거래 완료 내역 ({completedListings.length})
          </button>
          <button
            onClick={() => setActiveTab('trust')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === 'trust'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            신뢰 &amp; 인증 현황
          </button>
        </div>
      </div>

      {/* Tab Content: My Listings */}
      {activeTab === 'my_listings' && (
        <div>
          {myListings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
              <Package className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm">현재 등록된 매물이 없습니다.</p>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                첫 카드 등록하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {myListings.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onSelectCard(card)}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-3 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{card.categoryEmoji} {card.categoryName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        card.status === 'available'
                          ? 'bg-blue-50 text-blue-700'
                          : card.status === 'reserved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {card.status === 'available' ? '판매중' : card.status === 'reserved' ? '예약중' : '완료'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{card.title}</h3>

                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                    <span className="text-base font-black text-slate-900">
                      {card.price > 0 ? `₩${card.price.toLocaleString()}` : card.tradeType === 'trade' ? '교환' : '나눔'}
                    </span>
                    <span className="text-xs text-slate-400">관심 {card.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistCards.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-2">
              <Heart className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm">찜한 관심 카드가 없습니다. 피드에서 하트를 눌러보세요!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onSelectCard(card)}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-3 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{card.categoryEmoji} {card.categoryName}</span>
                    <button
                      onClick={(e) => onToggleLike(card.id, e)}
                      className="text-rose-500 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{card.title}</h3>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                    <span className="text-base font-black text-slate-900">
                      ₩{card.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">{card.seller.nickname}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Completed */}
      {activeTab === 'completed' && (
        <div className="space-y-3">
          {completedListings.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600">
                    완료
                  </span>
                  <span className="text-xs text-slate-400">{card.createdAt}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">{card.title}</h4>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">
                  ₩{card.price.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-600 block flex items-center justify-end gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 상호 거래 확정
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Trust */}
      {activeTab === 'trust' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Card Circle 신뢰 등급: 골드 마스터</h3>
              <p className="text-xs text-slate-500">
                수집가 상호 평가 및 23회의 무사고 직거래/택배 거래를 바탕으로 부여된 인증 배지입니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1">
              <span className="font-bold text-blue-900">실물 카드 직접 촬영 인증율</span>
              <p className="text-blue-700 text-lg font-black">100%</p>
              <p className="text-slate-500">모든 매물에 자연광/형광등 슬랩 접사 등록</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900">응답 신속도 &amp; 매너 지수</span>
              <p className="text-emerald-700 text-lg font-black">평균 3분 내 응답</p>
              <p className="text-slate-500">약속 시간 준수 및 친절한 대화 응대</p>
            </div>
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1">
              <span className="font-bold text-purple-900">안전 포장 만족도</span>
              <p className="text-purple-700 text-lg font-black">5.0 / 5.0</p>
              <p className="text-slate-500">에어캡 3중 보강 및 하드 슬리브 완충</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              카드서클은 지인 기반의 안전하고 투명한 카드 수집 문화를 만들어갑니다.
            </span>
            <span className="text-slate-400">UID: cc-user-84920</span>
          </div>
        </div>
      )}
    </div>
  );
};
