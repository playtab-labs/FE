import Layout from "@/components/Layout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import NationalityModal from "@/components/common/NationalityModal";
import ToastError from "@/components/common/ToastError";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Polyline } from "react-native-svg";

const GET_ME = gql`
  query GetMe {
    me {
      name
      gender
      birthDate
      nationality
    }
  }
`;

const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile($input: UpdateMyProfileInput!) {
    updateMyProfile(input: $input) {
      name
      gender
      birthDate
      nationality
    }
  }
`;

const NATIONALITIES = [
  "대한민국",
  "가나",
  "나이지리아",
  "덴마크",
  "러시아",
  "미국",
  "베트남",
  "세르비아",
];

const formatBirthday = (digits: string) => {
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
};

export default function MyInfoChange() {
  const { data } = useQuery<{
    me: {
      name: string;
      gender: string;
      birthDate: string;
      nationality: string;
    };
  }>(GET_ME);

  const [saved, setSaved] = useState({
    name: "",
    gender: "male" as "male" | "female",
    birthday: "",
    nationality: "",
  });
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [birthdayRaw, setBirthdayRaw] = useState("");
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    if (data?.me) {
      const b = data.me.birthDate?.replace(/-/g, "") ?? "";
      const g = (data.me.gender?.toLowerCase() ?? "male") as "male" | "female";
      setSaved({
        name: data.me.name,
        gender: g,
        birthday: b,
        nationality: data.me.nationality,
      });
      setName(data.me.name);
      setGender(g);
      setBirthdayRaw(b);
      setNationality(data.me.nationality);
    }
  }, [data]);
  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [updateMyProfile] = useMutation(UPDATE_MY_PROFILE);

  const showToast = (type: "success" | "error") => {
    setToast(type);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const handleSubmit = async () => {
    try {
      await updateMyProfile({
        variables: {
          input: {
            name: name.trim(),
            gender: gender === "male" ? "MALE" : "FEMALE",
            birthDate: `${birthdayRaw.slice(0, 4)}-${birthdayRaw.slice(4, 6)}-${birthdayRaw.slice(6, 8)}`,
            nationality,
            phoneNumber: "",
          },
        },
        refetchQueries: ["GetMe"],
        awaitRefetchQueries: true,
      });
      setSaved({
        name: name.trim(),
        gender,
        birthday: birthdayRaw,
        nationality,
      });
      showToast("success");
    } catch (e: any) {
      console.log(
        "mutation error:",
        JSON.stringify(e?.graphQLErrors ?? e?.networkError ?? e?.message ?? e),
      );
      showToast("error");
    }
  };

  const handleBirthday = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    setBirthdayRaw(digits);
  };

  const isChanged =
    name.trim() !== saved.name ||
    gender !== saved.gender ||
    birthdayRaw !== saved.birthday ||
    nationality !== saved.nationality;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <Layout title="내 정보 변경" showBack showCamera={false}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            className="py-4"
          >
            <View className="flex mt-6 gap-6">
              {/* 이름 */}
              <Input
                label="이름"
                description="실명을 입력해주세요."
                placeholder="이름을 입력해주세요."
                value={name}
                onChangeText={setName}
              />

              {/* 성별 */}
              <View className="w-full gap-2">
                <Text className="text-b3 font-sb text-dark-gray">성별</Text>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className={`flex-1 h-[42px] rounded-lg items-center justify-center border ${gender === "male" ? "bg-[#FFA38C] border-[#FFA38C]" : "bg-extra-white border-[#E4E4E4]"}`}
                    onPress={() => setGender("male")}
                  >
                    <Text
                      className={`text-b3 font-sb ${gender === "male" ? "text-extra-white" : "text-gray-black"}`}
                    >
                      남성
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 h-[42px] rounded-lg items-center justify-center border ${gender === "female" ? "bg-[#FFA38C] border-[#FFA38C]" : "bg-extra-white border-[#E4E4E4]"}`}
                    onPress={() => setGender("female")}
                  >
                    <Text
                      className={`text-b3 font-sb ${gender === "female" ? "text-extra-white" : "text-gray-black"}`}
                    >
                      여성
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 생일 */}
              <Input
                label="생일"
                placeholder="8자리 숫자로 입력해주세요."
                value={formatBirthday(birthdayRaw)}
                onChangeText={handleBirthday}
                keyboardType="number-pad"
                maxLength={10}
              />

              {/* 국적 */}
              <View className="w-full gap-[6px]">
                <View className="flex-row justify-between items-center">
                  <Text className="text-b3 font-sb text-dark-gray">국적</Text>
                  <Text className="text-b4 font-rg text-dark-gray">
                    이중국적인 경우 하나만 선택해주세요.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setNationalityOpen(true)}
                  className="flex-row items-center justify-between rounded-lg border border-[#E4E4E4] bg-extra-white px-3 py-4"
                >
                  <Text
                    className={`text-b3 font-md ${nationality ? "text-gray-black" : "text-[#E4E4E4]"}`}
                  >
                    {nationality || "선택해주세요."}
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
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View className="items-center mb-10">
            <Button
              label="변경 완료"
              size="long"
              state={isChanged ? "active" : "inactive"}
              onPress={handleSubmit}
            />
          </View>

          <NationalityModal
            visible={nationalityOpen}
            nationalities={NATIONALITIES}
            selected={nationality}
            onSelect={(value) => setNationality(value)}
            onClose={() => setNationalityOpen(false)}
          />
        </Layout>

        {toast && (
          <View className="absolute bottom-[120px] left-0 right-0 items-center">
            <ToastError
              type="login"
              message={
                toast === "success"
                  ? "성공적으로 변경되었습니다."
                  : "오류가 발생했습니다. 다시 시도해주세요."
              }
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
