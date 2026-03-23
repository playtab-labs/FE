import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';

interface AdBannerProps {
  onPress?: () => void;
}

export default function AdBanner({ onPress }: AdBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Text className={typo.T2_Eb} style={styles.label}>
        광고 배너
      </Text>
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: '#BFBFBF',
  },
  label: {
    color: '#1A1A1A',
    letterSpacing: -0.18,
  },
});
