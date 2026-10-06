import React from 'react';
import { Sparkles, ArrowRight, Trophy, Zap, Flame } from 'lucide-react';
import { CardItem } from '../types';

interface HeroBannerProps {
  onFilterGradedSpecial: () => void;
  onOpenGuide: (topic: string) => void;
  onSelectCard: (cardId: string) => void;
  cards: CardItem[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onFilterGradedSpecial,
  onOpenGuide,
  onSelectCard,
  cards: _cards,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-2 select-none">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl">
        {/* Ambient Glows */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -top-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 lg:p-10">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md text-xs font-extrabold uppercase bg-red-600 text-white tracking-wide flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> Featured Event
              </span>
              <span className="text-xs font-semibold text-slate-300 tracking-wider">
                한정 거래 기획전 · 검증 완료
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
              2024 프리미엄 베이스볼 &amp; TCG<br className="hidden sm:inline" /> 핫 트레이드 페스티벌
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              <strong className="text-white font-semibold">PSA 10 · BGS 9.5+</strong> 프리미엄 슬랩 매물 특별 오픈! 직거래 안심 보증과 현장 수수료 무료 혜택을 놓치지 마세요.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onFilterGradedSpecial}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white shadow-lg shadow-blue-600/30 transition-all hover:translate-x-0.5 cursor-pointer"
              >
                <span>기획전 특별 매물 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenGuide('guide')}
                className="text-xs font-medium text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
              >
                슬랩 등급 인증 매뉴얼 확인
              </button>
            </div>
          </div>

          {/* Right Quick Cards Showcase Carousel Preview */}
          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-3.5 overflow-x-auto py-2 hide-scrollbar">
            {/* Mini Preview Slab 1 (Ohtani) */}
            <div
              onClick={() => onSelectCard('card-1')}
              className="w-36 shrink-0 bg-slate-800/90 rounded-xl p-2 border border-slate-700/80 shadow-2xl backdrop-blur-md transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer group"
            >
              <div className="relative bg-slate-900 rounded-lg p-1.5 aspect-[3/4] flex flex-col justify-between overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between text-[8px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded">
                  <span>PSA GEM MT</span>
                  <span className="text-[10px]">10</span>
                </div>
                <div className="my-auto text-center">
                  <Trophy className="w-8 h-8 mx-auto text-amber-400/80 mb-1 group-hover:scale-110 transition-transform" />
                  <div className="text-[9px] font-bold text-slate-200">SHOHEI OHTANI</div>
                  <div className="text-[8px] text-slate-400">2023 Chrome /99</div>
                </div>
                <div className="text-center bg-slate-950/80 rounded py-0.5 text-[9px] font-bold text-blue-400">
                  ₩450,000
                </div>
              </div>
            </div>

            {/* Mini Preview Slab 2 (Pikachu) */}
            <div
              onClick={() => onSelectCard('card-2')}
              className="w-40 shrink-0 bg-slate-800 rounded-xl p-2.5 border border-amber-500/40 shadow-2xl backdrop-blur-md transform translate-y-1 hover:translate-y-0 transition-transform cursor-pointer group"
            >
              <div className="relative bg-slate-900 rounded-lg p-2 aspect-[3/4] flex flex-col justify-between overflow-hidden border border-amber-500/30">
                <div className="flex items-center justify-between text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  <span>BGS GOLD</span>
                  <span className="text-xs">9.5</span>
                </div>
                <div className="my-auto text-center">
                  <Zap className="w-9 h-9 mx-auto text-yellow-400 mb-1 group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] font-bold text-white">PIKACHU SAR</div>
                  <div className="text-[8px] text-slate-400">30th Special Art</div>
                </div>
                <div className="text-center bg-slate-950/90 rounded py-0.5 text-[10px] font-bold text-emerald-400">
                  ₩180,000
                </div>
              </div>
            </div>

            {/* Mini Preview Slab 3 (Kobe) */}
            <div
              onClick={() => onSelectCard('card-3')}
              className="w-36 shrink-0 bg-slate-800/90 rounded-xl p-2 border border-slate-700/80 shadow-2xl backdrop-blur-md transform rotate-3 hover:rotate-0 transition-transform cursor-pointer group hidden sm:block"
            >
              <div className="relative bg-slate-900 rounded-lg p-1.5 aspect-[3/4] flex flex-col justify-between overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between text-[8px] bg-amber-600 text-white font-black px-1.5 py-0.5 rounded">
                  <span>BGS ROOKIE</span>
                  <span className="text-[10px]">9.5</span>
                </div>
                <div className="my-auto text-center">
                  <Flame className="w-8 h-8 mx-auto text-orange-400/80 mb-1 group-hover:scale-110 transition-transform" />
                  <div className="text-[9px] font-bold text-slate-200">KOBE BRYANT</div>
                  <div className="text-[8px] text-slate-400">1996 Topps #138</div>
                </div>
                <div className="text-center bg-slate-950/80 rounded py-0.5 text-[9px] font-bold text-purple-400">
                  교환 희망
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
