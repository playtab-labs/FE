import { View, Text, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';
import MoreButton from '@/components/common/MoreButton';
import NoticeBadge, { BadgeType } from '@/components/more/notice/NoticeBadge';
import { useTranslation } from 'react-i18next';

interface NoticeItem {
  id: string | number;
  title: string;
  date: string;
  badge?: BadgeType;
}

interface HomeNoticeSectionProps {
  items: NoticeItem[];
  onMorePress?: () => void;
}

export default function HomeNoticeSection({ items, onMorePress }: HomeNoticeSectionProps) {
  const { t } = useTranslation();
  const visibleItems = items.slice(0, 3);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text className={typo.T3_Eb} style={styles.sectionTitle}>
          {t("more.notices")}
        </Text>
        <MoreButton onPress={onMorePress} />
      </View>
      <View style={styles.list}>
        {visibleItems.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={styles.left}>
              <Text className={typo.B4_Rg} style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              {item.badge && <NoticeBadge type={item.badge} />}
            </View>
            <Text className={typo.B4_Rg} style={styles.date}>
              {item.date}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#1A1A1A',
    letterSpacing: -0.16,
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  title: {
    flexShrink: 1,
    color: '#1A1A1A',
    letterSpacing: -0.12,
  },
  date: {
    color: '#BFBFBF',
    letterSpacing: -0.12,
    textAlign: 'right',
  },
});
