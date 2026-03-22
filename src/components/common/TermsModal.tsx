import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

interface TermsModalProps {
  visible: boolean;
  title: string;
  required?: boolean;
  content: string;
  onAgree: () => void;
  onClose: () => void;
}

function CheckIcon({ agreed }: { agreed: boolean }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Polyline
        points="4,10 8,14 16,6"
        stroke={agreed ? "#FFA38C" : "#BFBFBF"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function TermsModal({
  visible,
  title,
  required = true,
  content,
  onAgree,
  onClose,
}: TermsModalProps) {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(true);
    onAgree();
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 배경 */}
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(191, 191, 191, 0.75)" }}
      >
        {/* 모달 카드 */}
        <View
          style={{
            width: 342,
            height: 551,
            padding: 24,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#BFBFBF",
            backgroundColor: "#F5F5F5",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
            gap: 16,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 약관 내용 스크롤 + 동의 버튼 */}
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            {/* 헤더 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "baseline",
                gap: 4,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: required ? "#FFA38C" : "#656565",
                  lineHeight: 17,
                }}
              >
                {required ? "필수" : "선택"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#1A1A1A",
                  lineHeight: 17,
                }}
              >
                {title}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#656565",
                lineHeight: 18,
                letterSpacing: -0.12,
              }}
            >
              {content}
            </Text>

            {/* 구분선 + 동의 버튼 (스크롤 맨 아래) */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#BFBFBF",
                marginTop: 16,
                paddingTop: 12,
              }}
            >
              <TouchableOpacity
                className="flex-row items-center justify-between"
                onPress={handleAgree}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#1A1A1A",
                    letterSpacing: -0.14,
                  }}
                >
                  해당 약관에 동의합니다.
                </Text>
                <CheckIcon agreed={agreed} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
