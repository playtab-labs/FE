export type ArtistCategory = "아티스트" | "버스킹" | "DJ" | "동아리";
export type DayKey = "DAY1" | "DAY2" | "DAY3";

export interface Artist {
  id: string;
  name: string;
  imageUri: string;
  category: ArtistCategory;
  day: DayKey;
  isFavorite: boolean;
}

export interface DayGroup {
  day: DayKey;
  label: string;
  artists: Artist[];
}

export const MOCK_ARTISTS: Artist[] = [
  // DAY 1 - 5/13(수)
  {
    id: "d1-b1",
    name: "김아무개",
    imageUri:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    category: "버스킹",
    day: "DAY1",
    isFavorite: false,
  },
  {
    id: "d1-b2",
    name: "김버스킹",
    imageUri:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    category: "버스킹",
    day: "DAY1",
    isFavorite: false,
  },
  {
    id: "d1-b3",
    name: "마이네임이즈버스킹",
    imageUri:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800",
    category: "버스킹",
    day: "DAY1",
    isFavorite: false,
  },
  {
    id: "d1-dj1",
    name: "DJ NOVA",
    imageUri:
      "https://img.freepik.com/free-vector/cartoon-character-design-illustration-professional-band_1362-117.jpg?semt=ais_hybrid&w=740&q=80",
    category: "DJ",
    day: "DAY1",
    isFavorite: false,
  },
  {
    id: "d1-c1",
    name: "한양대 밴드부",
    imageUri:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
    category: "동아리",
    day: "DAY1",
    isFavorite: false,
  },

  // DAY 2 - 5/14(목)
  {
    id: "d2-a1",
    name: "CRYING NUT",
    imageUri:
      "https://i.namu.wiki/i/yS3Ura5kt07Kxz6VnXVD9nmyHhWVHNnqgkzllvJ2qliQigkAVJVrKc9Us-S-40NfhGbquiO8MGkMJn1zE54gFg.webp",
    category: "아티스트",
    day: "DAY2",
    isFavorite: false,
  },
  {
    id: "d2-a2",
    name: "Dragon Pony",
    imageUri:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Dragon_Pony_Round_Festival_2025.png",
    category: "아티스트",
    day: "DAY2",
    isFavorite: false,
  },
  {
    id: "d2-a3",
    name: "The Bowls",
    imageUri:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800",
    category: "아티스트",
    day: "DAY2",
    isFavorite: false,
  },
  {
    id: "d2-b1",
    name: "김아무개",
    imageUri:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    category: "버스킹",
    day: "DAY2",
    isFavorite: false,
  },
  {
    id: "d2-b2",
    name: "스트릿싱어",
    imageUri:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    category: "버스킹",
    day: "DAY2",
    isFavorite: false,
  },
  {
    id: "d2-dj1",
    name: "DJ SOLAR",
    imageUri:
      "https://img.freepik.com/free-vector/illustration-rock-band_23-2149593909.jpg?semt=ais_hybrid&w=740&q=80",
    category: "DJ",
    day: "DAY2",
    isFavorite: false,
  },
  {
    id: "d2-c1",
    name: "연세대 재즈클럽",
    imageUri:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    category: "동아리",
    day: "DAY2",
    isFavorite: false,
  },

  // DAY 3 - 5/15(금)
  {
    id: "d3-a1",
    name: "이날치",
    imageUri:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
    category: "아티스트",
    day: "DAY3",
    isFavorite: false,
  },
  {
    id: "d3-a2",
    name: "잔나비",
    imageUri:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    category: "아티스트",
    day: "DAY3",
    isFavorite: false,
  },
  {
    id: "d3-b1",
    name: "버스킹홍길동",
    imageUri:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    category: "버스킹",
    day: "DAY3",
    isFavorite: false,
  },
  {
    id: "d3-dj1",
    name: "DJ LUNA",
    imageUri:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800",
    category: "DJ",
    day: "DAY3",
    isFavorite: false,
  },
  {
    id: "d3-dj2",
    name: "DJ MARS",
    imageUri:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800",
    category: "DJ",
    day: "DAY3",
    isFavorite: false,
  },
  {
    id: "d3-c1",
    name: "고려대 락밴드",
    imageUri:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
    category: "동아리",
    day: "DAY3",
    isFavorite: false,
  },
];

export const DAY_LABELS: Record<DayKey, string> = {
  DAY1: "DAY 1 - 5/13(수)",
  DAY2: "DAY 2 - 5/14(목)",
  DAY3: "DAY 3 - 5/15(금)",
};

/** category / favOnly 필터 적용 후 day별로 그루핑 */
export const groupByDay = (
  artists: Artist[],
  category: ArtistCategory | null,
  favOnly: boolean = false,
): DayGroup[] => {
  const filtered = artists
    .filter((a) => !category || a.category === category)
    .filter((a) => !favOnly || a.isFavorite);

  return (["DAY1", "DAY2", "DAY3"] as DayKey[]).map((day) => ({
    day,
    label: DAY_LABELS[day],
    artists: filtered.filter((a) => a.day === day),
  }));
};
