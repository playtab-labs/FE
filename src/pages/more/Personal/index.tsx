import Layout from "@/components/Layout";
import ToastError from "@/components/common/ToastError";
import ChangeSelection from "@/components/more/personalchange/ChangeSelection";
import NameChangeModal from "@/components/more/personalchange/NameChangeModal";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PersonalChange() {
  const navigation = useNavigation<any>();
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [emailToast, setEmailToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showEmailToast = () => {
    setEmailToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setEmailToast(false), 2500);
  };

  return (
    <Layout title="개인정보 변경" showBack showCamera={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-4">
          <ChangeSelection
            label="이름"
            value="홍길동"
            onChangePress={() => setNameModalVisible(true)}
          />
          <ChangeSelection
            label="성별"
            value="남성"
            onChangePress={() => navigation.navigate("GenderChange")}
          />
          <ChangeSelection
            label="생일"
            value="2000.11.30"
            onChangePress={() => navigation.navigate("BirthdayChange")}
          />
          <ChangeSelection
            label="국적"
            value="대한민국"
            onChangePress={() => navigation.navigate("NationalityChange")}
          />
          <ChangeSelection
            label="이메일"
            value="honggildong@gmail.com"
            onRowPress={showEmailToast}
            dimmed
          />
          <ChangeSelection
            label="비밀번호"
            value="********"
            onChangePress={() => navigation.navigate("PasswordChange")}
          />
        </View>

        {/* 서비스 탈퇴 */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="px-[12px] py-4"
          onPress={() => navigation.navigate("ServiceWithdrawal")}
        >
          <Text className="text-b3 font-sb text-gray-black">서비스 탈퇴</Text>
        </TouchableOpacity>
        <View className="border-b border-[rgba(191,191,191,0.30)] mx-[12px]" />
      </ScrollView>

      <NameChangeModal
        visible={nameModalVisible}
        onClose={() => setNameModalVisible(false)}
        title="이름은 개명 시에만 변경 가능합니다."
        description="개명 증빙 서류를 playtap@~~~.com으로 발송해주시면 n영업일 내 처리해드립니다."
      />

      {/* 이메일 토스트 */}
      {emailToast && (
        <View className="absolute bottom-[16px] left-0 right-0 items-center">
          <ToastError type="email" message="이메일은 변경할 수 없습니다." />
        </View>
      )}
    </Layout>
  );
}
