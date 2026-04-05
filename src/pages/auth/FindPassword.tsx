import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

const MOCK_CODE = "1234";

export default function FindPassword() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleSendCode = () => {
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setCodeSent(true);
    setCode("");
    setCodeVerified(false);
    setCodeError(false);
  };

  const handleVerifyCode = () => {
    if (code === MOCK_CODE) {
      setCodeVerified(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout title="비밀번호 찾기" showBack showCamera={false}>
          <View className="mt-6 gap-6 items-center">
            {/* 이메일 + 번호발송 */}
            <View className="w-[342px] gap-[6px]">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-dark-gray">이메일</Text>
                {emailError ? (
                  <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                    해당하는 사용자가 없습니다.
                  </Text>
                ) : codeSent ? (
                  <Text className="text-b4 font-rg text-[#656565]">
                    발송되었습니다.
                  </Text>
                ) : null}
              </View>
              <View className="flex-row gap-2 items-center">
                <Input
                  size="with-button"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!codeVerified}
                  error={emailError}
                />
                <Button
                  label={codeSent ? "번호 재발송" : "번호발송"}
                  size="short"
                  state={
                    email.length === 0
                      ? "inactive"
                      : codeSent
                        ? "reactivated"
                        : "active"
                  }
                  onPress={handleSendCode}
                />
              </View>
            </View>

            {/* 이메일 인증번호 + 인증하기 */}
            <View className="w-[342px] gap-[6px]">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-dark-gray">
                  이메일 인증번호
                </Text>
                {codeError ? (
                  <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                    인증번호가 일치하지 않습니다.
                  </Text>
                ) : codeSent ? (
                  <Text className="text-b4 font-rg text-[#656565]">
                    {codeVerified
                      ? "인증되었습니다."
                      : "인증번호는 3분간 유효합니다."}
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
                    setCodeError(false);
                  }}
                  keyboardType="number-pad"
                  editable={codeSent && !codeVerified}
                />
                <Button
                  label={codeVerified ? "인증완료" : "인증하기"}
                  size="short"
                  state={
                    codeVerified
                      ? "inactive"
                      : code.length > 0
                        ? "active"
                        : "inactive"
                  }
                  onPress={handleVerifyCode}
                />
              </View>
            </View>
          </View>

          <View className="items-center py-4 mt-auto">
            <Button
              label="비밀번호 변경하기"
              size="long"
              state={codeVerified ? "active" : "inactive"}
              onPress={() => navigation.navigate("ResetPassword")}
            />
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
}
