import { authApi } from "@/api/auth";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ToastError from "@/components/common/ToastError";
import { EyeOffIcon, EyeOnIcon } from "@/components/icons/EyeIcon";
import RadioIcon from "@/components/icons/RadioIcon";
import Layout from "@/components/Layout";
import { useAuthStore } from "@/stores/authStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { setTokens, saveEmail, loadEmail, clearEmail } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogin, setKeepLogin] = useState(true);
  const [rememberID, setRememberID] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 2500);
  };

  useEffect(() => {
    loadEmail().then((saved) => {
      if (saved) {
        setEmail(saved);
        setRememberID(true);
      }
    });
  }, []);

  return (
    <Layout title={t("login.login")} showBack={false} showCamera={false}>
      {/* 로고 */}
      <View className="items-center mt-[36px]">
        <Image
          source={require("@/assets/pngs/odysseyLogo_noempty.png")}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 입력 폼 */}
      <View className="mt-[51px] gap-4">
        <Input
          placeholder={t("login.emailPlaceholder")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder={t("login.passwordPlaceholder")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          rightIcon={showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        {/* 라디오 버튼 */}
        <View className="flex-row gap-5">
          <TouchableOpacity
            className="flex-row items-center gap-1.5"
            onPress={() => setKeepLogin(!keepLogin)}
          >
            <RadioIcon active={keepLogin} />
            <Text className="text-[13px] text-gray-600">{t("login.keepLogin")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-1.5"
            onPress={() => setRememberID(!rememberID)}
          >
            <RadioIcon active={rememberID} />
            <Text className="text-[13px] text-gray-600">{t("login.rememberEmail")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그인 버튼 */}
      <View className="mt-[85px]">
        <Button
          label={t("login.login")}
          size="long"
          state="active"
          onPress={async () => {
            if (!email || !password) {
              showToast(t("login.loginInfoEmpty"));
              return;
            }
            try {
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
              navigation.reset({
                index: 0,
                routes: [{ name: "LoadingScreen" }],
              });
            } catch (e: any) {
              const status = e?.response?.status;
              if (status === 404) {
                showToast(t("login.userNotFound"));
              } else if (status >= 500) {
                showToast(t("login.loginFailed"));
              } else {
                showToast(t("login.userMismatch"));
              }
            }
          }}
        />
      </View>

      {/* 회원가입 / 비밀번호 찾기 */}
      <View className="flex-row justify-center items-center mt-4 gap-[13px]">
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-b4 font-sb text-dark-gray underline">
            {t("register.appBar")}
          </Text>
        </TouchableOpacity>
        <Text className="text-[13px] text-gray-400">|</Text>
        <TouchableOpacity onPress={() => navigation.navigate("FindPassword")}>
          <Text className="text-b4 font-sb text-dark-gray underline">
            {t("login.findPassword")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 임시 버튼 */}
      <TouchableOpacity
        className="mt-3 h-11 border border-gray-300 rounded-lg items-center justify-center"
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text className="text-sm text-gray-400">임시 - 홈으로 이동</Text>
      </TouchableOpacity>

      {/* 에러 토스트 */}
      {toastMessage ? (
        <View className="absolute bottom-12 left-0 right-0 items-center">
          <ToastError type="login" message={toastMessage} />
        </View>
      ) : null}
    </Layout>
  );
}
