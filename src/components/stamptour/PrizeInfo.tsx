import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const ITEMS = [
  '축제 기간 중 청년광장 내 총학생회 부스에 와서 앱을 보여주세요!',
  'BOSE 이어폰 추첨 당첨자께는 서강메일로 개별 안내드릴 예정입니다.',
];

export default function PrizeInfo() {
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
          경품 수령 방법
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
