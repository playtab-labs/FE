import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import { useTranslation } from 'react-i18next';

export default function PrizeInfo() {
  const { t } = useTranslation();

  const items = [
    t('stampTour.pickupItem1'),
    t('stampTour.pickupItem2'),
  ];

  return (
    <View style={{ marginTop: 16, width: '100%' }}>
      <View
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          gap: 8,
        }}
      >
        <Text className={`${typo.T3_Eb} text-gray-black`}>
          {t('stampTour.pickupTitle')}
        </Text>

        <View>
          {items.map((item, index) => (
            <Text
              key={index}
              className={typo.B4_Rg}
              style={{ color: '#656565' }}
            >
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
