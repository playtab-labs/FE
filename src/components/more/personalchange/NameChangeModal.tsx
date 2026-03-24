import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface NameChangeModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

export default function NameChangeModal({
  visible,
  onClose,
  title,
  description,
  buttonLabel = "돌아가기",
  onButtonPress,
}: NameChangeModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* 배경 어둡게 */}
      <Pressable
        className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.4)]"
        onPress={onClose}
      >
        {/* 모달 카드 */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-[320px] rounded-2xl bg-white flex-col items-center justify-center gap-[24px]"
          style={{
            paddingVertical: 35,
            paddingHorizontal: 50,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          {/* 안내 문구 */}
          <View className="items-center gap-[12px]">
            <Text className="text-b3 font-sb text-gray-black text-center">
              {title}
            </Text>
            {description && (
              <Text className="text-b4 font-rg text-[#656565] text-center">
                {description}
              </Text>
            )}
          </View>

          {/* 버튼 */}
          <TouchableOpacity
            onPress={onButtonPress ?? onClose}
            activeOpacity={0.8}
            className="flex-row items-center justify-center rounded-2xl h-[40px] px-[20px] bg-[#BFBFBF]"
          >
            <Text className="text-b2 font-sb text-gray-black">{buttonLabel}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
