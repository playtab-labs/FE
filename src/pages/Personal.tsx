import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";

export default function Personal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Layout title="PERSONAL" showBack={true}>
      <View className="flex-1 flex-col">
        {/* 문구 */}
        <View className="py-4 mt-2 gap-4 px-5">
          <View className="flex-row items-center">
            <Text className="text-h1 font-eb text-text-salmon">팔찌 연동</Text>
            <Text className="text-h1 font-eb text-gray-black">
              을 시작할게요
            </Text>
          </View>
          <Text className="text-b3 font-sb text-dark-gray">
            퍼스널라이징을 위해서는 팔찌를 연동해야 해요.
          </Text>
        </View>

        {/* 로고 */}
        <View className="items-center mt-[103px] mb-40">
          <Image
            source={require("@/assets/pngs/logo.png")}
            style={{ width: 277, height: 173 }}
            resizeMode="contain"
          />
        </View>

        {/* 버튼 */}
        <View className="mt-auto mb-6 items-center">
          <Button
            label="팔찌 연동 시작하기"
            size="long"
            state="active"
            onPress={() => navigation.navigate("Tag")}
          />
        </View>
      </View>
    </Layout>
  );
}
