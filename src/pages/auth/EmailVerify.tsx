import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const SOGANG_DOMAIN = "@sogang.ac.kr";
const MOCK_CODE = "123456";

export default function EmailVerify() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isSogang = route.params?.userType === "sogang";

  const [emailPrefix, setEmailPrefix] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const canSend = isSogang
    ? emailPrefix.trim().length > 0
    : emailPrefix.includes("@");
  const sendState = verified
    ? "inactive"
    : sent
      ? "reactivated"
      : canSend
        ? "active"
        : "inactive";
  const verifyState = sent && !verified ? "active" : "inactive";

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

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleSend = () => {
    setSent(true);
    setCode("");
    setVerified(false);
    setError("");
    startTimer();
  };

  const handleVerify = () => {
    if (code === MOCK_CODE) {
      setVerified(true);
      setError("");
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setError("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <Layout title="이메일 인증" showBack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-6 gap-6 items-center">
          {/* 안내 문구 */}
          <View className="w-[342px] mb-2">
            <View className="flex-row items-center flex-wrap">
              {isSogang ? (
                <>
                  <Text className="text-h1 font-eb text-secondary-salmon">
                    서강대학교 이메일 인증
                  </Text>
                  <Text className="text-h1 font-eb text-gray-black">
                    을 해주세요.
                  </Text>
                </>
              ) : (
                <>
                  <Text className="text-h1 font-eb text-secondary-salmon">
                    이메일 인증
                  </Text>
                  <Text className="text-h1 font-eb text-gray-black">
                    을 해주세요.
                  </Text>
                </>
              )}
            </View>
            <Text className="text-b3 font-sb text-dark-gray mt-1">
              이메일은 추후에 변경할 수 없으니 신중히 입력해주세요.
            </Text>
          </View>

          <View className="flex-col mt-[66px] gap-6">
            {/* 이메일 입력 */}
            <View className="w-[342px] gap-[6px]">
              <Text className="text-b3 font-sb text-dark-gray">이메일</Text>
              <View className="flex-row gap-2 items-center">
                {isSogang ? (
                  <View
                    className="flex-row items-center rounded-lg border border-[#E4E4E4] bg-white px-3 h-[42px]"
                    style={{ width: 230 }}
                  >
                    <TextInput
                      className="flex-1 text-b3 font-md text-gray-black"
                      placeholderTextColor="#E4E4E4"
                      value={emailPrefix}
                      onChangeText={setEmailPrefix}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      editable={!verified}
                    />
                    <Text className="text-b3 text-[#E4E4E4]">
                      {SOGANG_DOMAIN}
                    </Text>
                  </View>
                ) : (
                  <Input
                    size="with-button"
                    placeholder="이메일을 입력해주세요."
                    value={emailPrefix}
                    onChangeText={setEmailPrefix}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!verified}
                  />
                )}
                <Button
                  label={sent ? "재발송하기" : "발송하기"}
                  size="short"
                  state={sendState}
                  onPress={handleSend}
                />
              </View>
            </View>

            {/* 인증번호 입력 */}
            <View className="w-[342px] gap-[6px]">
              <View className="flex-row items-center justify-between">
                <Text className="text-b3 font-sb text-dark-gray">인증번호</Text>
                {verified ? (
                  <Text className="text-b4 text-dark-gray">
                    인증되었습니다.
                  </Text>
                ) : error ? (
                  <Text className="text-b4 text-red-500">{error}</Text>
                ) : sent ? (
                  <Text className="text-b4 text-dark-gray">
                    3분 이내에 인증해주세요.
                  </Text>
                ) : null}
              </View>
              <View className="flex-row gap-2 items-center">
                <Input
                  size="with-button"
                  placeholder="인증번호를 입력해주세요."
                  value={code}
                  onChangeText={(t) => {
                    setCode(t);
                    setError("");
                  }}
                  keyboardType="number-pad"
                  editable={sent && !verified}
                />
                <Button
                  label="인증하기"
                  size="short"
                  state={verifyState}
                  onPress={handleVerify}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 계속하기 */}
      <View className="items-center py-4">
        <Button
          label="계속하기"
          size="long"
          state={verified ? "active" : "inactive"}
          onPress={() => navigation.navigate("SetPassword")}
        />
      </View>
    </Layout>
  );
}
