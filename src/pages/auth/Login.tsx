import Layout from "@/components/Layout";
import { EyeOffIcon, EyeOnIcon } from "@/components/icons/EyeIcon";
import RadioIcon from "@/components/icons/RadioIcon";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);
  const [rememberID, setRememberID] = useState(false);

  return (
    <Layout title="로그인">
      {/* 로고 */}
      <View className="items-center mt-[36px]">
        <Image
          source={require("@/assets/pngs/logo.png")}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 입력 폼 */}
      <View className="mx-[17px] mt-[29px] gap-4">
        {/* 이메일 */}
        <TextInput
          className="bg-white rounded-lg border border-gray-300 px-4 py-4 text-sm text-gray-800"
          placeholder="이메일을 입력해주세요."
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* 비밀번호 */}
        <View className="bg-white rounded-lg border border-gray-300 px-4 py-4 flex-row items-center">
          <TextInput
            className="flex-1 text-sm text-gray-800"
            placeholder="비밀번호를 입력해주세요."
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
          </TouchableOpacity>
        </View>

        {/* 라디오 버튼 */}
        <View className="flex-row gap-5">
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
      <TouchableOpacity className="bg-primary rounded-2xl h-14 items-center justify-center mx-[17px] mt-20">
        <Text className="text-white text-base font-semibold">로그인</Text>
      </TouchableOpacity>

      {/* 회원가입 / 비밀번호 찾기 */}
      <View className="flex-row justify-center items-center mt-4 gap-[13px]">
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-[13px] text-gray-500 underline">회원가입</Text>
        </TouchableOpacity>
        <Text className="text-[13px] text-gray-400">|</Text>
        <TouchableOpacity>
          <Text className="text-[13px] text-gray-500 underline">
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
