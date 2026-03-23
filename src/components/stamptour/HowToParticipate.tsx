import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

const STEPS = [
  '▪총학생회 스탬프판을 수령한다.',
  '▪축제를 즐기면서 스탬프판을 완성한다',
  '▪12칸 중 6칸 이상을 채워 기간 내에 총학생회 굿즈부스에 제출한다!',
  '*총학생회 굿즈부스: (월~수) 청년광장 / (목) 운동장 입구',
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
          gap: 16,
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
