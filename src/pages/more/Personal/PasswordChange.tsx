import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const MOCK_CODE = "1234";

export default function PasswordChange() {
  const navigation = useNavigation<any>();

  // Phase 1: 이메일 인증
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeError, setCodeError] = useState(false);

  // Phase 2: 비밀번호 변경
  const [phase, setPhase] = useState<1 | 2>(1);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [confirmBlurred, setConfirmBlurred] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSendCode = () => {
    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setCodeSent(true);
    setCode("");
    setCodeVerified(false);
    setCodeError(false);
  };

  const handleVerifyCode = () => {
    if (code === MOCK_CODE) {
      setCodeVerified(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isPasswordInvalid =
    passwordBlurred && password.length > 0 && !passwordRegex.test(password);
  const isMismatch =
    confirmBlurred && confirm.length > 0 && password !== confirm;
  const isPasswordValid = passwordRegex.test(password) && password === confirm;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout title="비밀번호 변경" showBack showCamera={false}>
          {phase === 1 ? (
            <>
              <View className="mt-6 gap-6 items-center">
                {/* 이메일 + 번호발송 */}
                <View className="w-[342px] gap-[6px]">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-b3 font-sb text-dark-gray">
                      이메일
                    </Text>
                    {emailError ? (
                      <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                        해당하는 사용자가 없습니다.
                      </Text>
                    ) : codeSent ? (
                      <Text className="text-b4 font-rg text-[#656565]">
                        발송되었습니다.
                      </Text>
                    ) : null}
                  </View>
                  <View className="flex-row gap-2 items-center">
                    <Input
                      size="with-button"
                      placeholder="이메일을 입력해주세요."
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!codeVerified}
                      error={emailError}
                    />
                    <Button
                      label={codeSent ? "번호 재발송" : "번호발송"}
                      size="short"
                      state={
                        email.length === 0
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
                <View className="w-[342px] gap-[6px]">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-b3 font-sb text-dark-gray">
                      이메일 인증번호
                    </Text>
                    {codeError ? (
                      <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                        인증번호가 일치하지 않습니다.
                      </Text>
                    ) : codeSent ? (
                      <Text className="text-b4 font-rg text-[#656565]">
                        {codeVerified
                          ? "인증되었습니다."
                          : "인증번호는 3분간 유효합니다."}
                      </Text>
                    ) : null}
                  </View>
                  <View className="flex-row gap-2 items-center">
                    <Input
                      size="with-button"
                      placeholder="인증번호를 입력해주세요."
                      value={code}
                      onChangeText={(t) => {
                        setCode(t);
                        setCodeError(false);
                      }}
                      keyboardType="number-pad"
                      editable={codeSent && !codeVerified}
                    />
                    <Button
                      label={codeVerified ? "인증완료" : "인증하기"}
                      size="short"
                      state={
                        codeVerified
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

              <View className="items-center mt-auto mb-[40px]">
                <Button
                  label="비밀번호 변경하기"
                  size="long"
                  state={codeVerified ? "active" : "inactive"}
                  onPress={() => setPhase(2)}
                />
              </View>
            </>
          ) : (
            <>
              <View className="mt-6 gap-6 items-center">
                <Input
                  label="비밀번호 설정"
                  description={
                    isPasswordInvalid
                      ? "규칙에 맞게 설정해주세요."
                      : "영문, 숫자 조합 8글자 이상으로 설정해주세요."
                  }
                  placeholder="변경할 비밀번호를 입력해주세요."
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordBlurred(false)}
                  onBlur={() => setPasswordBlurred(true)}
                  autoCapitalize="none"
                  error={isPasswordInvalid}
                />
                <Input
                  label="비밀번호 확인"
                  description={
                    isMismatch ? "비밀번호가 일치하지 않습니다." : undefined
                  }
                  placeholder="변경할 비밀번호를 한 번 더 입력해주세요."
                  value={confirm}
                  onChangeText={setConfirm}
                  onFocus={() => setConfirmBlurred(false)}
                  onBlur={() => setConfirmBlurred(true)}
                  autoCapitalize="none"
                  error={isMismatch}
                />
              </View>

              <View className="items-center mt-auto mb-[40px]">
                <Button
                  label="비밀번호 변경완료"
                  size="long"
                  state={isPasswordValid ? "active" : "inactive"}
                  onPress={() => setShowModal(true)}
                />
              </View>
            </>
          )}
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
                  navigation.navigate("PersonalChange");
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
      </View>
    </TouchableWithoutFeedback>
  );
}
