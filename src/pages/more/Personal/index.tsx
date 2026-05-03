import Layout from "@/components/Layout";
import ToastError from "@/components/common/ToastError";
import ChangeSelection from "@/components/more/personalchange/ChangeSelection";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const GET_ME = gql`
  query GetMe {
    me {
      name
      gender
      birthDate
      nationality
      email
    }
  }
`;

export default function PersonalChange() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { data } = useQuery<{
    me: {
      name: string;
      gender: string;
      birthDate: string;
      nationality: string;
      email: string;
    };
  }>(GET_ME);
  const me = data?.me;
  const [emailToast, setEmailToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showEmailToast = () => {
    setEmailToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setEmailToast(false), 2500);
  };

  return (
    <Layout title={t("more.editPersonalInfo")} showBack showCamera={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 내 정보 */}
        <View className="mt-4">
          <View className="flex-row items-center justify-between py-2 px-2">
            <Text className="text-b2 font-sb text-gray-black">{t("personalChange.myInfoSection")}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyInfoChange")}
              activeOpacity={0.7}
              className="flex-row bg-extra-white rounded-2xl items-center justify-center px-[8px] py-[6px]"
            >
              <Text className="text-b4 font-sb text-dark-gray">{t("personalChange.editButton")}</Text>
            </TouchableOpacity>
          </View>
          <ChangeSelection label={t("personalInfo.nameLabel")} value={me?.name ?? "-"} />
          <ChangeSelection
            label={t("personalInfo.genderLabel")}
            value={
              me?.gender === "MALE"
                ? t("personalInfo.male")
                : me?.gender === "FEMALE"
                  ? t("personalInfo.female")
                  : "-"
            }
          />
          <ChangeSelection
            label={t("personalInfo.birthdayLabel")}
            value={me?.birthDate?.replace(/-/g, ".") ?? "-"}
          />
          <ChangeSelection label={t("personalInfo.nationalityLabel")} value={me?.nationality ?? "-"} />
        </View>

        {/* 로그인 정보 */}
        <View className="mt-10">
          <View className="py-2 px-2">
            <Text className="text-b2 font-sb text-gray-black">{t("personalChange.loginInfoSection")}</Text>
          </View>
          <ChangeSelection
            label={t("emailVerify.emailLabel")}
            value={me?.email ?? "-"}
            onRowPress={showEmailToast}
            dimmed
            rightLabel={t("personalChange.emailNotChangeable")}
          />
          <ChangeSelection
            label={t("setPassword.passwordLabel")}
            value="**********"
            onRowPress={() => navigation.navigate("PasswordChange")}
            showChevron
          />
        </View>

        {/* 회원탈퇴 */}
        <View className="flex-row items-center justify-between mt-auto py-8 px-2">
          <Text className="text-b4 font-rg text-[#BFBFBF]">
            {t("personalChange.leaveQuestion")}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("WithdrawConfirm")}
          >
            <Text className="text-b4 font-rg text-[#BFBFBF] underline">
              {t("personalChange.deleteAccount")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {emailToast && (
        <View className="absolute bottom-[16px] left-0 right-0 items-center">
          <ToastError type="email" message={t("personalChange.emailNotChangeable")} />
        </View>
      )}
    </Layout>
  );
}
