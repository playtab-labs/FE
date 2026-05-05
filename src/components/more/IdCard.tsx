import IdSogang from "@/assets/svgs/idSogang.svg";
import IdStranger from "@/assets/svgs/idStranger.svg";
import SogangHalf from "@/assets/svgs/sogangHalf.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

interface IdCardProps {
  name: string;
  email: string;
  isSogang?: boolean;
}

const BADGE_SIZE = 80;
const BADGE_OVERFLOW = 30;

export default function IdCard({ name, email, isSogang = true }: IdCardProps) {
  const { t } = useTranslation();
  return (
    <View style={{ width: "100%", paddingTop: BADGE_OVERFLOW }}>
      {/* 그림자 wrapper */}
      <View
        style={{
          width: "100%",
          height: 162,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.10,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {/* 카드 */}
        <View className="w-full h-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.40)]">
          <LinearGradient
            colors={["#FFAD96", "#FFFFFF"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: -124,
                top: -104,
                width: 248,
                height: 248,
                borderRadius: 124,
                backgroundColor: "#FFF",
                opacity: 0.15,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: "50%",
                marginLeft: -58,
                top: -38,
                width: 116,
                height: 116,
                borderRadius: 58,
                backgroundColor: "#FFF",
                opacity: 0.15,
              }}
            />
            {isSogang && (
              <View
                style={{ position: "absolute", top: 16, right: 16 }}
                pointerEvents="none"
              >
                <SogangHalf width={47} height={67} />
              </View>
            )}
            <View
              className="flex-1 items-center justify-center gap-[4px]"
              style={{ paddingTop: BADGE_SIZE / 2 }}
            >
              <Text className="text-h1 font-eb text-gray-black">{name}</Text>
              <Text className="text-b4 font-rg text-dark-gray">{email}</Text>
              <View className="mt-1 px-3 py-[3px] rounded-full bg-secondary-salmon">
                <Text className="text-b5 font-sb text-gray-black">
                  {isSogang ? t("more.sogangVerified") : t("more.guest")}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* 배지 — 카드 위로 튀어나옴 */}
      <View
        style={{
          position: "absolute",
          top: 10,
          alignSelf: "center",
          width: BADGE_SIZE,
          height: BADGE_SIZE,
        }}
        pointerEvents="none"
      >
        {isSogang ? (
          <IdSogang width={BADGE_SIZE} height={BADGE_SIZE} />
        ) : (
          <IdStranger width={BADGE_SIZE} height={BADGE_SIZE} />
        )}
      </View>
    </View>
  );
}
