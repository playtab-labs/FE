import * as SecureStore from "expo-secure-store";
import client from "./client";

export interface Performer {
  id: string;
  name: { ko: string };  // JSON 타입
  imageUrl: string;
  isActive: boolean;
  isFavorited: boolean;
  stageNames: { ko: string }[];  // JSON 타입
}

export interface ArtistSchedule {
  scheduleId: string;
  startAt: string;
  endAt: string;
  status: string;
  performer: Performer;
}

export interface StageSchedule {
  stage: {
    id: string;
    name: { ko: string };
    locationDesc: { ko: string };
    displayOrder: number;
  };
  artists: ArtistSchedule[];
}

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("accessToken");
  } catch {
    return null;
  }
};

const graphql = async (query: string, variables?: Record<string, unknown>) => {
  const token = await getToken();
  const res = await client.post(
    "/graphql",
    { query, variables },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

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
            stageNames
          }
        }
      }
    }`,
    { dayId }
  );

export const addFavorite = (performerId: string) =>
  graphql(
    `mutation AddFavorite($performerId: ID!) {
      addFavorite(performerId: $performerId) { id }
    }`,
    { performerId }
  );

export const removeFavorite = (performerId: string) =>
  graphql(
    `mutation RemoveFavorite($performerId: ID!) {
      removeFavorite(performerId: $performerId)
    }`,
    { performerId }
  );
