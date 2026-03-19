import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@/components/Layout';

export const TERMS_LIST = [
  { id: 'service',   label: '이용약관',                     required: true  },
  { id: 'privacy',   label: '개인정보 수집 및 이용 동의',   required: true  },
  { id: 'location',  label: '위치 정보 서비스 이용약관',    required: false },
  { id: 'marketing', label: '맞춤형 정보 수신 동의 약관',   required: false },
];

export default function Terms() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (route.params?.agreedTermId) {
      setAgreed((prev) => ({ ...prev, [route.params.agreedTermId]: true }));
      navigation.setParams({ agreedTermId: null });
    }
  }, [route.params?.agreedTermId]);

  const allAgreed = TERMS_LIST.every((t) => agreed[t.id]);
  const requiredAgreed = TERMS_LIST.filter((t) => t.required).every((t) => agreed[t.id]);

  const toggleAll = () => {
    if (allAgreed) setAgreed({});
    else setAgreed(Object.fromEntries(TERMS_LIST.map((t) => [t.id, true])));
  };

  return (
    <Layout title="약관동의" showBack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-[17px] mt-6 gap-4">

          <View className="mb-2">
            <Text className="text-2xl font-bold text-gray-800">약관에 동의해주세요.</Text>
            <Text className="text-lg text-gray-400 mt-1">PLAYTAP의 서비스를 이용하기 위해 필요해요.</Text>
          </View>

          <TouchableOpacity
            className={`rounded-2xl h-14 items-center justify-center flex-row gap-2 mt-[87px] ${allAgreed ? 'bg-primary' : 'bg-white border border-primary'}`}
            onPress={toggleAll}
          >
            <Text className={`text-base font-semibold ${allAgreed ? 'text-white' : 'text-primary'}`}>
              약관 전체동의
            </Text>
            <Ionicons name="chevron-forward" size={18} color={allAgreed ? '#fff' : '#CF5363'} />
          </TouchableOpacity>

          <View className="px-4 py-1">
            {TERMS_LIST.map((term, index) => (
              <View key={term.id}>
                <View className="flex-row items-center py-3">
                  <Ionicons
                    name={agreed[term.id] ? 'checkmark-circle' : 'checkmark-circle-outline'}
                    size={22}
                    color={agreed[term.id] ? '#CF5363' : '#ccc'}
                  />
                  <Text className="flex-1 text-sm text-gray-700 ml-2">
                    <Text className="text-primary">{term.required ? '필수 ' : '선택 '}</Text>
                    {term.label}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('TermsDetail', { termId: term.id, title: term.label })}
                  >
                    <Ionicons name="chevron-forward" size={18} color="#ccc" />
                  </TouchableOpacity>
                </View>
                {index < TERMS_LIST.length - 1 && <View className="h-px bg-gray-100" />}
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* 계속하기 버튼 */}
      <View className="mx-[17px] py-4">
        <TouchableOpacity
          className={`rounded-2xl h-14 items-center justify-center ${requiredAgreed ? 'bg-primary' : 'bg-white'}`}
          disabled={!requiredAgreed}
          onPress={() => navigation.navigate('PersonalInfo')}
        >
          <Text className={`text-xl font-bold ${requiredAgreed ? 'text-white' : 'text-gray-400'}`}>
            계속하기
          </Text>
        </TouchableOpacity>
      </View>

    </Layout>
  );
}
