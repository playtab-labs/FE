import Layout from '@/components/Layout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View } from 'react-native';

type MDDetailRouteProp = RouteProp<{ MDDetail: { title: string } }, 'MDDetail'>;

export default function MDDetail() {
  const route = useRoute<MDDetailRouteProp>();
  const { title } = route.params;

  return (
    <Layout title={title} showBack scrollable>
      <View />
    </Layout>
  );
}
