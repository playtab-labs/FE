import Button from "@/components/common/Button";
import Layout from "@/components/Layout";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";

export default function Register() {
  const navigation = useNavigation<any>();

  return (
    <Layout title="회원가입" showBack={true}>
      {/* 문구 */}
      <View className="mt-[19px] gap-4">
        <View className="flex-row items-center">
          <Text className="text-h1 font-eb text-secondary-salmon">
            회원가입
          </Text>
          <Text className="text-h1 font-eb text-gray-black">
            을 진행할게요.
          </Text>
        </View>
        <Text className="text-b3 font-sb text-dark-gray">
          서브문구 넣을 거 없나
        </Text>
      </View>

      {/* 로고 */}
      <View className="items-center mt-[125px]">
        <Image
          source={require("@/assets/pngs/logo.png")}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 버튼 */}
      <View className="items-center gap-4 mt-[186px]">
        <Button
          label="서강대생으로 시작하기"
          size="long"
          state="active"
          onPress={() => navigation.navigate("Terms", { userType: "sogang" })}
        />
        <Button
          label="외부인으로 시작하기"
          size="long"
          state="active"
          onPress={() => navigation.navigate("Terms", { userType: "external" })}
        />
      </View>
    </Layout>
  );
}
