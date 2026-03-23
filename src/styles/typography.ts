/**
 * 디자이너 타이포 스타일 상수
 *
 * 네이밍 규칙:
 *   Eb = ExtraBold (font-weight: 800)
 *   Bd = Bold      (font-weight: 700)
 *   Sb = SemiBold  (font-weight: 600)
 *   Rg = Regular   (font-weight: 400)
 *
 * 사이즈 / 라인높이:
 *   H1       24 / 140%
 *   T1       20 / 140%
 *   T2       18 / 140%
 *   T3       16 / 140%
 *   B1       18 / 140%
 *   B2       16 / 140%
 *   B3       14 / 140%
 *   B4       12 / 140%
 *   B5       10 / 140%
 *
 * 사용 예시:
 *   import { typo } from '@/styles/typography'
 *   <Text className={typo.H1_Eb}>제목</Text>
 */

export const typo = {
  // ── Heading ──────────────────────────────
  H1_Eb: "font-pretendard-eb text-h1",
  H1_Bd: "font-pretendard-bd text-h1",
  H1_Sb: "font-pretendard-sb text-h1",
  H1_Rg: "font-pretendard-rg text-h1",

  // ── Title ────────────────────────────────
  T1_Eb: "font-pretendard-eb text-t1",
  T1_Bd: "font-pretendard-bd text-t1",
  T1_Sb: "font-pretendard-sb text-t1",
  T1_Rg: "font-pretendard-rg text-t1",

  T2_Eb: "font-pretendard-eb text-t2",
  T2_Bd: "font-pretendard-bd text-t2",
  T2_Sb: "font-pretendard-sb text-t2",
  T2_Rg: "font-pretendard-rg text-t2",

  T3_Eb: "font-pretendard-eb text-t3",
  T3_Bd: "font-pretendard-bd text-t3",
  T3_Sb: "font-pretendard-sb text-t3",
  T3_Rg: "font-pretendard-rg text-t3",

  // ── Body ─────────────────────────────────
  B1_Eb: "font-pretendard-eb text-b1",
  B1_Bd: "font-pretendard-bd text-b1",
  B1_Sb: "font-pretendard-sb text-b1",
  B1_Rg: "font-pretendard-rg text-b1",

  B2_Eb: "font-pretendard-eb text-b2",
  B2_Bd: "font-pretendard-bd text-b2",
  B2_Sb: "font-pretendard-sb text-b2",
  B2_Rg: "font-pretendard-rg text-b2",

  B3_Eb: "font-pretendard-eb text-b3",
  B3_Bd: "font-pretendard-bd text-b3",
  B3_Sb: "font-pretendard-sb text-b3",
  B3_Rg: "font-pretendard-rg text-b3",

  B4_Eb: "font-pretendard-eb text-b4",
  B4_Bd: "font-pretendard-bd text-b4",
  B4_Sb: "font-pretendard-sb text-b4",
  B4_Rg: "font-pretendard-rg text-b4",

  B5_Eb: "font-pretendard-eb text-b5",
  B5_Bd: "font-pretendard-bd text-b5",
  B5_Sb: "font-pretendard-sb text-b5",
  B5_Rg: "font-pretendard-rg text-b5",
} as const;

export type TypoKey = keyof typeof typo;
