import Layout from "@/components/Layout";
import ToastError from "@/components/common/ToastError";
import ChangeSelection from "@/components/more/personalchange/ChangeSelection";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PersonalChange() {
  const navigation = useNavigation<any>();
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
        {/* 내 정보 */}
        <View className="mt-4">
          <View className="flex-row items-center justify-between px-[12px] py-2">
            <Text className="text-b2 font-sb text-gray-black">내 정보</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyInfoChange")}
              activeOpacity={0.7}
              className="flex-row bg-extra-white rounded-2xl items-center justify-center px-[8px] py-[6px]"
            >
              <Text className="text-b4 font-sb text-dark-gray">변경하기</Text>
            </TouchableOpacity>
          </View>
          <ChangeSelection label="이름" value="홍길동" />
          <ChangeSelection label="성별" value="남성" />
          <ChangeSelection label="생일" value="2000.11.30" />
          <ChangeSelection label="국적" value="대한민국" />
        </View>

        {/* 로그인 정보 */}
        <View className="mt-10">
          <View className="px-[12px] py-2">
            <Text className="text-b2 font-sb text-gray-black">로그인 정보</Text>
          </View>
          <ChangeSelection
            label="이메일"
            value="honggildong@gmail.com"
            onRowPress={showEmailToast}
            dimmed
            rightLabel="이메일은 변경할 수 없습니다."
          />
          <ChangeSelection
            label="비밀번호"
            value="**********"
            onRowPress={() => navigation.navigate("PasswordChange")}
            showChevron
          />
        </View>

        {/* 회원탈퇴 */}
        <View className="flex-row items-center justify-between px-[12px] mt-auto py-8">
          <Text className="text-b4 font-rg text-[#BFBFBF]">
            서비스를 탈퇴하고 싶으신가요?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("ServiceWithdrawal")}
          >
            <Text className="text-b4 font-rg text-[#BFBFBF] underline">
              회원탈퇴
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {emailToast && (
        <View className="absolute bottom-[16px] left-0 right-0 items-center">
          <ToastError type="email" message="이메일은 변경할 수 없습니다." />
        </View>
      )}
    </Layout>
  );
}
