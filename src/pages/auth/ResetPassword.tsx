import { authApi } from "@/api/auth";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ToastError from "@/components/common/ToastError";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email: string = route.params?.email ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [confirmBlurred, setConfirmBlurred] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 2500);
  };

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isPasswordInvalid =
    passwordBlurred && password.length > 0 && !passwordRegex.test(password);
  const isMismatch =
    confirmBlurred && confirm.length > 0 && password !== confirm;
  const isValid = passwordRegex.test(password) && password === confirm;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await authApi.resetPassword(email, password);
      if (res.data.success) {
        setShowModal(true);
      } else {
        showToast(t("personalChange.passwordChangeFailed"));
      }
    } catch {
      showToast(t("personalChange.passwordChangeFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout
          title={t("personalChange.passwordChangeAppBar")}
          showBack
          showCamera={false}
        >
          <View className="mt-6 gap-6 items-center">
            <Input
              label={t("setPassword.appBar")}
              description={
                isPasswordInvalid
                  ? t("setPassword.formatError")
                  : t("personalChange.resetPasswordRuleHint")
              }
              placeholder={t("personalChange.resetPasswordPlaceholder")}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordBlurred(false)}
              onBlur={() => setPasswordBlurred(true)}
              autoCapitalize="none"
              secureTextEntry
              error={isPasswordInvalid}
            />
            <Input
              label={t("setPassword.confirmPasswordLabel")}
              description={isMismatch ? t("setPassword.mismatch") : undefined}
              placeholder={t("personalChange.resetPasswordConfirmPlaceholder")}
              value={confirm}
              onChangeText={setConfirm}
              onFocus={() => setConfirmBlurred(false)}
              onBlur={() => setConfirmBlurred(true)}
              autoCapitalize="none"
              secureTextEntry
              error={isMismatch}
            />
          </View>

          <View className="items-center py-4 mt-auto mb-10">
            <Button
              label={t("personalChange.passwordChangeButton")}
              size="long"
              state={isValid && !loading ? "active" : "inactive"}
              onPress={handleSubmit}
            />
          </View>
        </Layout>

        {/* 완료 모달 */}
        <Modal visible={showModal} transparent animationType="fade">
          <View className="flex-1 items-center justify-center bg-black/40">
            <View className="bg-white rounded-2xl items-center w-[85%] px-8 py-9 gap-6">
              <Text className="text-b3 font-sb text-gray-black text-center">
                {t("personalChange.passwordChangedSuccess")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Login");
                }}
                activeOpacity={0.7}
                className="bg-secondary-salmon rounded-2xl px-10 py-3"
              >
                <Text className="text-b2 font-sb text-gray-black">
                  {t("personalChange.goBack")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {toastMessage ? (
          <View className="absolute bottom-32 left-0 right-0 items-center">
            <ToastError type="password" message={toastMessage} />
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
