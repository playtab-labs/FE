import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

interface BingoCellProps {
  title: string;
  description: string;
}

export default function BingoCell({ title, description }: BingoCellProps) {
  return (
    <View
      style={{
        display: 'flex',
        paddingTop: 26,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        aspectRatio: 1,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Text
        className={typo.B3_Eb}
        style={{ color: '#1A1A1A', textAlign: 'center', alignSelf: 'stretch' }}
      >
        {title}
      </Text>

      <Text
        className={typo.B4_Rg}
        style={{ color: '#656565', textAlign: 'center' }}
      >
        {description}
      </Text>
    </View>
  );
}
