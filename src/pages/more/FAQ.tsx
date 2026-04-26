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
    question: "입장 시작 시간은 언제인가요?",
    answer:
      "게이트 오픈은 오전 10시 기준으로 운영되며, 현장 상황에 따라 일부 동선 오픈 시간이 조정될 수 있습니다. 원활한 입장을 위해 여유있게 도착해 주세요.",
  },
  {
    question: "입장 시작 시간은 언제인가요?",
    answer:
      "게이트 오픈은 오전 10시 기준으로 운영되며, 현장 상황에 따라 일부 동선 오픈 시간이 조정될 수 있습니다. 원활한 입장을 위해 여유있게 도착해 주세요.",
  },
  {
    question: "입장 시작 시간은 언제인가요?",
    answer:
      "게이트 오픈은 오전 10시 기준으로 운영되며, 현장 상황에 따라 일부 동선 오픈 시간이 조정될 수 있습니다. 원활한 입장을 위해 여유있게 도착해 주세요.",
  },
  {
    question: "입장 시작 시간은 언제인가요?",
    answer:
      "게이트 오픈은 오전 10시 기준으로 운영되며, 현장 상황에 따라 일부 동선 오픈 시간이 조정될 수 있습니다. 원활한 입장을 위해 여유있게 도착해 주세요.",
  },
];

export default function FAQ() {
  return (
    <Layout title="FAQ" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -17 }}
        contentContainerStyle={{
          paddingHorizontal: 17,
          paddingTop: 24,
          paddingBottom: 32,
          gap: 16,
        }}
        className="px-4"
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
