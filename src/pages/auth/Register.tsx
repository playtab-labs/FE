import AlosIcon from "@/assets/svgs/ALOS.svg";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import Layout from "@/components/Layout";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <Layout title={t("register.appBar")} showBack={true}>
      {/* 문구 */}
      <View>
        <View className="mt-[19px] gap-4">
          <ColoredText text={t("register.title")} className="text-h1 font-eb text-gray-black" />
          <Text className="text-b3 font-sb text-dark-gray">
            {t("register.subtitle")}
          </Text>
        </View>

        {/* 로고 */}
        <View className="items-center mt-[125px]">
          <Image
            source={require("@/assets/pngs/odysseyLogo_noempty.png")}
            style={{ width: 277, height: 173 }}
            resizeMode="contain"
          />
        </View>

        {/* 버튼 */}
        <View className="gap-4 mt-[186px]">
          <View style={{ position: "relative" }} className="w-full">
            <AlosIcon
              width={50}
              height={65}
              style={{ position: "absolute", left: 13, top: -52 }}
            />
            <Button
              label={t("register.sogangUser")}
              size="long"
              state="active"
              onPress={() =>
                navigation.navigate("Terms", { userType: "sogang" })
              }
            />
          </View>
          <Button
            label={t("register.guestUser")}
            size="long"
            state="active"
            onPress={() =>
              navigation.navigate("Terms", { userType: "external" })
            }
          />
        </View>
      </View>
    </Layout>
  );
}
