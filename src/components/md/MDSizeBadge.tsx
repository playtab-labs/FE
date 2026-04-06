import { Text, View } from 'react-native';
import { typo } from '@/styles/typography';

interface MDSizeBadgeProps {
  size: string;
  soldOut?: boolean;
}

export default function MDSizeBadge({ size, soldOut = false }: MDSizeBadgeProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        backgroundColor: soldOut ? '#E4E4E4' : 'rgba(255, 163, 140, 0.4)',
        alignSelf: 'flex-start',
      }}
    >
      <Text
        className={typo.B5_Eb}
        style={{
          color: soldOut ? '#656565' : '#1A1A1A',
          letterSpacing: -0.1,
          textDecorationLine: soldOut ? 'line-through' : 'none',
        }}
      >
        {size}
      </Text>
    </View>
  );
}
