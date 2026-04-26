import { memo, useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const PARTICLE_COUNT = 20;
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
  const scale = useRef(new Animated.Value(0.4)).current;

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
            toValue: 0.4,
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
      scale.setValue(0.4);

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
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: left - 12,
          top: top - 12,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <View style={styles.ringGlow} />
      <View style={styles.ring} />
      <View style={styles.glow} />
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
  particle: {
    position: "absolute",
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  ringGlow: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(237, 112, 113, 0.04)",
    shadowColor: GLOW_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  ring: {
    position: "absolute",
    width: 17,
    height: 17,
    borderRadius: 8.5,
    borderWidth: 0.5,
    borderColor: "rgba(237, 112, 113, 0.15)",
    backgroundColor: "transparent",
  },

  glow: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(237, 112, 113, 0.15)",
    shadowColor: GLOW_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  core: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: GLOW_COLOR,
    shadowColor: GLOW_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
