import Layout from "@/components/Layout";
import QuestionFrame from "@/components/more/faq/QuestionFrame";
import { ScrollView, Text, View } from "react-native";

const FAQ_ITEMS = [
  {
    question:
      "1. 현장 입장 시 입장 줄은 어떻게 운영되며, 재학생은 어떤 절차를 거쳐야 하나요?",
    answer:
      "현장 입장과 팔찌 소지자 입장 줄은 별도로 구분되지 않으며, 모든 재학생은 동일한 입장 줄을 이용합니다. 다만, 재학생의 경우 입장 전 반드시 재학생 인증 후 입장 팔찌를 수령하셔야 입장이 가능합니다.",
  },
  {
    question:
      "2. 재학생과 함께 입장 시, 외부인도 재학생 존으로 입장할 수 있나요?",
    answer: "재학생과 함께 입장하더라도 외부인의 재학생 존 이용은 불가합니다.",
  },
  {
    question: "3. 줄 서기 및 대운동장 내 자리 맡아두기가 가능한가요?",
    answer:
      "공정한 입장 질서 유지를 위해 대리 줄서기 및 자리 맡아두기는 모두 허용되지 않습니다. 또한 개인 의자 등 물품을 이용한 자리 확보 및 반입 역시 불가하오니, 모든 인원은 반드시 직접 줄을 서고 현장에서 자리를 이용해 주시기 바랍니다.",
  },
  {
    question: "4. 공연 시작 후에도 입장이 가능한가요?",
    answer:
      "손목밴드 수령 및 공연장 입·퇴장은 입장 시작 시간부터 당일 공연 종료 시까지 자유롭게 가능합니다.",
  },
  {
    question: "5. 대운동장 입장 시 반입이 제한되는 물품이 있나요?",
    answer:
      "안전상의 이유로 음식물 및 주류, 전문가용 카메라 등 타인의 관람을 방해하거나 안전에 위협이 될 수 있는 물품의 반입은 제한되며, 모든 관람객의 안전하고 쾌적한 축제를 위해 현장 상황에 따라 추가적인 물품 반입이 제한될 수 있습니다.",
  },
  {
    question: "6. 공연 중 퇴장 및 재입장, 화장실 이용이 가능한가요?",
    answer:
      "공연 중에도 화장실 이용 등을 위한 일시적인 퇴장 및 재입장은 가능합니다. 다만, 혼잡 상황에 따라 이동이 제한되거나 기존 자리로의 복귀가 어려울 수 있는 점 양해 부탁드립니다.",
  },
  {
    question: "7. 대운동장 입장하면 별도로 앉을 수 있는 공간은 없나요?",
    answer:
      "대운동장 내 별도의 좌석 공간은 마련되어 있지 않으며, 안전 상의 이유로 바닥 착석 및 돗자리 이용이 불가합니다.",
  },
  {
    question: "8. 쓰레기는 어디에 버려야 하나요?",
    answer: "대운동장 외부의 지정된 쓰레기통을 이용해 주시기 바랍니다.",
  },
  {
    question: "9. 엠마오관 관중석에서 볼 경우 인원이 정해져있나요?",
    answer:
      "별도의 인원 제한은 없으나, 현장 상황 및 안전상의 이유에 따라 입장이 제한될 수 있습니다.",
  },
  {
    question:
      "10. 엠마오관 관중석에서 관람 시 돗자리 대여는 어디서 할 수 있나요?",
    answer: "엠마오관 옥상에 위치한 돗자리 대여 부스에서 이용 가능합니다.",
  },
  {
    question: "11. 공연 중 아티스트의 사진 또는 동영상 촬영이 가능한가요?",
    answer:
      "일반적인 기념 촬영은 가능하지만, 전문 장비를 활용한 촬영이나 녹음, 녹화, SNS 생중계 등은 타인의 관람을 방해하기 때문에 금지하오니 협조 부탁드립니다.",
  },
  {
    question: "12. 축제 기간동안 따로 흡연구역이 마련되어있나요?",
    answer:
      "흡연은 지정된 흡연구역에서만 가능합니다. 본관 옆, 체육관 뒷편 등 기존 흡연구역을 이용해 주시기 바랍니다.",
  },
  {
    question: "13. 분실물의 경우 어디서 찾을 수 있나요?",
    answer:
      "분실물은 축제 기간 종료 후 축제준비위원단에서 일괄 수합하여 별도로 축제준비위원단 공식 인스타그램(@sogang_festival) 게시물로 공지드릴 예정입니다.",
  },
  {
    question: "14. 의무팀이 상시 대기하고 있나요? 있다면 어디에 있나요?",
    answer:
      "축제 기간 동안 대운동장 입구 방면에 EMS가 상시 대기할 예정입니다. 응급상황 발생 시 신속한 대처를 위해 가장 가까운 곳에 있는 스태프에게 상황 전달을 부탁드립니다.",
  },
  {
    question: "15. 사전 구매 굿즈 수령처가 궁금합니다.",
    answer:
      "사전 구매자 수령은 청년광장 굿즈 부스, 현장 판매의 경우 대운동장 입구 옆 판매 부스에서 운영될 예정입니다. 자세한 위치는 앱 내 캠퍼스 맵을 참고 부탁드립니다.",
  },
];

export default function FAQ() {
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
