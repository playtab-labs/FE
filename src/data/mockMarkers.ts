export type MarkerType = "stage" | "facility" | "food" | "md";

export interface MarkerData {
  id: string;
  label: string;
  type: MarkerType;
  /** 원본 지도 이미지 기준 비율 (0~1) */
  fx: number;
  fy: number;
}

export const MOCK_MARKERS: MarkerData[] = [
  { id: "m1", label: "버스킹 무대", type: "stage", fx: 0.42, fy: 0.38 },
  { id: "m2", label: "아티스트 무대", type: "stage", fx: 0.72, fy: 0.52 },
  { id: "m3", label: "주점", type: "stage", fx: 0.2, fy: 0.58 },
  { id: "m4", label: "MD", type: "md", fx: 0.28, fy: 0.35 },
  { id: "m5", label: "푸드", type: "food", fx: 0.58, fy: 0.62 },
  { id: "m6", label: "플리마켓", type: "facility", fx: 0.5, fy: 0.5 },
  { id: "m7", label: "운영팀", type: "facility", fx: 0.46, fy: 0.48 },
];
