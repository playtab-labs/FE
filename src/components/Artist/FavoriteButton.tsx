import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

interface FavoriteButtonProps {
  initialFavorited?: boolean;
  onToggle?: (favorited: boolean) => void;
  type: "SET" | "FILTER";
}

const FavoriteButton = ({
  initialFavorited = false,
  onToggle,
  type,
}: FavoriteButtonProps) => {
  const [favorited, setFavorited] = useState(initialFavorited);

  const handlePress = () => {
    const next = !favorited;
    setFavorited(next);
    onToggle?.(next);
  };

  const isFilter = type === "FILTER";
  const iconColor = isFilter
    ? favorited
      ? "#fff"
      : "#BFBFBF"
    : favorited
      ? "#FF7654"
      : "#BFBFBF";

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`w-8 aspect-square rounded-full items-center justify-center ${
        isFilter && favorited
          ? "bg-text-salmon border border-soft-gray"
          : "bg-soft-gray-white"
      }`}
    >
      <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
        <Path
          d="M8.86008 1.24836L8.81925 3.45919C8.81341 3.76253 9.00591 4.16503 9.25091 4.34586L10.6976 5.44253C11.6251 6.14253 11.4734 7.00003 10.3651 7.35003L8.48091 7.93919C8.16591 8.03836 7.83341 8.38253 7.75175 8.70336L7.30258 10.4184C6.94675 11.7717 6.06008 11.9059 5.32508 10.7159L4.29841 9.05336C4.11175 8.75003 3.66841 8.52252 3.31841 8.54002L1.37008 8.63919C-0.0240871 8.70919 -0.420754 7.90419 0.489246 6.84253L1.64425 5.50086C1.86008 5.25003 1.95925 4.78336 1.86008 4.46836L1.26508 2.57836C0.920913 1.47003 1.53925 0.857526 2.64175 1.21919L4.36258 1.78503C4.65425 1.87836 5.09175 1.81419 5.33675 1.63336L7.13341 0.338359C8.10758 -0.355808 8.88341 0.0525255 8.86008 1.24836Z"
          fill={iconColor}
        />
        <Path
          d="M12.5068 11.9408L10.7393 10.1733C10.5702 10.0041 10.2902 10.0041 10.121 10.1733C9.95185 10.3424 9.95185 10.6224 10.121 10.7916L11.8885 12.5591C11.976 12.6466 12.0868 12.6874 12.1977 12.6874C12.3085 12.6874 12.4193 12.6466 12.5068 12.5591C12.676 12.3899 12.676 12.1099 12.5068 11.9408Z"
          fill={iconColor}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
