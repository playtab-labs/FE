import { Text, View } from "react-native";

type TicketStatus = "available" | "expired";

interface TicketProps {
  day: 1 | 2 | 3;
  status: TicketStatus;
  date: string;
  time: string;
  location: string;
  bgColor?: string;
  badgeColor?: string;
}

const DAY_COLORS: Record<number, { bg: string; badge: string }> = {
  1: { bg: "#B6A8FF", badge: "#927DFF" },
  2: { bg: "#B6A8FF", badge: "#927DFF" },
  3: { bg: "#F6CAAE", badge: "#FDA975" },
};

export default function Ticket({
  day,
  status,
  date,
  time,
  location,
  bgColor,
  badgeColor,
}: TicketProps) {
  const isAvailable = status === "available";
  const colors = DAY_COLORS[day];
  const bg = bgColor ?? colors.bg;
  const badge = isAvailable ? (badgeColor ?? colors.badge) : "#FFFFFF";

  return (
    <View
      className="w-[329px] rounded-2xl border border-[rgba(255,255,255,0.40)] p-[17px] justify-between"
      style={{
        backgroundColor: bg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      {/* 상단: 제목 + 상태 뱃지 */}
      <View className="flex-row items-center justify-between">
        <Text className="text-h1 font-bold text-black">DAY {day} TICKET</Text>
        <View
          className="h-[24px] flex-row items-center justify-center gap-[4px] px-[8px] rounded-[20px]"
          style={{ backgroundColor: badge }}
        >
          <Text
            className={`text-b5 font-sb ${isAvailable ? "text-extra-white" : "text-[#BFBFBF]"}`}
          >
            {isAvailable ? "입장 가능" : "EXPIRED"}
          </Text>
        </View>
      </View>

      {/* 하단: 날짜/시간 + 위치 */}
      <View className="gap-[2px] mt-[7px]">
        <Text className="text-b4 font-sb text-black">
          {date}
          {"  "}
          {time}
        </Text>
        <Text className="text-b4 font-sb text-black">{location}</Text>
      </View>
    </View>
  );
}
