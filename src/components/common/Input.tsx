import { Text, TextInput, TextInputProps, View } from "react-native";

type InputSize = "default" | "with-button";

interface InputProps extends TextInputProps {
  placeholder?: string;
  size?: InputSize;
  label?: string;
  description?: string;
}

export default function Input({
  placeholder,
  size = "default",
  label,
  description,
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
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#656565", lineHeight: 19.6, letterSpacing: -0.14 }}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#656565", lineHeight: 16.8, letterSpacing: -0.12, textAlign: "right" }}>
              {description}
            </Text>
          )}
        </View>
      )}
      <TextInput
        className={`flex-row items-center rounded-lg border border-[#F5F5F5] bg-white px-3 ${heightStyle}`}
        style={{
          gap: 10,
          fontSize: 14,
          fontWeight: "500",
          lineHeight: 17,
          color: "#1A1A1A",
        }}
        placeholder={placeholder}
        placeholderTextColor="#E4E4E4"
        {...props}
      />
    </View>
  );
}
