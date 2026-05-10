import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";

export default function Personal() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Layout title="PERSONAL" showBack={false}>
      <View className="flex-1 flex-col">
        {/* 문구 */}
        <View className="py-4 mt-2 gap-4">
          <ColoredText
            text={t("personal.startTitle")}
            className="text-h1 font-eb text-gray-black"
          />
          <ColoredText
            text={t("personal.startSubtitle")}
            className="text-b3 font-sb text-dark-gray"
          />
        </View>

        {/* 로고 */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("@/assets/pngs/odysseyLogo_noempty.png")}
            style={{ width: 277, height: 173 }}
            resizeMode="contain"
          />
        </View>

        {/* 버튼 */}
        <View className="mb-6 items-center">
          <Button
            label={t("personal.startButton")}
            size="long"
            state="active"
            onPress={() => navigation.navigate("Tag")}
          />
        </View>
      </View>
    </Layout>
  );
}
