import Layout from '@/components/Layout';
import MDImageCarousel from '@/components/md/MDImageCarousel';
import MDSaleTypeBadge from '@/components/md/MDSaleTypeBadge';
import MDSizeBadge from '@/components/md/MDSizeBadge';
import { typo } from '@/styles/typography';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

const mdSample = require('@/assets/pngs/mdsample.png');

const MOCK_IMAGES = [mdSample, mdSample, mdSample];

type MDDetailRouteProp = RouteProp<{ MDDetail: { title: string; soldOut: boolean } }, 'MDDetail'>;

export default function MDDetail() {
  const route = useRoute<MDDetailRouteProp>();
  const { title, soldOut } = route.params;

  return (
    <Layout
      title={title}
      showBack
      scrollable
      fullBleedHeader={<MDImageCarousel images={MOCK_IMAGES} soldOut={soldOut} />}
    >

      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        {/* 뱃지 행 */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <MDSaleTypeBadge type="preorder" />
          <MDSaleTypeBadge type="onsite" />
        </View>

        {/* 제품 이름 */}
        <Text
          className={typo.T2_Eb}
          style={{ color: '#1A1A1A', letterSpacing: -0.18, marginTop: 16 }}
        >
          {title}
        </Text>

        {/* 가격 + 사이즈 뱃지 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Text className={typo.B3_Rg} style={{ color: '#1A1A1A', letterSpacing: -0.14 }}>
            {'10,000원'}
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <MDSizeBadge size="S" />
            <MDSizeBadge size="M" />
            <MDSizeBadge size="L" soldOut />
          </View>
        </View>

        {/* 구분선 */}
        <View
          style={{
            width: 335,
            height: 1,
            backgroundColor: '#E4E4E4',
            marginTop: 24,
          }}
        />

        {/* 상세설명 */}
        <Text
          className={typo.B2_Sb}
          style={{ color: '#656565', letterSpacing: -0.16, marginTop: 24 }}
        >
          상세설명
        </Text>

        {/* 본문 내용 */}
        <Text
          className={typo.B4_Rg}
          style={{ color: '#1A1A1A', letterSpacing: -0.12, marginTop: 24 }}
        >
          {'서강대학교 2026 축구 유니폼입니다.'}
        </Text>
      </View>
    </Layout>
  );
}
