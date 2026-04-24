import Layout from '@/components/Layout';
import BingoCell from '@/components/stamptour/BingoCell';
import BingoCount from '@/components/stamptour/BingoCount';
import HowToParticipate from '@/components/stamptour/HowToParticipate';
import ProductInfo from '@/components/stamptour/ProductInfo';
import TipInfo from '@/components/stamptour/TipInfo'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';
import stamp2 from '@/assets/pngs/stamp2.png';
import BingoTitle from '@/assets/svgs/stamptour/bingotitle.svg';
import StampComplete1 from '@/assets/svgs/stamptour/stamp-complete1.svg';
import StampComplete2 from '@/assets/svgs/stamptour/stamp-complete2.svg';
import StampComplete3 from '@/assets/svgs/stamptour/stamp-complete3.svg';
import StampComplete5 from '@/assets/svgs/stamptour/stamp-complete5.svg';
import StampComplete6 from '@/assets/svgs/stamptour/stamp-complete6.svg';
import StampComplete9 from '@/assets/svgs/stamptour/stamp-complete9.svg';
import React from 'react';
import { SvgProps } from 'react-native-svg';

// 셀 번호(1~9)에 해당하는 스탬프 SVG. 완료 SVG가 없는 셀은 null로 유지.
const STAMP_SVGS: (React.ComponentType<SvgProps> | null)[] = [
  StampComplete1, // 1번 셀
  StampComplete2, // 2번 셀
  StampComplete3, // 3번 셀
  null,           // 4번 셀 (SVG 미준비)
  StampComplete5, // 5번 셀
  StampComplete6, // 6번 셀
  null,           // 7번 셀 (SVG 미준비)
  null,           // 8번 셀 (SVG 미준비)
  StampComplete9, // 9번 셀
];

const BINGO_CELLS = [
  { title: '📸알로스와\n사진 찍기', description: '5/13(수)-15(금) 중\n알바탑 앞', cleared: true },
  { title: '🖼포토부스\n이용하기', description: '5/13(수)-15(금) 중\n포토부스 내부', cleared: true },
  { title: '🏕총학생회\n부스 방문', description: '5/14(목)\n체육관 내', cleared: false },
  { title: '🎪재학생 부스\n체험하기 (1)', description: '5/13(수)\n각 재학생 부스', cleared: false },
  { title: '🎤버스킹\n즐기기', description: '5/13(수)\n청년광장 내\n총학생회 부스', cleared: false },
  { title: '🛍총학생회 굿즈\n부스 방문', description: '※ 구매 없이 참여 가능\n5/13(수)－15(금) 중\n대운동장 앞 굿즈 테이블', cleared: true },
  { title: '🎪재학생 부스\n체험하기 (2)', description: '5/13(수)\n각 재학생 부스', cleared: false },
  { title: '🎁프로모션 부스\n체험하기', description: '5/13(수)－15(금) 중\n청년광장 및 야외 농구장\n프로모션 부스', cleared: false },
  { title: '🍻주점 방문하기', description: '5/13(수)\n대운동장 내\n각 단과대 주점', cleared: false },
];


export default function StampTour() {
  const navigation = useNavigation<any>();

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
              const cell = BINGO_CELLS[index];
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
        <BingoCount bingoCount={BINGO_CELLS.filter(cell => cell.cleared).length} remainingCells={9 - BINGO_CELLS.filter(cell => cell.cleared).length} />
      </View>

      <HowToParticipate />

      <ProductInfo />

      <TipInfo />
      <View style={{ height: 80 }} />
    </Layout>
    </LinearGradient>
  );
}
