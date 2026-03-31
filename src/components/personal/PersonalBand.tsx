import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import Layout from "@/components/Layout";
import BandCard from "@/components/personal/BandCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

// TODO: API 연동 시 실제 데이터로 교체
const MOCK_BANDS = [
  { id: "1", serialNumber: "XXXXXXXXXXX", isExpired: true },
  { id: "2", serialNumber: "XXXXXXXXXXX", isExpired: false },
];

export default function PersonalBand() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Layout title="PERSONAL" showBack={false} showBottomBar={true}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          gap: 32,
        }}
      >
        <View className="gap-[33px] flex-1">
          {/* 팔찌 카드 리스트 */}
          {MOCK_BANDS.map((band) => (
            <BandCard
              key={band.id}
              serialNumber={band.serialNumber}
              onClose={() => {
                console.log("닫기 클릭");
              }}
              isExpired={band.isExpired}
              isLarge
            />
          ))}
        </View>

        {/* 새 팔찌 추가 버튼 */}
        <View className="items-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Tag")}
            className="bg-secondary-salmon p-3 rounded-md shadow-sm"
          >
            <Text className="text-b3 font-sb text-gray-black">
              + 새 팔찌 추가하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 스페이서 — 안내사항을 하단으로 밀어냄 */}
        <View style={{ flex: 1 }} />

        {/* 안내사항 */}
        <View className="bg-extra-white px-4 py-6 rounded-[8px]">
          <Text className="text-b2 font-bd text-gray-black text-center">
            안내사항
          </Text>
          <View style={{ gap: 6 }}>
            <Text className="text-b3 font-rg text-dark-gray">
              • 아티스트 무대는 팔찌 소지 관람객만 이용 가능합니다.
            </Text>
            <Text className="text-b3 font-rg text-dark-gray">
              • 팔찌는 발급 받은 당일만 사용가능하며,{"\n\t"}
              <Text className="font-bd">다음날에는 새로 발급</Text> 받아야
              합니다.
            </Text>
            <Text className="text-b3 font-rg text-dark-gray">
              • 팔찌가 훼손된 경우, 관리 부스로 가져오시면 안내 하에 재발급
              해드립니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
