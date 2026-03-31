import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polyline } from "react-native-svg";
import BottomBar from "@/components/BottomBar";

interface LayoutProps {
  title?: React.ReactNode; //이미지도 받을 수 있게 수정
  showBack?: boolean;
  showCamera?: boolean;
  onCameraPress?: () => void;
  fullBleedHeader?: React.ReactNode;
  scrollable?: boolean;
  showBottomBar?: boolean;
  bgTransparent?: boolean; // 외부에서 배경(그라디언트 등)을 직접 제어할 때 true로 설정
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
  fullBleedHeader,
  scrollable = false,
  showBottomBar = false,
  bgTransparent = false,
  children,
}: LayoutProps) {
  const navigation = useNavigation<any>();

  return (
    // bgTransparent=true면 배경 투명, 아니면 기본 앱 배경색
    <SafeAreaView
      className={`flex-1 ${bgTransparent ? "bg-transparent" : "bg-app-bg"}`}
      edges={showBottomBar ? ["top", "left", "right"] : ["top", "bottom", "left", "right"]}
    >
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
                <Image
                  source={require("@/assets/pngs/camera.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {scrollable ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* full-bleed 콘텐츠 (패딩 없음) */}
          {fullBleedHeader}

          {/* 메인 콘텐츠 */}
          <View className="px-[17px]">{children}</View>
        </ScrollView>
      ) : (
        <>
          {/* full-bleed 콘텐츠 (패딩 없음) */}
          {fullBleedHeader}

          {/* 메인 콘텐츠 */}
          <View className="flex-1 px-[17px]">{children}</View>
        </>
      )}
      {showBottomBar && (
        // state.index: -1로 설정해서 StampTour에서는 어떤 탭도 활성화(빨간색)되지 않음
        // 탭 버튼을 누르면 해당 탭으로 정상 이동
        <BottomBar
          state={{ index: -1, routes: [] } as any}
          navigation={navigation}
          descriptors={{} as any}
          insets={{ top: 0, right: 0, bottom: 0, left: 0 }}
        />
      )}
    </SafeAreaView>
  );
}
