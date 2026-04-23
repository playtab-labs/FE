import { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const POSTER_HEIGHT_EXPANDED = 500;
const POSTER_HEIGHT_COLLAPSED = 230;

export default function HomePoster() {
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = useState(false);
  const animatedHeight = useRef(new Animated.Value(POSTER_HEIGHT_EXPANDED)).current;

  const handlePress = () => {
    const toValue = collapsed ? POSTER_HEIGHT_EXPANDED : POSTER_HEIGHT_COLLAPSED;
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setCollapsed(prev => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={{ width, height: animatedHeight }}>
        <Image
          source={require('@/assets/pngs/homeposter.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="top"
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
      </Animated.View>
    </TouchableWithoutFeedback>
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
