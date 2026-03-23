import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

export default function SetPassword() {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isPasswordInvalid =
    password.length > 0 && !passwordRegex.test(password);
  const isMismatch = confirm.length > 0 && password !== confirm;
  const isValid = passwordRegex.test(password) && password === confirm;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Layout title="비밀번호 설정" showBack>
          <View className="mt-6 gap-6 items-center">
            {/* 안내 문구 */}
            <View className="w-[342px] mb-2">
              <View className="flex-row items-center flex-wrap">
                <Text className="text-h1 font-eb text-secondary-salmon">
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
                    <Text className="text-b4 text-red-500">
                      규칙에 맞춰 설정해주세요.
                    </Text>
                  )}
                </View>
                <Input
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  error={isPasswordInvalid}
                />
              </View>

              {/* 비밀번호 확인 */}
              <View className="w-[342px] gap-[6px]">
                <View className="flex-row justify-between items-center">
                  <Text className="text-b3 font-sb text-dark-gray">
                    비밀번호 확인
                  </Text>
                  {isMismatch && (
                    <Text className="text-b4 text-red-500">
                      비밀번호가 일치하지 않습니다.
                    </Text>
                  )}
                </View>
                <Input
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                  value={confirm}
                  onChangeText={setConfirm}
                  autoCapitalize="none"
                  error={isMismatch}
                />
              </View>
            </View>
          </View>

          <View className="items-center py-4 mt-auto">
            <Button
              label="계속하기"
              size="long"
              state={isValid ? "active" : "inactive"}
              onPress={() => navigation.navigate("SignUpComplete")}
            />
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
}
