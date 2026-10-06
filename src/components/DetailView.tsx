import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Heart, 
  Share2, 
  MapPin, 
  Package, 
  FileText, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  ZoomIn, 
  ArrowLeft 
} from 'lucide-react';
import { CardItem } from '../types';

interface DetailViewProps {
  card: CardItem;
  relatedCards: CardItem[];
  onSelectCard: (card: CardItem) => void;
  onStartInquiry: (card: CardItem) => void;
  onToggleLike: (cardId: string, e: React.MouseEvent) => void;
  onBack: () => void;
  onViewSellerProfile: (sellerId: string) => void;
  onShowToast: (message: string) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  card,
  relatedCards,
  onSelectCard,
  onStartInquiry,
  onToggleLike,
  onBack,
  onViewSellerProfile,
  onShowToast,
}) => {
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Gallery items for this card
  const gallery = [
    { 
      label: '앞면 (전체)', 
      url: card.frontImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbljkR7HsPmRuUndL_Nc9Hyyrt4ey9zYJUrSnjO95tAdZQhwJvdFhJIvslI1VgEpKeFlDe9q7dmHzj0cmpwhj2Y8GpcW1GMBvLPYQAr8QgtCURvWZngUlOfPzdUToGy-wCZgYB7ghULfC-1MirsKAtCJcfRym1VWeGM-RhnreBD_QuD-97hJhCvtkW90a1MFqZjXPuu7U4tQgd8Asim0t6_3Db9pbSLdbUFvi6Qlnt-uYy8bkBSh63' 
    },
    { 
      label: '슬랩 뒷면', 
      url: card.backImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6xRg9lLZgsVHgiyVuZxn8Mi1_CAYxlBcC0PPTaQM0U4GiptlfhhbE2Vxa0Mz8K-5uHT6T7GhC6asB3GI0iUckgCzpx3ChUEPRK92DVdLzIkYDoGNP2ox2jfZTsokXmebwmFRDokNZYMMTTojL8KO4DphpnOOVjytOCGl6zj66fzGONWN4c0EfWas14q_fGmi2FA6XbezuwxnBCwD_pms9KaZ-kDve6__nIDq9Q_h2FUNzw-lwTzUB' 
    },
    { 
      label: 'PSA 라벨', 
      url: card.labelImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ0W25goFVruMDrwGYcP0mYYcmfPaeCLmGKtR6MyhQkOeglPAmmL1DJHEiKNUyde4DGZ_na_DYyG_tDladhnUmapTDru_Yia1g9vEq7a-UucbNxSyf8L174KVaPLfjZk1n-s9tiIYUVt7wD3CdEwiRnWbJX_92KMOXYabRZIE3uofRpZ0T9LvK-zdl8oYkyTVihxY2P2MKNo4iFNfZxM7Jb9QhISMkNmuPSfw9Pnw6r9qzXC6_5kGB' 
    },
    { 
      label: '코너 접사', 
      url: card.cornerImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO2JJBZ1Z1_jrZGkOJAByBtbR2mpgVfudAa8nmRbv4R4m5rYjX3RC7FdGn5GDVfyFizyC_ve32y1dWG7bMYiqbxCxK8hzwlbaxbZLwm-PRyn6n1decnwrT5b2xRH4ENaNiYhVRl5iaBcRud-X1No-fN_tDW9AQ-p-xD1IZO_nYiNeyjDdYSwu3QFUBg4Q12u5qHht9ngLIx9r3uwybWclss9DfYceYJYeChbThm51FoJUb4a4TUMci' 
    },
  ];

  const currentDisplayImage = gallery[activeThumbIndex]?.url || gallery[0].url;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('매물 링크가 클립보드에 복사되었습니다.');
  };

  return (
    <div className="w-full bg-[#f8fafc] pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-slate-500 space-x-2">
            <button onClick={onBack} className="hover:text-blue-600 flex items-center gap-1 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> 홈
            </button>
            <span>›</span>
            <span className="text-slate-600">{card.categoryName} ({card.category.toUpperCase()})</span>
            <span>›</span>
            <span className="text-slate-600 truncate max-w-[150px] sm:max-w-xs">{card.setName || card.manufacturer}</span>
            <span>›</span>
            <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">{card.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ================= LEFT COLUMN: Visual Showcase (~48% width) ================= */}
          <section className="lg:col-span-6 flex flex-col gap-4">
            {/* Main PSA Slab Display Stage */}
            <div className="relative bg-slate-900/95 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden min-h-[560px] shadow-xl border border-slate-800 select-none">
              {/* Top Badges Overlay */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  실물 촬영 확인
                </span>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-black bg-black/90 text-amber-300 border border-amber-400/50 shadow-sm tracking-wider">
                    {card.isGraded ? `${card.gradingCompany} ${card.gradeScore || '10'}` : 'RAW'}
                    <span className="text-white ml-1 text-[10px] font-medium tracking-normal">
                      {card.isGraded ? 'GEM MINT' : 'AUTHENTIC'}
                    </span>
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800/80 text-slate-300 backdrop-blur-sm border border-slate-700">
                    {activeThumbIndex + 1} / {gallery.length}
                  </span>
                </div>
              </div>

              {/* Realistic PSA Slab Acrylic Case */}
              <div className="relative w-64 sm:w-72 md:w-80 rounded-xl bg-slate-100/90 p-3 slab-acrylic border-2 border-white/60 holo-border transition-transform hover:scale-[1.01] duration-300">
                {/* PSA Label Mockup */}
                <div className="bg-white border-2 border-red-600 rounded-sm p-2 mb-3 text-slate-900 shadow-xs">
                  <div className="flex justify-between items-start leading-tight">
                    <div>
                      <p className="text-[11px] font-black tracking-tighter text-red-600 uppercase">
                        {card.setName || '2023 TOPPS CHROME'}
                      </p>
                      <p className="text-[10px] font-bold text-slate-800 uppercase">
                        {card.player}
                      </p>
                      <p className="text-[9px] font-semibold text-slate-500 uppercase">
                        {card.parallel || 'REFRACTOR /99'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-700">{card.cardNumber || '#RA-SO'}</p>
                      <p className="text-xs font-extrabold text-red-600 uppercase">
                        GEM MT {card.gradeScore || '10'}
                      </p>
                      <p className="text-[9px] font-mono text-slate-400">
                        {card.certNumber || '#84920194'}
                      </p>
                    </div>
                  </div>
                  {/* Barcode Mockup */}
                  <div className="mt-1 h-3 flex items-center justify-between opacity-80 overflow-hidden">
                    <div className="w-full h-full flex gap-[2px]">
                      {[2, 1, 3, 1, 2, 4, 1, 3, 2, 2, 1, 3, 2, 1, 4, 1, 2].map((w, i) => (
                        <span key={i} style={{ width: `${w}px` }} className="h-full bg-slate-900 inline-block"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Window inside Slab with Zoom Interaction */}
                <div 
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                  className="relative bg-slate-950 rounded-lg overflow-hidden border border-slate-300/80 aspect-[2.5/3.5] group cursor-zoom-in"
                >
                  <img
                    src={currentDisplayImage}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    style={
                      isZoomed
                        ? {
                            transform: 'scale(1.8)',
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          }
                        : undefined
                    }
                    className="w-full h-full object-cover transition-transform duration-200"
                  />

                  {/* Holographic Foil Sheen Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-pink-500/15 to-amber-400/25 pointer-events-none mix-blend-color-dodge"></div>

                  {/* Serial badge on card */}
                  {card.serialNumber && (
                    <div className="absolute bottom-2.5 left-2.5 bg-black/75 px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 backdrop-blur-xs border border-amber-400/30">
                      SERIAL {card.serialNumber}
                    </div>
                  )}

                  {/* Magnifier Badge Icon */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/80 p-1.5 rounded-full text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Emboss */}
                <div className="flex justify-center items-center py-1 mt-1 text-slate-400 font-extrabold text-[10px] tracking-widest uppercase opacity-70">
                  {card.isGraded ? 'PSA AUTHENTIC SLAB' : 'CARD CIRCLE VERIFIED VAULT'}
                </div>
              </div>

              {/* Bottom Stage Hint */}
              <div className="absolute bottom-4 flex items-center gap-2 text-xs text-slate-400">
                <ZoomIn className="w-4 h-4 text-slate-400" />
                마우스를 올리면 고해상도 코너 컷 및 홀로그램을 확대해 볼 수 있습니다.
              </div>
            </div>

            {/* Thumbnails Selector Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbIndex(idx)}
                  className={`relative shrink-0 w-20 h-24 rounded-lg overflow-hidden transition-all cursor-pointer ${
                    activeThumbIndex === idx
                      ? 'border-2 border-blue-600 ring-2 ring-blue-100 shadow-sm'
                      : 'border border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb.url}
                    alt={thumb.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover bg-slate-900"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-900/85 text-[10px] text-white text-center py-0.5">
                    {thumb.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ================= RIGHT COLUMN: Listing Specs, Seller Trust, Actions (~52% width) ================= */}
          <section className="lg:col-span-6 flex flex-col gap-6">
            {/* Title & Header Info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ● {card.status === 'available' ? '판매중' : card.status === 'reserved' ? '예약중' : '거래완료'}
                  </span>
                  {card.parallel && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {card.parallel}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-normal">{card.createdAt}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                {card.title}
              </h1>

              {/* Price Display Block */}
              <div className="mt-4 pb-4 border-b border-slate-200 flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  {card.tradeType === 'trade' ? (
                    <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                      교환 희망
                    </span>
                  ) : card.tradeType === 'giveaway' ? (
                    <span className="text-3xl sm:text-4xl font-black text-purple-600 tracking-tight">
                      ₩0 (무료 나눔)
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                        ₩{card.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        제안 환영
                      </span>
                    </>
                  )}
                </div>

                {card.marketPriceRange && (
                  <div className="text-xs text-slate-500 text-right">
                    최근 동일 등급 시세: <span className="font-bold text-slate-700">{card.marketPriceRange}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Action Buttons (CTA Area) */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Primary CTA Button */}
              <button
                onClick={() => onStartInquiry(card)}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>1:1 거래 문의하기</span>
              </button>

              {/* Secondary Like Button */}
              <button
                onClick={(e) => onToggleLike(card.id, e)}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white font-semibold text-sm flex items-center justify-center gap-2 transition hover:bg-slate-50 cursor-pointer ${
                  card.isLiked ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                <Heart className={`w-5 h-5 text-rose-500 ${card.isLiked ? 'fill-rose-500' : ''}`} />
                <span>관심 매물 <strong className="font-bold text-slate-900 ml-1">{card.likes}</strong></span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="공유하기"
                className="p-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-600 hover:text-slate-900 transition flex items-center justify-center hover:bg-slate-50 cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Trade Terms Card */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">직거래 방식:</span>{' '}
                  {card.meetupLocation || '서울 강동구 / 송파구 인근 협의 (잠실새내역)'}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">택배 거래:</span>{' '}
                  {card.deliveryNote || '우체국 안심택배 가능 (+₩3,500 에어캡 3중 보강 및 슬리브 완충)'}
                </div>
              </div>
            </div>

            {/* Card Detailed Specs Grid (2x3 polished cards) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  카드 상세 스펙
                </h2>
                <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  검증 데이터 일치
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. 종목 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="block text-xs font-medium text-slate-400">종목</span>
                  <span className="block mt-1 text-sm font-bold text-slate-800">
                    {card.categoryEmoji} {card.categoryName} ({card.category.toUpperCase()})
                  </span>
                </div>

                {/* 2. 선수 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="block text-xs font-medium text-slate-400">선수</span>
                  <span className="block mt-1 text-sm font-bold text-slate-800 truncate">
                    {card.player}
                  </span>
                </div>

                {/* 3. 제조사 / 세트 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="block text-xs font-medium text-slate-400">제조사 / 세트</span>
                  <span className="block mt-1 text-sm font-bold text-slate-800 truncate">
                    {card.setName || card.manufacturer}
                  </span>
                </div>

                {/* 4. 카드번호 / 시리얼 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="block text-xs font-medium text-slate-400">카드번호 / 시리얼</span>
                  <span className="block mt-1 text-sm font-bold text-slate-800">
                    {card.cardNumber || '#001'} {card.serialNumber ? `· ${card.serialNumber}` : ''}
                  </span>
                </div>

                {/* 5. 등급 평가 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="block text-xs font-medium text-slate-400">등급 평가</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-red-600">
                      {card.isGraded ? `${card.gradingCompany} ${card.gradeScore || '10'} Gem Mint` : 'RAW (미감정)'}
                    </span>
                  </div>
                  {card.certNumber && (
                    <div className="mt-0.5 text-xs text-slate-500 flex items-center gap-1">
                      {card.certNumber}
                      <a
                        href="https://www.psacard.com/cert"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-0.5 text-[11px]"
                      >
                        [조회 <ExternalLink className="w-2.5 h-2.5 inline" />]
                      </a>
                    </div>
                  )}
                </div>

                {/* 6. 카드 보존 상태 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="block text-xs font-medium text-slate-400">카드 보존 상태</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">{card.conditionLabel}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                      MINT NM+
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Defect / Condition Detailed Note */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2.5">등록자 상태 및 하자 상세 설명</h3>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {card.conditionDescription}
              </div>
            </div>

            {/* Seller Trust Profile Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-base font-bold border-2 border-slate-100">
                      {card.seller.nickname.slice(0, 1)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {card.seller.nickname}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-medium border border-blue-200">
                        인증완료
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {card.seller.joinedDate} · 활동지역 {card.seller.region}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onViewSellerProfile(card.seller.id)}
                  className="text-xs font-semibold px-3 py-1.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                >
                  판매자 프로필 보기
                </button>
              </div>

              {/* Seller Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div>
                  <span className="block text-[11px] text-slate-400">거래 완료</span>
                  <span className="block text-sm font-bold text-slate-800 mt-0.5">
                    {card.seller.completedTrades}회
                  </span>
                </div>
                <div className="border-x border-slate-100">
                  <span className="block text-[11px] text-slate-400">등록 매물</span>
                  <span className="block text-sm font-bold text-slate-800 mt-0.5">
                    {card.seller.activeListings}개
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400">거래 신뢰도</span>
                  <span className="block text-sm font-bold text-emerald-600 mt-0.5">
                    {card.seller.trustScore}% 만족
                  </span>
                </div>
              </div>
            </div>

            {/* Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                가격과 상태는 등록자가 직접 입력했습니다.{' '}
                <strong className="font-bold">Card Circle</strong>은 당사자 간의 신뢰 거래를 지원하며 결제 대금을 보관하지 않습니다. 직거래 시 고가 매물의 진품 여부와 상태를 꼼꼼히 확인해 주세요.
              </p>
            </div>
          </section>
        </div>

        {/* Related Listings Section */}
        <section className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">이 선수의 다른 매물 &amp; 인기 PSA 10 추천</h2>
              <p className="text-xs text-slate-500 mt-0.5">{card.player} 선수의 최근 인기 등록 카드입니다.</p>
            </div>
            <button onClick={onBack} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
              전체보기 →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {relatedCards.slice(0, 4).map((relCard) => (
              <article
                key={relCard.id}
                onClick={() => onSelectCard(relCard)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition group cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-slate-900 p-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={relCard.frontImage || card.frontImage}
                    alt={relCard.title}
                    referrerPolicy="no-referrer"
                    className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-300 border border-amber-400/40">
                    {relCard.gradingCompany} {relCard.gradeScore || '10'}
                  </span>
                </div>

                <div className="p-3.5">
                  <span className="text-[11px] font-medium text-slate-400 block truncate">
                    {relCard.setName}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5 group-hover:text-blue-600">
                    {relCard.title}
                  </h3>
                  <p className="mt-2 text-base font-extrabold text-slate-950">
                    ₩{relCard.price.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {relCard.meetupLocation || '직거래 / 택배'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
