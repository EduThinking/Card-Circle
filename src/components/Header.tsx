import React from 'react';
import { 
  Layers, 
  Search, 
  Flame, 
  Plus, 
  MessageSquare, 
  Heart
} from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenRegister: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
  onOpenGuide: (topic: string) => void;
  unreadCount: number;
  favoritesCount: number;
  activeView: 'explore' | 'detail' | 'register' | 'chat' | 'profile';
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenRegister,
  onOpenChat,
  onOpenProfile,
  onOpenGuide,
  unreadCount,
  favoritesCount,
  activeView: _activeView,
  onGoHome,
}) => {
  const hotKeywords = [
    '오타니 쇼헤이',
    '피카츄 SAR',
    '2024 Topps 크롬',
    '손흥민 프리즘',
    '이정후 루키 오토',
  ];

  const categories: { id: Category; label: string; emoji?: string }[] = [
    { id: 'all', label: '전체 보기' },
    { id: 'baseball', label: '야구 (KBO/MLB)', emoji: '⚾' },
    { id: 'basketball', label: '농구 (NBA)', emoji: '🏀' },
    { id: 'soccer', label: '축구 (EPL/국대)', emoji: '⚽' },
    { id: 'pokemon', label: '포켓몬 TCG', emoji: '⚡' },
    { id: 'mtg', label: '매직 더 개더링', emoji: '🧙' },
    { id: 'onepiece', label: '원피스 카드게임', emoji: '🏴‍☠️' },
    { id: 'other', label: '기타 수집품·용품', emoji: '💎' },
  ];

  return (
    <>
      {/* Top Global Notification Banner */}
      <aside className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              공지
            </span>
            <span className="text-slate-200">
              PSA · BGS 슬랩 정품 보증 & 안심 직거래 에스크로 서비스 정식 오픈
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => onOpenGuide('guide')} 
              className="hover:text-white transition-colors cursor-pointer text-xs"
            >
              이용 가이드
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => onOpenGuide('tracker')} 
              className="hover:text-white transition-colors cursor-pointer text-xs"
            >
              시세 조회기
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => onOpenGuide('support')} 
              className="hover:text-white transition-colors cursor-pointer text-xs"
            >
              고객센터
            </button>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-6">
            {/* Brand Logo */}
            <button 
              onClick={onGoHome}
              className="flex items-center gap-2.5 shrink-0 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                  Card Circle
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-1"></span>
                </span>
                <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase -mt-0.5">
                  Collectors Hub
                </span>
              </div>
            </button>

            {/* Central Search Bar with Dropdown & Keywords */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative flex items-center bg-slate-100 rounded-full border border-slate-200 hover:border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                {/* Category select inside search */}
                <div className="relative flex items-center pl-4 pr-1 shrink-0">
                  <select 
                    value={currentCategory}
                    onChange={(e) => onSelectCategory(e.target.value as Category)}
                    className="bg-transparent border-0 text-xs font-semibold text-slate-700 focus:ring-0 cursor-pointer py-2 pl-0 pr-6 outline-none"
                  >
                    <option value="all">전체 수집품</option>
                    <option value="baseball">야구 (KBO/MLB)</option>
                    <option value="basketball">농구 (NBA)</option>
                    <option value="soccer">축구 (유럽)</option>
                    <option value="pokemon">포켓몬 TCG</option>
                    <option value="mtg">MTG / 원피스</option>
                    <option value="other">기타 수집품</option>
                  </select>
                </div>
                <div className="w-[1px] h-5 bg-slate-300 my-auto"></div>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="선수명, 카드 세트명, TCG 번호, 인서트 검색 (예: 오타니 쇼헤이, 151 피카츄)"
                  className="w-full bg-transparent border-0 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none"
                />
                <button 
                  onClick={onGoHome}
                  title="검색"
                  className="shrink-0 p-2 mr-1.5 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Hot Trend Keywords under Search */}
              <div className="flex items-center gap-2 mt-1.5 px-3 text-[11px] text-slate-500 overflow-x-auto hide-scrollbar">
                <span className="font-bold text-blue-600 shrink-0 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-500" /> 실시간 인기:
                </span>
                {hotKeywords.map((kw, idx) => (
                  <React.Fragment key={kw}>
                    <button 
                      onClick={() => {
                        onSearchChange(kw);
                        onGoHome();
                      }}
                      className="hover:text-blue-600 hover:underline shrink-0 cursor-pointer"
                    >
                      {kw}
                    </button>
                    {idx < hotKeywords.length - 1 && <span className="text-slate-300">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Quick Navigation & User State */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Primary CTA Button */}
              <button 
                onClick={onOpenRegister}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm px-3.5 sm:px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/25 transition-all cursor-pointer hover:shadow-md"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">카드 등록하기</span>
                <span className="sm:hidden">등록</span>
              </button>

              {/* Inquiry Button with Badge */}
              <button 
                onClick={onOpenChat}
                title="채팅/거래 대화함"
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white ring-1 ring-red-500/20">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Bookmark / Wishlist */}
              <button 
                onClick={onOpenProfile}
                title="관심 카드"
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-50' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-white">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className="w-[1px] h-6 bg-slate-200 mx-0.5 sm:mx-1"></div>

              {/* Profile Badge */}
              <button 
                onClick={onOpenProfile}
                className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-100 shadow-xs">
                  슬
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">슬러거콜렉터</span>
                  <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 신뢰도 99.4%
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile search bar if on small screen */}
          <div className="md:hidden pb-3 pt-1">
            <div className="relative flex items-center bg-slate-100 rounded-full border border-slate-200">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="선수명, 세트명, TCG 검색..."
                className="w-full bg-transparent border-0 px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none"
              />
              <button 
                onClick={onGoHome}
                className="p-1.5 mr-1 text-white bg-blue-600 rounded-full cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Category Navigation Bar */}
        <nav className="bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <ul className="flex items-center gap-1 overflow-x-auto hide-scrollbar text-sm font-semibold text-slate-600 py-1.5">
              {categories.map((cat) => {
                const isActive = currentCategory === cat.id;
                return (
                  <li key={cat.id} className="shrink-0">
                    <button
                      onClick={() => {
                        onSelectCategory(cat.id);
                        onGoHome();
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-bold ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-200/60 shadow-xs'
                          : 'hover:text-slate-900 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat.emoji && <span>{cat.emoji}</span>}
                      {cat.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
