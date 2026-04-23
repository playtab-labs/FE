import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MainMDIcon from '@/assets/svgs/main-MD.svg';
import { typo } from '@/styles/typography';

interface MDBannerProps {
  onPress?: () => void;
}

export default function MDBanner({ onPress }: MDBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <MainMDIcon width={24} height={24} />
        <Text className={typo.T3_Eb} style={styles.label}>
          MD 굿즈
        </Text>
      </View>
      <View style={styles.right}>
        <Text className={typo.B4_Sb} style={styles.subLabel}>
          다양한 서강대 굿즈 판매 중!
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: '#1A1A1A',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subLabel: {
    color: '#656565',
  },
});
