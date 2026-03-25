import Layout from '@/components/Layout';
import MDInform from '@/components/md/MDInform';
import MDProductCard from '@/components/md/MDProductCard';
import { View } from 'react-native';

const mdSample = require('@/assets/pngs/mdsample.png');

const MOCK_PRODUCTS = [
  { id: '1', title: 'Product 1', price: '10,000원' },
  { id: '2', title: 'Product 2', price: '20,000원' },
  { id: '3', title: 'Product 3', price: '30,000원' },
  { id: '4', title: 'Product 4', price: '40,000원' },
];

export default function MD() {
  return (
    <Layout title="MD" showBack scrollable showBottomBar>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <MDInform />
      </View>
      <View style={{ marginVertical: 24, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
        {MOCK_PRODUCTS.map((product) => (
          <View key={product.id} style={{ width: '50%', paddingHorizontal: 8, marginBottom: 16 }}>
            <MDProductCard
              imageSource={mdSample}
              title={product.title}
              price={product.price}
            />
          </View>
        ))}
      </View>
      <View style={{ height: 15 }} />
    </Layout>
  );
}
