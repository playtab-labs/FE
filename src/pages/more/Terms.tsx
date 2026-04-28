import Layout from "@/components/Layout";
import TERMS_DATA from "@/mockdatas/TermsDetail.json";
import { ScrollView, Text, View } from "react-native";

export default function TermsPage() {
  return (
    <Layout title="이용약관" showBack showCamera={false}>
      <ScrollView showsVerticalScrollIndicator={false} className="py-4">
        {TERMS_DATA.map((term, index) => (
          <View key={term.id} className={index > 0 ? "mt-8" : ""}>
            <Text className="text-b2 font-eb text-gray-black mb-3">
              {term.label}
            </Text>
            <Text className="text-b4 font-rg text-dark-gray leading-6">
              {term.content}
            </Text>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}
