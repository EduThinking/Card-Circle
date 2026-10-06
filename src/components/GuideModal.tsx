import React from 'react';
import { X, ShieldCheck, TrendingUp, Award, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

interface GuideModalProps {
  topic: string | null;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto custom-scroll">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {topic === 'guide' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-lg font-black text-slate-900">Card Circle 안심 거래 &amp; 이용 가이드</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Card Circle은 지인 및 신뢰 수집가 간의 실물 트레이딩 카드 매물 공유 플랫폼입니다.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-3 bg-blue-50/70 rounded-xl space-y-1">
                <strong className="text-blue-900 block font-bold">1. 실물 카드 직접 확인</strong>
                <p>등록된 모든 사진은 원소유자가 직접 촬영한 것입니다. 고가 슬랩 거래 시 라벨 홀로그램과 시리얼 일치 여부를 대조하세요.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <strong className="text-slate-900 block font-bold">2. 공공장소 직거래 권장</strong>
                <p>지하철 역사 고객안내센터 앞이나 CCTV가 완비된 대형 카페 등 밝고 안전한 공공장소에서의 직거래를 적극 권장합니다.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <strong className="text-slate-900 block font-bold">3. 대금 직거래 및 합의</strong>
                <p>앱은 임의로 결제 대금을 보관하지 않으며, 약속 장소에서 실물 확인 후 당사자 간 계좌이체 또는 합의된 방식으로 정산합니다.</p>
              </div>
            </div>
          </div>
        )}

        {topic === 'tracker' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-black text-slate-900">실시간 슬랩 시세 트래커</h3>
            </div>
            <p className="text-xs text-slate-600">최근 주요 슬랩 실거래가 및 수집가 합의 시세 밴드입니다.</p>
            <div className="space-y-2 text-xs">
              <div className="p-3 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">2023 Topps Chrome 오타니 Refractor (PSA 10)</span>
                  <span className="text-[11px] text-slate-400">최근 3개월 실거래 14건</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-blue-600 block text-sm">₩430,000 ~ ₩480,000</span>
                  <span className="text-[10px] text-emerald-600">▲ 전월 대비 +4.2%</span>
                </div>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">2024 포켓몬 30th 피카츄 SAR 특일 (Raw)</span>
                  <span className="text-[11px] text-slate-400">최근 3개월 실거래 28건</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-blue-600 block text-sm">₩175,000 ~ ₩190,000</span>
                  <span className="text-[10px] text-slate-500">안정세 유지</span>
                </div>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">포켓몬 151 리자몽 ex SAR 한글판 (PSA 10)</span>
                  <span className="text-[11px] text-slate-400">최근 3개월 실거래 9건</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-blue-600 block text-sm">₩230,000 ~ ₩260,000</span>
                  <span className="text-[10px] text-emerald-600">▲ 전월 대비 +8.0%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {topic === 'grading_table' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <Award className="w-6 h-6" />
              <h3 className="text-lg font-black text-slate-900">PSA / BGS / CGC 등급 비교표</h3>
            </div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2 rounded-l">등급 설명</th>
                  <th className="p-2 text-red-600 font-bold">PSA</th>
                  <th className="p-2 text-amber-600 font-bold">BGS (Beckett)</th>
                  <th className="p-2 text-sky-600 font-bold rounded-r">CGC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-2 font-medium">최고 등급 (완벽)</td>
                  <td className="p-2 font-bold text-red-600">GEM MT 10</td>
                  <td className="p-2 font-bold text-amber-600">PRISTINE 10 (Black)</td>
                  <td className="p-2 font-bold text-sky-600">PRISTINE 10</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">우수 등급</td>
                  <td className="p-2 font-bold text-red-600">GEM MT 10</td>
                  <td className="p-2 font-bold text-amber-600">GEM 9.5 (Gold)</td>
                  <td className="p-2 font-bold text-sky-600">GEM MINT 10</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">민트 상태</td>
                  <td className="p-2">MINT 9</td>
                  <td className="p-2">MINT 9</td>
                  <td className="p-2">MINT 9</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">새것에 준함</td>
                  <td className="p-2">NM-MT 8</td>
                  <td className="p-2">NM-MT 8.5</td>
                  <td className="p-2">NM-MT 8.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {topic === 'fake_guide' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-black">가품 판별 가이드북</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>초음파 용접선 확인:</strong> 정품 PSA/BGS 슬랩 케이스는 모서리에 특유의 미세 초음파 밀봉선이 균일하게 형성되어 있습니다.</span>
              </li>
              <li className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>빛반사 홀로그램:</strong> PSA 최신 슬랩 라벨 하단의 은색/금색 로고는 각도에 따라 입체 패턴이 반사됩니다.</span>
              </li>
              <li className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>공홈 시리얼 대조:</strong> 슬랩에 적힌 8자리 시리얼 번호는 해당 감정사 공식 웹사이트에서 즉시 실물 사진과 대조 가능합니다.</span>
              </li>
            </ul>
          </div>
        )}

        {topic === 'report' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-black text-slate-900">비매너 및 허위 매물 신고</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              타인 사진 도용, 가품 유통 의심, 노쇼(약속 미준수), 욕설 등 비매너 행위는 운영팀의 감사 로그 확인 후 즉시 이용 정지 조치됩니다.
            </p>
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">신고 대상 및 사유 입력</label>
              <textarea
                rows={3}
                placeholder="구체적인 사유 및 정황을 적어주세요..."
                className="w-full p-2.5 border border-slate-300 rounded-xl outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
            >
              신고 제출하기
            </button>
          </div>
        )}

        {(topic === 'support' || topic === 'terms' || topic === 'privacy' || topic === 'giveaway' || topic === 'supplies') && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {topic === 'support'
                ? '고객센터 & 1:1 지원 안내'
                : topic === 'terms'
                ? 'Card Circle 이용약관'
                : topic === 'privacy'
                ? '개인정보처리방침'
                : topic === 'giveaway'
                ? '무료 나눔 피드 운영 원칙'
                : '슬랩 보관 케이스 & 컬렉팅 용품 안내'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              운영시간: 평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />
              고객지원 이메일: support@cardcircle.kr<br />
              Card Circle은 회원 여러분의 소중한 컬렉션을 안전하고 즐겁게 나눌 수 있도록 최선을 다하고 있습니다.
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
