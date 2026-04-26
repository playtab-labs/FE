import { gql } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import apolloClient from './graphqlClient';
import client from './client';

export const SPOT_NAMES = [
  '📸알로스와\n사진 찍기',
  '🖼포토부스\n이용하기',
  '🏕총학생회\n부스 방문',
  '🎪재학생 부스\n체험하기 (1)',
  '🎤버스킹\n즐기기',
  '🛍총학생회 굿즈\n부스 방문',
  '🎪재학생 부스\n체험하기 (2)',
  '🎁프로모션 부스\n체험하기',
  '🍻주점 방문하기',
];

export async function visitStamp(
  spotId: number,
  latitude: number,
  longitude: number,
): Promise<{ success: boolean; message: string }> {
  const token = await SecureStore.getItemAsync('accessToken');
  const { data } = await client.post<{ success: boolean; message: string }>(
    '/api/v1/stamp-tour/visit',
    { spotId, latitude, longitude },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  );
  return data;
}

export interface StampSpot {
  spotId: string;
  spotName: string;
  spotDescription: string;
  visited: boolean;
  visitedAt: string | null;
  latitude: number;
  longitude: number;
}

export interface MyStampsResult {
  totalCount: number;
  visitedCount: number;
  spots: StampSpot[];
}

const MY_STAMPS_QUERY = gql`
  query MyStamps {
    myStamps {
      totalCount
      visitedCount
      spots {
        spotId
        spotName
        spotDescription
        visited
        visitedAt
        latitude
        longitude
      }
    }
  }
`;

export async function getMyStamps(): Promise<MyStampsResult> {
  const { data } = await apolloClient.query<{ myStamps: MyStampsResult }>({
    query: MY_STAMPS_QUERY,
    fetchPolicy: 'network-only',
  });
  return data!.myStamps;
}
