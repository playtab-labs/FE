import Layout from "@/components/Layout";
import ColoredText from "@/components/common/ColoredText";
import QuestionFrame from "@/components/more/faq/QuestionFrame";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function FAQ() {
  const { t } = useTranslation();

  const FAQ_ITEMS = Array.from({ length: 15 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <Layout title="FAQ" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 32,
          gap: 16,
        }}
      >
        <View className="gap-4 mb-6">
          <ColoredText
            text={t("faq.title")}
            className="text-h1 font-eb text-gray-black"
          />
          <Text className="text-b3 font-sb text-dark-gray">
            {t("faq.subtitle")}
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
