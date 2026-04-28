import Layout from "@/components/Layout";
import QuestionFrame from "@/components/more/faq/QuestionFrame";
import { ScrollView, Text, View } from "react-native";

const FAQ_ITEMS = [
  {
    question: "입장 시작 시간은 언제인가요?",
    answer:
      "게이트 오픈은 오전 10시 기준으로 운영되며, 현장 상황에 따라 일부 동선 오픈 시간이 조정될 수 있습니다. 원활한 입장을 위해 여유있게 도착해 주세요.",
  },
  {
    question: "재입장이 가능한가요?",
    answer:
      "운영 지침에 따라 지정된 절차를 거친 경우 재입장이 가능합니다. 손목밴드 및 티켓 인증 상태를 유지해 주셔야 하며, 일부 시간대에는 입장 대기 시간이 발생할 수 있습니다.",
  },
  {
    question: "공식 MD는 어디에서 구매하나요?",
    answer:
      "공식 MD는 행사장 내 OFFICIAL MD 부스에서 구매하실 수 있습니다. 운영 시간은 공지사항 및 현장 안내를 함께 확인해 주세요.",
  },
  {
    question: "우천시에도 공연이 진행되나요?",
    answer:
      "기본적으로 우천 시에도 공연은 진행됩니다. 다만 기상 악화, 안전 문제, 현장 운영 상황에 따라 일부 프로그램이 변경 또는 중단될 수 있습니다.",
  },
  {
    question: "분실물은 어디에서 찾을 수 있나요?",
    answer:
      "분실물은 행사장 내 분실물 센터에서 찾으실 수 있습니다. 운영 시간 및 위치는 현장 안내를 참고해 주세요.",
  },
];

export default function FAQ() {
  return (
    <Layout title="FAQ" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -20 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 32,
          gap: 16,
        }}
      >
        <View className="gap-4 mb-[58px]">
          <View className="flex-row items-center gap-2">
            <Text className="text-h1 font-eb text-gray-black">자주 묻는</Text>
            <Text className="text-h1 font-eb text-text-salmon">질문</Text>
          </View>
          <Text className="text-b3 font-sb text-dark-gray">
            궁금한 내용을 눌러 답변을 확인해보세요.
          </Text>
        </View>

        {FAQ_ITEMS.map((item, index) => (
          <QuestionFrame
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </ScrollView>
    </Layout>
  );
}
