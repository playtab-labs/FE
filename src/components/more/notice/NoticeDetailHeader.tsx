import { View, Text, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';
import NoticeBadge, { BadgeType } from './NoticeBadge';

interface NoticeDetailHeaderProps {
  title: string;
  date: string;
  badge?: BadgeType;
}

export default function NoticeDetailHeader({ title, date, badge }: NoticeDetailHeaderProps) {
  return (
    <View style={styles.container}>
      <Text className={typo.T2_Eb} style={styles.title}>
        {title}
      </Text>
      <View style={styles.dateRow}>
        <Text className={typo.B3_Sb} style={styles.date}>
          {date}
        </Text>
        {badge && <NoticeBadge type={badge} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 8,
  },
  title: {
    alignSelf: 'stretch',
    color: '#1A1A1A',
    letterSpacing: -0.18,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    color: '#BFBFBF',
    letterSpacing: -0.14,
  },
});
