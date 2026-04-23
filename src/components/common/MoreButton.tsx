import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ChevronRightGray from '@/assets/svgs/chevron-right.svg';
import { typo } from '@/styles/typography';

interface MoreButtonProps {
  onPress?: () => void;
}

export default function MoreButton({ onPress }: MoreButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Text className={typo.B5_Sb} style={styles.label}>
        MORE
      </Text>
      <ChevronRightGray width={5} height={8} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'stretch',
    borderRadius: 20,
    backgroundColor: '#E4E4E4',
  },
  label: {
    color: '#656565',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
});
