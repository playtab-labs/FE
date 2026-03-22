import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Test = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Input
        label="테스트 입력창"
        description="부가설명"
        placeholder="테스트 입력창"
      />
      <Button label="홈 이동" onPress={() => navigation.navigate("Tabs")} />
    </View>
  );
};

export default Test;
