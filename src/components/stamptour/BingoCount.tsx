import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

interface BingoCountProps {
  bingoCount: number;
  remainingCells: number;
}

export default function BingoCount({ bingoCount, remainingCells }: BingoCountProps) {
  return (
    <View style={{ paddingTop: 16, paddingBottom: 16, alignItems: 'center', gap: 10 }}>
      {bingoCount >= 9 ? (
        <Text className={typo.T1_Eb} style={{ color: '#1A1A1A', textAlign: 'center' }}>
          미션을{' '}
          <Text className={typo.T1_Eb} style={{ color: '#FF7654' }}>
            전부 완료
          </Text>
          했어요!
        </Text>
      ) : (
        <Text className={typo.T1_Eb} style={{ color: '#1A1A1A', textAlign: 'center' }}>
          <Text className={typo.T1_Eb} style={{ color: '#FF7654' }}>
            {bingoCount}개의{' '}
          </Text>
          미션을 완료했어요!
        </Text>
      )}

      {bingoCount >= 6 ? (
        <Text className={typo.B3_Sb} style={{ color: '#656565', textAlign: 'center' }}>
          경품 수령 및 자동 응모가{' '}
          <Text className={typo.B3_Sb} style={{ color: '#FF7654' }}>
            완료
          </Text>
          됐어요🙌
        </Text>
      ) : (
        <Text className={typo.B3_Sb} style={{ color: '#656565', textAlign: 'center' }}>
          경품 수령 및 자동 응모까지{' '}
          <Text className={typo.B3_Sb} style={{ color: '#FF7654' }}>
            {remainingCells}칸
          </Text>
          {' '}남았어요 🙌
        </Text>
      )}
    </View>
  );
}
