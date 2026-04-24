import { memo, useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const PARTICLE_COUNT = 60;
const PARTICLE_COLOR = "#F19D82";
const GLOW_COLOR = "#ED7071";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

interface ParticleConfig {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const Particle = memo(function Particle({
  left,
  top,
  duration,
  delay,
}: Omit<ParticleConfig, "id">) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    let mounted = true;

    const makeAnim = () =>
      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: duration * 0.3,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
          }),
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: duration * 0.4,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: duration * 0.3,
            useNativeDriver: true,
            easing: Easing.in(Easing.quad),
          }),
        ]),
        Animated.timing(translateY, {
          toValue: -50,
          duration,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: duration * 0.3,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: duration * 0.4,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.1,
            duration: duration * 0.3,
            useNativeDriver: true,
            easing: Easing.in(Easing.quad),
          }),
        ]),
      ]);

    const loop = (first: boolean) => {
      if (!mounted) return;
      opacity.setValue(0);
      translateY.setValue(0);
      scale.setValue(0.1);

      const anim = first
        ? Animated.sequence([Animated.delay(delay), makeAnim()])
        : makeAnim();

      anim.start(({ finished }) => {
        if (finished && mounted) loop(false);
      });
    };

    loop(true);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.glow,
        {
          left: left - 6,
          top: top - 6,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <View style={styles.core} />
    </Animated.View>
  );
});

const generateParticles = (): ParticleConfig[] =>
  Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    left: Math.random() * SCREEN_WIDTH,
    top: Math.random() * SCREEN_HEIGHT,
    duration: (Math.random() * 2 + 3) * 1000,
    delay: Math.random() * 5000,
  }));

export default function SparkleParticles() {
  const particles = useRef(generateParticles()).current;

  return (
    <>
      {particles.map((p) => (
        <Particle
          key={p.id}
          left={p.left}
          top={p.top}
          duration={p.duration}
          delay={p.delay}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(237, 112, 113, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: GLOW_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  core: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: PARTICLE_COLOR,
  },
});
