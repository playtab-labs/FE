import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Modal, ScrollView, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@/components/Layout';

const NATIONALITIES = [
  '대한민국', '가나', '나이지리아', '덴마크',
  '러시아', '미국', '베트남', '세르비아',
];

const formatBirthday = (digits: string) => {
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
};

export default function PersonalInfo() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userType = route.params?.userType ?? 'external';
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [birthdayRaw, setBirthdayRaw] = useState('');
  const [nationality, setNationality] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleBirthday = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    setBirthdayRaw(digits);
  };

  const isValid =
    name.trim().length > 0 &&
    gender !== null &&
    birthdayRaw.length === 8 &&
    nationality !== '';

  return (
    <Layout title="이름 및 기타 정보" showBack>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="mx-[17px] mt-6 gap-6">

          {/* 약관 안내 문구 */}
          <View className="mb-2"> 
            <Text className="text-2xl font-bold text-gray-800">이름과 기타 정보를 입력해주세요.</Text>
            <Text className="text-lg text-gray-400 mt-1">사용자님에 대해서 알려주세요.</Text>
          </View>

          {/* 이름 */}
          <View className="gap-2 mt-[30px]">
            <View className="flex-row items-baseline justify-between">
              <Text className="text-sm font-semibold text-gray-700">이름</Text>
              <Text className="text-xs text-gray-400">실명을 입력해주세요.</Text>
            </View>
            <TextInput
              className="bg-white rounded-xl px-4 py-4 text-sm text-gray-800 border border-gray-200"
              placeholder="이름을 입력해주세요."
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* 성별 */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-700">성별</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className={`flex-1 h-12 rounded-xl items-center justify-center border ${gender === 'male' ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
                onPress={() => setGender('male')}
              >
                <Text className={`text-sm font-semibold ${gender === 'male' ? 'text-white' : 'text-gray-400'}`}>남성</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 h-12 rounded-xl items-center justify-center border ${gender === 'female' ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
                onPress={() => setGender('female')}
              >
                <Text className={`text-sm font-semibold ${gender === 'female' ? 'text-white' : 'text-gray-400'}`}>여성</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 생일 */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-700">생일</Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-4 text-sm text-gray-800 border border-gray-200"
              placeholder="8자리 숫자로 입력해주세요."
              placeholderTextColor="#aaa"
              value={formatBirthday(birthdayRaw)}
              onChangeText={handleBirthday}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          {/* 국적 */}
          <View className="gap-2">
            <View className="flex-row items-baseline justify-between">
              <Text className="text-sm font-semibold text-gray-700">국적</Text>
              <Text className="text-xs text-gray-400">이중국적인 경우 하나만 선택해주세요.</Text>
            </View>
            <TouchableOpacity
              className="bg-white rounded-xl px-4 py-4 border border-gray-200 flex-row items-center justify-between"
              onPress={() => setDropdownOpen(true)}
            >
              <Text className={`text-sm ${nationality ? 'text-gray-800' : 'text-gray-400'}`}>
                {nationality || '선택'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#aaa" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* 계속하기 버튼 */}
      <View className="mx-[17px] py-4">
        <TouchableOpacity
          className={`rounded-2xl h-14 items-center justify-center ${isValid ? 'bg-primary' : 'bg-gray-200'}`}
          disabled={!isValid}
          onPress={() => navigation.navigate('EmailVerify', { userType })}
        >
          <Text className={`text-base font-semibold ${isValid ? 'text-white' : 'text-gray-400'}`}>
            계속하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 국적 드롭다운 모달 */}
      <Modal visible={dropdownOpen} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-end"
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View className="bg-white rounded-t-3xl pb-8">
            <View className="items-center py-4">
              <View className="w-10 h-1 rounded-full bg-gray-300" />
            </View>
            <Text className="text-base font-bold text-gray-800 px-6 mb-3">국적 선택</Text>
            <FlatList
              data={NATIONALITIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-6 py-4 flex-row items-center justify-between"
                  onPress={() => { setNationality(item); setDropdownOpen(false); }}
                >
                  <Text className={`text-sm ${nationality === item ? 'text-primary font-semibold' : 'text-gray-700'}`}>
                    {item}
                  </Text>
                  {nationality === item && (
                    <Ionicons name="checkmark" size={18} color="#CF5363" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Layout>
  );
}
