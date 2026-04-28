import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface QuestionFrameProps {
  question: string;
  answer: string;
}

export default function QuestionFrame({
  question,
  answer,
}: QuestionFrameProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      {/* Q 카드 - 항상 동일, expanded 시 위에 float */}
      <TouchableOpacity
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
        className="flex-row items-start self-stretch rounded-2xl bg-[#FFDED5] p-4 gap-2"
        style={{ zIndex: 1, elevation: 2 }}
      >
        {/* Q 배지 — 고정 */}
        <Text className="bg-secondary-salmon text-b3 font-sb text-extra-white w-6 h-6 rounded-full text-center leading-6">
          Q
        </Text>
        {/* 질문 텍스트 — 남은 공간 */}
        <Text className="flex-1 text-b3 font-sb text-gray-black">
          {question}
        </Text>
        {/* 화살표 — 고정, 세로 중앙 */}
        <Svg width="16" height="8" viewBox="0 0 16 8" fill="none" style={{ alignSelf: "center" }}>
          <Path
            d={expanded ? "M1 7L8 1.5L15 7" : "M15 1L8 6.5L1 1"}
            stroke="#656565"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* 답변 판 - Q 카드 뒤에서 올라오는 흰 배경 */}
      {expanded && (
        <View
          className="bg-extra-white rounded-2xl p-4"
          style={{ marginTop: -28, paddingTop: 44 }}
        >
          <View className="flex-row gap-3 items-start">
            <Text className="bg-secondary-salmon text-b3 font-sb text-extra-white w-6 h-6 rounded-full text-center leading-6">
              A
            </Text>
            <Text className="flex-1 text-b4 font-rg text-[#000000]">
              {answer}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
