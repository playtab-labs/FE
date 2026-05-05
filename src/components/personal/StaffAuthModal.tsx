import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import ToastError from "../common/ToastError";

interface StaffAuthModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
  error?: string;
}

export default function StaffAuthModal({
  visible,
  onClose,
  onConfirm,
  error,
}: StaffAuthModalProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (error) {
      setToastVisible(true);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
    }
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [error]);

  const handleConfirm = () => {
    Keyboard.dismiss();
    onConfirm(code);
    setCode("");
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={handleClose}
    >
      {/* 배경 어둡게 */}
      <Pressable
        className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.4)]"
        onPress={handleClose}
      >
        {/* 모달 카드 */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-[320px] rounded-2xl bg-white"
          style={{
            paddingVertical: 35,
            paddingHorizontal: 40,
            gap: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          {/* 안내 문구 */}
          <View className="items-center gap-[10px]">
            <Text className="text-b3 font-sb text-gray-black text-center">
              {t("personal.staffAuthTitle")}
            </Text>
            <Text className="text-b4 font-rg text-[#656565] text-center">
              {t("personal.staffAuthSubtitle")}
            </Text>
          </View>

          {/* 인풋 + 인증 버튼 */}
          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center rounded-lg border border-[#E4E4E4] bg-soft-gray-white px-3 h-[42px]">
              <TextInput
                className="flex-1 text-b3 font-rg text-gray-black"
                placeholder={t("personal.staffCodePlaceholder")}
                placeholderTextColor="#BFBFBF"
                value={code}
                onChangeText={setCode}
              />
            </View>
            <TouchableOpacity
              onPress={handleConfirm}
              activeOpacity={0.8}
              className="h-[42px] px-4 items-center justify-center rounded-[8px] bg-secondary-salmon"
            >
              <Text className="text-b3 font-sb text-gray-black">
                {t("personal.staffConfirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>

        {/* 에러 토스트 */}
        {toastVisible && (
          <View className="absolute bottom-10 left-0 right-0 items-center">
            <ToastError type="email" message={t("personal.staffMismatch")} />
          </View>
        )}
      </Pressable>
    </Modal>
  );
}
