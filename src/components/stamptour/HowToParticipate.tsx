import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const STEPS = [
  '1. 축제 기간 동안 각 미션 장소를 방문합니다.',
  '2. 현장에서 스탬프(QR)를 인증합니다.',
  '3. 앱에서 스탬프를 모아 빙고를 완성합니다.',
  '4. 총 9개 중 6개 이상 달성 시 자동 응모 완료!',
];

export default function HowToParticipate() {
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
          참여방법
        </Text>

        <View>
          {STEPS.map((step, index) => (
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
