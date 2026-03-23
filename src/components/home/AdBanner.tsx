import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';
import AdLabel from '@/components/home/AdLabel';

interface AdBannerProps {
  onPress?: () => void;
}

export default function AdBanner({ onPress }: AdBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Text className={typo.T2_Eb} style={styles.label}>
        광고 배너
      </Text>
      <Text className={typo.B4_Rg} style={styles.subLabel}>광고 배너 삽입 서브 텍스트</Text>
      <AdLabel style={styles.adLabel} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 296,
    height: 120,
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: '#BFBFBF',
  },
  label: {
    color: '#1A1A1A',
    letterSpacing: -0.18,
  },
  subLabel: {
    color: '#1A1A1A',
    marginTop: 10,
    letterSpacing: -0.12,
  },
  adLabel: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
