import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";

export default function SignUpComplete() {
  const navigation = useNavigation<any>();

  return (
    <Layout title="회원가입 완료" showBack>
      {/* 안내 문구 */}
      <View className="mt-[19px] gap-4">
        <View className="flex-row items-center flex-wrap">
          <Text className="text-h1 font-eb text-secondary-salmon">
            회원가입
          </Text>
          <Text className="text-h1 font-eb text-gray-black">
            이 완료되었어요.
          </Text>
        </View>
        <Text className="text-b3 font-sb text-dark-gray">
          PLAYTAP과 함께 ODYSSEY를 즐겨봐요.
        </Text>
      </View>

      {/* 로고 */}
      <View className="items-center mt-[153px]">
        <Image
          source={require("@/assets/pngs/logo.png")}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 버튼 */}
      <View className="items-center py-4 mt-auto">
        <Button
          label="계속하기"
          size="long"
          state="active"
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Tabs" }] })
          }
        />
      </View>
    </Layout>
  );
}
