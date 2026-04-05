import IdSogang from "@/assets/svgs/idSogang.svg";
import IdStranger from "@/assets/svgs/idStranger.svg";
import SogangHalf from "@/assets/svgs/sogangHalf.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

interface IdCardProps {
  name: string;
  email: string;
  isSogang?: boolean;
}

const BADGE_SIZE = 80;
const BADGE_OVERFLOW = 30;

export default function IdCard({ name, email, isSogang = true }: IdCardProps) {
  return (
    <View style={{ width: 329, paddingTop: BADGE_OVERFLOW }}>
      {/* 그림자 wrapper */}
      <View
        style={{
          width: 329,
          height: 162,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 8,
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
                left: 41,
                top: -104,
                width: 248,
                height: 248,
                borderRadius: 124,
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#FFF",
                opacity: 0.2,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: 107,
                top: -38,
                width: 116,
                height: 116,
                borderRadius: 58,
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#FFF",
                opacity: 0.2,
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
              {isSogang ? (
                <View className="mt-1 px-3 py-[3px] rounded-full bg-secondary-salmon">
                  <Text className="text-b5 font-sb text-gray-black">
                    서강대생 인증완료
                  </Text>
                </View>
              ) : (
                <View className="mt-1 px-3 py-[3px] rounded-full bg-secondary-salmon">
                  <Text className="text-b5 font-sb text-gray-black">
                    외부인
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* 배지 — 카드 위로 튀어나옴 */}
      <View
        style={{
          position: "absolute",
          top: 10,
          left: (329 - BADGE_SIZE) / 2,
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
