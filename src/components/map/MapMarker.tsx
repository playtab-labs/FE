import type { MarkerData } from "@/data/mockMarkers";
import { useState } from "react";
import { Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  Defs,
  Path,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

const BUBBLE_H: Record<MarkerData["type"], number> = {
  main: 40,
  sub: 40,
  facility: 40,
};

const BUBBLE_PAD: Record<MarkerData["type"], number> = {
  main: 16,
  sub: 12,
  facility: 16,
};

const BUBBLE_MIN_W: Record<MarkerData["type"], number> = {
  main: 40,
  sub: 40,
  facility: 40,
};

const GRAD_COLORS: Record<MarkerData["type"], [string, string]> = {
  main: ["#FF7654", "#FFAD96"],
  sub: ["#FFAD96", "#FFCFBF"],
  facility: ["#F5C0B0", "#FFE0D6"],
};

const BORDER_COLORS: Record<MarkerData["type"], [string, string]> = {
  main: "#FFAD96",
  sub: "#FFCFBF",
  facility: "#FF7654",
};

const CORNER_R = 16;
const TAIL_HALF = 7;
const TAIL_H = 8;
const STROKE_W = 2;

const MARKER_TYPO: Record<MarkerData["type"], string> = {
  main: "text-t3 font-eb text-white",
  sub: "text-b4 font-eb text-white",
  facility: "text-[28px]",
};

/** 말풍선 SVG path: 둥근 네모 + 가운데 아래 꼬리 */
function buildPath(w: number, h: number) {
  const r = Math.min(CORNER_R, w / 2, h / 2);
  const cx = w / 2;
  return [
    `M ${r} 0`,
    `L ${w - r} 0`,
    `Q ${w} 0 ${w} ${r}`,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${cx + TAIL_HALF} ${h}`,
    `L ${cx} ${h + TAIL_H}`,
    `L ${cx - TAIL_HALF} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`,
  ].join(" ");
}

interface SpeechBubbleProps {
  label: string;
  type: MarkerData["type"];
  markerId: string;
}

const SpeechBubble = ({ label, type, markerId }: SpeechBubbleProps) => {
  const [textW, setTextW] = useState(-1);

  const H = BUBBLE_H[type];
  const PH = BUBBLE_PAD[type];
  const MIN_W = BUBBLE_MIN_W[type];
  const bubbleW = textW < 0 ? MIN_W : Math.max(MIN_W, textW + PH * 2);
  const totalH = H + TAIL_H;
  // stroke가 바깥으로 잘리지 않도록 SVG 캔버스를 STROKE_W만큼 여유 확보
  const svgW = bubbleW + STROKE_W * 2;
  const svgH = totalH + STROKE_W;
  const path = buildPath(bubbleW, H);

  return (
    <View style={{ width: svgW, height: svgH }}>
      {/* 텍스트 너비 측정용 (숨김) */}
      <Text
        className={MARKER_TYPO[type]}
        style={{ position: "absolute", opacity: 0 }}
        onLayout={(e) => setTextW(e.nativeEvent.layout.width)}
      >
        {label}
      </Text>

      {/* SVG 말풍선 */}
      <Svg
        width={svgW}
        height={svgH}
        style={{
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Defs>
          <SvgLinearGradient
            id={`grad_${markerId}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <Stop offset="0" stopColor={GRAD_COLORS[type][0]} />
            <Stop offset="1" stopColor={GRAD_COLORS[type][1]} />
          </SvgLinearGradient>
        </Defs>
        {/* path를 STROKE_W만큼 안쪽으로 밀어서 stroke가 캔버스 밖으로 안 나가게 */}
        <Path
          d={path}
          fill={`url(#grad_${markerId})`}
          stroke={BORDER_COLORS[type]}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
          translateX={STROKE_W}
          translateY={STROKE_W / 2}
        />
      </Svg>

      {/* 텍스트 오버레이 */}
      <View
        style={{
          position: "absolute",
          top: STROKE_W / 2,
          left: STROKE_W,
          right: STROKE_W,
          height: H,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className={MARKER_TYPO[type]}>{label}</Text>
      </View>
    </View>
  );
};

interface MapMarkerProps {
  marker: MarkerData;
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
}

const FACILITY_VISIBLE_SCALE = 2;

const MapMarker = ({
  marker,
  scale,
  translateX,
  translateY,
  containerWidth,
  containerHeight,
}: MapMarkerProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    const cx = containerWidth.value / 2;
    const cy = containerHeight.value / 2;
    const x = marker.fx * containerWidth.value;
    const y = marker.fy * containerHeight.value;

    const left = (x - cx) * scale.value + cx + translateX.value;
    const top = (y - cy) * scale.value + cy + translateY.value;

    const opacity =
      marker.type === "facility"
        ? scale.value >= FACILITY_VISIBLE_SCALE
          ? 1
          : 0
        : 1;

    return { left, top, opacity };
  });

  return (
    <Animated.View
      style={[{ position: "absolute", pointerEvents: "none" }, animatedStyle]}
    >
      <SpeechBubble
        label={marker.label}
        type={marker.type}
        markerId={marker.id}
      />
    </Animated.View>
  );
};

export default MapMarker;
