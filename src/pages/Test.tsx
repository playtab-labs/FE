import NationalityModal from "@/components/common/NationalityModal";
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
      <NationalityModal
        visible={visible}
        nationalities={[
          "대한민국",
          "가나",
          "나이지리아",
          "덴마크",
          "미국",
          "일본",
          "중국",
          "대한민국",
          "가나",
          "나이지리아",
          "덴마크",
          "미국",
          "일본",
          "중국",
          "대한민국",
          "가나",
          "나이지리아",
          "덴마크",
          "미국",
          "일본",
          "중국",
        ]}
        selected={"대한민국"}
        onClose={() => setVisible(false)}
        onSelect={(nation) => {
          console.log("선택된 국가:", nation);
          setVisible(false);
        }}
      />
      <Button label="홈 이동" onPress={() => navigation.navigate("Tabs")} />
    </View>
  );
};

export default Test;
