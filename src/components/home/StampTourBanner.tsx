import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MainStampIcon from '@/assets/svgs/main-stamp.svg';
import { typo } from '@/styles/typography';

interface StampTourBannerProps {
  onPress?: () => void;
  progress?: number;
  disabled?: boolean;
}

export default function StampTourBanner({ onPress, progress = 0, disabled = false }: StampTourBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={disabled ? undefined : onPress} activeOpacity={disabled ? 1 : 0.8}>
      <View style={styles.left}>
        <MainStampIcon width={24} height={24} />
        <Text className={typo.T3_Eb} style={[styles.label, disabled && styles.disabledText]}>
          스탬프 투어
        </Text>
      </View>
      <View style={styles.right}>
        {disabled ? (
          <Text className={typo.B4_Sb} style={styles.disabledText}>
            서강대 학생만 참여 가능합니다.
          </Text>
        ) : (
          <>
            <Text className={typo.B4_Sb} style={styles.progressLabel}>
              현재 진척도
            </Text>
            <Text className={typo.B4_Eb} style={styles.progressValue}>
              {progress}%
            </Text>
          </>
        )}
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
  disabledText: {
    color: '#BFBFBF',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressLabel: {
    color: '#656565',
  },
  progressValue: {
    color: '#FF5E37',
  },
});
