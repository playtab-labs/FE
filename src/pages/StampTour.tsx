import Layout from '@/components/Layout';
import BingoCell from '@/components/stamptour/BingoCell';
import BingoCount from '@/components/stamptour/BingoCount';
import HowToParticipate from '@/components/stamptour/HowToParticipate';
import ProductInfo from '@/components/stamptour/ProductInfo';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';
import stamp2 from '@/assets/pngs/stamp2.png';
import BingoTitle from '@/assets/svgs/stamptour/bingotitle.svg';
import StampComplete1 from '@/assets/svgs/stamptour/stamp-complete1.svg';
import StampComplete2 from '@/assets/svgs/stamptour/stamp-complete2.svg';
import React from 'react';
import { SvgProps } from 'react-native-svg';

// 셀 번호(1~9)에 해당하는 스탬프 SVG. 완료 SVG가 없는 셀은 null로 유지.
const STAMP_SVGS: (React.ComponentType<SvgProps> | null)[] = [
  StampComplete1, // 1번 셀
  StampComplete2, // 2번 셀
  null,           // 3번 셀
  null,           // 4번 셀
  null,           // 5번 셀
  null,           // 6번 셀
  null,           // 7번 셀
  null,           // 8번 셀
  null,           // 9번 셀
];

const BINGO_CELLS = [
  { title: '#정문 게이트', description: '오디세이에 입장하세요!', cleared: true },
  { title: '#메인무대', description: '무대를 관람하세요!', cleared: true },
  { title: '#푸드존', description: '축제에는 간식이 빠질 수 없죠', cleared: false },
  { title: '#청년광장', description: '청년광장을 둘러보세요', cleared: false },
  { title: '#MD 부스', description: '오디세이의 굿즈를 둘러보세요!', cleared: false },
  { title: '#플리마켓', description: '학생들이 참여한 플리마켓을 구경하세요!', cleared: false },
  { title: '#동아리존', description: '설명', cleared: false },
  { title: '미션 8', description: '설명', cleared: false },
  { title: '미션 9', description: '설명', cleared: false },
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
                <View key={col} style={{ flex: 1 }}>
                  <BingoCell
                    title={cell.title}
                    description={cell.description}
                    StampSvg={cell.cleared ? STAMP_SVGS[index] : null}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoCount bingoCount={0} remainingCells={BINGO_CELLS.filter(cell => !cell.cleared).length} />
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <HowToParticipate />
      </View>

      <View style={{ alignItems: 'center' }}>
        <ProductInfo />
      </View>
      <View style={{ height: 150 }} />
    </Layout>
    </LinearGradient>
  );
}
