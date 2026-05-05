import { View } from 'react-native';
import { typo } from '@/styles/typography';
import { useTranslation } from 'react-i18next';
import ColoredText from '@/components/common/ColoredText';

interface BingoCountProps {
  bingoCount: number;
  remainingCells: number;
}

export default function BingoCount({ bingoCount, remainingCells }: BingoCountProps) {
  const { t } = useTranslation();

  return (
    <View style={{ paddingTop: 16, paddingBottom: 16, alignItems: 'center', gap: 10 }}>
      <ColoredText
        text={
          bingoCount >= 9
            ? t('stampTour.missionCompleteAll')
            : t('stampTour.missionComplete', { count: bingoCount })
        }
        className={typo.T1_Eb}
        style={{ color: '#1A1A1A', textAlign: 'center' }}
      />
      <ColoredText
        text={
          bingoCount >= 6
            ? t('stampTour.bingoComplete')
            : t('stampTour.bingoRemaining', { count: remainingCells })
        }
        className={typo.B3_Sb}
        style={{ color: '#656565', textAlign: 'center' }}
      />
    </View>
  );
}
