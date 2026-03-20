import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@/components/Layout';

const SOGANG_DOMAIN = '@sogang.ac.kr';
const MOCK_CODE = '123456'; // 임시 인증번호

export default function EmailVerify() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isSogang = route.params?.userType === 'sogang';

  const [emailPrefix, setEmailPrefix] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullEmail = isSogang ? `${emailPrefix}${SOGANG_DOMAIN}` : emailPrefix;
  const canSend = isSogang ? emailPrefix.trim().length > 0 : emailPrefix.includes('@');

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(180);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleSend = () => {
    setSent(true);
    setCode('');
    setVerified(false);
    setError('');
    startTimer();
  };

  const handleVerify = () => {
    if (code === MOCK_CODE) {
      setVerified(true);
      setError('');
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setError('인증번호가 일치하지 않습니다.');
    }
  };

  return (
    <Layout title="이메일 인증" showBack>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="mx-[17px] mt-6 gap-6">

          <View className="mb-2">
            <Text className="text-2xl font-bold text-gray-800">이메일 인증을 해주세요.</Text>
            <Text className="text-lg text-gray-400 mt-1">이메일은 추후에 변경할 수 없으니 신중히 입력해주세요.</Text>
          </View>

          {/* 이메일 입력 */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-700">이메일</Text>
            <View className="flex-row gap-2 items-center">
              {isSogang ? (
                <View className="flex-1 flex-row bg-white border border-gray-200 rounded-xl px-4 items-center">
                  <TextInput
                    className="flex-1 py-4 text-sm text-gray-800"
                    placeholderTextColor="#aaa"
                    value={emailPrefix}
                    onChangeText={setEmailPrefix}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!verified}
                  />
                  <Text className="text-sm text-gray-400">{SOGANG_DOMAIN}</Text>
                </View>
              ) : (
                <TextInput
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-800"
                  placeholder="이메일을 인증해주세요."
                  placeholderTextColor="#aaa"
                  value={emailPrefix}
                  onChangeText={setEmailPrefix}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!verified}
                />
              )}
              <TouchableOpacity
                style={{ width: 88, backgroundColor: sent ? '#A8293A' : canSend ? '#CF5363' : '#BFBFBF' }}
                className="h-12 rounded-lg items-center justify-center"
                disabled={!canSend || verified}
                onPress={handleSend}
              >
                <Text className="text-sm font-semibold text-white">
                  {sent ? '재발송하기' : '발송하기'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 인증번호 입력 */}
          <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-700">인증번호</Text>
                {verified
                  ? <Text className="text-xs text-gray-700">인증되었습니다.</Text>
                  : error
                    ? <Text className="text-xs text-red-500">{error}</Text>
                    : sent
                      ? <Text className="text-xs text-gray-400">3분 이내에 인증해주세요.</Text>
                      : null
                }
              </View>
              <View className="flex-row gap-2 items-center">
                <TextInput
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-800"
                  placeholder="인증번호를 입력해주세요."
                  placeholderTextColor="#aaa"
                  value={code}
                  onChangeText={(t) => { setCode(t); setError(''); }}
                  keyboardType="number-pad"
                  editable={sent && !verified}
                />
                <TouchableOpacity
                  style={{ width: 88, backgroundColor: sent && !verified ? '#CF5363' : '#BFBFBF' }}
                  className="h-12 rounded-lg items-center justify-center"
                  disabled={!sent || verified}
                  onPress={handleVerify}
                >
                  <Text className="text-sm font-semibold text-white">
                    인증하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

        </View>
      </ScrollView>

      {/* 계속하기 */}
      <View className="mx-[17px] py-4">
        <TouchableOpacity
          className={`rounded-2xl h-14 items-center justify-center ${verified ? 'bg-primary' : 'bg-gray-200'}`}
          disabled={!verified}
          onPress={() => navigation.navigate('SetPassword')}
        >
          <Text className={`text-base font-semibold ${verified ? 'text-white' : 'text-gray-400'}`}>
            계속하기
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
