import { authApi } from "@/api/auth";
import AlosIcon from "@/assets/svgs/ALOS.svg";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import { useAuthStore } from "@/stores/authStore";
import { useSignupStore } from "@/stores/signupStore";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function SignUpComplete() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { email, password, userType, reset } = useSignupStore();
  const { setTokens } = useAuthStore();

  return (
    <Layout title={t("signUpComplete.appBar")} showBack>
      {/* 안내 문구 */}
      <View className="mt-[19px] gap-4">
        <ColoredText text={t("signUpComplete.title")} className="text-h1 font-eb text-gray-black" />
        <Text className="text-b3 font-sb text-dark-gray">
          {t("signUpComplete.subtitle")}
        </Text>
      </View>

      {/* 로고 */}
      <View className="items-center mt-[153px]">
        <Image
          source={require("@/assets/pngs/odysseyLogo_noempty.png")}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 버튼 */}
      <View className="py-4 mt-auto pb-10">
        <View style={{ position: "relative" }} className="w-full">
          <Button
            label={t("signUpComplete.continue")}
            size="long"
            state="active"
            onPress={async () => {
              try {
                const loginRes = await authApi.loginEmail(email, password);
                await setTokens(loginRes.data.accessToken, loginRes.data.refreshToken, true);
              } catch {}
              reset();
              navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
            }}
          />
          {userType === "sogang" && (
            <AlosIcon
              width={98}
              height={127}
              style={{ position: "absolute", right: 6, top: -121 }}
            />
          )}
        </View>
      </View>
    </Layout>
  );
}
