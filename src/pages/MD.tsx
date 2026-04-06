import Layout from '@/components/Layout';
import MDInform from '@/components/md/MDInform';
import MDProductCard from '@/components/md/MDProductCard';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

const mdSample = require('@/assets/pngs/mdsample.png');

const MOCK_PRODUCTS = [
  { id: '1', title: '축구 유니폼1', price: '10,000원', sizes: ['S', 'M', 'L','XL'] },
  { id: '2', title: '축구 유니폼2', price: '20,000원', sizes: ['S', 'M', 'L'], soldOut: true },
  { id: '3', title: '축구 유니폼', price: '30,000원' },
  { id: '4', title: '축구 유니폼', price: '40,000원' },
];

export default function MD() {
  const navigation = useNavigation<any>();

  return (
    <Layout title="MD" showBack scrollable showBottomBar>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <MDInform />
      </View>
      <View style={{ marginVertical: 24, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
        {MOCK_PRODUCTS.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={{ width: '50%', paddingHorizontal: 8, marginBottom: 16 }}
            onPress={() => navigation.navigate('MDDetail', { title: product.title, soldOut: product.soldOut ?? false })}
          >
            <MDProductCard
              imageSource={mdSample}
              title={product.title}
              price={product.price}
              sizes={product.sizes}
              soldOut={product.soldOut}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 15 }} />
    </Layout>
  );
}
