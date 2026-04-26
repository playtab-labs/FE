import { typo } from "@/styles/typography";
import { Text, View } from "react-native";

interface StampToastProps {
  title: string;
  isBingo?: boolean;
  boothName?: string;
}

export default function StampToast({ title, isBingo = false, boothName = 'XX' }: StampToastProps) {
  const textStyle = { color: '#FFF', textAlign: 'center' as const, letterSpacing: -0.14 };

  return (
    <View
      style={{
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FF5E37',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {isBingo ? (
        <>
          <Text className={typo.B3_Sb} style={textStyle}>
            {boothName} 부스에서 경품을 수령할 수 있어요!
          </Text>
          <Text className={typo.B3_Sb} style={textStyle}>
            추가로 자동 응모가 완료되었어요.
          </Text>
        </>
      ) : (
        <Text className={typo.B3_Sb} style={textStyle}>
          {title} 스탬프를 채웠어요!
        </Text>
      )}
    </View>
  );
}
