import { Text, View } from "react-native";

type ToastType = "email" | "login";

interface ToastErrorProps {
  type: ToastType;
  message: string;
}

export default function ToastError({ type, message }: ToastErrorProps) {
  if (type === "email") {
    return (
      <View
        className="inline-flex flex-row items-center justify-center rounded-2xl bg-dark-gray p-2.5 gap-[10px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Text className="text-b4 font-sb text-extra-white text-center tracking-[-0.12px]">
          {message}
        </Text>
      </View>
    );
  }

  return (
    <View
      className="inline-flex flex-row items-center justify-center rounded-lg bg-dark-gray px-[10px] py-[10px] gap-[10px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Text className="text-b4 font-sb text-extra-white text-center tracking-[-0.12px]">
        {message}
      </Text>
    </View>
  );
}
