import AlosIcon from "@/assets/svgs/ALOS.svg";
import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import TermsModal from "@/components/common/TermsModal";
import TERMS_DATA from "@/mockdatas/TermsDetail.json";
import { useSignupStore } from "@/stores/signupStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

export const TERMS_LIST = TERMS_DATA.map((t) => ({
  id: t.id,
  label: t.label,
  type: t.type as "PRIVACY" | "SERVICE" | "MARKETING",
  required: t.required,
  content: t.content,
}));

export default function Terms() {
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

  const allAgreed = TERMS_LIST.every((t) => agreed[t.id]);
  const requiredAgreed = TERMS_LIST.filter((t) => t.required).every(
    (t) => agreed[t.id],
  );

  const toggleAll = () => {
    if (allAgreed) setAgreed({});
    else setShowAllModal(true);
  };

  return (
    <Layout title="약관동의" showBack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-2">
          {/* 약관 안내 문구 */}
          <View className="mt-[19px] gap-4">
            <View className="flex-row items-center">
              <Text className="text-h1 font-eb text-text-salmon">
                약관에 동의
              </Text>
              <Text className="text-h1 font-eb text-gray-black">해주세요.</Text>
            </View>
            <Text className="text-b3 font-sb text-dark-gray">
              PLAYTAP의 서비스를 이용하기 위해 필요해요.
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
                전체
              </Text>
              <Text
                className="text-t3 font-eb text-gray-black"
                style={{ lineHeight: 17 }}
              >
                약관 전체동의
              </Text>
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
                  stroke={allAgreed ? "#FFA38C" : "#FFF"}
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
                      gap: 4,
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
                      {term.required ? "필수" : "선택"}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#1A1A1A" }}>
                      {term.label}
                    </Text>
                    <Svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <Polyline
                        points="1,1 5,5 1,9"
                        stroke="#BFBFBF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Polyline
                      points="4,10 8,14 16,6"
                      stroke={agreed[term.id] ? "#FFA38C" : "#BFBFBF"}
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
      <View className="items-center py-4 pb-10">
        <View style={{ position: "relative" }}>
          <Button
            label="계속하기"
            size="long"
            state={requiredAgreed ? "active" : "inactive"}
            onPress={() => {
              setConsents(
                TERMS_LIST.map((t) => ({
                  termsVersion: "1.0",
                  type: t.type as "PRIVACY" | "SERVICE" | "MARKETING",
                  agreed: agreed[t.id] ?? false,
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
          onAgree={() =>
            setAgreed((prev) => ({ ...prev, [activeTerm.id]: true }))
          }
          onClose={() => setActiveTerm(null)}
        />
      )}

      {/* 전체동의 모달 */}
      <TermsModal
        visible={showAllModal}
        title="약관 전체 동의"
        items={TERMS_LIST.map((t) => ({
          title: t.label,
          required: t.required,
          content: t.content,
        }))}
        onAgree={() =>
          setAgreed(Object.fromEntries(TERMS_LIST.map((t) => [t.id, true])))
        }
        onClose={() => setShowAllModal(false)}
      />
    </Layout>
  );
}
