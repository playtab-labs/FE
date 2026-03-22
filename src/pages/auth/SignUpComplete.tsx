import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@/components/Layout';

export default function SignUpComplete() {
  const navigation = useNavigation<any>();

  return (
    <Layout title='회원가입 완료' showBack>
      
      <View className="mx-[17px] mt-6"> 
        <View className="gap-2">
          <Text className="text-2xl font-bold text-gray-800">회원가입이 완료되었어요.</Text>
          <Text className="text-base text-gray-400">PLAYTAP과 함께 ODYSSEY를 즐겨봐요.</Text>
        </View>

        <View className="flex-1 mx-[17px] mt-[153px] items-center justify-center gap-4">
          <Image
            source={require('@/assets/pngs/logo.png')}
            style={{ width: 277, height: 173 }}
            resizeMode="contain"
          />
        </View>
      </View>
      
        <View className="mx-[17px] py-4 mt-auto">
          <TouchableOpacity
            className="bg-primary rounded-2xl h-14 items-center justify-center"
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })}
          >
            <Text className="text-base font-semibold text-white">계속하기</Text>
          </TouchableOpacity>
        </View>
    </Layout>
  );
}
