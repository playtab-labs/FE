import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  warning?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  warning,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  confirmColor = "#FFA38C",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="bg-white rounded-2xl items-center w-[85%] px-20 py-9 gap-2">
          <Text className="text-b3 font-sb text-gray-black text-center">
            {title}
          </Text>
          {warning && (
            <Text
              className="text-b4 font-sb text-center"
              style={{ color: confirmColor }}
            >
              {warning}
            </Text>
          )}
          {description && (
            <Text className="text-b4 font-rg text-dark-gray text-center mb-3">
              {description}
            </Text>
          )}
          <View className="flex-row gap-2 mt-3">
            <TouchableOpacity
              onPress={onCancel}
              activeOpacity={0.8}
              className="flex-1 items-center justify-center rounded-xl p-3 bg-[#D9D9D9]"
            >
              <Text className="text-b3 font-sb text-gray-black">
                {cancelLabel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={0.8}
              className="flex-1 items-center justify-center rounded-xl p-3"
              style={{ backgroundColor: confirmColor }}
            >
              <Text className="text-b3 font-sb text-gray-black">
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
