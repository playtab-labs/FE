import { authApi } from "@/api/auth";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useSignupStore } from "@/stores/signupStore";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z"
        stroke="#BFBFBF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="10" cy="10" r="2.5" stroke="#BFBFBF" strokeWidth="1.5" />
      {!visible && (
        <Line
          x1="3" y1="3" x2="17" y2="17"
          stroke="#BFBFBF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}

export default function SetPassword() {
  const navigation = useNavigation<any>();
  const { name, gender, birthDate, nationality, email, consents } =
    useSignupStore();
  const setPassword = useSignupStore((s) => s.setPassword);
  const reset = useSignupStore((s) => s.reset);
  const [password, setPasswordInput] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isPasswordInvalid = passwordTouched && !passwordRegex.test(password);
  const isMismatch = confirmTouched && password !== confirm;
  const isValid = passwordRegex.test(password) && password === confirm;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Layout title="비밀번호 설정" showBack>
          <View className="mt-6 gap-6 items-center px-2">
            {/* 안내 문구 */}
            <View className="w-[342px] mb-2">
              <View className="flex-row items-center flex-wrap">
                <Text className="text-h1 font-eb text-text-salmon">
                  비밀번호
                </Text>
                <Text className="text-h1 font-eb text-gray-black">
                  를 입력해주세요.
                </Text>
              </View>
              <Text className="text-b3 font-sb text-dark-gray mt-1">
                영문/숫자 혼합, 8글자 이상으로 만들어주세요.
              </Text>
            </View>

            <View className="flex-col mt-[66px] gap-6">
              {/* 비밀번호 */}
              <View className="w-[342px] gap-[6px]">
                <View className="flex-row justify-between items-center">
                  <Text className="text-b3 font-sb text-dark-gray">
                    비밀번호
                  </Text>
                  {isPasswordInvalid && (
                    <Text className="text-b4 text-secondary-bubblegum-pink">
                      규칙에 맞춰 설정해주세요.
                    </Text>
                  )}
                </View>
                <Input
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChangeText={setPasswordInput}
                  onFocus={() => setPasswordTouched(false)}
                  onBlur={() => setPasswordTouched(true)}
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  error={isPasswordInvalid}
                  rightIcon={password.length > 0 ? <EyeIcon visible={showPassword} /> : undefined}
                  onRightIconPress={() => setShowPassword((v) => !v)}
                />
              </View>

              {/* 비밀번호 확인 */}
              <View className="w-[342px] gap-[6px]">
                <View className="flex-row justify-between items-center">
                  <Text className="text-b3 font-sb text-dark-gray">
                    비밀번호 확인
                  </Text>
                  {isMismatch && (
                    <Text className="text-b4 text-secondary-bubblegum-pink">
                      비밀번호가 일치하지 않습니다.
                    </Text>
                  )}
                </View>
                <Input
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                  value={confirm}
                  onChangeText={setConfirm}
                  onFocus={() => setConfirmTouched(false)}
                  onBlur={() => setConfirmTouched(true)}
                  autoCapitalize="none"
                  secureTextEntry={!showConfirm}
                  error={isMismatch}
                  rightIcon={confirm.length > 0 ? <EyeIcon visible={showConfirm} /> : undefined}
                  onRightIconPress={() => setShowConfirm((v) => !v)}
                />
              </View>
            </View>
          </View>

          <View className="items-center py-4 mt-auto mb-10">
            <Button
              label="계속하기"
              size="long"
              state={isValid ? "active" : "inactive"}
              onPress={async () => {
                try {
                  setPassword(password);
                  const payload = {
                    email,
                    password,
                    name,
                    gender: gender!,
                    phoneNumber: null as any,
                    birthDate,
                    nationality,
                    consents,
                  };
                  await authApi.signup(payload);
                  reset();
                  navigation.navigate("SignUpComplete");
                } catch (e: any) {}
              }}
            />
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
}
