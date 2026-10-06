import React from 'react';
import { ShieldCheck, Layers } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onOpenGuide: (topic: string) => void;
  onSelectCategory: (category: Category) => void;
  onFilterGradedSpecial: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onSelectCategory,
  onFilterGradedSpecial,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 select-none">
      {/* Safe Trading Notice Disclaimer */}
      <div className="border-b border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <p>
              <strong>안전거래 고지:</strong> 등록된 카드의 가격과 보존 상태는 등록자가 직접 기재한 정보입니다. Card Circle은 신뢰 수집가 간의 직거래 매칭을 지원하며 일체의 대금을 임의 보관하지 않습니다.
            </p>
          </div>
          <button
            onClick={() => onOpenGuide('guide')}
            className="text-blue-600 font-bold hover:underline shrink-0 cursor-pointer"
          >
            안전거래 가이드 &gt;
          </button>
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8 text-xs">
          <div className="space-y-3 col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm">Card Circle</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              국내 최초 스포츠 및 TCG 수집가들을 위한 슬랩 검증 매물 거래 &amp; 콜렉팅 데이터 플랫폼. 안전한 거래 문화를 함께 만들어갑니다.
            </p>
            <div className="text-[11px] text-slate-400">
              운영사: (주)넥스트플랫폼 | 대표이사: 홍길동 | 사업자등록번호: 123-45-67890
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">카테고리 탐색</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button onClick={() => onSelectCategory('baseball')} className="hover:text-blue-600 cursor-pointer">
                  MLB/KBO 야구 카드
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('basketball')} className="hover:text-blue-600 cursor-pointer">
                  NBA 농구 카드
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pokemon')} className="hover:text-blue-600 cursor-pointer">
                  포켓몬 정규/SAR 시리즈
                </button>
              </li>
              <li>
                <button onClick={onFilterGradedSpecial} className="hover:text-blue-600 cursor-pointer">
                  PSA 10 슬랩 모음전
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('giveaway')} className="hover:text-blue-600 cursor-pointer">
                  무료 나눔 피드
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">수집가 도구</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button onClick={() => onOpenGuide('tracker')} className="hover:text-blue-600 cursor-pointer">
                  실시간 슬랩 시세 트래커
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('grading_table')} className="hover:text-blue-600 cursor-pointer">
                  PSA/BGS 등급 비교표
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('fake_guide')} className="hover:text-blue-600 cursor-pointer">
                  가품 판별 가이드북
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('supplies')} className="hover:text-blue-600 cursor-pointer">
                  슬랩 보관 케이스 용품점
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">고객센터</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button onClick={() => onOpenGuide('support')} className="hover:text-blue-600 cursor-pointer">
                  1:1 문의하기 (09:00 ~ 18:00)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('report')} className="hover:text-blue-600 cursor-pointer">
                  비매너 이용자 신고
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('terms')} className="hover:text-blue-600 cursor-pointer">
                  이용약관
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGuide('privacy')} className="font-bold text-slate-700 hover:text-blue-600 cursor-pointer">
                  개인정보처리방침
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2024 NextPlatform Inc. &amp; Card Circle. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>한국어 (KR)</span>
            <span>KRW (₩)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
