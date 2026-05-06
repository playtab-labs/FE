import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import Prize1 from '@/assets/svgs/stamptour/prize1.svg';
import Prize2 from '@/assets/svgs/stamptour/prize2.svg';
import Prize3 from '@/assets/svgs/stamptour/prize3.svg';
import { useTranslation } from 'react-i18next';

const PRIZE_IMAGES = [Prize1, Prize2, Prize3];

export default function ProductInfo() {
  const { t } = useTranslation();

  const items = [
    t('stampTour.prizeItem1'),
    t('stampTour.prizeItem2'),
    t('stampTour.prizeItem3'),
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
          {t('stampTour.prizeTitle')}
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

        <View style={{ flexDirection: 'row', gap: 25, marginTop: 8 }}>
          {PRIZE_IMAGES.map((PrizeImage, index) => (
            <PrizeImage key={index} width={93} height={93} />
          ))}
        </View>
      </View>
    </View>
  );
}
