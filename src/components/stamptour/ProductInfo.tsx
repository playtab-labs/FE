import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const ITEMS = [
  '9개 미션 중 6개 이상 달성 시 전원 알로스 키링 증정!',
  '9개 미션 중 6개 이상 달성 시 BOSE 제품 추첨 자동 응모',
  '제품: QC 울트라 헤드폰 2개, 오픈 이어버드 3개, 사운드링크 마이크로 2세대 스피커 5개'
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
          gap: 8,
        }}
      >
        <Text className={`${typo.T3_Eb} text-gray-black`}>
          경품 안내
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
