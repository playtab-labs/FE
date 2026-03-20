import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@/components/Layout';

export default function Register() {
  const navigation = useNavigation<any>();

  return (
    <Layout title="회원가입" showBack={true}>

      {/*문구 */}
      <View className="mt-[19px] gap-4 mx-4">
        <Text className="text-2xl font-semibold text-gray-800">회원가입을 진행할게요.</Text>
        <Text className="text-lg text-gray-400 mt-1">서브문구 넣을 거 없나</Text>
      </View>

      {/* 로고 */}
      <View className="items-center mt-[125px]">
        <Image
          source={require('@/assets/logo.png')}
          style={{ width: 277, height: 173 }}
          resizeMode="contain"
        />
      </View>

      {/* 버튼 */}
      <View className="mx-4 gap-4 mt-[186px]">
        <TouchableOpacity
          className="bg-primary rounded-2xl h-14 items-center justify-center"
          onPress={() => navigation.navigate('Terms', { userType: 'sogang' })}
        >
          <Text className="text-white text-base font-semibold">서강대생으로 이용</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary rounded-2xl h-14 items-center justify-center"
          onPress={() => navigation.navigate('Terms', { userType: 'external' })}
        >
          <Text className="text-white text-base font-semibold">외부인으로 이용</Text>
        </TouchableOpacity>
      </View>

    </Layout>
  );
}
