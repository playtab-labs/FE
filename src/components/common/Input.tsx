import { ReactNode } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type InputSize = "default" | "with-button";

interface InputProps extends TextInputProps {
  placeholder?: string;
  size?: InputSize;
  label?: string;
  description?: string;
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
  error?: boolean;
}

export default function Input({
  placeholder,
  size = "default",
  label,
  description,
  rightIcon,
  onRightIconPress,
  error = false,
  ...props
}: InputProps) {
  const isWithButton = size === "with-button";
  const widthStyle = isWithButton ? "w-[230px]" : "w-[342px]";
  const heightStyle = isWithButton ? "h-[42px]" : "py-4";

  return (
    <View className={`${widthStyle} gap-[6px]`}>
      {(label || description) && (
        <View className="flex-row justify-between items-center">
          {label && (
            <Text className="text-b3 font-sb text-[#656565] tracking-[-0.14px]">
              {label}
            </Text>
          )}
          {description && (
            <Text
              className={`text-b4 font-rg tracking-[-0.12px] text-right ${error ? "text-[#FF7B94]" : "text-[#656565]"}`}
            >
              {description}
            </Text>
          )}
        </View>
      )}
      <View
        className={`flex-row items-center rounded-lg border border-soft-gray bg-white px-3 ${heightStyle}`}
      >
        <TextInput
          className={`flex-1 text-b3 tracking-[-0.14px] ${error ? "font-rg text-[#FF7B94]" : "font-medium text-gray-black"}`}
          placeholder={placeholder}
          placeholderTextColor="#E4E4E4"
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} activeOpacity={0.7}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
