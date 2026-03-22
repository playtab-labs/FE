import TermsModal from "@/components/common/TermsModal";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Button from "../components/common/Button";
import termsData from "../mockdatas/TermsDetail.json";
const Test = () => {
  const navigation = useNavigation<any>();
  const term = termsData.find((t) => t.id === 1)!; // 서비스 이용약관 데이터
  const [visible, setVisible] = React.useState(true);

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <TermsModal
        visible={visible}
        title={term.label}
        required={term.required}
        content={term.content}
        onAgree={() => {}}
        onClose={() => setVisible(false)}
      />
      <Button label="홈 이동" onPress={() => navigation.navigate("Tabs")} />
    </View>
  );
};

export default Test;
