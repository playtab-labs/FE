/**
 * 디자이너 타이포 스타일 상수
 *
 * 네이밍 규칙:
 *   Eb = ExtraBold (font-weight: 800)
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
  H1_Eb: "text-h1 font-eb",
  H1_Sb: "text-h1 font-sb",
  H1_Rg: "text-h1 font-rg",

  // ── Title ────────────────────────────────
  T1_Eb: "text-t1 font-eb",
  T1_Sb: "text-t1 font-sb",
  T1_Rg: "text-t1 font-rg",

  T2_Eb: "text-t2 font-eb",
  T2_Sb: "text-t2 font-sb",
  T2_Rg: "text-t2 font-rg",

  T3_Eb: "text-t3 font-eb",
  T3_Sb: "text-t3 font-sb",
  T3_Rg: "text-t3 font-rg",

  // ── Body ─────────────────────────────────
  B1_Eb: "text-b1 font-eb",
  B1_Sb: "text-b1 font-sb",
  B1_Rg: "text-b1 font-rg",

  B2_Eb: "text-b2 font-eb",
  B2_Sb: "text-b2 font-sb",
  B2_Rg: "text-b2 font-rg",

  B3_Eb: "text-b3 font-eb",
  B3_Sb: "text-b3 font-sb",
  B3_Rg: "text-b3 font-rg",

  B4_Eb: "text-b4 font-eb",
  B4_Sb: "text-b4 font-sb",
  B4_Rg: "text-b4 font-rg",

  B5_Eb: "text-b5 font-eb",
  B5_Sb: "text-b5 font-sb",
  B5_Rg: "text-b5 font-rg",
} as const;

export type TypoKey = keyof typeof typo;
