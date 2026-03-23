import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MDIcon } from '@/components/icons/MDIcon';
import { typo } from '@/styles/typography';

interface MDBannerProps {
  onPress?: () => void;
}

export default function MDBanner({ onPress }: MDBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <MDIcon />
      <Text className={typo.T3_Eb} style={styles.label}>
        MD
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 104,
    paddingVertical: 12,
    paddingHorizontal: 54,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    color: '#1A1A1A',
    textAlign: 'center',
  },
});
