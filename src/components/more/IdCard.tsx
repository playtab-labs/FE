import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

interface IdCardProps {
  name: string;
  email: string;
  isSogang?: boolean;
}

const BADGE_SIZE = 100;
const BADGE_OVERFLOW = 30; // 카드 위로 튀어나오는 양

export default function IdCard({ name, email, isSogang = true }: IdCardProps) {
  return (
    <View style={{ width: 329, paddingTop: BADGE_OVERFLOW }}>
      {/* 그림자 wrapper — overflow-hidden 없이 shadow 적용 */}
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
        {/* 카드 — overflow-hidden으로 내부 클리핑 */}
        <View className="w-full h-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.40)]">
          <LinearGradient
            colors={["#FFAD96", "#FFFFFF"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
          >
            {/* 배경 원형 패턴 — 중심: (164.5px, 20px) 배지 중앙 기준 */}
            {/* r=124: left=41, top=20-124=-104 */}
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
              }}
            />
            {/* r=58: left=107, top=20-58=-38 */}
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
              }}
            />
            {/* 카드 콘텐츠 (배지 공간 포함) */}
            <View
              className="flex-1 items-center justify-center gap-[4px]"
              style={{ paddingTop: BADGE_SIZE / 2 }}
            >
              {/* 이름 */}
              <Text className="text-h1 font-eb text-gray-black">{name}</Text>

              {/* 이메일 */}
              <Text className="text-b4 font-rg text-dark-gray">{email}</Text>

              {/* 서강대생 인증 뱃지 */}
              {isSogang && (
                <View className="mt-1 px-3 py-[3px] rounded-full bg-secondary-salmon">
                  <Text className="text-b5 font-sb text-gray-black">
                    서강대생 인증완료
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* 서강대 배지 — 카드 위로 튀어나옴 */}
      <Image
        source={require("@/assets/pngs/sogang.png")}
        style={{
          position: "absolute",
          top: 0,
          alignSelf: "center",
          width: BADGE_SIZE,
          height: BADGE_SIZE,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
