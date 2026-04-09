import Band from "@/assets/personal/band_default.png";
import LargeBand from "@/assets/personal/band_default_large.png";
import ExpiredBand from "@/assets/personal/band_expired.png";
import LargeExpiredBand from "@/assets/personal/band_expired_large.png";
import { cn } from "@/utils/cn";
import { Dimensions, Image, Text, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const BAND_ASPECT_RATIO = 954 / 262;
const LARGE_BAND_ASPECT_RATIO = 1259 / 338;

interface BandCardProps {
  serialNumber: string;
  isExpired: boolean;
  isLarge?: boolean;
}

export default function BandCard({
  serialNumber,
  isExpired,
  isLarge = false,
}: BandCardProps) {
  const imageSource = isLarge
    ? isExpired
      ? LargeExpiredBand
      : LargeBand
    : isExpired
      ? ExpiredBand
      : Band;

  const aspectRatio = isLarge ? LARGE_BAND_ASPECT_RATIO : BAND_ASPECT_RATIO;

  return (
    <View
      style={
        isLarge
          ? { width: SCREEN_WIDTH * 1.06, alignSelf: "center", aspectRatio }
          : { width: "100%", aspectRatio }
      }
    >
      {/* 팔찌 이미지 */}
      <Image
        source={imageSource}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="stretch"
      />

      {/* 텍스트 */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {isExpired && (
          <Text
            className={cn(
              "text-b4 font-eb py-1.5 px-2 rounded-[8px] text-extra-white",
              "bg-gray",
            )}
          >
            만료됨
          </Text>
        )}
        <Text className="text-b3 font-sb text-gray-black/60">내 일련번호</Text>
        <Text className="text-b3 font-sb text-gray-black/60">
          {serialNumber}
        </Text>
      </View>
    </View>
  );
}
