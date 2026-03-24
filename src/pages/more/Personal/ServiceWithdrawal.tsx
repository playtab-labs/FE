import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import { Text, View } from "react-native";

export default function ServiceWithdrawal() {
  return (
    <Layout title="서비스 탈퇴" showBack showCamera={false}>
      <View className="flex-1">
        <View className="mt-4 px-[12px] gap-[12px]">
          <Text className="text-h1 font-eb text-gray-black">
            정말로 탈퇴하시겠습니까?
          </Text>
          <Text className="text-b3 font-sb text-[#656565]">
            {"예매 내역과 개인정보는 즉각적으로 삭제되며,\n복구할 수 없습니다."}
          </Text>
          <Text className="text-b3 font-sb text-[#656565]">
            구매 내역의 확인 및 환불이 불가합니다.
          </Text>
        </View>

        <View className="items-center mt-auto">
          <Button label="탈퇴하기" size="long" state="active" />
        </View>
      </View>
    </Layout>
  );
}
