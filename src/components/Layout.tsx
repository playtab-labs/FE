import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface LayoutProps {
  title?: string;
  showBack?: boolean;
  children: React.ReactNode;
}

export default function Layout({ title, showBack = false, children }: LayoutProps) {
  const navigation = useNavigation<any>();

  return (
    // SafeAreaView가 StatusBar 영역(iPhone 13 mini 기준 48px)을 자동 처리
    <SafeAreaView className="flex-1 bg-app-bg">

      {/* AppBar: 56px */}
      {title && (
        <View
          style={{ height: 56, paddingHorizontal: 21, gap: 10 }}
          className="flex-row items-center justify-center"
        >
          {/* 왼쪽: 뒤로가기 */}
          <View style={{ width: 24 }}>
            {showBack && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
            )}
          </View>

          {/* 중앙: 타이틀 */}
          <Text className="flex-1 text-center text-[16px] text-gray-700">{title}</Text>

          {/* 오른쪽: 여백(좌우 대칭용) */}
          <View style={{ width: 24 }} />
        </View>
      )}

      {/* 메인 콘텐츠 */}
      <View className="flex-1">
        {children}
      </View>

    </SafeAreaView>
  );
}
