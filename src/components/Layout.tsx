import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polyline } from "react-native-svg";

interface LayoutProps {
  title?: React.ReactNode; //이미지도 받을 수 있게 수정
  showBack?: boolean;
  showCamera?: boolean;
  onCameraPress?: () => void;
  children: React.ReactNode;
}

function BackIcon() {
  return (
    <Svg width="7" height="14" viewBox="0 0 7 14" fill="none">
      <Polyline
        points="6,1 1,7 6,13"
        stroke="#656565"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function Layout({
  title,
  showBack = false,
  showCamera = true,
  onCameraPress,
  children,
}: LayoutProps) {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-app-bg">
      {/* AppBar: 56px */}
      {title && (
        <View
          style={{ height: 56, paddingHorizontal: 21, gap: 10 }}
          className="flex-row items-center justify-center"
        >
          {/* 왼쪽: 뒤로가기 */}
          <View style={{ width: 24, alignItems: "center" }}>
            {showBack && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon />
              </TouchableOpacity>
            )}
          </View>

          {/* 중앙: 타이틀 */}
          {typeof title === "string" ? (
            <Text
              className="flex-1 text-center"
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#1A1A1A",
                lineHeight: 25.2,
                letterSpacing: -0.18,
              }}
            >
              {title}
            </Text>
          ) : (
            <View className="flex-1 items-center justify-center">{title}</View>
          )}

          {/* 오른쪽: 카메라 아이콘 */}
          <View style={{ width: 24, alignItems: "center" }}>
            {showCamera && (
              <TouchableOpacity onPress={onCameraPress}>
                <Image source={require("@/assets/pngs/camera.png")} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* 메인 콘텐츠 */}
      <View className="flex-1 px-[17px]">{children}</View>
    </SafeAreaView>
  );
}
