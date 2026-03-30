import { Text, TouchableOpacity } from "react-native";

type ButtonSize = "long" | "short";
type ButtonState = "active" | "inactive" | "reactivated";

interface ButtonProps {
  label: string;
  size?: ButtonSize;
  state?: ButtonState;
  onPress?: () => void;
}

const LONG_STATE_STYLE: Record<"active" | "inactive", string> = {
  active: "bg-[#FFA38C]",
  inactive: "bg-white",
};

const SHORT_STATE_STYLE: Record<ButtonState, string> = {
  inactive: "bg-[#BFBFBF] border border-[#BFBFBF]",
  active: "bg-[#FFA38C] border border-[#FFA38C]",
  reactivated: "bg-[#FF7B94] border border-[#FF7B94]",
};

export default function Button({
  label,
  size = "long",
  state = "active",
  onPress,
}: ButtonProps) {
  const isDisabled = state === "inactive";

  if (size === "long") {
    const colorStyle =
      LONG_STATE_STYLE[state === "inactive" ? "inactive" : "active"];
    return (
      <TouchableOpacity
        className={`flex-row items-center justify-center gap-[10px] rounded-2xl w-[342px] h-14 px-[92px] py-1 ${colorStyle}`}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <Text
          className={`text-t3 font-eb ${isDisabled ? "text-[#BFBFBF]" : ""}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center gap-[10px] rounded-lg w-[104px] h-[42px] ${SHORT_STATE_STYLE[state]}`}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <Text className="text-b3 font-sb text-extra-white">{label}</Text>
    </TouchableOpacity>
  );
}
