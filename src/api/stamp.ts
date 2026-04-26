import { gql } from '@apollo/client';
import apolloClient from './graphqlClient';

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
