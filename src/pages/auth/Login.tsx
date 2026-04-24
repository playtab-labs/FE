import { authApi } from "@/api/auth";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { EyeOffIcon, EyeOnIcon } from "@/components/icons/EyeIcon";
import RadioIcon from "@/components/icons/RadioIcon";
import Layout from "@/components/Layout";
import { useAuthStore } from "@/stores/authStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const navigation = useNavigation<any>();
  const { setTokens, saveEmail, loadEmail, clearEmail } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);
  const [rememberID, setRememberID] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmail().then((saved) => {
      if (saved) {
        setEmail(saved);
        setRememberID(true);
      }
    });
  }, []);

  return (
    <Layout title="로그인" showBack={false} showCamera={false}>
      {/* 로고 */}
      <View className="items-center mt-[36px]">
        <Image
          source={require("@/assets/pngs/logo.png")}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 입력 폼 */}
      <View className="mt-[51px] gap-4 items-center">
        <Input
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          rightIcon={showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        {/* 라디오 버튼 */}
        <View className="w-[342px] flex-row gap-5">
          <TouchableOpacity
            className="flex-row items-center gap-1.5"
            onPress={() => setKeepLogin(!keepLogin)}
          >
            <RadioIcon active={keepLogin} />
            <Text className="text-[13px] text-gray-600">로그인 상태 유지</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-1.5"
            onPress={() => setRememberID(!rememberID)}
          >
            <RadioIcon active={rememberID} />
            <Text className="text-[13px] text-gray-600">ID 기억하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그인 버튼 */}
      <View className="items-center mt-[85px]">
        {error ? (
          <Text className="text-b4 text-red-500 mb-2">{error}</Text>
        ) : null}
        <Button
          label="로그인"
          size="long"
          state="active"
          onPress={async () => {
            try {
              setError("");
              const res = await authApi.loginEmail(email, password);
              if (rememberID) {
                await saveEmail(email);
              } else {
                await clearEmail();
              }
              try {
                await setTokens(
                  res.data.accessToken,
                  res.data.refreshToken,
                  keepLogin,
                );
              } catch {}
              navigation.reset({ index: 0, routes: [{ name: "LoadingScreen" }] });
            } catch {
              setError("이메일 또는 비밀번호가 올바르지 않습니다.");
            }
          }}
        />
      </View>

      {/* 회원가입 / 비밀번호 찾기 */}
      <View className="flex-row justify-center items-center mt-4 gap-[13px]">
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-b4 font-sb text-dark-gray underline">
            회원가입
          </Text>
        </TouchableOpacity>
        <Text className="text-[13px] text-gray-400">|</Text>
        <TouchableOpacity onPress={() => navigation.navigate("FindPassword")}>
          <Text className="text-b4 font-sb text-dark-gray underline">
            비밀번호 찾기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 임시 버튼 */}
      <TouchableOpacity
        className="mx-[17px] mt-3 h-11 border border-gray-300 rounded-lg items-center justify-center"
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text className="text-sm text-gray-400">임시 - 홈으로 이동</Text>
      </TouchableOpacity>
    </Layout>
  );
}
