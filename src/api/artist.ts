import client from "./client";
import * as SecureStore from "expo-secure-store";

export interface Performer {
  id: string;
  name: { ko: string };
  description: { ko: string };
  imageUrl: string;
  isActive: boolean;
  isFavorited: boolean;
  stageNames: { ko: string }[];
}

export interface Schedule {
  id: string;
  performer: Performer;
  festivalDay: { dayNumber: number };
  stageName: { ko: string };
}

const graphql = async (query: string, variables?: Record<string, unknown>) => {
  // const token = await SecureStore.getItemAsync("accessToken");
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ1c2VyLXNlcnZpY2UiLCJzdWIiOiIwM2FmOWI4ZS1kNWNiLTQ4ZmEtOWM1Yy0xOWEyNjY4YjQwMDMiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3NzA5NDAxOCwiZXhwIjoxNzc3MDk3NjE4fQ.ygrRWyGEqPzKjfxsAlodGyQpGiuMWINZiixIN6rtRw3qw3haiZV9XefNCibVa51XsvGysreBYmPagV_5B1XCyw'
  const res = await client.post(
    "/graphql",
    { query, variables },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return res.data;
};

export const getSchedulesByDay = (dayNumber: number) =>
  graphql(
    `query GetSchedulesByDay($dayNumber: Int!) {
      schedulesByDay(dayNumber: $dayNumber) {
        id
        performer {
          id
          name { ko }
          imageUrl
          isFavorited
          stageNames { ko }
        }
        festivalDay { dayNumber }
        stageName { ko }
      }
    }`,
    { dayNumber }
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


