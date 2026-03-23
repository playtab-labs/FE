import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { typo } from '@/styles/typography';

interface AdLabelProps {
  name?: string;
  style?: ViewStyle;
}

export default function AdLabel({ name = '광고처명', style }: AdLabelProps) {
  return (
    <View style={[styles.container, style]}>
      <Text className={typo.B4_Bd} style={styles.text}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#E4E4E4',
    alignSelf: 'flex-start',
  },
  text: {
    color: '#656565',
  },
});
