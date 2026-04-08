import CameraIcon from "@/assets/svgs/camera.svg";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Polyline } from "react-native-svg";
import BottomBar from "@/components/BottomBar";

const TAB_NAMES = ["Artist", "Personal", "Home", "Map", "More"];

interface LayoutProps {
  title?: React.ReactNode; //이미지도 받을 수 있게 수정
  showBack?: boolean;
  showCamera?: boolean;
  onCameraPress?: () => void;
  fullBleedHeader?: React.ReactNode;
  scrollable?: boolean;
  showBottomBar?: boolean;
  activeTab?: "Artist" | "Personal" | "Home" | "Map" | "More"; // 하단 바 활성 탭
  bgTransparent?: boolean; // 외부에서 배경(그라디언트 등)을 직접 제어할 때 true로 설정
  noPadding?: boolean; // 좌우 패딩 없이 full-bleed 콘텐츠
  headerBg?: string; // topbar 배경색
  statusBarBg?: string; // statusbar 배경색
  statusBarStyle?: "light-content" | "dark-content"; // statusbar 텍스트/아이콘 색상
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
  showCamera = false,
  onCameraPress,
  fullBleedHeader,
  scrollable = false,
  showBottomBar = false,
  activeTab,
  bgTransparent = false,
  noPadding = false,
  headerBg,
  statusBarBg,
  statusBarStyle = "dark-content",
  children,
}: LayoutProps) {
  const navigation = useNavigation<any>();
  const activeTabIndex = activeTab ? TAB_NAMES.indexOf(activeTab) : -1;

  // statusBarBg가 지정된 경우, iOS에서 상태바 영역(top inset)을 별도 SafeAreaView로 분리하여 색상 적용
  const topEdges: ("top" | "bottom" | "left" | "right")[] = statusBarBg ? [] : ["top"];
  const mainEdges: ("top" | "bottom" | "left" | "right")[] = showBottomBar
    ? [...topEdges, "left", "right"]
    : [...topEdges, "bottom", "left", "right"];

  return (
    // bgTransparent=true면 배경 투명, 아니면 기본 앱 배경색
    <>
      <StatusBar
        backgroundColor={statusBarBg}
        barStyle={statusBarStyle}
        translucent={false}
      />
      {statusBarBg && (
        <SafeAreaView style={{ backgroundColor: statusBarBg }} edges={["top"]} />
      )}
    <SafeAreaView
      className={`flex-1 ${bgTransparent ? "bg-transparent" : "bg-app-bg"}`}
      edges={mainEdges}
    >
      {/* AppBar: 56px */}
      {title && (
        <View
          style={{ height: 56, paddingHorizontal: 21, gap: 10, backgroundColor: headerBg }}
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
                <CameraIcon width={24} height={24} />
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
          <View className={noPadding ? "" : "px-[17px]"}>{children}</View>
        </ScrollView>
      ) : (
        <>
          {/* full-bleed 콘텐츠 (패딩 없음) */}
          {fullBleedHeader}

          {/* 메인 콘텐츠 */}
          <View className={`flex-1 ${noPadding ? "" : "px-[17px]"}`}>
            {children}
          </View>
        </>
      )}
      {showBottomBar && (
        // state.index: -1로 설정해서 어떤 탭도 활성화(빨간색)되지 않음
        // Root stack 화면에서 탭 버튼을 누르면 Tabs > 해당 탭으로 이동
        <BottomBar
          state={{ index: activeTabIndex, routes: [] } as any}
          navigation={
            {
              ...navigation,
              navigate: (name: string) =>
                navigation.navigate("Tabs", { screen: name }),
            } as any
          }
          descriptors={{} as any}
          insets={{ top: 0, right: 0, bottom: 0, left: 0 }}
        />
      )}
    </SafeAreaView>
    </>
  );
}
