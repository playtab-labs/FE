import Band from "@/assets/personal/band_default.png";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

export default function SerialInput() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [serial, setSerial] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    if (serial === "AAAAAA") {
      setIsError(false);
      navigation.navigate("Success");
    } else {
      setIsError(true);
    }
  };

  const handleChangeText = (text: string) => {
    setSerial(text);
    if (isError) setIsError(false);
  };

  return (
    <Layout
      title={t("personal.appBar")}
      showBack={true}
      showBottomBar={true}
      activeTab="Personal"
      noPadding
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 flex-col">
          {/* 문구 */}
          <View className="py-4 mt-2 gap-4 mx-5">
            <ColoredText
              text={t("personal.serialTitle")}
              className="text-h1 font-eb text-gray-black"
            />
            <Text className="text-b3 font-sb text-dark-gray">
              {t("personal.serialSubtitle")}
            </Text>
          </View>

          {/* 밴드 이미지 + 안내 텍스트 */}
          <View className="my-8 mx-[-20px]" style={{ position: "relative" }}>
            <Image
              source={Band}
              style={{ width: "100%", height: 160 }}
              resizeMode="contain"
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-b3 font-sb text-gray-black/60 text-center">
                {t("personal.serialBandOverlay")}
              </Text>
            </View>
          </View>

          <View className="flex mt-auto mx-5">
            {/* 입력 영역 */}
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-b3 font-sb text-gray-black">
                  {t("personal.serialLabel")}
                </Text>
                {isError && (
                  <Text className="text-b4 font-rg text-secondary-bubblegum-pink">
                    {t("personal.serialMismatch")}
                  </Text>
                )}
              </View>
              <View
                className={`flex-row items-center rounded-lg border bg-white px-3 h-[48px] ${isError ? "border-secondary-bubblegum-pink" : "border-[#E4E4E4]"}`}
              >
                <TextInput
                  className="flex-1 text-b3 font-rg text-gray-black"
                  placeholder={t("personal.serialPlaceholder")}
                  placeholderTextColor="#BFBFBF"
                  value={serial}
                  onChangeText={handleChangeText}
                />
              </View>
            </View>

            {/* 버튼 */}
            <View className="mb-6 items-center mt-4">
              <Button
                label={t("personal.linkButton")}
                size="long"
                state={serial.trim() ? "active" : "active"}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}
