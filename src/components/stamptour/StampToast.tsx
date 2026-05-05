import { typo } from "@/styles/typography";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

interface StampToastProps {
  title: string;
  isBingo?: boolean;
  boothName?: string;
}

export default function StampToast({ title, isBingo = false, boothName = 'XX' }: StampToastProps) {
  const { t } = useTranslation();
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
            {t('stampTour.toastBingoPrize', { booth: boothName })}
          </Text>
          <Text className={typo.B3_Sb} style={textStyle}>
            {t('stampTour.toastBingoEntry')}
          </Text>
        </>
      ) : (
        <Text className={typo.B3_Sb} style={textStyle}>
          {t('stampTour.toastStamp', { title })}
        </Text>
      )}
    </View>
  );
}
