import { authApi } from "@/api/auth";
import Layout from "@/components/Layout";
import ColoredText from "@/components/common/ColoredText";
import { useAuthStore } from "@/stores/authStore";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

const GET_MY_EMAIL = gql`
  query GetMyEmail {
    me {
      email
    }
  }
`;

const WITHDRAW_MY_ACCOUNT = gql`
  mutation WithdrawMyAccount($input: WithdrawMyAccountInput!) {
    withdrawMyAccount(input: $input) {
      success
    }
  }
`;


function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z"
        stroke="#BFBFBF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="10" cy="10" r="2.5" stroke="#BFBFBF" strokeWidth="1.5" />
      {!visible && (
        <Line
          x1="3"
          y1="3"
          x2="17"
          y2="17"
          stroke="#BFBFBF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}

export default function WithdrawConfirm() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { refreshToken, clearTokens } = useAuthStore();
  const NOTICES = [
    t("personalChange.withdrawNotice1"),
    t("personalChange.withdrawNotice2"),
    t("personalChange.withdrawNotice3"),
  ];
  const { data: meData } = useQuery<{ me: { email: string } }>(GET_MY_EMAIL);
  const [withdrawMyAccount, { loading: withdrawLoading }] = useMutation<{
    withdrawMyAccount: { success: boolean };
  }>(WITHDRAW_MY_ACCOUNT);

  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVerify = async () => {
    const email = meData?.me?.email;
    if (!email) return;
    setVerifyLoading(true);
    setVerifyError(false);
    try {
      await authApi.loginEmail(email, password);
      setVerified(true);
    } catch {
      setVerifyError(true);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      const token =
        refreshToken ??
        (await import("expo-secure-store").then((m) =>
          m.getItemAsync("refreshToken"),
        ));
      if (!token) return;
      const res = await withdrawMyAccount({
        variables: { input: { refreshToken: token } },
      });
      if (res.data?.withdrawMyAccount.success) {
        setShowModal(true);
      }
    } catch {
      // 탈퇴 실패
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Layout title={t("personalChange.withdrawAppBar")} showBack showCamera={false}>
        <View className="flex-1">
          {/* 안내 문구 */}
          <View className="py-4 gap-4">
            <ColoredText text={t("personalChange.withdrawConfirmTitle")} className="text-h1 font-eb text-gray-black" />
            <Text className="text-b3 font-sb text-[#656565]">
              {t("personalChange.withdrawConfirmSubtitle")}
            </Text>
          </View>

          {/* 유의사항 카드 */}
          <View className="mt-20 mb-4 rounded-2xl bg-white p-4 gap-3">
            <Text className="text-t3 font-eb text-dark-gray">
              {t("personalChange.withdrawNoticeTitle")}
            </Text>
            <View className="gap-1 px-1">
              {NOTICES.map((notice, i) => (
                <View key={i} className="flex-row gap-2">
                  <Text className="text-b4 font-rg text-dark-gray">•</Text>
                  <Text className="text-b4 font-rg text-dark-gray flex-1">
                    {notice}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* 비밀번호 인증 */}
          <View className="mt-auto gap-2 pb-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-b3 font-sb text-gray-black">{t("setPassword.passwordLabel")}</Text>
              {verified ? (
                <Text className="text-b4 font-rg text-dark-gray">
                  {t("emailVerify.verified")}
                </Text>
              ) : verifyError ? (
                <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                  {t("setPassword.mismatch")}
                </Text>
              ) : (
                <Text className="text-b4 font-rg text-dark-gray">
                  {t("personalChange.passwordVerifyDescription")}
                </Text>
              )}
            </View>
            <View className="flex-row gap-2 items-center">
              {/* 비밀번호 입력 + 눈 아이콘 */}
              <View className="flex-1 h-14 bg-extra-white border border-[#E4E4E4] rounded-xl flex-row items-center px-4">
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setVerifyError(false);
                  }}
                  placeholder={t("login.passwordPlaceholder")}
                  placeholderTextColor="#BFBFBF"
                  secureTextEntry={!showPassword}
                  editable={!verified}
                  className="flex-1 text-b3 font-rg text-gray-black"
                />
                {password.length > 0 && !verified && (
                  <TouchableOpacity
                    onPress={() => setShowPassword((v) => !v)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <EyeIcon visible={showPassword} />
                  </TouchableOpacity>
                )}
              </View>

              {/* 인증하기 / 인증완료 버튼 */}
              <TouchableOpacity
                disabled={!password || verified || verifyLoading}
                activeOpacity={0.8}
                onPress={handleVerify}
                className={`w-[104px] h-[42px] items-center justify-center rounded-xl ${
                  verified
                    ? "bg-[#E4E4E4]"
                    : password && !verifyLoading
                      ? "bg-[#FFA38C]"
                      : "bg-[#BFBFBF]"
                }`}
              >
                {verifyLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    className={`text-b3 font-sb ${verified ? "text-[#BFBFBF]" : "text-white"}`}
                  >
                    {verified ? t("personalChange.verifyCompleteButton") : t("emailVerify.verify")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* 하단 버튼 */}
            <View className="flex-row gap-3 mt-2 mb-10">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
                className="flex-1 h-14 items-center justify-center rounded-2xl bg-extra-white border border-[#E4E4E4]"
              >
                <Text className="text-t3 font-eb text-gray-black">
                  {t("personalChange.keepUsing")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!verified || withdrawLoading}
                activeOpacity={0.8}
                onPress={handleWithdraw}
                className={`flex-1 h-14 items-center justify-center rounded-2xl ${verified && !withdrawLoading ? "bg-[#FFA38C]" : "bg-[#BFBFBF]"}`}
              >
                {withdrawLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    className={`text-t3 font-eb ${verified ? "text-gray-black" : "text-white"}`}
                  >
                    {t("personalChange.withdrawButton")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Layout>

      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="bg-white rounded-2xl items-center w-[320px] px-6 py-9 gap-6">
            <Text className="text-b3 font-rg text-gray-black">
              {t("personalChange.withdrawSuccess")}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={async () => {
                await clearTokens();
                (navigation as any).reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }}
              className="bg-[#FFA38C] rounded-xl px-3 py-3"
            >
              <Text className="text-b3 font-sb text-gray-black">
                {t("personalChange.returnToHome")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
