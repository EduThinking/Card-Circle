import React from 'react';
import { MapPin, Package, Heart, Repeat, Layers } from 'lucide-react';
import { CardItem } from '../types';

interface CardGridItemProps {
  card: CardItem;
  onSelect: (card: CardItem) => void;
  onToggleLike: (cardId: string, e: React.MouseEvent) => void;
}

export const CardGridItem: React.FC<CardGridItemProps> = ({
  card,
  onSelect,
  onToggleLike,
}) => {
  const isSold = card.status === 'completed';
  const isReserved = card.status === 'reserved';

  // Badge configs
  const getTradeTypeBadge = () => {
    if (isSold) {
      return null;
    }
    if (isReserved) {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-indigo-600 text-white shadow-xs">
          예약중
        </span>
      );
    }
    if (card.tradeType === 'sale') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-blue-600 text-white shadow-xs">
          판매
        </span>
      );
    }
    if (card.tradeType === 'trade') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-600 text-white shadow-xs">
          교환
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-600 text-white shadow-xs">
        나눔
      </span>
    );
  };

  const getGradeBadge = () => {
    if (card.tradeType === 'giveaway') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-700 text-white tracking-wider shadow-xs">
          FREE
        </span>
      );
    }
    if (card.gradingCompany === 'PSA') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-red-600 text-white tracking-wider shadow-xs">
          PSA {card.gradeScore || '10'}
        </span>
      );
    }
    if (card.gradingCompany === 'BGS') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-amber-600 text-white tracking-wider shadow-xs">
          BGS {card.gradeScore || '9.5'}
        </span>
      );
    }
    if (card.gradingCompany === 'CGC') {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-black bg-sky-600 text-white tracking-wider shadow-xs">
          CGC {card.gradeScore || '9'}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-slate-800 text-white tracking-wider shadow-xs">
        RAW (미감정)
      </span>
    );
  };

  return (
    <article
      onClick={() => onSelect(card)}
      className={`slab-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group cursor-pointer transition-all ${
        isSold ? 'opacity-80' : ''
      }`}
    >
      <div>
        {/* Card Image & Slab Stage Box */}
        <div
          className={`relative p-3 flex items-center justify-center min-h-[260px] overflow-hidden ${
            card.category === 'pokemon'
              ? 'bg-gradient-to-b from-amber-50 to-orange-100'
              : card.tradeType === 'giveaway'
              ? 'bg-gradient-to-b from-emerald-50 to-teal-100'
              : card.category === 'soccer'
              ? 'bg-gradient-to-b from-sky-50 to-slate-200'
              : card.category === 'basketball'
              ? 'bg-gradient-to-b from-slate-100 to-indigo-100'
              : isSold
              ? 'bg-slate-200 grayscale'
              : 'bg-gradient-to-b from-slate-100 to-slate-200'
          }`}
        >
          {/* Top Overlays */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 z-10">
            {getTradeTypeBadge()}
          </div>
          <div className="absolute top-2.5 right-2.5 z-10">
            {getGradeBadge()}
          </div>

          {/* Sold Overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 text-white font-extrabold text-sm border border-slate-700 shadow-md">
                판매완료
              </span>
            </div>
          )}

          {/* Visual Slab Representation Graphic */}
          {card.frontImage && !card.tradeType.includes('giveaway') ? (
            <div className="w-40 aspect-[2.5/3.8] bg-white rounded-lg slab-case p-2 relative flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
              {/* PSA / BGS Top Label */}
              {card.gradingCompany === 'PSA' ? (
                <div className="border-b-2 border-red-600 pb-1 text-center bg-slate-50 rounded-t p-1">
                  <div className="text-[8px] font-extrabold tracking-tighter text-slate-800 uppercase truncate">
                    {card.setName || 'AUTHENTIC CARD'}
                  </div>
                  <div className="text-[9px] font-black text-red-600 truncate">
                    {card.player}
                  </div>
                  <div className="flex justify-between items-center text-[7px] text-slate-500 font-mono mt-0.5">
                    <span>GEM MT {card.gradeScore || '10'}</span>
                    <span>{card.certNumber || '#85422911'}</span>
                  </div>
                </div>
              ) : card.gradingCompany === 'BGS' ? (
                <div className="border-b-2 border-amber-600 pb-1 text-center bg-gradient-to-r from-amber-100 to-yellow-50 rounded-t p-1">
                  <div className="text-[8px] font-black text-amber-900 tracking-wider">
                    BECKETT GRADING
                  </div>
                  <div className="text-[9px] font-black text-slate-900 truncate">
                    {card.player}
                  </div>
                  <div className="flex justify-between items-center text-[7px] text-amber-800 font-mono mt-0.5">
                    <span>{card.cardNumber || 'RC #138'}</span>
                    <span className="font-black text-slate-950">GEM {card.gradeScore || '9.5'}</span>
                  </div>
                </div>
              ) : (
                <div className="border-b border-slate-200 pb-0.5 text-center bg-slate-100 rounded-t px-1">
                  <div className="text-[8px] font-bold text-slate-700 uppercase truncate">
                    {card.setName || 'TOPLOADER'}
                  </div>
                  <div className="text-[8px] font-semibold text-slate-500">RAW PROTECTED</div>
                </div>
              )}

              {/* Real Card Photo */}
              <div className="relative flex-1 rounded my-1 overflow-hidden shadow-inner flex items-center justify-center bg-slate-950">
                <img
                  src={card.frontImage}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>

              {/* Bottom Stamp */}
              <div className="text-[7px] text-center font-mono text-slate-400 font-semibold uppercase tracking-widest">
                {card.isGraded ? 'AUTHENTIC SLAB' : 'VERIFIED VAULT'}
              </div>
            </div>
          ) : card.tradeType === 'giveaway' ? (
            /* Giveaway Graphic */
            <div className="w-36 aspect-[2.5/3.2] bg-white rounded-xl shadow-lg border border-teal-200 p-3 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-300">
              <Layers className="w-12 h-12 text-teal-600 mb-2" />
              <span className="text-xs font-black text-slate-800">베이스 카드 300+장</span>
              <span className="text-[9px] text-teal-700 mt-1 font-semibold">MLB / NBA 입문자 세트</span>
              <span className="text-[8px] text-slate-400 mt-0.5">전용 덱박스 포함</span>
            </div>
          ) : (
            /* Fallback high-fidelity slab representation */
            <div className="w-40 aspect-[2.5/3.8] bg-white rounded-lg slab-case p-2 relative flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
              <div className="border-b-2 border-red-600 pb-1 text-center bg-slate-50 rounded-t p-1">
                <div className="text-[8px] font-extrabold tracking-tighter text-slate-800">
                  {card.setName || 'COLLECTOR SERIES'}
                </div>
                <div className="text-[9px] font-black text-red-600 truncate">
                  {card.player}
                </div>
                <div className="flex justify-between items-center text-[7px] text-slate-500 font-mono mt-0.5">
                  <span>{card.gradeScore ? `GRADE ${card.gradeScore}` : 'AUTHENTIC'}</span>
                  <span>{card.cardNumber || '#001'}</span>
                </div>
              </div>
              <div className="relative flex-1 bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 rounded my-1.5 flex flex-col items-center justify-center p-2 text-white overflow-hidden shadow-inner text-center">
                <span className="text-3xl mb-1">{card.categoryEmoji}</span>
                <span className="text-[11px] font-black tracking-tight leading-tight line-clamp-2">
                  {card.player}
                </span>
                {card.serialNumber && (
                  <span className="text-[8px] text-amber-300 font-mono mt-1 font-bold">
                    {card.serialNumber}
                  </span>
                )}
              </div>
              <div className="text-[7px] text-center font-mono text-slate-400 font-semibold uppercase tracking-widest">
                AUTHENTIC SLAB
              </div>
            </div>
          )}
        </div>

        {/* Card Meta & Content */}
        <div className="p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
              {card.categoryEmoji} {card.categoryName}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                card.condition === 'NM'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : isSold
                  ? 'bg-slate-100 text-slate-500 border-slate-200'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              {card.conditionLabel}
            </span>
          </div>

          <h3
            className={`font-bold text-sm leading-snug line-clamp-2 transition-colors ${
              isSold
                ? 'text-slate-400 line-through'
                : 'text-slate-900 group-hover:text-blue-600'
            }`}
          >
            {card.title}
          </h3>

          <div className="pt-1">
            {card.tradeType === 'trade' ? (
              <span className="text-base font-black text-emerald-600 tracking-tight flex items-center gap-1">
                <Repeat className="w-4 h-4" /> 교환 희망
              </span>
            ) : card.tradeType === 'giveaway' ? (
              <span className="text-lg font-black text-purple-600 tracking-tight">
                ₩0 (나눔)
              </span>
            ) : (
              <span
                className={`text-lg font-black tracking-tight ${
                  isSold ? 'text-slate-400 line-through' : 'text-slate-900'
                }`}
              >
                ₩{card.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="px-3.5 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1 truncate max-w-[170px]">
          {card.meetupAvailable ? (
            <MapPin className="w-3 h-3 shrink-0" />
          ) : (
            <Package className="w-3 h-3 shrink-0" />
          )}
          <span className="truncate">
            {isSold
              ? '거래 완료'
              : card.meetupLocation
              ? card.meetupLocation.replace('서울 강동구 / 송파구 인근 협의 (잠실새내역)', '직거래/택배')
              : card.deliveryAvailable
              ? '택배거래'
              : '직거래 가능'}
          </span>
        </span>

        <button
          onClick={(e) => onToggleLike(card.id, e)}
          className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
            card.isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${card.isLiked ? 'fill-rose-500' : ''}`}
          />
          <span>{card.likes}</span>
        </button>
      </div>
    </article>
  );
};
