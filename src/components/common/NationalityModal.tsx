import { FlatList, Modal, Text, TouchableOpacity } from "react-native";

interface NationalityModalProps {
  visible: boolean;
  nationalities: string[];
  selected: string;
  onSelect: (nationality: string) => void;
  onClose: () => void;
}

export default function NationalityModal({
  visible,
  nationalities,
  selected,
  onSelect,
  onClose,
}: NationalityModalProps) {
  const handleSelect = (item: string) => {
    onSelect(item);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 배경 */}
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(191, 191, 191, 0.75)" }}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* 모달 카드 */}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 342,
            height: 560,
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#BFBFBF",
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            overflow: "hidden",
          }}
        >
          <FlatList
            data={nationalities}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{
                  paddingVertical: 16,
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  borderBottomWidth: index === nationalities.length - 1 ? 0 : 1,
                  borderBottomColor: "#BFBFBF",
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 17,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
