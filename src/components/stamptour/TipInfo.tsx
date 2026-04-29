import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const ITEMS = [
  '하루에 모두 돌 필요 없이, 축제 기간 동안 자유롭게 참여 가능',
  '인기 부스는 대기 시간이 있을 수 있으니 미리 방문 추천!'
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
          gap: 14,
        }}
      >
        <Text className={`${typo.T3_Eb} text-gray-black`}>
          💡 TIP
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
