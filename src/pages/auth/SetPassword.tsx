import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@/components/Layout';

export default function SetPassword() {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isPasswordInvalid = password.length > 0 && !passwordRegex.test(password);
  const isMismatch = confirm.length > 0 && password !== confirm;
  const isValid = passwordRegex.test(password) && password === confirm;

  return (
    // 2. 전체를 TouchableWithoutFeedback으로 감싸고 onPress에 Keyboard.dismiss 연결
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Layout title="비밀번호 설정" showBack>
          <View className="mx-[17px] mt-6 gap-6">
            <View className="mb-2">
              <Text className="text-2xl font-bold text-gray-800">비밀번호를 입력해주세요.</Text>
              <Text className="text-lg text-gray-400 mt-1">영문/숫자 혼합, 8글자 이상으로 만들어주세요.</Text>
            </View>

            {/* 비밀번호 입력 섹션 */}
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-700">비밀번호</Text>
                {isPasswordInvalid && (
                  <Text className="text-xs text-red-500">규칙에 맞춰 설정해주세요.</Text>
                )}
              </View>
              <View className={'flex-row bg-white border rounded-xl px-4 items-center border-gray-200'}>
                <TextInput
                  className={`flex-1 py-4 text-sm ${isPasswordInvalid ? 'text-red-500' : 'text-gray-800'}`}
                  placeholder="비밀번호를 입력해주세요."
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* 비밀번호 확인 섹션 */}
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-700">비밀번호 확인</Text>
                {isMismatch && (
                  <Text className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</Text>
                )}
              </View>
              <View className={'flex-row bg-white border rounded-xl px-4 items-center border-gray-200'}>
                <TextInput
                  className={`flex-1 py-4 text-sm ${isMismatch ? 'text-red-500' : 'text-gray-800'}`}
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                  placeholderTextColor="#aaa"
                  value={confirm}
                  onChangeText={setConfirm}
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          <View className="mx-[17px] py-4 mt-auto">
            <TouchableOpacity
              className={`rounded-2xl h-14 items-center justify-center ${isValid ? 'bg-primary' : 'bg-gray-200'}`}
              disabled={!isValid}
              onPress={() => navigation.navigate('SignUpComplete')}
            >
              <Text className={`text-base font-semibold ${isValid ? 'text-white' : 'text-gray-400'}`}>
                계속하기
              </Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
}