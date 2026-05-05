import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import { useTranslation } from 'react-i18next';

export default function HowToParticipate() {
  const { t } = useTranslation();

  const steps = [
    t('stampTour.howToStep1'),
    t('stampTour.howToStep2'),
    t('stampTour.howToStep3'),
    t('stampTour.howToStep4'),
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
          {t('stampTour.howToTitle')}
        </Text>

        <View>
          {steps.map((step, index) => (
            <Text
              key={index}
              className={typo.B4_Rg}
              style={{ color: '#656565' }}
            >
              {step}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
