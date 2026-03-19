import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@/components/Layout';

const TERMS_CONTENT: Record<string, string> = {
  service: `이용약관 내용\n\n(실제 약관 내용을 여기에 입력해주세요.)`,
  privacy: `개인정보 수집 및 이용 동의 내용\n\n(실제 약관 내용을 여기에 입력해주세요.)`,
  location: `위치 정보 서비스 이용약관 내용\n\n(실제 약관 내용을 여기에 입력해주세요.)`,
  marketing: `맞춤형 정보 수신 동의 약관 내용\n\n(실제 약관 내용을 여기에 입력해주세요.)`,
};

export default function TermsDetail() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { termId, title } = route.params;

  const [reachedBottom, setReachedBottom] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 30)
      setReachedBottom(true);
  };

  return (
    <Layout title="약관동의" showBack>

      <ScrollView
        className="flex-1 mx-[17px]"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text className="text-base font-bold text-gray-800 mt-4 mb-3">{title}</Text>
        <Text className="text-sm text-gray-600 leading-6">{TERMS_CONTENT[termId]}</Text>
        <View className="h-10" />
      </ScrollView>

      <View className="mx-[17px] pt-3 pb-4 border-t border-gray-200">
        <TouchableOpacity
          className={`rounded-2xl h-14 items-center justify-center flex-row gap-2 ${reachedBottom ? 'bg-primary' : 'bg-gray-200'}`}
          disabled={!reachedBottom}
          onPress={() => navigation.navigate('Terms', { agreedTermId: termId })}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color={reachedBottom ? '#fff' : '#aaa'} />
          <Text className={`text-base font-semibold ${reachedBottom ? 'text-white' : 'text-gray-400'}`}>
            해당 약관에 동의합니다.
          </Text>
        </TouchableOpacity>
      </View>

    </Layout>
  );
}
