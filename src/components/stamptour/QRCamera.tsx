import { CameraView, useCameraPermissions } from "expo-camera";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QRCameraProps {
  onScanned?: (data: string) => void;
}

export interface QRCameraHandle {
  reset: () => void;
}

const QRCamera = forwardRef<QRCameraHandle, QRCameraProps>(function QRCamera({ onScanned }, ref) {
  const [permission, requestPermission] = useCameraPermissions();
  const scanned = useRef(false);

  useImperativeHandle(ref, () => ({
    reset: () => { scanned.current = false; },
  }));

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned.current) return;
    scanned.current = true;
    if (onScanned) {
      onScanned(data);
    } else {
      Alert.alert("QR코드 인식", data, [
        {
          text: "다시 스캔",
          onPress: () => {
            scanned.current = false;
          },
        },
      ]);
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>카메라 권한 확인 중...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>QR코드 스캔을 위해 카메라 권한이 필요합니다.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      onBarcodeScanned={handleBarCodeScanned}
    />
  );
});

export default QRCamera;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  message: {
    fontSize: 15,
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA38C",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
