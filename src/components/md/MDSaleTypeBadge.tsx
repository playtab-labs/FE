import { Text, View } from 'react-native';
import { typo } from '@/styles/typography';
import { useTranslation } from 'react-i18next';

type SaleType = 'preorder' | 'onsite';

interface MDSaleTypeBadgeProps {
  type: SaleType;
}

const STYLE_CONFIG: Record<SaleType, { backgroundColor: string; color: string }> = {
  preorder: {
    backgroundColor: '#E4E4E4',
    color: '#656565',
  },
  onsite: {
    backgroundColor: '#FFA38C',
    color: '#1A1A1A',
  },
};

export default function MDSaleTypeBadge({ type }: MDSaleTypeBadgeProps) {
  const { t } = useTranslation();
  const { backgroundColor, color } = STYLE_CONFIG[type];

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
        {t(`md.${type}`)}
      </Text>
    </View>
  );
}
