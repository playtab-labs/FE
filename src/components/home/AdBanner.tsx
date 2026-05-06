import { TouchableOpacity, Text, StyleSheet, View, Image, ImageSourcePropType, useWindowDimensions } from 'react-native';
import { typo } from '@/styles/typography';
import AdLabel from '@/components/home/AdLabel';

interface AdBannerProps {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
}

export default function AdBanner({ title = '광고 배너', description = '광고 배너 삽입 서브 텍스트', image, onPress }: AdBannerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const bannerWidth = screenWidth - 40; // Layout px-5 패딩 양쪽 20px
  const bannerHeight = bannerWidth / 1.3; // 세로:가로 = 1:1.4

  if (image) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.imageContainer, { width: bannerWidth, height: bannerHeight }]}>
        <Image source={image} style={{ width: bannerWidth, height: bannerHeight }} resizeMode="cover" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.container, { width: bannerWidth, height: bannerHeight }]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.textGroup}>
        <Text className={typo.T3_Eb} style={styles.title}>
          {title}
        </Text>
        <Text className={typo.B4_Rg} style={styles.description}>
          {description}
        </Text>
      </View>
      <AdLabel style={{ alignSelf: 'flex-end' }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderRadius: 8,
    backgroundColor: '#BFBFBF',
    overflow: 'hidden',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    flexShrink: 0,
  },
  textGroup: {
    alignSelf: 'flex-start',
    gap: 4,
  },
  title: {
    color: '#1A1A1A',
    letterSpacing: -0.16,
  },
  description: {
    color: '#1A1A1A',
    letterSpacing: -0.12,
  },
});
