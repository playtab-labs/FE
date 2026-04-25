import Layout from '@/components/Layout';
import MDInform from '@/components/md/MDInform';
import MDProductCard from '@/components/md/MDProductCard';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

const GET_MD_ITEMS = gql`
  query MdItems {
    mdItems(locale: null, page: null, size: null) {
      items {
        id
        name
        thumbnailImageUrl
        price
        isSoldOut
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
        hasNext
      }
    }
  }
`;

interface MdItem {
  id: string;
  name: string;
  thumbnailImageUrl: string;
  price: number;
  isSoldOut: boolean;
}

interface MdItemsResponse {
  mdItems: {
    items: MdItem[];
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
      hasNext: boolean;
    };
  };
}

export default function MD() {
  const navigation = useNavigation<any>();
  const { data } = useQuery<MdItemsResponse>(GET_MD_ITEMS);

  const items = data?.mdItems.items ?? [];

  return (
    <Layout title="MD" showBack scrollable showBottomBar>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <MDInform />
      </View>
      <View style={{ marginVertical: 24, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{ width: '50%', paddingHorizontal: 8, marginBottom: 16 }}
            onPress={() => navigation.navigate('MDDetail', { title: item.name, soldOut: item.isSoldOut })}
          >
            <MDProductCard
              imageSource={{ uri: item.thumbnailImageUrl }}
              title={item.name}
              price={`${item.price.toLocaleString()}원`}
              soldOut={item.isSoldOut}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 15 }} />
    </Layout>
  );
}
