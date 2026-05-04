import Layout from '@/components/Layout';
import BingoCell from '@/components/stamptour/BingoCell';
import BingoCount from '@/components/stamptour/BingoCount';
import HowToParticipate from '@/components/stamptour/HowToParticipate';
import ProductInfo from '@/components/stamptour/ProductInfo';
import StampToast from '@/components/stamptour/StampToast';
import TipInfo from '@/components/stamptour/TipInfo'
import PrizeInfo from '@/components/stamptour/PrizeInfo'
import { getMyStamps, MyStampsResult } from '@/api/stamp';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import stamp2 from '@/assets/pngs/stamp2.png';
import BingoTitle from '@/assets/svgs/stamptour/bingotitle.svg';
import StampComplete1 from '@/assets/svgs/stamptour/stamp-complete1.svg';
import StampComplete2 from '@/assets/svgs/stamptour/stamp-complete2.svg';
import StampComplete3 from '@/assets/svgs/stamptour/stamp-complete3.svg';
import StampComplete4 from '@/assets/svgs/stamptour/stamp-complete4.svg';
import StampComplete5 from '@/assets/svgs/stamptour/stamp-complete5.svg';
import StampComplete6 from '@/assets/svgs/stamptour/stamp-complete6.svg';
import StampComplete7 from '@/assets/svgs/stamptour/stamp-complete7.svg';
import StampComplete8 from '@/assets/svgs/stamptour/stamp-complete8.svg';
import StampComplete9 from '@/assets/svgs/stamptour/stamp-complete9.svg';
import { SvgProps } from 'react-native-svg';

// 셀 번호(1~9)에 해당하는 스탬프 SVG.
const STAMP_SVGS: (React.ComponentType<SvgProps> | null)[] = [
  StampComplete1, // 1번 셀
  StampComplete2, // 2번 셀
  StampComplete3, // 3번 셀
  StampComplete4, // 4번 셀 
  StampComplete5, // 5번 셀
  StampComplete6, // 6번 셀
  StampComplete7, // 7번 셀 
  StampComplete8, // 8번 셀
  StampComplete9, // 9번 셀
];

const BINGO_CELL_INFO = [
  { title: '📸알로스와\n사진 찍기', description: '5/13(수)-15(금) 중\n알바탑 앞' },
  { title: '🖼포토부스\n이용하기', description: '5/13(수)-15(금) 중\n포토부스 내부' },
  { title: '🏦KB 국민은행\n부스 참여', description: '5/13(수)-15(금)\n청년광장' },
  { title: '🎪재학생 부스\n체험하기 (1)', description: '5/13(수)\n각 재학생 부스' },
  { title: '🎤버스킹\n즐기기', description: '5/13(수)\n청년광장 내\n총학생회 부스' },
  { title: '🛍총학생회 굿즈\n부스 방문', description: '※ 구매 없이 참여 가능\n5/13(수)－15(금) 중\n대운동장 앞 굿즈 테이블' },
  { title: '🎪재학생 부스\n체험하기 (2)', description: '5/13(수)\n각 재학생 부스' },
  { title: '🎁프로모션 부스\n체험하기', description: '5/13(수)－15(금) 중\n청년광장 및 야외 농구장\n프로모션 부스' },
  { title: '🍻주점 방문하기', description: '5/13(수)\n대운동장 내\n각 단과대 주점' },
];


export default function StampTour() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [stamps, setStamps] = useState<MyStampsResult | null>(null);
  const [stampToast, setStampToast] = useState<{ title: string; isBingo: boolean } | null>(null);
  const stampToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getMyStamps().then(setStamps).catch(() => {});
  }, []);

  const bingoCells = BINGO_CELL_INFO.map((info, index) => {
    const spot = stamps?.spots.find(s => Number(s.spotId) === index + 1);
    return { ...info, cleared: spot?.visited ?? false };
  });

  const visitedCount = stamps?.visitedCount ?? 0;

  useEffect(() => {
    const title = route.params?.newStampTitle;
    if (!title) return;
    getMyStamps().then((data) => {
      setStamps(data);
      const isBingo = data.visitedCount >= 6;
      setStampToast({ title, isBingo });
      if (stampToastTimer.current) clearTimeout(stampToastTimer.current);
      stampToastTimer.current = setTimeout(() => setStampToast(null), 3000);
    }).catch(() => {});
    return () => {
      if (stampToastTimer.current) clearTimeout(stampToastTimer.current);
    };
  }, [route.params?.newStampTitle]);

  return (
    <LinearGradient
      colors={['rgba(255, 94, 55, 0.20)', 'rgba(255, 255, 255, 0.20)']}
      style={{ flex: 1, backgroundColor: '#FFF' }}
    >
      <Image
        source={stamp2}
        style={{ position: 'absolute', top: 0, right: 0, width: 330, height: 310 }}
        resizeMode="cover"
      />
    <Layout title="스탬프 투어" showBack showCamera onCameraPress={() => navigation.navigate('QrScan')} scrollable showBottomBar bgTransparent>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoTitle />
      </View>

      <View style={{ marginTop: 32, gap: 8 }}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const cell = bingoCells[index];
              return (
                <BingoCell
                  key={col}
                  title={cell.title}
                  description={cell.description}
                  StampSvg={cell.cleared ? STAMP_SVGS[index] : null}
                />
              );
            })}
          </View>
        ))}
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoCount bingoCount={visitedCount} remainingCells={6 - visitedCount} />
      </View>

      <HowToParticipate />

      <ProductInfo />

      <PrizeInfo />

      <TipInfo />
      <View style={{ height: 80 }} />
    </Layout>
      {stampToast && (
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <StampToast title={stampToast.title} isBingo={stampToast.isBingo} />
        </View>
      )}
    </LinearGradient>
  );
}
