import * as SecureStore from "expo-secure-store";
import client from "./client";

const graphql = async (query: string, variables?: Record<string, unknown>) => {
  const token = await SecureStore.getItemAsync("accessToken");
  const res = await client.post(
    "/graphql",
    { query, variables },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

export interface Wristband {
  rfid: string;
  activeDate: string;
  linkedAt: string;
}

export const getMyWristbands = () =>
  graphql(`query { myWristbands { rfid activeDate linkedAt } }`);

export const linkWristband = (rfid: string) =>
  graphql(
    `mutation LinkWristband($rfid: String!) {
      linkWristband(rfid: $rfid) { rfid activeDate linkedAt }
    }`,
    { rfid }
  );
