import { authApi } from "@/api/auth";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import Input from "@/components/common/Input";
import { useSignupStore } from "@/stores/signupStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";

const SOGANG_DOMAIN = "@sogang.ac.kr";

export default function EmailVerify() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isSogang = route.params?.userType === "sogang";
  const setEmail = useSignupStore((s) => s.setEmail);

  const [emailPrefix, setEmailPrefix] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const email = isSogang ? `${emailPrefix}${SOGANG_DOMAIN}` : emailPrefix;

  const canSend = isSogang
    ? emailPrefix.trim().length > 0
    : emailPrefix.includes("@");
  const sendState = verified
    ? "inactive"
    : sent
      ? "reactivated"
      : canSend
        ? "active"
        : "inactive";
  const verifyState = sent && !verified ? "active" : "inactive";

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(180);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleSend = async () => {
    setEmailError("");
    try {
      await authApi.sendEmailVerification(email);
      setSent(true);
      setCode("");
      setVerified(false);
      setError("");
      startTimer();
    } catch (e: any) {
      if (e?.response?.status === 409) {
        setEmailError(t("emailVerify.emailAlreadyRegistered"));
      } else {
        setError(t("emailVerify.sendFailed"));
        console.error("[이메일 발송] status:", e?.response?.status, "data:", JSON.stringify(e?.response?.data));
        console.error("[이메일 발송] message:", e?.message, "code:", e?.code, "url:", e?.config?.url, "baseURL:", e?.config?.baseURL);
      }
    }
  };

  const handleVerify = async () => {
    try {
      const res = await authApi.verifyEmail(email, code);
      if (res.data.verified) {
        setEmail(email);
        setVerified(true);
        setError("");
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setError(t("emailVerify.codeMismatch"));
      }
    } catch {
      setError(t("emailVerify.codeMismatch"));
    }
  };

  return (
    <Layout title={t("emailVerify.appBar")} showBack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-6 gap-6">
          {/* 안내 문구 */}
          <View className="w-full mb-2">
            <ColoredText
              text={t(isSogang ? "emailVerify.title" : "emailVerify.titleExternal")}
              className="text-h1 font-eb text-gray-black"
            />
            <Text className="text-b3 font-sb text-dark-gray mt-1">
              {t("emailVerify.subtitle")}
            </Text>
          </View>

          <View className="flex-col mt-[66px] gap-6">
            {/* 이메일 입력 */}
            <View className="w-full gap-[6px]">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-dark-gray">{t("emailVerify.emailLabel")}</Text>
                {emailError ? (
                  <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                    {emailError}
                  </Text>
                ) : null}
              </View>
              <View className="flex-row gap-2 items-center">
                {isSogang ? (
                  <View
                    className="flex-row items-center rounded-lg border border-[#E4E4E4] bg-white px-3 h-[42px]"
                    style={{ width: 230 }}
                  >
                    <TextInput
                      className="flex-1 text-b3 font-md text-gray-black"
                      placeholderTextColor="#E4E4E4"
                      value={emailPrefix}
                      onChangeText={(text) => { setEmailPrefix(text); setEmailError(""); }}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      editable={!verified}
                    />
                    <Text className="text-b3 text-[#E4E4E4]">
                      {SOGANG_DOMAIN}
                    </Text>
                  </View>
                ) : (
                  <Input
                    size="with-button"
                    placeholder={t("login.emailPlaceholder")}
                    value={emailPrefix}
                    onChangeText={(text) => { setEmailPrefix(text); setEmailError(""); }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!verified}
                  />
                )}
                <Button
                  label={sent ? t("emailVerify.resend") : t("emailVerify.send")}
                  size="short"
                  state={sendState}
                  onPress={handleSend}
                />
              </View>
            </View>

            {/* 인증번호 입력 */}
            <View className="w-full gap-[6px]">
              <View className="flex-row items-center justify-between">
                <Text className="text-b3 font-sb text-dark-gray">{t("emailVerify.codeLabel")}</Text>
                {verified ? (
                  <Text className="text-b4 text-dark-gray">
                    {t("emailVerify.verified")}
                  </Text>
                ) : error ? (
                  <Text className="text-b4 text-red-500">{error}</Text>
                ) : sent ? (
                  <Text className="text-b4 text-dark-gray">
                    {t("emailVerify.verifyWithin3Min")}
                  </Text>
                ) : null}
              </View>
              <View className="flex-row gap-2 items-center">
                <Input
                  size="with-button"
                  placeholder={t("emailVerify.verificationCodePlaceholder")}
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    setError("");
                  }}
                  keyboardType="number-pad"
                  editable={sent && !verified}
                />
                <Button
                  label={t("emailVerify.verify")}
                  size="short"
                  state={verifyState}
                  onPress={handleVerify}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 계속하기 */}
      <View className="py-4 pb-10">
        <Button
          label={t("emailVerify.continue")}
          size="long"
          state={verified ? "active" : "inactive"}
          onPress={() => navigation.navigate("SetPassword")}
        />
      </View>
    </Layout>
  );
}
