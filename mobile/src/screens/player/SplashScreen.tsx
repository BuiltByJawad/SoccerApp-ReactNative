import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, radius } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>⚽</Text>
        </View>
        <Text style={styles.appName}>PlayField</Text>
        <Text style={styles.tagline}>Book. Play. Win.</Text>
      </View>

      <View style={styles.fieldLines}>
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.fieldLine,
              { opacity: 0.04 + i * 0.03, top: height * 0.55 + i * 60 },
            ]}
          />
        ))}
      </View>

      <View style={styles.bottomDots}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[styles.dot, i === 0 && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.bgCard,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoIcon: {
    fontSize: 48,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: colors.primary,
    letterSpacing: 4,
    marginTop: 4,
  },
  fieldLines: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  fieldLine: {
    position: 'absolute',
    left: -20,
    right: -20,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.primary,
  },
  bottomDots: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
    borderRadius: 4,
  },
});
