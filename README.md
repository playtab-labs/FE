# 🎪 Playtab

> 축제 참가자를 위한 종합 모바일 앱

아티스트 라인업 확인부터 스탬프 투어, 굿즈 쇼핑, 부스 위치 안내, 팔찌 연동까지 — 페스티벌의 모든 경험을 하나의 앱에서.

---

## 📋 프로젝트 개요

Playtab은 축제 참가자의 경험을 극대화하기 위한 React Native 기반 모바일 앱입니다. 행사 정보 제공, 게임화된 스탬프 투어, 굿즈 판매, NFC 팔찌 연동을 통합한 종합 페스티벌 컴패니언 앱입니다.

**API 서버**: `https://api.playtap.co.kr`

---

## ✨ 주요 기능

### 🎤 아티스트

- 공연자 라인업 조회 및 선호 아티스트 저장
- 시간대별 타임테이블 확인

### 🗺 지도

- 지도 기반 부스(펍, 푸드트럭) 위치 안내
- 부스 상세정보 및 필터링

### 🏠 홈

- 스탬프 투어 진행 현황
- 굿즈(MD) 배너
- 최신 공지사항
- 펍 · 푸드트럭 목록

### 🎯 스탬프 투어

- 9개 부스 방문 미션 (3×3 빙고)
- QR 스캔 + GPS 위치 검증으로 스탬프 획득
- 빙고 달성 시 보상

### 🛍 굿즈(MD)

- 축제 기념품 목록 및 상세 정보
- 가격 · 품절 현황 표시

### 📿 팔찌 연동 (Personal)

- NFC/QR 코드로 RFID 팔찌와 스마트폰 연결
- 팔찌 기반 개인정보 서비스

### 👤 계정 관리

- 이메일 회원가입 (이메일 인증 포함)
- 로그인 / 비밀번호 찾기 / 회원탈퇴
- 내 정보 수정

---

## 🛠 기술 스택

### 프레임워크 · 언어

![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=React&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=Expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)

### 네비게이션 · 상태관리

| 라이브러리          | 용도                             |
| ------------------- | -------------------------------- |
| React Navigation v7 | Stack + Bottom Tabs 네비게이션   |
| Zustand             | 인증 토큰, 회원가입 폼 전역 상태 |

### API 통신

| 라이브러리    | 용도                                     |
| ------------- | ---------------------------------------- |
| Axios         | REST API (토큰 자동 첨부, 401 자동 갱신) |
| Apollo Client | GraphQL 쿼리/뮤테이션                    |

### UI · 스타일링

| 라이브러리              | 용도                              |
| ----------------------- | --------------------------------- |
| NativeWind 4            | Tailwind CSS 클래스 기반 스타일링 |
| Shopify Skia            | 캔버스 기반 그래픽                |
| React Native Reanimated | 고성능 애니메이션                 |
| expo-linear-gradient    | 그라디언트                        |

### 하드웨어 · 네이티브 기능

| 라이브러리               | 용도                        |
| ------------------------ | --------------------------- |
| expo-camera              | QR 코드 스캔                |
| react-native-nfc-manager | NFC 팔찌 인식               |
| expo-location            | GPS 위치 검증 (스탬프 투어) |
| expo-secure-store        | 토큰 암호화 저장            |
| expo-haptics             | 진동 피드백                 |

### 다국어

i18next + react-i18next | **지원 언어**: 한국어 · English · 日本語 · 简体中文 · 繁體中文

---

## 📁 프로젝트 구조

```
Playtab/
├── src/
│   ├── api/                # API 통신 모듈
│   │   ├── client.ts       # Axios 인스턴스 (인터셉터, 토큰 갱신 큐)
│   │   ├── apolloClient.ts # Apollo GraphQL 클라이언트
│   │   ├── auth.ts         # 인증 API
│   │   ├── artist.ts       # 아티스트/타임테이블 API
│   │   ├── booth.ts        # 부스 API
│   │   ├── stamp.ts        # 스탬프 투어 API
│   │   ├── notice.ts       # 공지사항 API
│   │   └── personal.ts     # 팔찌 연동 API
│   │
│   ├── pages/              # 화면 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Artist.tsx
│   │   ├── Map.tsx
│   │   ├── MD.tsx / MDDetail.tsx
│   │   ├── StampTour.tsx
│   │   ├── QrScan.tsx
│   │   ├── Personal.tsx
│   │   ├── auth/           # 로그인, 회원가입, 비밀번호 재설정
│   │   └── more/           # 공지사항, FAQ, 스폰서, 언어설정, 개인정보 관리
│   │
│   ├── components/         # 재사용 컴포넌트
│   │   ├── common/         # Button, Input, Modal 등 공통 컴포넌트
│   │   ├── home/
│   │   ├── artist/
│   │   ├── map/
│   │   ├── md/
│   │   ├── stamptour/
│   │   ├── personal/
│   │   ├── more/
│   │   └── icons/
│   │
│   ├── navigation/         # 네비게이터 설정
│   │   ├── RootNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   │
│   ├── stores/             # Zustand 스토어
│   │   ├── authStore.ts
│   │   └── signupStore.ts
│   │
│   ├── locales/            # 다국어 번역 파일 (ko, en, ja, zh, zh-TW)
│   ├── i18n/               # i18next 설정
│   ├── assets/             # 이미지, 폰트, SVG
│   ├── styles/             # 스타일 유틸리티
│   ├── utils/              # 유틸 함수
│   ├── types/              # TypeScript 타입 정의
│   ├── data/               # 정적 데이터
│   └── App.tsx             # 앱 루트 컴포넌트
│
├── app.json                # Expo 설정
├── tailwind.config.js      # NativeWind 설정
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── package.json
```

---

## 🏗 아키텍처 특이사항

- **토큰 갱신 큐잉**: 동시에 다수의 401 응답이 발생해도 리프레시 토큰 요청은 단 1회만 실행, 나머지 요청은 대기 후 재시도
- **혼합 API**: REST(Axios)와 GraphQL(Apollo) 병용 — 점진적 마이그레이션 진행 중
- **위치 기반 스탬프 검증**: QR 스캔 후 GPS 좌표 비교로 현장 방문 여부 검증, 원격 취득 방지

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/wnsjun">
        <img src="https://github.com/wnsjun.png" width="80px;" alt="wnsjun"/><br />
        <sub><b>wnsjun</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/t-timda">
        <img src="https://github.com/t-timda.png" width="80px;" alt="t-timda"/><br />
        <sub><b>t-timda</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/yiyoonseo">
        <img src="https://github.com/yiyoonseo.png" width="80px;" alt="yiyoonseo"/><br />
        <sub><b>yiyoonseo</b></sub>
      </a>
    </td>
  </tr>
</table>
