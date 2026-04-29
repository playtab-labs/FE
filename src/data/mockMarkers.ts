export type MarkerType = "main" | "sub" | "facility";

export interface MarkerData {
  id: string;
  label: string;
  type: MarkerType;
  /** 원본 지도 이미지 기준 비율 (0~1) */
  fx: number;
  fy: number;
  image: ReturnType<typeof require>;
  /** true이면 day1(5/13)에만 표시 */
  day1Only?: boolean;
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
  {
    // DJ 부스 (완)
    id: "m1",
    label: "DJ Booth",
    type: "main",
    fx: 0.54,
    fy: 0.565,
    image: require("@/assets/map_main_djbooth.png"),
  },
  // {
  //   id: "m2",
  //   label: "아티스트 무대",
  //   type: "main",
  //   fx: 0.72,
  //   fy: 0.52,
  //   image: require("@/assets/map_main_djbooth.png"),
  // },
  {
    // 주점 (완)
    id: "m3",
    label: "주점",
    type: "main",
    fx: 0.59,
    fy: 0.565,
    image: require("@/assets/map_main_pub.png"),
  },
  {
    // 플리마켓 (완) -> day 1에만 보이게
    id: "m4",
    label: "플리마켓",
    type: "sub",
    fx: 0.8,
    fy: 0.56,
    image: require("@/assets/map_sub_market.png"),
    day1Only: true,
  },
  {
    // 돗자리 배부 (완)
    id: "m5",
    label: "돗자리 배부",
    type: "sub",
    fx: 0.48,
    fy: 0.51,
    image: require("@/assets/map_sub_mat.png"),
  },
  {
    // 위치 아직 안나옴
    id: "m6",
    label: "📷",
    type: "facility",
    fx: 0.3,
    fy: 0.3,
    image: require("@/assets/map_sub_photo.png"),
  },
  {
    // 입학처 흡구 (완)
    id: "m7",
    label: "🚬",
    type: "facility",
    fx: 0.214,
    fy: 0.621,
    image: require("@/assets/map_sub_smoking.png"),
  },
  {
    // 마태오관 흡구 (완)
    id: "m8",
    label: "🚬",
    type: "facility",
    fx: 0.235,
    fy: 0.355,
    image: require("@/assets/map_sub_smoking.png"),
  },
  {
    // GA 관 흡구 (완)
    id: "m9",
    label: "🚬",
    type: "facility",
    fx: 0.16,
    fy: 0.445,
    image: require("@/assets/map_sub_smoking.png"),
  },
  {
    // X관 흡구 (완)
    id: "m10",
    label: "🚬",
    type: "facility",
    fx: 0.845,
    fy: 0.451,
    image: require("@/assets/map_sub_smoking.png"),
  },
  {
    // 하이트 진로
    id: "m11",
    label: "🎈",
    type: "facility",
    fx: 0.495,
    fy: 0.575,
    image: require("@/assets/map_sub_popup.png"),
  },
  // {
  //   // 레드불
  //   id: "m12",
  //   label: "🎈",
  //   type: "facility",
  //   fx: 0.54,
  //   fy: 0.565,
  //   image: require("@/assets/map_sub_popup.png"),
  // },
];
