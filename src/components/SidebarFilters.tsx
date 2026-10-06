import React from 'react';
import { SlidersHorizontal, RotateCcw, MapPin, Package } from 'lucide-react';
import { FilterState, TradeType, GradingCompany, CardCondition } from '../types';

interface SidebarFiltersProps {
  filters: FilterState;
  onChangeFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  counts: {
    total: number;
    psa: number;
    bgs: number;
    cgc: number;
    raw: number;
  };
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  counts,
  isMobileDrawer,
  onCloseMobileDrawer,
}) => {
  return (
    <aside
      className={`${
        isMobileDrawer
          ? 'p-6 space-y-6'
          : 'bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6 sticky top-28'
      }`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-base text-slate-900">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span>상세 검색 필터</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> 초기화
        </button>
      </div>

      {/* 1. 거래 유형 (Trade Type) */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          거래 유형
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
          {[
            { id: 'all' as TradeType, label: '전체' },
            { id: 'sale' as TradeType, label: '판매 매물' },
            { id: 'trade' as TradeType, label: '교환 희망' },
            { id: 'giveaway' as TradeType, label: '무료 나눔' },
          ].map((type) => {
            const isSelected = filters.tradeType === type.id;
            const isGiveaway = type.id === 'giveaway';
            return (
              <button
                key={type.id}
                onClick={() => onChangeFilters({ tradeType: type.id })}
                className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer font-bold ${
                  isSelected
                    ? isGiveaway
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-blue-600 text-white shadow-sm'
                    : isGiveaway
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 등급 감정 여부 (Grading Company) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            감정 등급 (Slab)
          </label>
          <span className="text-[11px] text-blue-600 font-medium">검증 슬랩 전용</span>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <label className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="gradingCompany"
                checked={filters.gradingCompany === 'all'}
                onChange={() => onChangeFilters({ gradingCompany: 'all' })}
                className="text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="font-medium text-xs">전체 슬랩 및 Raw</span>
            </span>
            <span className="text-xs text-slate-400 tabular-nums">{counts.total}</span>
          </label>

          <label className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="gradingCompany"
                checked={filters.gradingCompany === 'psa'}
                onChange={() => onChangeFilters({ gradingCompany: 'psa' })}
                className="text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600">
                <span className="w-2 h-2 rounded-full bg-red-600"></span> PSA 인증 카드
              </span>
            </span>
            <span className="text-xs text-slate-400 tabular-nums">{counts.psa}</span>
          </label>

          <label className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="gradingCompany"
                checked={filters.gradingCompany === 'bgs'}
                onChange={() => onChangeFilters({ gradingCompany: 'bgs' })}
                className="text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> BGS (Beckett)
              </span>
            </span>
            <span className="text-xs text-slate-400 tabular-nums">{counts.bgs}</span>
          </label>

          <label className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="gradingCompany"
                checked={filters.gradingCompany === 'cgc'}
                onChange={() => onChangeFilters({ gradingCompany: 'cgc' })}
                className="text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span> CGC Cards
              </span>
            </span>
            <span className="text-xs text-slate-400 tabular-nums">{counts.cgc}</span>
          </label>

          <label className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="gradingCompany"
                checked={filters.gradingCompany === 'raw'}
                onChange={() => onChangeFilters({ gradingCompany: 'raw' })}
                className="text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span> 미감정 (RAW/탑로더)
              </span>
            </span>
            <span className="text-xs text-slate-400 tabular-nums">{counts.raw}</span>
          </label>
        </div>
      </div>

      {/* 3. 카드 상태 (Condition) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          카드 상태
        </label>
        <div className="space-y-1.5 text-xs">
          {[
            { id: 'all' as CardCondition, label: '전체 상태', color: 'text-slate-700' },
            { id: 'nm' as CardCondition, label: '새것에 가까움 (NM: Near Mint)', color: 'text-emerald-600 font-semibold' },
            { id: 'lp' as CardCondition, label: '양호 (LP: Lightly Played)', color: 'text-blue-600 font-medium' },
            { id: 'mp' as CardCondition, label: '사용감 있음 / 플레이용 (MP)', color: 'text-slate-500' },
          ].map((cond) => (
            <label
              key={cond.id}
              className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-blue-600"
            >
              <input
                type="radio"
                name="cardCondition"
                checked={filters.condition === cond.id}
                onChange={() => onChangeFilters({ condition: cond.id })}
                className="text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className={cond.color}>{cond.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. 가격대 필터 (Price Range) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          희망 가격 범위
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-2 text-xs text-slate-400">₩</span>
            <input
              type="number"
              value={filters.minPrice === '' ? '' : filters.minPrice}
              onChange={(e) =>
                onChangeFilters({ minPrice: e.target.value === '' ? '' : Number(e.target.value) })
              }
              placeholder="0"
              className="w-full text-xs pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium outline-none"
            />
          </div>
          <span className="text-slate-400 text-xs">~</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-2 text-xs text-slate-400">₩</span>
            <input
              type="number"
              value={filters.maxPrice === '' ? '' : filters.maxPrice}
              onChange={(e) =>
                onChangeFilters({ maxPrice: e.target.value === '' ? '' : Number(e.target.value) })
              }
              placeholder="1,000,000+"
              className="w-full text-xs pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium outline-none"
            />
          </div>
        </div>

        {/* Quick price chips */}
        <div className="flex gap-1.5 pt-1">
          <button
            onClick={() => onChangeFilters({ minPrice: 0, maxPrice: 50000 })}
            className="text-[11px] py-1 px-2 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            5만원 이하
          </button>
          <button
            onClick={() => onChangeFilters({ minPrice: 100000, maxPrice: 300000 })}
            className="text-[11px] py-1 px-2 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            10~30만
          </button>
          <button
            onClick={() => onChangeFilters({ minPrice: 500000, maxPrice: '' })}
            className="text-[11px] py-1 px-2 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            50만 이상
          </button>
        </div>
      </div>

      {/* 5. 거래 방식 (Delivery Methods) */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          거래 방식
        </label>
        <div className="space-y-1.5 text-xs text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={filters.meetupOnly}
              onChange={(e) => onChangeFilters({ meetupOnly: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>직거래 가능 지역</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={filters.deliveryOnly}
              onChange={(e) => onChangeFilters({ deliveryOnly: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Package className="w-3.5 h-3.5 text-slate-400" />
            <span>안전 택배 / 우체국 준등기</span>
          </label>
        </div>
      </div>

      {/* Filter Apply / Close button */}
      <button
        onClick={() => {
          if (onCloseMobileDrawer) onCloseMobileDrawer();
        }}
        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs tracking-wide transition-colors cursor-pointer shadow-sm"
      >
        선택한 필터 적용
      </button>
    </aside>
  );
};
