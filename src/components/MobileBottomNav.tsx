import React from 'react';
import { LayoutGrid, PlusCircle, MessageSquare, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: 'explore' | 'detail' | 'register' | 'chat' | 'profile';
  onChangeView: (view: 'explore' | 'register' | 'chat' | 'profile') => void;
  unreadCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  onChangeView,
  unreadCount,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 px-2 py-1 shadow-lg select-none">
      <div className="grid grid-cols-4 items-center text-center">
        {/* 둘러보기 */}
        <button
          onClick={() => onChangeView('explore')}
          className={`flex flex-col items-center justify-center py-1.5 transition cursor-pointer ${
            activeView === 'explore' || activeView === 'detail'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">둘러보기</span>
        </button>

        {/* 카드 등록 */}
        <button
          onClick={() => onChangeView('register')}
          className={`flex flex-col items-center justify-center py-1.5 transition cursor-pointer ${
            activeView === 'register'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">카드 등록</span>
        </button>

        {/* 문의함 */}
        <button
          onClick={() => onChangeView('chat')}
          className={`relative flex flex-col items-center justify-center py-1.5 transition cursor-pointer ${
            activeView === 'chat'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-red-500 text-white font-bold text-[8px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">문의함</span>
        </button>

        {/* 내 정보 */}
        <button
          onClick={() => onChangeView('profile')}
          className={`flex flex-col items-center justify-center py-1.5 transition cursor-pointer ${
            activeView === 'profile'
              ? 'text-blue-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">내 정보</span>
        </button>
      </div>
    </nav>
  );
};
