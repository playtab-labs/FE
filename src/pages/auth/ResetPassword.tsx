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

export default function ResetPassword() {
  const navigation = useNavigation<any>();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isPasswordInvalid =
    password.length > 0 && !passwordRegex.test(password);
  const isMismatch = confirm.length > 0 && password !== confirm;
  const isValid = passwordRegex.test(password) && password === confirm;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout title="비밀번호 변경" showBack showCamera={false}>
          <View className="mt-6 gap-6 items-center">
            <Input
              label="비밀번호 설정"
              description="영문, 숫자 조합 8글자 이상으로 설정해주세요."
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              error={isPasswordInvalid}
            />
            <Input
              label="비밀번호 확인"
              description={
                isMismatch ? "비밀번호가 일치하지 않습니다." : undefined
              }
              placeholder="비밀번호를 한 번 더 입력해주세요."
              value={confirm}
              onChangeText={setConfirm}
              autoCapitalize="none"
              error={isMismatch}
            />
          </View>

          <View className="items-center py-4 mt-auto">
            <Button
              label="비밀번호 변경완료"
              size="long"
              state={isValid ? "active" : "inactive"}
              onPress={() => setShowModal(true)}
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
                  navigation.navigate("Login");
                }}
                activeOpacity={0.7}
                className="bg-[#D9D9D9] rounded-2xl px-10 py-3"
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
