import * as SecureStore from "expo-secure-store";
import client from "./client";

export interface Pub {
  id: string;
  collegeName: string;
  thumbnailImageUrl: string;
  isNameConfirmed: boolean;
  displayOrder: number;
}

export interface FoodTruck {
  id: string;
  name: string;
  thumbnailImageUrl: string;
  shortDescription: string;
  displayOrder: number;
}

const graphql = async (query: string, variables?: Record<string, unknown>) => {
  let token: string | null = null;
  try {
    token = await SecureStore.getItemAsync("accessToken");
  } catch {}
  const res = await client.post(
    "/graphql",
    { query, variables },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  );
  return res.data;
};

export const getPubs = () =>
  graphql(`
    query Pubs {
      pubs {
        id
        collegeName
        thumbnailImageUrl
        isNameConfirmed
        displayOrder
      }
    }
  `);

export const getFoodTrucks = () =>
  graphql(`
    query FoodTrucks {
      foodTrucks {
        id
        name
        thumbnailImageUrl
        shortDescription
        displayOrder
      }
    }
  `);
