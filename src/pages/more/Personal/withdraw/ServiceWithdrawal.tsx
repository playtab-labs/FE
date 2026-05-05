import Layout from "@/components/Layout";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTranslation } from "react-i18next";

const WITHDRAW_REASONS = [
  "어플 사용이 불편해요",
  "더이상 쓰지 않을 것 같아요.",
  "재가입할 거에요.",
  "기타",
] as const;

type WithdrawReason = (typeof WITHDRAW_REASONS)[number];

function RadioIcon({ active }: { active: boolean }) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Circle
        cx="8"
        cy="8"
        r="7"
        stroke={active ? "#FF7654" : "#BFBFBF"}
        strokeWidth="2"
      />
      {active && <Circle cx="8" cy="8" r="4" fill="#FF7654" />}
    </Svg>
  );
}

export default function ServiceWithdrawal() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<WithdrawReason | null>(null);

  return (
    <Layout title={t("personalChange.withdrawAppBar")} showBack showCamera={false}>
      <View className="flex-1">
        {/* 안내 문구 */}
        <View className="py-4 px-[12px] gap-4">
          <Text className="text-h1 font-eb text-gray-black">
            {t("personalChange.withdrawTitle")}
          </Text>
          <Text className="text-b3 font-sb text-[#656565]">
            {t("personalChange.withdrawSubtitle")}
          </Text>
        </View>

        {/* 탈퇴 사유 선택 */}
        <View className="pt-20">
          {WITHDRAW_REASONS.map((reason) => {
            const isSelected = reason === selected;
            return (
              <TouchableOpacity
                key={reason}
                onPress={() => setSelected(reason)}
                activeOpacity={0.7}
                className="flex-row items-center gap-3 px-[17px] py-6 border-b border-b-[rgba(191,191,191,0.30)]"
              >
                <RadioIcon active={isSelected} />
                <Text
                  className={`text-b3 font-sb ${isSelected ? "text-[#FF7654]" : "text-dark-gray"}`}
                >
                  {reason}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 하단 버튼 */}
        <View className="flex-row gap-3 px-[17px] mt-auto pb-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            className="flex-1 h-14 items-center justify-center rounded-2xl border border-[#BFBFBF]"
          >
            <Text className="text-t3 font-eb text-gray-black">{t("personalChange.keepUsing")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!selected}
            onPress={() => navigation.navigate("WithdrawConfirm" as never)}
            activeOpacity={0.8}
            className={`flex-1 h-14 items-center justify-center rounded-2xl ${selected ? "bg-[#FFA38C]" : "bg-[#BFBFBF]"}`}
          >
            <Text className={`text-t3 font-eb ${selected ? "text-gray-black" : "text-white"}`}>{t("personalChange.withdrawNextStep")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
