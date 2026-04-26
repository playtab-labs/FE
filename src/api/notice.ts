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

export interface NoticeSummary {
  id: string;
  title: string;
  postedAt: string;
  isPinned: boolean;
}

export interface NoticeDetail extends NoticeSummary {
  content: string;
}

export const getNotices = (): Promise<{ data: { notices: { notices: NoticeSummary[] } } }> =>
  graphql(`
    query Notices {
      notices {
        notices {
          id
          title
          postedAt
          isPinned
        }
      }
    }
  `);

export const getNoticeDetail = (noticeId: string): Promise<{ data: { noticeDetail: NoticeDetail } }> =>
  graphql(
    `query NoticeDetail($noticeId: ID!) {
      noticeDetail(noticeId: $noticeId) {
        id
        title
        content
        postedAt
        isPinned
      }
    }`,
    { noticeId }
  );
