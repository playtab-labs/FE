import Layout from "@/components/Layout";
import QRCamera from "@/components/stamptour/QRCamera";
import QRInformCard from "@/components/stamptour/QRInformCard";
import QRScanToast from "@/components/stamptour/QRScanToast";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function QrScan() {
  const navigation = useNavigation<any>();
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScanned = (data: string) => {
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setShowToast(false);
      navigation.navigate('StampTour', { newStampTitle: data });
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <Layout
      title="QR코드 인식"
      showBack
      headerBg="#FFA38C"
      statusBarBg="#FFA38C"
      noPadding
    >
      <View style={{ flex: 1 }}>
        <QRCamera onScanned={handleScanned} />
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 17,
            right: 17,
          }}
        >
          <QRInformCard>
            {'- 화면의 가운데에 큐알코드가 오도록 촬영해주세요.\n- 이상이 있을 경우 스태프를 불러주세요.\n- 기타 안내사항 적기'}
          </QRInformCard>
        </View>
        {showToast && (
          <View
            style={{
              position: 'absolute',
              bottom: 100,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <QRScanToast />
          </View>
        )}
      </View>
    </Layout>
  );
}
