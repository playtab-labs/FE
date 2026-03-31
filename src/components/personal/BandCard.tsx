import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Band from "@/assets/personal/band_default.png";
import ExpiredBand from "@/assets/personal/band_expired.png";
import LargeBand from "@/assets/personal/band_default_large.png";
import LargeExpiredBand from "@/assets/personal/band_expired_large.png";
import CloseIcon from "@/assets/close.svg";
import { cn } from "@/utils/cn";

// 이미지 원본 비율
const BAND_ASPECT_RATIO = 954 / 262;         // 기본 이미지
const LARGE_BAND_ASPECT_RATIO = 1259 / 338;  // Large 이미지

const LAYOUT_PADDING = 17; // Layout의 px-[17px]
const CARD_WIDTH = Dimensions.get("window").width * 1.1;
const CARD_MARGIN_H =
  -(CARD_WIDTH - Dimensions.get("window").width) / 2 - LAYOUT_PADDING;

interface BandCardProps {
  serialNumber: string;
  onClose?: () => void;
  isExpired: boolean;
  isLarge?: boolean;
}

export default function BandCard({
  serialNumber,
  onClose,
  isExpired,
  isLarge = false,
}: BandCardProps) {
  const imageSource = isLarge
    ? isExpired ? LargeExpiredBand : LargeBand
    : isExpired ? ExpiredBand : Band;

  const aspectRatio = isLarge ? LARGE_BAND_ASPECT_RATIO : BAND_ASPECT_RATIO;

  return (
    <View
      style={{
        width: CARD_WIDTH,
        marginHorizontal: CARD_MARGIN_H,
        aspectRatio,
      }}
    >
      {/* 팔찌 이미지 — 컨테이너를 꽉 채움 */}
      <Image
        source={imageSource}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="stretch"
      />

      {/* 닫기 버튼 — 우측 상단 */}
      <TouchableOpacity
        onPress={onClose}
        style={{ position: "absolute", top: 8, right: 8 }}
        activeOpacity={0.7}
      >
        <CloseIcon width={18} height={18} />
      </TouchableOpacity>

      {/* 텍스트 — normal flow로 꽉 채운 뒤 중앙 정렬 */}
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 4 }}
      >
        {isExpired && (
          <Text
            className={cn(
              "text-b4 font-eb py-1.5 px-2 rounded-[8px] text-extra-white",
              "bg-gray"
            )}
          >
            만료됨
          </Text>
        )}
        <Text className="text-b3 font-sb text-gray-black/60">내 일련번호</Text>
        <Text className="text-b3 font-sb text-gray-black/60">{serialNumber}</Text>
      </View>
    </View>
  );
}
