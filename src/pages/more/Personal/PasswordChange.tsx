import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ToastError from "@/components/common/ToastError";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

const CHANGE_MY_PASSWORD = gql`
  mutation ChangeMyPassword($input: ChangeMyPasswordInput!) {
    changeMyPassword(input: $input) {
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

export default function PasswordChange() {
  const navigation = useNavigation<any>();
  const [changeMyPassword, { loading }] = useMutation<{
    changeMyPassword: { success: boolean };
  }>(CHANGE_MY_PASSWORD);

  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  const [confirm, setConfirm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmBlurred, setConfirmBlurred] = useState(false);

  const [showModal, setShowModal] = useState(false);
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
  const isValid =
    currentPassword.length > 0 &&
    passwordRegex.test(password) &&
    password === confirm;

  const handleSubmit = async () => {
    if (password === currentPassword) {
      showToast("현재 비밀번호와 동일합니다.");
      return;
    }
    try {
      const res = await changeMyPassword({
        variables: {
          input: { currentPassword, newPassword: password },
        },
      });
      if (res.data?.changeMyPassword.success) {
        setShowModal(true);
      } else {
        showToast("현재 비밀번호가 올바르지 않습니다.");
      }
    } catch (e: any) {
      const classification = e?.errors?.[0]?.extensions?.classification;
      if (classification === "UNAUTHORIZED") {
        showToast("현재 비밀번호가 올바르지 않습니다.");
      } else {
        showToast("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout title="비밀번호 변경" showBack showCamera={false}>
          <View className="mt-6 gap-6 items-center">
            <Input
              label="현재 비밀번호"
              placeholder="현재 비밀번호를 입력해주세요."
              value={currentPassword}
              onChangeText={setCurrentPassword}
              autoCapitalize="none"
              secureTextEntry={!showCurrent}
              rightIcon={
                currentPassword.length > 0 ? (
                  <EyeIcon visible={showCurrent} />
                ) : undefined
              }
              onRightIconPress={() => setShowCurrent((v) => !v)}
            />

            <Input
              label="새 비밀번호"
              description={
                isPasswordInvalid
                  ? "규칙에 맞게 설정해주세요."
                  : "영문, 숫자 조합 8글자 이상으로 설정해주세요."
              }
              placeholder="새 비밀번호를 입력해주세요."
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordBlurred(false)}
              onBlur={() => setPasswordBlurred(true)}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              error={isPasswordInvalid}
              rightIcon={
                password.length > 0 ? (
                  <EyeIcon visible={showPassword} />
                ) : undefined
              }
              onRightIconPress={() => setShowPassword((v) => !v)}
            />

            <Input
              label="새 비밀번호 확인"
              description={
                isMismatch ? "비밀번호가 일치하지 않습니다." : undefined
              }
              placeholder="새 비밀번호를 한 번 더 입력해주세요."
              value={confirm}
              onChangeText={setConfirm}
              onFocus={() => setConfirmBlurred(false)}
              onBlur={() => setConfirmBlurred(true)}
              autoCapitalize="none"
              secureTextEntry={!showConfirm}
              error={isMismatch}
              rightIcon={
                confirm.length > 0 ? (
                  <EyeIcon visible={showConfirm} />
                ) : undefined
              }
              onRightIconPress={() => setShowConfirm((v) => !v)}
            />
          </View>

          <View className="items-center mt-auto mb-[40px]">
            <Button
              label="비밀번호 변경완료"
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
                비밀번호가 성공적으로 변경되었습니다.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  navigation.goBack();
                }}
                activeOpacity={0.7}
                className="bg-secondary-salmon rounded-2xl px-10 py-3"
              >
                <Text className="text-b2 font-sb text-gray-black">
                  돌아가기
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
