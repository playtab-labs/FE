import { Text, TouchableOpacity } from "react-native";

interface TabListProps {
  icon: React.ReactNode;
  label: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

export default function TabList({
  icon,
  label,
  rightElement,
  onPress,
}: TabListProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-[10px] px-[10px] py-4 self-stretch border-b border-soft-gray"
    >
      {icon}
      <Text className="flex-1 text-b3 font-sb text-gray-black">{label}</Text>
      {rightElement}
    </TouchableOpacity>
  );
}
