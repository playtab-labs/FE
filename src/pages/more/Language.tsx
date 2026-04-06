import Layout from "@/components/Layout";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";
import {
  Animated,
  Easing,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

type LangKey = "한국어" | "English" | "日本語" | "简体" | "繁體";

const LANGUAGES: LangKey[] = ["한국어", "English", "日本語", "简体", "繁體"];

const LANG_STRINGS: Record<
  LangKey,
  {
    confirm: string;
    sub: string;
    change: string;
    back: string;
    loading: string;
    loadingSub: string;
  }
> = {
  한국어: {
    confirm: "언어를 변경하시겠습니까?",
    sub: "이 작업은 몇 초가 소요될 수 있습니다.",
    change: "변경",
    back: "뒤로",
    loading: "언어 변경 중.\n메인 화면으로 돌아갑니다.",
    loadingSub: "이 작업은 몇 초가 소요될 수 있습니다.",
  },
  English: {
    confirm: "Would you like to change the language?",
    sub: "This operation may take a few seconds.",
    change: "Change",
    back: "Back",
    loading: "Changing language.\nReturning to the main screen.",
    loadingSub: "This operation may take a few seconds.",
  },
  日本語: {
    confirm: "言語を変更しますか？",
    sub: "この操作には数秒かかる場合があります。",
    change: "変更",
    back: "戻る",
    loading: "言語を変更しています。\nメイン画面に戻ります。",
    loadingSub: "この操作には数秒かかる場合があります。",
  },
  简体: {
    confirm: "您要更改语言吗？",
    sub: "此操作可能需要几秒钟。",
    change: "更改",
    back: "返回",
    loading: "正在更改语言。\n返回主界面。",
    loadingSub: "此操作可能需要几秒钟。",
  },
  繁體: {
    confirm: "您要更改語言嗎？",
    sub: "此操作可能需要幾秒鐘。",
    change: "更改",
    back: "返回",
    loading: "正在更改語言。\n返回主畫面。",
    loadingSub: "此操作可能需要幾秒鐘。",
  },
};

function RadioIcon({ active }: { active: boolean }) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Circle
        cx="8"
        cy="8"
        r="7"
        stroke={active ? "#FF7654" : "#BFBFBF"}
        strokeWidth="2"
      />
      {active && <Circle cx="8" cy="8" r="4" fill="#FF7654" />}
    </Svg>
  );
}

function RefreshIcon({
  rotate,
}: {
  rotate: Animated.AnimatedInterpolation<string>;
}) {
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <Path
          d="M8 24C8 15.163 15.163 8 24 8c4.97 0 9.42 2.26 12.42 5.82"
          stroke="#656565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M40 24c0 8.837-7.163 16-16 16-4.97 0-9.42-2.26-12.42-5.82"
          stroke="#656565"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M36 6l4.5 7.5-7.5.5"
          stroke="#656565"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 42l-4.5-7.5 7.5-.5"
          stroke="#656565"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
}

export default function Language() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<LangKey>("한국어");
  const [pendingLang, setPendingLang] = useState<LangKey | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const rotateInterp = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    if (!showLoading) return;
    rotateAnim.setValue(0);
    const anim = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    const timer = setTimeout(() => {
      anim.stop();
      rotateAnim.setValue(0);
      setShowLoading(false);
      if (pendingLang) setSelected(pendingLang);
      navigation.navigate("Home");
    }, 2000);
    return () => {
      clearTimeout(timer);
      anim.stop();
    };
  }, [showLoading]);

  const handlePress = (lang: LangKey) => {
    if (lang === selected) return;
    setPendingLang(lang);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowLoading(true);
  };

  const strings = pendingLang
    ? LANG_STRINGS[pendingLang]
    : LANG_STRINGS["English"];

  return (
    <Layout title="언어" showBack showCamera={false}>
      <View className="">
        {LANGUAGES.map((lang) => {
          const isSelected = lang === selected;
          return (
            <TouchableOpacity
              key={lang}
              onPress={() => handlePress(lang)}
              activeOpacity={0.7}
              className="flex-row items-center gap-3 px-[17px] py-6 border-b border-b-[rgba(191,191,191,0.30)]"
            >
              <RadioIcon active={isSelected} />
              <Text
                className={`text-b3 font-sb ${isSelected ? "text-[#FF7654]" : "text-dark-gray"}`}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 확인 모달 */}
      <ConfirmModal
        visible={showConfirm}
        title={strings.confirm}
        description={strings.sub}
        confirmLabel={strings.change}
        cancelLabel={strings.back}
        confirmColor="#FF7654"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />

      {/* 변경 중 모달 */}
      <Modal visible={showLoading} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="bg-white rounded-2xl items-center w-[300px] px-6 py-8 gap-5">
            <Text className="text-b2 font-sb text-gray-black text-center">
              {strings.loading}
            </Text>
            <View className="bg-soft-gray-white rounded-full p-4">
              <RefreshIcon rotate={rotateInterp} />
            </View>
            <Text className="text-b4 font-rg text-[#656565] text-center">
              {strings.loadingSub}
            </Text>
          </View>
        </View>
      </Modal>
    </Layout>
  );
}
