import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const ITEMS = [
  '▪사전수령 안내사항',
  '▪현장구매 안내사항',
  '▪기타 안내사항'
];

export default function ProductInfo() {
  return (
    <View style={{ marginTop: 16, width: '100%' }}>
      <View
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          gap: 16,
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
