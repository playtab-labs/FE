export type MarkerType = "main" | "sub" | "facility";

export interface MarkerData {
  id: string;
  label: string;
  type: MarkerType;
  /** 원본 지도 이미지 기준 비율 (0~1) */
  fx: number;
  fy: number;
}

export interface BoothItem {
  id: string;
  name: string;
  description: string;
}

export const MOCK_BOOTH_ITEMS: Record<string, BoothItem[]> = {
  m5: [
    { id: "b1", name: "감성타코", description: "저희 타코 맛있어요" },
    { id: "b2", name: "행복붕어빵", description: "다양한 이색 붕어빵" },
    { id: "b3", name: "노브랜드 버거", description: "햄버거" },
    { id: "b4", name: "스트릿피자", description: "1인피자" },
    { id: "b5", name: "마츠리", description: "아끼소바, 타코야끼" },
    { id: "b6", name: "공차", description: "버블티" },
    { id: "b7", name: "투썸플레이스", description: "커피, 케이크" },
  ],
  m4: [{ id: "b8", name: "공식 MD", description: "플레이탭 공식 굿즈" }],
  m6: [
    { id: "b9", name: "빈티지 마켓", description: "의류, 소품" },
    { id: "b10", name: "핸드메이드 공방", description: "직접 만든 수공예품" },
  ],
};

export const MOCK_MARKERS: MarkerData[] = [
  { id: "m1", label: "버스킹 무대", type: "main", fx: 0.42, fy: 0.38 },
  { id: "m2", label: "아티스트 무대", type: "main", fx: 0.72, fy: 0.52 },
  { id: "m3", label: "주점", type: "sub", fx: 0.2, fy: 0.58 },
  { id: "m4", label: "MD", type: "sub", fx: 0.28, fy: 0.35 },
  { id: "m5", label: "푸드", type: "sub", fx: 0.58, fy: 0.62 },
  { id: "m6", label: "📷", type: "facility", fx: 0.5, fy: 0.5 },
  { id: "m7", label: "🚬", type: "facility", fx: 0.46, fy: 0.48 },
];
