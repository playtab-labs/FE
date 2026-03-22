import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const ITEMS = [
  '▪추첨을 통해 30인에게 그라찌에 아이스아메리카노(M) 쿠폰 증정',
  '▪추첨을 통해 2인에게 엠티플랜 10만원 상당 숙박권 증정',
];

export default function ProductInfo() {
  return (
    <View style={{ margin: 16 }}>
      <View
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          gap: 16,
        }}
      >
        <Text className={`${typo.T3_Eb} text-gray-black`}>
          상품안내
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
