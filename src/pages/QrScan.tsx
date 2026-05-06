import { visitStamp } from "@/api/stamp";
import Layout from "@/components/Layout";
import QRCamera from "@/components/stamptour/QRCamera";
import QRInformCard from "@/components/stamptour/QRInformCard";
import QRScanToast from "@/components/stamptour/QRScanToast";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function QrScan() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScanned = async (data: string) => {
const raw = data.startsWith('https://') ? data.slice('https://'.length) : data;
    const spotId = parseInt(raw, 10);
    if (isNaN(spotId) || spotId < 1 || spotId > 9) {
      Alert.alert(t('stampTour.scanFailed'), t('stampTour.invalidQr'), [
        { text: t('stampTour.confirm'), onPress: () => navigation.navigate('StampTour') },
      ]);
      return;
    }

    setShowToast(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setShowToast(false);
        Alert.alert(t('stampTour.locationRequired'), t('stampTour.locationRequiredMsg'), [
          { text: t('stampTour.confirm'), onPress: () => navigation.navigate('StampTour') },
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
          navigation.navigate('StampTour', { newSpotId: spotId });
        }, 2000);
      } else {
        setShowToast(false);
        Alert.alert(t('stampTour.authFailed'), t('stampTour.authFailedNearby'), [
          { text: t('stampTour.confirm'), onPress: () => navigation.navigate('StampTour') },
        ]);
      }
    } catch {
      setShowToast(false);
      Alert.alert(t('stampTour.authFailed'), t('stampTour.authFailedRetry'), [
        { text: t('stampTour.confirm'), onPress: () => navigation.navigate('StampTour') },
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
      title={t('stampTour.qrAppBar')}
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
            {t('stampTour.qrInstruction')}
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
