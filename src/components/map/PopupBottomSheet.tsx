import CloseWhiteIcon from "@/assets/close-white.svg";
import type { MarkerData } from "@/data/mockMarkers";
import { typo } from "@/styles/typography";
import { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PopupBottomSheetProps {
  marker: MarkerData;
  onClose: () => void;
}

const OPEN_SPRING = { damping: 5000, stiffness: 200 };
const SWIPE_THRESHOLD = 30;
const VELOCITY_THRESHOLD = 500;

const PopupBottomSheet = ({ marker, onClose }: PopupBottomSheetProps) => {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const sheetHeight = height * 0.45;

  const translateY = useSharedValue(sheetHeight);

  useEffect(() => {
    translateY.value = withSpring(0, OPEN_SPRING);
  }, []);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const triggerClose = () => {
    translateY.value = withTiming(
      sheetHeight,
      { duration: 250, easing: Easing.in(Easing.quad) },
      (finished) => {
        if (finished) runOnJS(onClose)();
      },
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (
        e.translationY > SWIPE_THRESHOLD ||
        e.velocityY > VELOCITY_THRESHOLD
      ) {
        runOnJS(triggerClose)();
      } else {
        translateY.value = withSpring(0, OPEN_SPRING);
      }
    });

  return (
    <Animated.View
      className="absolute left-0 right-0 bottom-0 rounded-t-3xl bg-white"
      style={[
        { height: sheetHeight },
        sheetStyle,
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 16,
        },
      ]}
    >
      <GestureDetector gesture={panGesture}>
        <View>
          <View className="items-center pt-3">
            <View className="w-10 h-1 rounded-full bg-soft-gray" />
          </View>
          <View className="relative items-center justify-center py-5">
            <Text className={`${typo.T2_Eb} text-gray-black`}>
              {marker.desc}
            </Text>
            <TouchableOpacity
              className="absolute right-5"
              onPress={triggerClose}
              hitSlop={8}
            >
              <CloseWhiteIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default PopupBottomSheet;
