import Layout from '@/components/Layout';
import MDImageCarousel from '@/components/md/MDImageCarousel';
import MDSaleTypeBadge from '@/components/md/MDSaleTypeBadge';
import { typo } from '@/styles/typography';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

const GET_MD_ITEM_DETAIL = gql`
  query MdItemDetail($mdItemId: String!) {
    mdItemDetail(mdItemId: $mdItemId) {
      id
      name
      thumbnailImageUrl
      detailImageUrl
      price
      isSoldOut
      productDescription
      detailDescription
    }
  }
`;

interface MdItemDetail {
  id: string;
  name: string;
  thumbnailImageUrl: string;
  detailImageUrl: string;
  price: number;
  isSoldOut: boolean;
  productDescription: string;
  detailDescription: string;
}

interface MdItemDetailResponse {
  mdItemDetail: MdItemDetail;
}

type MDDetailRouteProp = RouteProp<{ MDDetail: { id: string; title: string; soldOut: boolean } }, 'MDDetail'>;

export default function MDDetail() {
  const route = useRoute<MDDetailRouteProp>();
  const { id, title, soldOut } = route.params;

  const { data } = useQuery<MdItemDetailResponse>(GET_MD_ITEM_DETAIL, {
    variables: { mdItemId: id },
  });

  const detail = data?.mdItemDetail;
  const images = detail
    ? [{ uri: detail.thumbnailImageUrl }, { uri: detail.detailImageUrl }]
    : [];

  return (
    <Layout
      title={detail?.name ?? title}
      showBack
      scrollable
      fullBleedHeader={<MDImageCarousel images={images} soldOut={detail?.isSoldOut ?? soldOut} />}
    >
      <View style={{ paddingTop: 20, paddingHorizontal: 20, alignItems: 'center' }}>
        {/* 뱃지 행 */}
        <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
          <MDSaleTypeBadge type="preorder" />
          <MDSaleTypeBadge type="onsite" />
        </View>

        {/* 제품 이름 */}
        <Text
          className={typo.T2_Eb}
          style={{ color: '#1A1A1A', letterSpacing: -0.18, marginTop: 16, width: '100%' }}
        >
          {detail?.name ?? title}
        </Text>

        {/* 가격 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
            width: '100%',
          }}
        >
          <Text className={typo.B3_Rg} style={{ color: '#1A1A1A', letterSpacing: -0.14 }}>
            {detail ? `${detail.price.toLocaleString()}원` : ''}
          </Text>
        </View>

        {/* 구분선 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E4E4E4',
            marginTop: 24,
            width: '100%',
          }}
        />

        {/* 제품 상세 사진 */}
        {detail?.detailImageUrl && (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Image
              source={{ uri: detail.detailImageUrl }}
              style={{ height: 418.75, alignSelf: 'stretch', aspectRatio: 4 / 5 }}
              resizeMode="contain"
            />
          </View>
        )}

        {/* 상세설명 */}
        <Text
          className={typo.B2_Sb}
          style={{ color: '#656565', letterSpacing: -0.16, marginTop: 24, width: '100%' }}
        >
          상세설명
        </Text>

        {/* 본문 내용 */}
        <Text
          className={typo.B4_Rg}
          style={{ color: '#1A1A1A', letterSpacing: -0.12, marginTop: 24, marginBottom: 100, width: '100%' }}
        >
          {detail?.detailDescription ?? ''}
        </Text>
      </View>
    </Layout>
  );
}
