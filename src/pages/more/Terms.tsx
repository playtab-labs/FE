import Layout from "@/components/Layout";
import TERMS_DATA from "@/mockdatas/TermsDetail.json";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TermsPage() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

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
            {term.linkUrl && (
              <TouchableOpacity onPress={() => handleLinkPress(term.linkUrl)}>
                <Text className="text-b4 font-rg text-blue-500 underline mt-3">
                  {term.linkText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}
