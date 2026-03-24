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
        className="w-full rounded-2xl bg-[#D9D9D9] px-4 py-[14px]"
        style={{ zIndex: 1, elevation: 2 }}
      >
        <View className="flex-row items-center justify-between gap-3">
          <Text className="flex-1 text-b3 font-sb text-gray-black">
            Q. {question}
          </Text>
          <Svg width="16" height="8" viewBox="0 0 16 8" fill="none">
            <Path
              d={expanded ? "M1 7L8 1.5L15 7" : "M15 1L8 6.5L1 1"}
              stroke="#656565"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </TouchableOpacity>

      {/* 답변 판 - Q 카드 뒤에서 올라오는 흰 배경 */}
      {expanded && (
        <View
          className="bg-extra-white rounded-2xl px-5 pb-4"
          style={{ marginTop: -28, paddingTop: 44 }}
        >
          <Text className="text-b4 font-rg text-[#000000]">A. {answer}</Text>
        </View>
      )}
    </View>
  );
}
