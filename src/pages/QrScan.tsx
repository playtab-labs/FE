import { SPOT_NAMES, visitStamp } from "@/api/stamp";
import Layout from "@/components/Layout";
import QRCamera from "@/components/stamptour/QRCamera";
import QRInformCard from "@/components/stamptour/QRInformCard";
import QRScanToast from "@/components/stamptour/QRScanToast";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";

export default function QrScan() {
  const navigation = useNavigation<any>();
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScanned = async (data: string) => {
const raw = data.startsWith('https://') ? data.slice('https://'.length) : data;
    const spotId = parseInt(raw, 10);
    if (isNaN(spotId) || spotId < 1 || spotId > 9) {
      Alert.alert('인식 실패', '올바르지 않은 QR코드입니다.', [
        { text: '확인', onPress: () => navigation.navigate('StampTour') },
      ]);
      return;
    }

    setShowToast(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setShowToast(false);
        Alert.alert('위치 권한 필요', '스탬프 인증을 위해 위치 권한이 필요합니다.', [
          { text: '확인', onPress: () => navigation.navigate('StampTour') },
        ]);
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      const result = await visitStamp(spotId, latitude, longitude);
      if (result.success) {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => {
          setShowToast(false);
          navigation.navigate('StampTour', { newStampTitle: SPOT_NAMES[spotId - 1] });
        }, 2000);
      } else {
        setShowToast(false);
        Alert.alert('인증 실패', '해당 스팟 근처에서만 인증할 수 있습니다.', [
          { text: '확인', onPress: () => navigation.navigate('StampTour') },
        ]);
      }
    } catch {
      setShowToast(false);
      Alert.alert('인증 실패', '스탬프 인증에 실패했습니다.\n다시 시도해주세요.', [
        { text: '확인', onPress: () => navigation.navigate('StampTour') },
      ]);
    }
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
