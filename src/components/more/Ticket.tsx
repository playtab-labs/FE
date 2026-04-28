import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type TicketStatus = "available" | "upcoming" | "used" | "expired";

type TicketProps =
  | { noticket: true }
  | {
      noticket?: false;
      day: 2 | 3;
      status: TicketStatus;
      date: string;
      time: string;
      location: string;
    };

const GRADIENT_COLORS: Record<number, readonly [string, string]> = {
  2: ["#8A42FF", "rgba(138,66,255,0)"],
  3: ["#0067E9", "rgba(0,103,233,0.40)"],
};

const BASE_COLORS: Record<number, string> = {
  2: "#FFA38C",
  3: "#FFA38C",
};

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  available: {
    label: "입장 가능",
    bgClass: "bg-[#FF7B94]",
    textClass: "text-extra-white",
  },
  upcoming: {
    label: "입장 예정",
    bgClass: "bg-[#FFBBC2]",
    textClass: "text-extra-white",
  },
  used: {
    label: "사용 완료",
    bgClass: "bg-[#E4E4E4]",
    textClass: "text-dark-gray",
  },
  expired: {
    label: "기간 만료",
    bgClass: "bg-[#E4E4E4]",
    textClass: "text-dark-gray",
  },
};

const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,
} as const;

const CIRCLES = [
  { width: 440, height: 320, borderRadius: 160, left: -160, translateY: -160 },
  { width: 270, height: 200, borderRadius: 100, left: -100, translateY: -100 },
  { width: 190, height: 190, borderRadius: 95, left: -95, translateY: -95 },
];

export default function Ticket(props: TicketProps) {
  if (props.noticket) {
    return (
      <View className="w-full rounded-2xl" style={SHADOW}>
        <View className="w-full rounded-2xl overflow-hidden">
          <View
            className="absolute inset-0"
            style={{ backgroundColor: "#BFBFBF" }}
          />
          <LinearGradient
            colors={["#727272", "rgba(113,113,113,0)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          {CIRCLES.slice(0, 2).map((c, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                width: c.width,
                height: c.height,
                borderRadius: c.borderRadius,
                backgroundColor: "rgba(255,255,255,0.08)",
                left: c.left,
                top: "50%",
                transform: [{ translateY: c.translateY }],
              }}
            />
          ))}
          <View className="px-5 py-4 gap-2">
            <Text className="text-t1 font-eb text-extra-white">
              티켓을 활성화하세요.
            </Text>
            <Text className="text-b4 font-sb text-extra-white">
              PERSONAL에서 입장 팔찌 인식 시 자동으로 연동됩니다.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const { day, status, date, time, location } = props;
  const gradient = GRADIENT_COLORS[day];
  const { label, bgClass, textClass } = STATUS_CONFIG[status];

  return (
    <View className="w-full rounded-2xl" style={SHADOW}>
      <View className="w-full rounded-2xl overflow-hidden">
        <View
          className="absolute inset-0"
          style={{ backgroundColor: BASE_COLORS[day] }}
        />
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
        {CIRCLES.map((c, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              width: c.width,
              height: c.height,
              borderRadius: c.borderRadius,
              backgroundColor: "rgba(255,255,255,0.08)",
              left: c.left,
              top: "50%",
              transform: [{ translateY: c.translateY }],
            }}
          />
        ))}
        <View className="p-[17px] gap-[7px]">
          <View className="flex-row items-center justify-between">
            <Text className="text-h1 font-eb text-extra-white">
              DAY {day} TICKET
            </Text>
            <View
              className={`h-6 flex-row items-center px-2 rounded-[20px] border border-white/20 ${bgClass}`}
            >
              <Text className={`text-b4 font-eb ${textClass}`}>{label}</Text>
            </View>
          </View>
          <View className="gap-[2px]">
            <Text className="text-b4 font-sb text-extra-white">
              {date}
              {"  "}
              {time}
            </Text>
            <Text className="text-b4 font-sb text-extra-white">{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
