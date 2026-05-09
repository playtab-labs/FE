import AlosIcon from "@/assets/svgs/ALOS.svg";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import ColoredText from "@/components/common/ColoredText";
import TermsModal from "@/components/common/TermsModal";
import TERMS_DATA from "@/mockdatas/TermsDetail.json";
import { useSignupStore } from "@/stores/signupStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";

export default function Terms() {
  const { t } = useTranslation();

  // 기존 버전의 매핑입니다. 실제 이용약관이 적힌 id 1,2,3,4 입니다.
  // const TERMS_LIST = (TERMS_DATA as any[]).map((term) => ({
  //   id: term.id,
  //   label:
  //     term.id === 1
  //       ? t("terms.agreeTermsOfUse")
  //       : term.id === 2
  //         ? t("terms.agreePrivacy")
  //         : term.id === 3
  //           ? t("terms.agreeLocation")
  //           : t("terms.agreeMarketing"),
  //   type: term.type as "PRIVACY" | "SERVICE" | "MARKETING",
  //   required: term.required,
  //   content: term.content || "",
  //   linkText: term.linkText || "자세한 내용 확인하기",
  //   linkUrl: term.linkUrl || "",
  // }));

  // 모달 스크롤 버그 대응을 위한 매핑 버전입니다. 외부 url연결만 있는 id 5,6,7,8로 필터링하여 매핑합니다.
  const TERMS_LIST = (TERMS_DATA as any[])
    .filter((term) => [5, 6, 7, 8].includes(term.id))
    .map((term) => ({
      id: term.id,
      label: term.label,
      type: term.type as "PRIVACY" | "SERVICE" | "MARKETING",
      required: term.required,
      content: term.content || "",
      linkText: term.linkText || "자세한 내용 확인하기",
      linkUrl: term.linkUrl || "",
    }));

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userType = route.params?.userType ?? "external";
  const setConsents = useSignupStore((s) => s.setConsents);
  const setUserType = useSignupStore((s) => s.setUserType);
  const [agreed, setAgreed] = useState<Record<number, boolean>>({});
  const [activeTerm, setActiveTerm] = useState<(typeof TERMS_LIST)[0] | null>(
    null,
  );
  const [showAllModal, setShowAllModal] = useState(false);

  const allAgreed = TERMS_LIST.every((term) => agreed[term.id]);
  const requiredAgreed = TERMS_LIST.filter((term) => term.required).every(
    (term) => agreed[term.id],
  );

  const toggleAll = () => {
    if (allAgreed) setAgreed({});
    else setShowAllModal(true);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  return (
    <Layout title={t("terms.appBar")} showBack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* 약관 안내 문구 */}
          <View className="mt-[19px] gap-4">
            <ColoredText
              text={t("terms.title")}
              className="text-h1 font-eb text-gray-black"
            />
            <Text className="text-b3 font-sb text-dark-gray">
              {t("terms.subtitle")}
            </Text>
          </View>

          {/* 약관 전체동의 버튼 */}
          <TouchableOpacity
            onPress={toggleAll}
            activeOpacity={0.8}
            style={{
              height: 52,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: "#FFC8BA",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 87,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text
                className="text-b4 font-sb text-extra-white"
                style={{ lineHeight: 17 }}
              >
                {t("terms.all")}
              </Text>
              <Text
                className="text-t3 font-eb text-gray-black"
                style={{ lineHeight: 17 }}
              >
                {t("terms.agreeAll")}
              </Text>
              <Svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <Polyline
                  points="1,1 5,5 1,9"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <View
              style={{
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <Polyline
                  points="2,7 5,10 12,3"
                  stroke={allAgreed ? "#1A1A1A" : "#FFF"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>

          {/* 약관 리스트 */}
          <View className="px-4 py-4">
            {TERMS_LIST.map((term, index) => (
              <View key={term.id}>
                <TouchableOpacity
                  className="flex-row items-center py-3"
                  onPress={() => {
                    if (agreed[term.id]) {
                      setAgreed((prev) => ({ ...prev, [term.id]: false }));
                    } else {
                      setActiveTerm(term);
                    }
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: term.required ? "#FFA38C" : "#656565",
                        lineHeight: 16.8,
                        letterSpacing: -0.12,
                      }}
                    >
                      {term.required
                        ? t("terms.required")
                        : t("terms.optional")}
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: "#1A1A1A", flexShrink: 1 }}
                    >
                      {term.label}
                    </Text>
                    <Svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <Polyline
                        points="1,1 5,5 1,9"
                        stroke="#656565"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Polyline
                      points="4,10 8,14 16,6"
                      stroke={agreed[term.id] ? "#656565" : "#BFBFBF"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
                {index < TERMS_LIST.length - 1 && (
                  <View className="h-px bg-gray-100" />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 계속하기 버튼 */}
      <View className="py-4 pb-10">
        <View style={{ position: "relative" }} className="w-full">
          <Button
            label={t("terms.continue")}
            size="long"
            state={requiredAgreed ? "active" : "inactive"}
            onPress={() => {
              setConsents(
                TERMS_LIST.map((term) => ({
                  termsVersion: "1.0",
                  type: term.type as "PRIVACY" | "SERVICE" | "MARKETING",
                  agreed: agreed[term.id] ?? false,
                })),
              );
              setUserType(userType);
              navigation.navigate("PersonalInfo", { userType });
            }}
          />
          {userType === "sogang" && (
            <AlosIcon
              width={98}
              height={127}
              style={{ position: "absolute", right: 6, top: -121 }}
            />
          )}
        </View>
      </View>

      {/* 개별 약관 모달 */}
      {activeTerm && (
        <TermsModal
          visible={!!activeTerm}
          title={activeTerm.label}
          required={activeTerm.required}
          content={activeTerm.content}
          linkText={activeTerm.linkText}
          linkUrl={activeTerm.linkUrl}
          onLinkPress={handleLinkPress}
          onAgree={() =>
            setAgreed((prev) => ({ ...prev, [activeTerm.id]: true }))
          }
          onClose={() => setActiveTerm(null)}
        />
      )}

      {/* 전체동의 모달 */}
      <TermsModal
        visible={showAllModal}
        title={t("terms.agreeAll")}
        items={TERMS_LIST.map((term) => ({
          title: term.label,
          required: term.required,
          content: term.content,
          linkText: term.linkText,
          linkUrl: term.linkUrl,
        }))}
        onLinkPress={handleLinkPress}
        onAgree={() =>
          setAgreed(
            Object.fromEntries(TERMS_LIST.map((term) => [term.id, true])),
          )
        }
        onClose={() => setShowAllModal(false)}
      />
    </Layout>
  );
}
