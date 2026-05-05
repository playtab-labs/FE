import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import ConfirmModal from "@/components/common/ConfirmModal";
import Input from "@/components/common/Input";
import NationalityModal from "@/components/common/NationalityModal";
import { useSignupStore } from "@/stores/signupStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { useTranslation } from "react-i18next";

const formatBirthday = (digits: string) => {
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
};

const formatBirthdayForApi = (digits: string) => {
  if (digits.length < 8) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

export default function PersonalInfo() {
  const { t } = useTranslation();

  const NATIONALITIES = [
    t("nationality.southKorea"),
    t("nationality.ghana"),
    t("nationality.nigeria"),
    t("nationality.denmark"),
    t("nationality.russia"),
    t("nationality.usa"),
    t("nationality.vietnam"),
    t("nationality.serbia"),
  ];
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userType = route.params?.userType ?? "external";
  const setPersonalInfo = useSignupStore((s) => s.setPersonalInfo);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birthdayRaw, setBirthdayRaw] = useState("");
  const [nationality, setNationality] = useState("");
  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [showNameConfirm, setShowNameConfirm] = useState(false);

  const handleBirthday = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    setBirthdayRaw(digits);
  };

  const isBirthdayInvalid = (() => {
    if (birthdayRaw.length < 8) return false;
    const year = parseInt(birthdayRaw.slice(0, 4), 10);
    const month = parseInt(birthdayRaw.slice(4, 6), 10);
    const day = parseInt(birthdayRaw.slice(6, 8), 10);
    if (year < 1990) return true;
    if (month < 1 || month > 12) return true;
    if (day < 1 || day > 31) return true;
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    )
      return true;
    return false;
  })();

  const isValid =
    name.trim().length > 0 &&
    gender !== null &&
    birthdayRaw.length === 8 &&
    !isBirthdayInvalid &&
    nationality !== "";

  return (
    <Layout title={t("personalInfo.appBar")} showBack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          {/* 안내 문구 */}
          <View className="mt-[19px] gap-4">
            <ColoredText text={t("personalInfo.title")} className="text-h1 font-eb text-gray-black" />
            <Text className="text-b3 font-sb text-dark-gray">
              {t("personalInfo.subtitle")}
            </Text>
          </View>

          <View className="flex mt-16 gap-6">
            {/* 이름 */}
            <Input
              label={t("personalInfo.nameLabel")}
              description={t("personalInfo.nameDescription")}
              placeholder={t("personalInfo.namePlaceholder")}
              value={name}
              onChangeText={setName}
            />

            {/* 성별 */}
            <View className="w-full gap-2">
              <Text className="text-b3 font-sb text-dark-gray">{t("personalInfo.genderLabel")}</Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 h-[42px] rounded-lg items-center justify-center border ${gender === "male" ? "bg-[#FFA38C] border-[#FFA38C]" : "bg-extra-white border-[#E4E4E4]"}`}
                  onPress={() => setGender("male")}
                >
                  <Text className="text-b3 font-sb text-gray-black">{t("personalInfo.male")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 h-[42px] rounded-lg items-center justify-center border ${gender === "female" ? "bg-[#FFA38C] border-[#FFA38C]" : "bg-extra-white border-[#E4E4E4]"}`}
                  onPress={() => setGender("female")}
                >
                  <Text className="text-b3 font-sb text-gray-black">{t("personalInfo.female")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 생일 */}
            <Input
              label={t("personalInfo.birthdayLabel")}
              description={
                isBirthdayInvalid ? t("personalInfo.birthdayInvalid") : undefined
              }
              error={isBirthdayInvalid}
              placeholder={t("personalInfo.birthdayPlaceholder")}
              value={formatBirthday(birthdayRaw)}
              onChangeText={handleBirthday}
              keyboardType="number-pad"
              maxLength={10}
            />

            {/* 국적 */}
            <View className="w-full gap-[6px]">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-dark-gray">{t("personalInfo.nationalityLabel")}</Text>
                <Text className="text-b4 font-rg text-dark-gray">
                  {t("personalInfo.nationalityDescription")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setNationalityOpen(true)}
                className="flex-row items-center justify-between rounded-lg border border-[#E4E4E4] bg-extra-white px-3 py-4"
              >
                <Text
                  className={`text-b3 font-md ${nationality ? "text-gray-black" : "text-[#E4E4E4]"}`}
                >
                  {nationality || t("personalInfo.nationalityPlaceholder")}
                </Text>
                <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <Polyline
                    points="1,1 5,5 9,1"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 계속하기 버튼 */}
      <View className="py-4 pb-10">
        <Button
          label={t("personalInfo.continue")}
          size="long"
          state={isValid ? "active" : "inactive"}
          onPress={() => setShowNameConfirm(true)}
        />
      </View>

      <ConfirmModal
        visible={showNameConfirm}
        title={t("personalInfo.confirmTitle", { name })}
        warning={t("personalInfo.confirmWarning")}
        description={t("personalInfo.confirmDescription")}
        confirmLabel={t("personalInfo.confirmYes")}
        cancelLabel={t("personalInfo.confirmNo")}
        onConfirm={() => {
          setPersonalInfo({
            name,
            gender: gender === "male" ? "MALE" : "FEMALE",
            phoneNumber: "",
            birthDate: formatBirthdayForApi(birthdayRaw),
            nationality,
          });
          setShowNameConfirm(false);
          navigation.navigate("EmailVerify", { userType });
        }}
        onCancel={() => setShowNameConfirm(false)}
      />

      <NationalityModal
        visible={nationalityOpen}
        nationalities={NATIONALITIES}
        selected={nationality}
        onSelect={(value) => setNationality(value)}
        onClose={() => setNationalityOpen(false)}
      />
    </Layout>
  );
}
