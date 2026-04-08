import Layout from "@/components/Layout";
import QRCamera from "@/components/stamptour/QRCamera";
import QRInformCard from "@/components/stamptour/QRInformCard";
import { View } from "react-native";

export default function QrScan() {
  return (
    <Layout
      title="QR코드 인식"
      showBack
      headerBg="#FFA38C"
      statusBarBg="#FFA38C"
      noPadding
    >
      <View style={{ flex: 1 }}>
        <QRCamera />
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
      </View>
    </Layout>
  );
}
