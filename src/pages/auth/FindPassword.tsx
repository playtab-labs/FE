import { authApi } from "@/api/auth";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

export default function FindPassword() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSendCode = async () => {
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }
    setSending(true);
    try {
      const res = await authApi.sendPasswordResetCode(email);
      if (res.data.success) {
        setEmailError(false);
        setCodeSent(true);
        setCode("");
        setCodeVerified(false);
        setCodeError(false);
      } else {
        setEmailError(true);
      }
    } catch {
      setEmailError(true);
    } finally {
      setSending(false);
    }
  };

  const handleVerifyCode = async () => {
    setVerifying(true);
    try {
      const res = await authApi.verifyPasswordResetCode(email, code);
      if (res.data.success) {
        setCodeVerified(true);
        setCodeError(false);
      } else {
        setCodeError(true);
      }
    } catch {
      setCodeError(true);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout title={t("login.findPassword")} showBack showCamera={false}>
          <View className="mt-6 gap-6">
            {/* 이메일 + 번호발송 */}
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-dark-gray">
                  {t("emailVerify.emailLabel")}
                </Text>
                {emailError ? (
                  <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                    {t("login.userNotFound")}
                  </Text>
                ) : codeSent ? (
                  <Text className="text-b4 font-rg text-[#656565]">
                    {t("personalChange.findPasswordCodeSent")}
                  </Text>
                ) : null}
              </View>
              <View className="flex-row gap-2 items-center">
                <Input
                  size="with-button"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!codeVerified && !sending}
                  error={emailError}
                />
                <Button
                  label={
                    codeSent
                      ? t("personalChange.findPasswordResendCode")
                      : t("personalChange.findPasswordSendCode")
                  }
                  size="short"
                  state={
                    email.length === 0 || sending
                      ? "inactive"
                      : codeSent
                        ? "reactivated"
                        : "active"
                  }
                  onPress={handleSendCode}
                />
              </View>
            </View>

            {/* 이메일 인증번호 + 인증하기 */}
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-dark-gray">
                  {t("emailVerify.verificationCodeLabel")}
                </Text>
                {codeError ? (
                  <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                    {t("emailVerify.codeMismatch")}
                  </Text>
                ) : codeSent ? (
                  <Text className="text-b4 font-rg text-[#656565]">
                    {codeVerified
                      ? t("emailVerify.verified")
                      : t("personalChange.findPasswordCodeExpiry")}
                  </Text>
                ) : null}
              </View>
              <View className="flex-row gap-2 items-center">
                <Input
                  size="with-button"
                  placeholder={t("emailVerify.verificationCodePlaceholder")}
                  value={code}
                  onChangeText={(v) => {
                    setCode(v);
                    setCodeError(false);
                  }}
                  keyboardType="number-pad"
                  editable={codeSent && !codeVerified && !verifying}
                />
                <Button
                  label={
                    codeVerified
                      ? t("personalChange.verifyCompleteButton")
                      : t("emailVerify.verify")
                  }
                  size="short"
                  state={
                    codeVerified || verifying
                      ? "inactive"
                      : code.length > 0
                        ? "active"
                        : "inactive"
                  }
                  onPress={handleVerifyCode}
                />
              </View>
            </View>
          </View>

          <View className="items-center py-4 mt-auto mb-10">
            <Button
              label={t("personalChange.findPasswordToReset")}
              size="long"
              state={codeVerified ? "active" : "inactive"}
              onPress={() => navigation.navigate("ResetPassword", { email })}
            />
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
}
