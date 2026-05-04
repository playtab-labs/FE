import Layout from '@/components/Layout';
import MDImageCarousel from '@/components/md/MDImageCarousel';
import MDSaleTypeBadge from '@/components/md/MDSaleTypeBadge';
import MDSizeBadge from '@/components/md/MDSizeBadge';
import { typo } from '@/styles/typography';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, Text, useWindowDimensions, View } from 'react-native';
import { useEffect, useState } from 'react';

const GET_MD_ITEM_DETAIL = gql`
  query MdItemDetail($mdItemId: ID!) {
    mdItemDetail(mdItemId: $mdItemId) {
      id
      name
      thumbnailImageUrl
      detailImageUrl
      price
      isSoldOut
      productDescription
      optionGroups {
        id
        name
        displayOrder
        values {
          id
          valueName
          extraPrice
          isSoldOut
          displayOrder
        }
      }
    }
  }
`;

interface OptionValue {
  id: string;
  valueName: string;
  extraPrice: number;
  isSoldOut: boolean;
  displayOrder: number;
}

interface OptionGroup {
  id: string;
  name: string;
  displayOrder: number;
  values: OptionValue[];
}

interface MdItemDetail {
  id: string;
  name: string;
  thumbnailImageUrl: string;
  detailImageUrl: string;
  price: number;
  isSoldOut: boolean;
  productDescription: string;
  optionGroups: OptionGroup[];
}

interface MdItemDetailResponse {
  mdItemDetail: MdItemDetail;
}

type MDDetailRouteProp = RouteProp<{ MDDetail: { id: string; title: string; soldOut: boolean } }, 'MDDetail'>;

export default function MDDetail() {
  const route = useRoute<MDDetailRouteProp>();
  const { id, title, soldOut } = route.params;
  const { width } = useWindowDimensions();
  const [detailImageHeight, setDetailImageHeight] = useState<number>(0);

  const { data, loading, error } = useQuery<MdItemDetailResponse>(GET_MD_ITEM_DETAIL, {
    variables: { mdItemId: id },
  });

  if (error) console.error('[MDDetail] query error:', error.message);

  const detail = data?.mdItemDetail;
  const image = detail ? { uri: detail.thumbnailImageUrl } : undefined;

  useEffect(() => {
    if (!detail?.detailImageUrl) return;
    Image.getSize(detail.detailImageUrl, (imgWidth, imgHeight) => {
      setDetailImageHeight((imgHeight / imgWidth) * width);
    });
  }, [detail?.detailImageUrl, width]);

  return (
    <Layout
      title={detail?.name ?? title}
      showBack
      scrollable
      fullBleedHeader={image && <MDImageCarousel image={image} soldOut={detail?.isSoldOut ?? soldOut} />}
    >
      <View style={{ paddingTop: 20, alignItems: 'center' }}>
        {/* 뱃지 행 */}
        <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
          <MDSaleTypeBadge type="preorder" />
          <MDSaleTypeBadge type="onsite" />
        </View>

        {/* 제품 이름 */}
        <Text
          className={typo.T2_Eb}
          style={{ color: '#1A1A1A', letterSpacing: -0.18, marginTop: 14, width: '100%' }}
        >
          {detail?.name ?? title}
        </Text>

        {/* 가격 + 사이즈 뱃지 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 6,
            width: '100%',
          }}
        >
          <Text className={typo.B3_Rg} style={{ color: '#1A1A1A', letterSpacing: -0.14 }}>
            {detail ? `${detail.price.toLocaleString()}원` : ''}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
            {detail?.optionGroups.flatMap((group) =>
              group.values.map((value) => (
                <MDSizeBadge key={value.id} size={value.valueName} soldOut={value.isSoldOut} />
              ))
            )}
          </View>
        </View>

        {/* 구분선 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E4E4E4',
            marginTop: 20,
            width: '100%',
          }}
        />

        {/* 제품 상세 사진 */}
        {detail?.detailImageUrl && detailImageHeight > 0 && (
          <View style={{ marginTop: 24, width: '100%', marginBottom: 50}}>
            <Image
              source={{ uri: detail.detailImageUrl }}
              style={{ width: '100%', height: detailImageHeight }}
              resizeMode="cover"
            />
          </View>
        )}

      </View>
    </Layout>
  );
}
