import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import { useTranslation } from 'react-i18next';

export default function ProductInfo() {
  const { t } = useTranslation();

  const ITEMS = [
    t("md.prePickupInfo"),
    t("md.onsiteInfo"),
    t("md.otherInfo"),
  ];

  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          paddingVertical: 16,
          paddingHorizontal: 25,
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          gap: 10,
        }}
      >
        <Text className={`${typo.T2_Eb} text-gray-black`}>
          2026 ODYSSEY OFFICIAL GOODS
        </Text>

        <View>
          {ITEMS.map((item, index) => (
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
