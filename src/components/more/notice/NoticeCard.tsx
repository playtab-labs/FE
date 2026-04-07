import { View, Text, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';
import NoticeBadge, { BadgeType } from './NoticeBadge';

interface NoticeCardProps {
  title: string;
  date: string;
  content: string;
  badge?: BadgeType;
}

export default function NoticeCard({ title, date, content, badge }: NoticeCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text className={typo.T3_Sb} style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {badge && <NoticeBadge type={badge} />}
      </View>
      <Text className={typo.B5_Rg} style={styles.date} numberOfLines={1}>
        {date}
      </Text>
      <Text className={typo.B4_Rg} style={styles.content} numberOfLines={2}>
        {content}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFF',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  title: {
    flex: 1,
    color: '#1A1A1A',
    lineHeight: 17,
    marginRight: 8,
  },
  date: {
    color: '#656565',
    fontWeight: '300',
  },
  content: {
    alignSelf: 'stretch',
    color: '#1A1A1A',
    fontWeight: '300',
    marginTop: 5,
  },
});
