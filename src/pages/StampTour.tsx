import Layout from '@/components/Layout';
import BingoCell from '@/components/stamptour/BingoCell';
import BingoCount from '@/components/stamptour/BingoCount';
import HowToParticipate from '@/components/stamptour/HowToParticipate';
import ProductInfo from '@/components/stamptour/ProductInfo';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';
import stamp2 from '@/assets/pngs/stamp2.png';
import BingoTitle from '@/assets/svgs/bingotitle.svg';

const BINGO_CELLS = [
  { title: '#정문 게이트', description: '오디세이에 입장하세요!', cleared: true },
  { title: '#푸드존', description: '축제에는 간식이 빠질 수 없죠', cleared:false },
  { title: '#메인무대', description: '무대를 관람하세요', cleared: true },
  { title: '미션 4', description: '설명', cleared: false },
  { title: '미션 5', description: '설명', cleared: false },
  { title: '미션 6', description: '설명', cleared: false },
  { title: '미션 7', description: '설명', cleared: false },
  { title: '미션 8', description: '설명', cleared: false },
  { title: '미션 9', description: '설명', cleared: false },
];


export default function StampTour() {
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
    <Layout title="스탬프 투어" showBack showCamera scrollable showBottomBar bgTransparent>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoTitle />
      </View>

      <View style={{ marginTop: 32, gap: 8 }}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
            {[0, 1, 2].map((col) => {
              const cell = BINGO_CELLS[row * 3 + col];
              return (
                <View key={col} style={{ flex: 1 }}>
                  <BingoCell title={cell.title} description={cell.description} cleared={cell.cleared} />
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoCount bingoCount={0} remainingCells={9} />
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
