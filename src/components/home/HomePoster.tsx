import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const POSTER_HEIGHT = 500;

export default function HomePoster() {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, height: POSTER_HEIGHT }}>
      <Image
        source={require('@/assets/pngs/homeposter.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', '#1A1A1A']}
        locations={[0.5933, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{"서강대학교 대동제 'Odyssey'"}</Text>
        <Text style={styles.date}>2026.05.13 ~ 2026.05.15</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 33.6,
    letterSpacing: -0.24,
  },
  date: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16.8,
    letterSpacing: -0.12,
    marginTop: 8,
  },
});
