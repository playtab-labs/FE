import type { NavigatorScreenParams } from "@react-navigation/native";

// More 스택 내부 화면
export type MoreStackParamList = {
  MoreMain: undefined;
  PersonalChange: undefined;
  PasswordChange: undefined;
  ServiceWithdrawal: undefined;
  FAQ: undefined;
  Sponsor: undefined;
  Host: undefined;
  Language: undefined;
};

// 하단 탭 화면
export type TabParamList = {
  Artist: undefined;
  Personal: undefined;
  Home: undefined;
  Map: undefined;
  More: NavigatorScreenParams<MoreStackParamList>;
};

// 루트 스택 화면
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Terms: { userType: string };
  PersonalInfo: undefined;
  EmailVerify: undefined;
  SetPassword: undefined;
  SignUpComplete: undefined;
  FindPassword: undefined;
  ResetPassword: { email: string };
  LoadingScreen: undefined;
  StampTour: { newSpotId?: number } | undefined;
  QrScan: undefined;
  Tag: undefined;
  SerialInput: undefined;
  Success: undefined;
  PersonalBand: undefined;
  Tabs: NavigatorScreenParams<TabParamList>;
  MD: undefined;
  MDDetail: { title: string };
  Notice: undefined;
  NoticeDetail: { noticeId: string; notices: { id: string; title: string; contentPreview: string; postedAt: string; isPinned: boolean }[] };
  [key: string]: undefined | object;
};
// export type TabParamList = Record<string, undefined>;
