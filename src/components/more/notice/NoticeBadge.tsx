import { View, Text, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';

export type BadgeType = 'NEW' | '필독';

interface NoticeBadgeProps {
  type: BadgeType;
}

export default function NoticeBadge({ type }: NoticeBadgeProps) {
  return (
    <View style={[styles.badge, type === 'NEW' && styles.badgeNew]}>
      <Text className={typo.B5_Sb} style={styles.text}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFA38C',
  },
  badgeNew: {
    backgroundColor: '#FFDAD1',
  },
  text: {
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
});
