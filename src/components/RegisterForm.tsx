import React, { useState } from 'react';
import { 
  Camera, 
  Plus, 
  X, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  ArrowRight,
  HelpCircle,
  Bolt,
  Trophy,
  Activity,
  Layers
} from 'lucide-react';
import { CardItem, Category } from '../types';

interface RegisterFormProps {
  onSubmitCard: (newCard: CardItem) => void;
  onCancel: () => void;
  onOpenGuide: (topic: string) => void;
  onShowToast: (message: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmitCard,
  onCancel,
  onOpenGuide,
  onShowToast,
}) => {
  // Form State
  const [category, setCategory] = useState<Category>('pokemon');
  const [title, setTitle] = useState('2024 포켓몬 30주년 피카츄 SAR 특일');
  const [player, setPlayer] = useState('피카츄 (Pikachu)');
  const [setName, setSetName] = useState('Pokémon / 30th Celebration');
  const [year, setYear] = useState('2024');
  const [cardNumber, setCardNumber] = useState('#025/028');

  // Grading
  const [isGraded, setIsGraded] = useState(true);
  const [gradingCompany, setGradingCompany] = useState<'PSA' | 'BGS' | 'CGC' | 'SGC' | 'BRG' | 'RAW'>('PSA');
  const [gradeScore, setGradeScore] = useState('Gem Mint 10');
  const [condition, setCondition] = useState<'NM' | 'LP' | 'MP' | 'Damaged'>('NM');
  const [conditionDesc, setConditionDesc] = useState(
    '개봉 직후 마그네틱 홀더에 보관하여 상태 매우 우수합니다. 코너 백화 현상이나 센터링 문제 없습니다. 슬랩 케이스 스크래치 방지 보호필름 장착 상태입니다.'
  );

  // Trade Conditions
  const [tradeType, setTradeType] = useState<'sale' | 'trade' | 'giveaway'>('sale');
  const [price, setPrice] = useState('180,000');
  const [tradeWishCondition, setTradeWishCondition] = useState('');
  const [meetupAvailable, setMeetupAvailable] = useState(true);
  const [meetupLocation, setMeetupLocation] = useState('서울 강남구 역삼동 / 테헤란로 일대 또는 2호선 역삼역 개찰구');
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(3500);

  // Photos
  const [photos, setPhotos] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3AiHiR_6ANRFWLkP2fnutulzAgPevKYS--NIefurOCEApFX-XdSQKQ2y0-ThQbkS_YKUAkiavg-qWvT9iOdV3kzZI7w-bMwUz6xSaYtY39byk91CWMj-_eKYffsHYuASrhHF2sgQ45jd8qOY7FpGD8uYRCQaKVh0AhuISm04VqrhbpCtf8MJtZpQV_jzkfA55sknbGxNrIzvsVX6aIPqhoeHZybCXp0zMd0zzoVGYPrpqB2kD-AHS',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD6xRg9lLZgsVHgiyVuZxn8Mi1_CAYxlBcC0PPTaQM0U4GiptlfhhbE2Vxa0Mz8K-5uHT6T7GhC6asB3GI0iUckgCzpx3ChUEPRK92DVdLzIkYDoGNP2ox2jfZTsokXmebwmFRDokNZYMMTTojL8KO4DphpnOOVjytOCGl6zj66fzGONWN4c0EfWas14q_fGmi2FA6XbezuwxnBCwD_pms9KaZ-kDve6__nIDq9Q_h2FUNzw-lwTzUB',
  ]);

  const [agreed, setAgreed] = useState(true);

  // Add dummy or user photo
  const handleAddPhotoSlot = (index: number) => {
    const demoPhotos = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ0W25goFVruMDrwGYcP0mYYcmfPaeCLmGKtR6MyhQkOeglPAmmL1DJHEiKNUyde4DGZ_na_DYyG_tDladhnUmapTDru_Yia1g9vEq7a-UucbNxSyf8L174KVaPLfjZk1n-s9tiIYUVt7wD3CdEwiRnWbJX_92KMOXYabRZIE3uofRpZ0T9LvK-zdl8oYkyTVihxY2P2MKNo4iFNfZxM7Jb9QhISMkNmuPSfw9Pnw6r9qzXC6_5kGB',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCO2JJBZ1Z1_jrZGkOJAByBtbR2mpgVfudAa8nmRbv4R4m5rYjX3RC7FdGn5GDVfyFizyC_ve32y1dWG7bMYiqbxCxK8hzwlbaxbZLwm-PRyn6n1decnwrT5b2xRH4ENaNiYhVRl5iaBcRud-X1No-fN_tDW9AQ-p-xD1IZO_nYiNeyjDdYSwu3QFUBg4Q12u5qHht9ngLIx9r3uwybWclss9DfYceYJYeChbThm51FoJUb4a4TUMci',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKpzCHHgvkHSllze_jNCH2Zw77W0G-CKpXppzwSeoB2H6316Sm786BPOenJ05VdVFdYu7NftSdDxSdzcnobBjNkoBwPAVhrZoAAJODMHfjomfXQHpUMhrhP36w1GH2JZlzy149N4knGqacjgyGe0b967OIlZ2Gr5XJ-nDc6oz_4surAtjTFQE-NLGQLOlKlNucptdoyp_TwH5_hUgffVkmlCNw7ODY_UokujkAEuBW66XrXlf-GQqp',
    ];
    const newPic = demoPhotos[index % demoPhotos.length];
    setPhotos([...photos, newPic]);
    onShowToast('상세 사진이 추가되었습니다.');
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleReset = () => {
    setTitle('');
    setPlayer('');
    setSetName('');
    setPrice('');
    setConditionDesc('');
    onShowToast('입력 내용이 초기화되었습니다.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !player.trim()) {
      onShowToast('제목과 선수/캐릭터명을 입력해주세요.');
      return;
    }
    if (photos.length < 2) {
      onShowToast('실물 카드 사진을 앞면/뒷면 최소 2장 등록해주세요.');
      return;
    }
    if (!agreed) {
      onShowToast('정품 실물 소장 확인에 동의해주세요.');
      return;
    }

    const numericPrice = Number(price.replace(/[^0-9]/g, '')) || 0;

    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      title,
      category,
      categoryName: category === 'pokemon' ? 'TCG' : category === 'baseball' ? '야구' : category === 'basketball' ? '농구' : category === 'soccer' ? '축구' : '기타',
      categoryEmoji: category === 'pokemon' ? '⚡' : category === 'baseball' ? '⚾' : category === 'basketball' ? '🏀' : category === 'soccer' ? '⚽' : '💎',
      player,
      manufacturer: setName,
      setName,
      year,
      cardNumber,
      isGraded,
      gradingCompany: isGraded ? gradingCompany : 'RAW',
      gradeScore: isGraded ? gradeScore.replace(/[^0-9.]/g, '') || '10' : undefined,
      certNumber: isGraded ? `#${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
      condition,
      conditionLabel: condition === 'NM' ? '새것에 가까움' : condition === 'LP' ? '양호' : condition === 'MP' ? '사용감 있음' : '손상',
      conditionDescription: conditionDesc,
      tradeType,
      price: tradeType === 'sale' ? numericPrice : 0,
      tradeWishCondition: tradeType === 'trade' ? tradeWishCondition : undefined,
      meetupAvailable,
      meetupLocation: meetupAvailable ? meetupLocation : undefined,
      deliveryAvailable,
      deliveryFee: deliveryAvailable ? deliveryFee : undefined,
      deliveryNote: deliveryAvailable ? '우체국 택배 안전 포장 발송' : undefined,
      frontImage: photos[0],
      backImage: photos[1],
      labelImage: photos[2],
      cornerImage: photos[3],
      status: 'available',
      likes: 0,
      isLiked: false,
      views: 1,
      createdAt: '방금 전',
      seller: {
        id: 'current-user',
        nickname: '슬러거콜렉터',
        verified: true,
        joinedDate: '2026.02 가입',
        region: '서울',
        completedTrades: 23,
        activeListings: 16,
        trustScore: 99.4,
        mannerScore: '최고',
      },
    };

    onSubmitCard(newCard);
  };

  const numericPrice = Number(price.replace(/[^0-9]/g, '')) || 0;

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb & Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav aria-label="현재 위치" className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <button onClick={onCancel} className="hover:text-slate-800 transition cursor-pointer">홈</button>
            <span>›</span>
            <span>마켓플레이스</span>
            <span>›</span>
            <span className="text-blue-600 font-semibold">카드 매물 등록</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                카드 매물 등록
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  작성중 자동저장됨
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                보유하신 실물 스포츠/TCG 카드의 상세 정보와 슬랩 상태를 등록해주세요.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 처음부터 다시
              </button>
              <button
                type="button"
                onClick={() => onOpenGuide('guide')}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" /> 등록 가이드라인 확인
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Form (Left) & Sticky Live Preview (Right) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: Form Inputs (8 cols) ================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* SECTION 1: 실물 카드 사진 등록 */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <h2 className="text-base font-bold text-slate-900">실물 카드 사진</h2>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    필수 2장 (현재 {photos.length}/5)
                  </span>
                </div>
                <p className="text-xs text-slate-500">최대 5장까지 고해상도 첨부 가능</p>
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                자신이 직접 소장하고 촬영한 실물 카드 사진만 등록 가능하며, 캡처본 또는 타인 사진 도용 시 제재됩니다.
              </p>

              {/* Upload Slots Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
                {/* Render uploaded photo slots */}
                {photos.map((picUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl border-2 border-blue-500 aspect-[3/4] overflow-hidden flex flex-col justify-between shadow-sm bg-slate-950"
                  >
                    <img
                      src={picUrl}
                      alt={`슬랩 사진 ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {idx === 0 ? '앞면 (필수)' : idx === 1 ? '뒷면 (필수)' : `상세 ${idx - 1}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 w-5 h-5 bg-slate-900/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] transition cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-1.5 inset-x-2 bg-emerald-600/90 text-white text-[9px] font-bold py-0.5 rounded flex items-center justify-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> 등록 완료
                    </div>
                  </div>
                ))}

                {/* Empty upload slots up to 5 */}
                {photos.length < 5 && (
                  <button
                    type="button"
                    onClick={() => handleAddPhotoSlot(photos.length)}
                    className="rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 aspect-[3/4] flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 transition p-3 text-center group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-white group-hover:bg-blue-100 flex items-center justify-center shadow-xs mb-2 transition">
                      <Camera className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                      추가 상세 {photos.length >= 2 ? photos.length - 1 : ''}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                      {photos.length === 2 ? '상단 코너·모서리' : photos.length === 3 ? '표면 광택·빛반사' : '슬랩 라벨 인증'}
                    </span>
                  </button>
                )}
              </div>
            </section>

            {/* SECTION 2: 카드 기본 속성 */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h2 className="text-base font-bold text-slate-900">카드 기본 속성</h2>
                <span className="text-xs text-slate-400 ml-1">정확한 정보를 입력할수록 매물 노출 확률이 높아집니다.</span>
              </div>

              {/* Category Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'baseball' as Category, label: '야구', icon: Trophy },
                    { id: 'basketball' as Category, label: '농구', icon: Activity },
                    { id: 'soccer' as Category, label: '축구', icon: Activity },
                    { id: 'pokemon' as Category, label: 'TCG/포켓몬', icon: Bolt },
                    { id: 'other' as Category, label: '기타 종목', icon: Layers },
                  ].map((cat) => {
                    const isSelected = category === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          isSelected
                            ? 'border-2 border-slate-900 bg-slate-900 text-white shadow-sm'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-yellow-400' : 'text-slate-400'}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Listing Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    매물 게시글 제목 <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">{title.length}/50자</span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 2024 포켓몬 30주년 피카츄 SAR 특일"
                  className="w-full text-sm font-medium px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Player / Character & Set Name (2 cols) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    선수 / 캐릭터명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => setPlayer(e.target.value)}
                    placeholder="예: 오타니 쇼헤이 / 피카츄"
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    제조사 / 세트명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                    placeholder="예: Topps Chrome / Pokémon 151"
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Year & Card Number (2 cols) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    시즌 / 발행연도
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="예: 2024"
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    카드 번호 / 시리얼넘버
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="예: #025/028 또는 45/99"
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: 상태 및 감정 (Grading) */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h2 className="text-base font-bold text-slate-900">상태 및 감정 (Grading)</h2>
              </div>

              {/* Grading Toggle (Raw vs Graded) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">감정 등급 여부</label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsGraded(false)}
                    className={`py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      !isGraded
                        ? 'text-slate-900 bg-white shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    미감정 (Raw/탑로더)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsGraded(true)}
                    className={`py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isGraded
                        ? 'text-slate-900 bg-white shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-500" /> 감정 카드 (Graded Slab)
                  </button>
                </div>
              </div>

              {/* Company & Grade Selection if isGraded */}
              {isGraded && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      감정 기관 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={gradingCompany}
                      onChange={(e) => setGradingCompany(e.target.value as any)}
                      className="w-full text-sm font-semibold px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                    >
                      <option value="PSA">PSA (Professional Sports Authenticator)</option>
                      <option value="BGS">BGS (Beckett Grading Services)</option>
                      <option value="CGC">CGC Cards</option>
                      <option value="SGC">SGC</option>
                      <option value="BRG">BRG (한국 브레이크앤컴퍼니)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      획득 등급 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={gradeScore}
                      onChange={(e) => setGradeScore(e.target.value)}
                      className="w-full text-sm font-semibold px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                    >
                      <option value="Gem Mint 10">Gem Mint 10</option>
                      <option value="Mint 9.5">Mint 9.5 (BGS Gold)</option>
                      <option value="Mint 9">Mint 9</option>
                      <option value="NM-MT 8">NM-MT 8</option>
                      <option value="Near Mint 7">Near Mint 7</option>
                      <option value="Authentic">Authentic (정품 인증)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Physical Condition Summary (4-step selector) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">실물 카드 상태 요약</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'NM' as const, label: '새것에 가까움', sub: 'Near Mint (NM)' },
                    { id: 'LP' as const, label: '양호', sub: 'Lightly Played (LP)' },
                    { id: 'MP' as const, label: '사용감 있음', sub: 'Moderately Played' },
                    { id: 'Damaged' as const, label: '손상', sub: 'Damaged / Creased' },
                  ].map((item) => {
                    const isSelected = condition === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setCondition(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition ${
                          isSelected
                            ? 'border-2 border-emerald-500 bg-emerald-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                            {item.label}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 mt-1">{item.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Condition Details Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">상태 및 하자 상세 설명</label>
                  <span className="text-[11px] text-slate-400">{conditionDesc.length} / 500자</span>
                </div>
                <textarea
                  rows={3}
                  value={conditionDesc}
                  onChange={(e) => setConditionDesc(e.target.value)}
                  placeholder="미세한 스크래치, 코너 백화, 센터링 상태 등 특이사항을 솔직하게 적어주시면 빠른 거래에 도움이 됩니다."
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </section>

            {/* SECTION 4: 거래 조건 설정 */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h2 className="text-base font-bold text-slate-900">거래 조건 설정</h2>
              </div>

              {/* Transaction Type Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  거래 유형 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'sale' as const, label: '판매', sub: '₩' },
                    { id: 'trade' as const, label: '교환 희망', sub: '🔄' },
                    { id: 'giveaway' as const, label: '무료 나눔', sub: '🎁' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTradeType(t.id)}
                      className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        tradeType === t.id
                          ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{t.sub}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Input or Trade wish */}
              {tradeType === 'sale' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    희망 판매 가격 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-base">
                      ₩
                    </span>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setPrice(val ? Number(val).toLocaleString() : '');
                      }}
                      className="w-full pl-8 pr-12 py-3 text-lg font-black text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-400 font-semibold">
                      원
                    </span>
                  </div>

                  {/* Market Quote Guide */}
                  <div className="mt-2 flex items-center justify-between text-xs bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-100">
                    <div className="text-slate-600 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>최근 3개월 동일/유사 등급 실거래가:</span>
                      <strong className="text-slate-900">₩ 175,000 ~ 190,000</strong>
                    </div>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 적정 가격 범위
                    </span>
                  </div>
                </div>
              ) : tradeType === 'trade' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    교환 희망 조건 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tradeWishCondition}
                    onChange={(e) => setTradeWishCondition(e.target.value)}
                    placeholder="예: 2024 MLB 동급 루키 카드 또는 포켓몬 리자몽 맞교환 희망"
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              ) : (
                <div className="p-3 bg-purple-50 rounded-xl text-purple-700 text-xs font-semibold">
                  무료 나눔 매물로 등록됩니다. 입문자를 위한 따뜻한 나눔에 감사드립니다!
                </div>
              )}

              {/* Trade Delivery Methods */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-700">거래 방식 선택 (복수 선택 가능)</label>

                {/* Direct In-person */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-blue-200 bg-blue-50/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meetupAvailable}
                    onChange={(e) => setMeetupAvailable(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">직거래 가능</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        선호 거래
                      </span>
                    </div>
                    <input
                      type="text"
                      value={meetupLocation}
                      onChange={(e) => setMeetupLocation(e.target.value)}
                      placeholder="희망 직거래 지역 (예: 서울 강남역 4번출구)"
                      className="mt-1.5 w-full text-xs text-slate-700 border border-slate-200 rounded-lg p-1.5 bg-white"
                    />
                  </div>
                </label>

                {/* Parcel Courier */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">택배 거래 가능</span>
                      <span className="text-xs font-semibold text-slate-700">
                        배송비: <strong>₩ {deliveryFee.toLocaleString()}</strong>
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      안전 완충재(에어캡 3중 랩핑) 및 슬랩 전용 탑로더/박스 포장 후 우체국 익일 특급 발송
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* SECTION 5: 확인 및 제출 */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  본인이 직접 실물로 소장하고 있는 <strong className="text-slate-900">정품 실물 카드</strong>임을 확인하며, 가품 유통이나 허위 스펙 기재 시 거래 파기 및 영구 서비스 이용 제재를 받을 수 있음에 동의합니다.
                </span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold transition cursor-pointer"
                >
                  등록 취소
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>카드 매물 등록하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          </div>

          {/* ================= RIGHT COLUMN: Live Sticky Preview (4 cols) ================= */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Live Feed Preview Box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    실시간 피드 미리보기
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400">구매자에게 보이는 형태</span>
              </div>

              {/* Simulated Card Matching Explore Feed Design */}
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs group">
                <div className="relative bg-slate-900 aspect-[4/5] p-3 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {tradeType === 'sale' ? '판매' : tradeType === 'trade' ? '교환' : '나눔'}
                    </span>
                    <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs tracking-wider">
                      {isGraded ? `${gradingCompany} ${gradeScore.replace(/[^0-9.]/g, '') || '10'}` : 'RAW'}
                    </span>
                  </div>

                  {/* Slab Mock Preview */}
                  <div className="mx-auto w-4/5 h-44 bg-gradient-to-b from-amber-200 via-amber-300 to-yellow-400 rounded-lg border-4 border-slate-700/80 p-2 shadow-2xl flex flex-col justify-between relative transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-slate-50 rounded px-1.5 py-0.5 text-[8px] font-mono text-slate-900 flex justify-between items-center shadow-xs">
                      <span className="truncate max-w-[100px]">{setName || 'POKÉMON'}</span>
                      <span className="font-bold text-red-600">{gradeScore}</span>
                    </div>

                    <div className="text-center py-2">
                      <Bolt className="w-8 h-8 mx-auto text-amber-500 drop-shadow-md" />
                      <div className="text-[10px] font-black text-amber-900 mt-1 truncate">
                        {player || '선수 / 캐릭터'}
                      </div>
                      <div className="text-[8px] text-amber-800 font-medium truncate">
                        {setName || 'Edition'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[7px] text-slate-700 font-mono">
                      <span>★ SPECIAL ART</span>
                      <span>{cardNumber || '#001'}</span>
                    </div>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="flex items-center justify-between text-slate-300 text-[10px] z-10 pt-1">
                    <span className="flex items-center gap-1 font-mono text-[9px]">
                      <Camera className="w-3 h-3" /> {photos.length}장의 사진
                    </span>
                    <span className="bg-slate-900/70 text-slate-300 px-1.5 py-0.5 rounded text-[9px]">
                      {isGraded ? '인증 슬랩' : '탑로더 보호'}
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                      <Bolt className="w-2.5 h-2.5" /> {category === 'pokemon' ? 'TCG' : '스포츠'}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {condition === 'NM' ? '새것에 가까움' : '양호'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {title || '등록할 카드 제목'}
                  </h4>

                  <div className="text-base font-extrabold text-slate-900">
                    {tradeType === 'sale'
                      ? `₩ ${numericPrice.toLocaleString()}`
                      : tradeType === 'trade'
                      ? '교환 희망'
                      : '₩ 0 (나눔)'}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 truncate max-w-[170px]">
                      <MapPin className="w-3 h-3 text-slate-300" />
                      {meetupAvailable ? '직거래 가능' : '택배거래'}
                    </span>
                    <span>관심 0</span>
                  </div>
                </div>
              </div>

              {/* Information Hint */}
              <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 leading-relaxed border border-slate-100">
                <strong className="text-slate-700 block mb-0.5">💡 등록 후 어떻게 진행되나요?</strong>
                등록 즉시 마켓 피드에 공개되며, 구매 희망자의 안전 결제 또는 1:1 직거래 채팅 요청을 받으실 수 있습니다.
              </div>
            </div>

            {/* Help & Safety Tips Box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                안전 거래 &amp; 빠른 판매 팁
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>슬랩 라벨 선명도:</strong> 그레이딩 고유 번호와 QR코드가 잘 보이게 접사 사진을 올려주세요.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>빛반사 최소화:</strong> 자연광이나 간접 조명 아래에서 찍으면 카드 본연의 컬러와 홀로그램이 돋보입니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span><strong>안심 정산:</strong> 직거래 시 Card Circle QR 안심 확인 기능을 사용하시면 현금 사기를 예방할 수 있습니다.</span>
                </li>
              </ul>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
};
