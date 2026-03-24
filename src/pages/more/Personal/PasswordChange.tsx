import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import NameChangeModal from "@/components/more/personalchange/NameChangeModal";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  rightLabel,
  editable = true,
  isError = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  rightLabel?: string;
  editable?: boolean;
  isError?: boolean;
}) {
  return (
    <View className="px-[12px] py-2 self-stretch">
      <View className="flex-row items-center justify-between">
        <Text className="text-b4 font-sb text-[#BFBFBF]">{label}</Text>
        {rightLabel && (
          <Text className="text-b5 font-rg text-[#F3345D]">{rightLabel}</Text>
        )}
      </View>
      <View className="flex-row items-center mt-[4px]">
        <TextInput
          className={`flex-1 text-b3 font-sb ${isError ? "text-[#F3345D]" : "text-gray-black"}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#BFBFBF"
          autoCapitalize="none"
          editable={editable}
        />
      </View>
      <View className="border-b border-[rgba(191,191,191,0.30)] mt-4" />
    </View>
  );
}

const MOCK_PASSWORD = "123456";

export default function PasswordChange() {
  const navigation = useNavigation<any>();
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const isWrong = current.length > 0 && current !== MOCK_PASSWORD;
  const isVerified = current === MOCK_PASSWORD;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const isInvalidPassword =
    newPassword.length > 0 && !passwordRegex.test(newPassword);
  const isMismatch = confirm.length > 0 && newPassword !== confirm;
  const isValid =
    isVerified && passwordRegex.test(newPassword) && newPassword === confirm;

  return (
    <Layout title="비밀번호 변경" showBack showCamera={false}>
      <View className="flex-1">
        <View className="mt-4">
          <PasswordField
            label="현재 비밀번호"
            value={current}
            onChangeText={setCurrent}
            placeholder="현재 비밀번호를 입력해주세요."
            rightLabel={isWrong ? "비밀번호가 일치하지 않습니다." : undefined}
            isError={isWrong}
          />

          <PasswordField
            label="변경할 비밀번호"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="영문/숫자 혼합, 8글자 이상"
            rightLabel={
              isInvalidPassword
                ? "영문/숫자 혼합, 8글자 이상으로 입력해주세요."
                : undefined
            }
            isError={isInvalidPassword}
            editable={isVerified}
          />
          <PasswordField
            label="변경할 비밀번호 확인"
            value={confirm}
            onChangeText={setConfirm}
            placeholder="비밀번호를 한 번 더 입력해주세요."
            rightLabel={
              isMismatch ? "비밀번호가 일치하지 않습니다." : undefined
            }
            isError={isMismatch}
            editable={isVerified}
          />
        </View>

        <View
          className="items-center mt-auto
        "
        >
          <Button
            label="비밀번호 변경 완료"
            size="long"
            state={isValid ? "active" : "inactive"}
            onPress={() => setSuccessModal(true)}
          />
        </View>
      </View>

      <NameChangeModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        title="비밀번호가 성공적으로 변경되었습니다."
        buttonLabel="로그인으로 돌아가기"
        onButtonPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "Login" }] })
        }
      />
    </Layout>
  );
}
