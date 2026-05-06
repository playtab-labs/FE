import client from "./client";

export interface PerformerInfo {
  id: string;
  name: { ko: string; en?: string; zh?: string };
  imageUrl: string;
  isFavorited?: boolean;
}

export interface ArtistSchedule {
  scheduleId: string;
  startAt: string;
  endAt: string;
  status: string;
  performer: PerformerInfo;
}

export interface Stage {
  stageType: string; // "아티스트 무대" | "동아리 무대" | ...
  artists: ArtistSchedule[];
}

export interface DaySchedule {
  day: number;
  date: string;
  stages: Stage[];
}

export interface FestivalDay {
  id: string;
  dayNumber: number;
  eventDate: string;
}

// stageType 포함한 flat artist 타입
export type ArtistWithStage = ArtistSchedule & { stageType: string };

const graphql = async (query: string, variables?: Record<string, unknown>) => {
  const res = await client.post("/graphql", { query, variables });
  return res.data;
};

export const getFestivalDays = () =>
  graphql(
    `query FestivalDays {
      festivalDays {
        id
        dayNumber
        eventDate
      }
    }`,
  );

export const getSchedulesByDay = (dayId: string) =>
  graphql(
    `query GetSchedulesByDay($dayId: ID!) {
      schedulesByDay(dayId: $dayId) {
        stage {
          id
          name
          displayOrder
        }
        artists {
          scheduleId
          startAt
          endAt
          status
          performer {
            id
            name
            imageUrl
            isFavorited
          }
        }
      }
    }`,
    { dayId },
  );

export const addFavorite = (performerId: string) =>
  graphql(
    `mutation AddFavorite($performerId: ID!) {
      addFavorite(performerId: $performerId) { id }
    }`,
    { performerId },
  );

export const removeFavorite = (performerId: string) =>
  graphql(
    `mutation RemoveFavorite($performerId: ID!) {
      removeFavorite(performerId: $performerId)
    }`,
    { performerId },
  );
