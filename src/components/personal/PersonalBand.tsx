import ToastError from "@/components/common/ToastError";
import Layout from "@/components/Layout";
import BandCard from "@/components/personal/BandCard";
import StaffAuthModal from "@/components/personal/StaffAuthModal";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const STAFF_CODE = "0000";

export default function PersonalBand() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 팔찌 목록 — TODO: API 연동 시 실제 데이터로 교체
  const [bands, setBands] = useState([
    { id: "1", serialNumber: "XXXXXXXXXXX", isExpired: true },
    { id: "2", serialNumber: "XXXXXXXXXXX", isExpired: false },
  ]);

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [targetBandId, setTargetBandId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = () => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2500);
  };

  const handleAuthConfirm = (code: string) => {
    if (code === STAFF_CODE) {
      setBands((prev) => prev.filter((b) => b.id !== targetBandId));
      setAuthModalVisible(false);
      setTargetBandId(null);
      setAuthError(undefined);
      showToast();
    } else {
      setAuthError(t("personal.staffMismatch"));
    }
  };

  const handleModalClose = () => {
    setAuthModalVisible(false);
    setTargetBandId(null);
    setAuthError(undefined);
  };

  return (
    <Layout
      title="PERSONAL"
      showBack={false}
      showBottomBar={true}
      activeTab="Personal"
      noPadding
    >
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
          {bands.map((band) => (
            <BandCard
              key={band.id}
              serialNumber={band.serialNumber}
              isExpired={band.isExpired}
              isLarge
            />
          ))}
        </View>

        {/* 새 팔찌 추가 버튼 */}
        <View className="items-center px-5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Tag")}
            className="bg-secondary-salmon p-3 rounded-md shadow-sm"
          >
            <Text className="text-b3 font-sb text-gray-black">
              {t("personal.addBand")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 스페이서 — 안내사항을 하단으로 밀어냄 */}
        <View style={{ flex: 1 }} />

        {/* 안내사항 */}
        <View className="bg-extra-white px-4 py-6 rounded-[8px] mx-[17px]">
          <Text className="text-b2 font-bd text-gray-black text-center">
            {t("personal.importantNotes")}
          </Text>
          <View style={{ gap: 6 }}>
            <Text className="text-b3 font-rg text-dark-gray">
              • {t("personal.notice1")}
            </Text>
            <Text className="text-b3 font-rg text-dark-gray">
              • {t("personal.notice2")}
            </Text>
            <Text className="text-b3 font-rg text-dark-gray">
              • {t("personal.notice3")}
            </Text>
          </View>
        </View>
      </ScrollView>

      <StaffAuthModal
        visible={authModalVisible}
        onClose={handleModalClose}
        onConfirm={handleAuthConfirm}
        error={authError}
      />

      {/* 삭제 완료 토스트 */}
      {toastVisible && (
        <View className="absolute bottom-[16px] left-0 right-0 items-center">
          <ToastError type="email" message={t("personal.bandDeleted")} />
        </View>
      )}
    </Layout>
  );
}
