import Layout from '@/components/Layout';
import BingoCell from '@/components/stamptour/BingoCell';
import BingoCount from '@/components/stamptour/BingoCount';
import HowToParticipate from '@/components/stamptour/HowToParticipate';
import ProductInfo from '@/components/stamptour/ProductInfo';
import { typo } from '@/styles/typography';
import { Text, View } from 'react-native';

const BINGO_CELLS = [
  { title: '미션 1', description: '설명' },
  { title: '미션 2', description: '설명' },
  { title: '미션 3', description: '설명' },
  { title: '미션 4', description: '설명' },
  { title: '미션 5', description: '설명' },
  { title: '미션 6', description: '설명' },
  { title: '미션 7', description: '설명' },
  { title: '미션 8', description: '설명' },
  { title: '미션 9', description: '설명' },
];

const STROKE_OFFSETS = [
  [-4, -4], [-4, 0], [-4, 4],
  [0, -4],           [0, 4],
  [4, -4],  [4, 0],  [4, 4],
];

function StrokeText({ children }: { children: string }) {
  return (
    <View>
      {STROKE_OFFSETS.map(([dx, dy], i) => (
        <Text
          key={i}
          className={typo.T1_Eb}
          style={{ position: 'absolute', color: '#FFA38C', top: dy, left: dx, textAlign: 'center' }}
        >
          {children}
        </Text>
      ))}
      <Text className={typo.T1_Eb} style={{ color: '#1A1A1A', textAlign: 'center' }}>
        {children}
      </Text>
    </View>
  );
}

export default function StampTour() {
  return (
    <Layout title="스탬프 투어" showBack scrollable>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <StrokeText>SOGANG ODYSSEY</StrokeText>
        <StrokeText>CAMPUS MISSION BINGO</StrokeText>
      </View>

      <View style={{ marginTop: 32, gap: 8 }}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
            {[0, 1, 2].map((col) => {
              const cell = BINGO_CELLS[row * 3 + col];
              return (
                <View key={col} style={{ flex: 1 }}>
                  <BingoCell title={cell.title} description={cell.description} />
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
    </Layout>
  );
}
