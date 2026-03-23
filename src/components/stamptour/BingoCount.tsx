import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

interface BingoCountProps {
  bingoCount: number;
  remainingCells: number;
}

export default function BingoCount({ bingoCount, remainingCells }: BingoCountProps) {
  return (
    <View style={{ paddingTop: 16, paddingBottom: 16, alignItems: 'center', gap: 16 }}>
      <Text className={typo.T1_Eb} style={{ color: '#1A1A1A', textAlign: 'center' }}>
        현재{' '}
        <Text className={typo.T1_Eb} style={{ color: '#FF7654' }}>
          {bingoCount}빙고
        </Text>
        예요!
      </Text>

      <Text className={typo.B3_Sb} style={{ color: '#656565', textAlign: 'center' }}>
        올빙고까지{' '}
        <Text className={typo.B3_Sb} style={{ color: '#FF7654' }}>
          {remainingCells}칸
        </Text>
        {' '}남았어요 🙌
      </Text>
    </View>
  );
}
