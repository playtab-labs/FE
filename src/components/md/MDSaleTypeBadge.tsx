import { Text, View } from 'react-native';
import { typo } from '@/styles/typography';

type SaleType = 'preorder' | 'onsite';

interface MDSaleTypeBadgeProps {
  type: SaleType;
}

const CONFIG: Record<SaleType, { label: string; backgroundColor: string; color: string }> = {
  preorder: {
    label: '사전주문',
    backgroundColor: '#E4E4E4',
    color: '#656565',
  },
  onsite: {
    label: '현장판매',
    backgroundColor: '#FFA38C',
    color: '#1A1A1A',
  },
};

export default function MDSaleTypeBadge({ type }: MDSaleTypeBadgeProps) {
  const { label, backgroundColor, color } = CONFIG[type];

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        backgroundColor,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        className={typo.B5_Eb}
        style={{ color, letterSpacing: -0.1 }}
      >
        {label}
      </Text>
    </View>
  );
}
