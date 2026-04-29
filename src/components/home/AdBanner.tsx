import { TouchableOpacity, Text, StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { typo } from '@/styles/typography';
import AdLabel from '@/components/home/AdLabel';

interface AdBannerProps {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
}

const BANNER_WIDTH = 296;

export default function AdBanner({ title = '광고 배너', description = '광고 배너 삽입 서브 텍스트', image, onPress }: AdBannerProps) {
  if (image) {
    const src = Image.resolveAssetSource(image as number);
    const height = src ? (src.height / src.width) * BANNER_WIDTH : 240;
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.imageContainer, { width: BANNER_WIDTH, height }]}>
        <Image source={image} style={{ width: BANNER_WIDTH, height }} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
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
    width: 296,
    height: 240,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexShrink: 0,
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
