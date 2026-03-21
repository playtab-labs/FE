import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@/components/Layout';
import TERMS_DATA from '@/mockdatas/TermsDetail.json';

export default function TermsDetail() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { termId } = route.params;
  const term = TERMS_DATA.find((t) => t.id === termId);

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
        <Text className="text-base font-bold text-gray-800 mt-4 mb-3">{term?.label}</Text>
        <Text className="text-sm text-gray-600 leading-6">{term?.content ?? '약관 내용을 준비 중입니다.'}</Text>
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
