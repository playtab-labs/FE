import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { typo } from '@/styles/typography';
import ArrowUp from '@/assets/svgs/arrow-up.svg';
import ArrowDown from '@/assets/svgs/arrow-down.svg';

interface NoticeNavItemProps {
  type: 'prev' | 'next';
  title: string;
  date: string;
  onPress?: () => void;
}

export default function NoticeNavItem({ type, title, date, onPress }: NoticeNavItemProps) {
  const isPrev = type === 'prev';
  const Arrow = isPrev ? ArrowUp : ArrowDown;
  const label = isPrev ? '이전글' : '다음글';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Arrow width={7} height={5} />
      <Text className={typo.B4_Sb} style={styles.label}>{label}</Text>
      <Text className={typo.B4_Sb} style={styles.title} numberOfLines={1}>{title}</Text>
      <Text className={typo.B4_Sb} style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    marginLeft: 5,
    color: '#656565',
  },
  title: {
    flex: 1,
    marginLeft: 13,
    color: '#1A1A1A',
  },
  date: {
    marginLeft: 'auto',
    color: '#BFBFBF',
  },
});
