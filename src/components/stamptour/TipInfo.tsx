import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import { useTranslation } from 'react-i18next';

export default function ProductInfo() {
  const { t } = useTranslation();

  const items = [
    t('stampTour.tipItem1'),
    t('stampTour.tipItem2'),
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
          {t('stampTour.tipTitle')}
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
