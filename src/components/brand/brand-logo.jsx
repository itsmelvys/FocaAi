import { StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

function Sparkle() {
  return (
    <View style={styles.sparkle}>
      <View style={[styles.sparkleLine, { transform: [{ rotate: '0deg' }] }]} />
      <View style={[styles.sparkleLine, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.sparkleLine, { transform: [{ rotate: '90deg' }] }]} />
    </View>
  );
}

function MiniCactus() {
  return (
    <View style={styles.miniScene}>
      <View style={styles.miniSun} />
      <View style={styles.miniCactusArm} />
      <View style={styles.miniCactus} />
      <View style={styles.miniRock} />
    </View>
  );
}

export function BrandLogo({ size = 'default' }) {
  const isLarge = size === 'large';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MiniCactus />
        <View>
          <View style={[styles.sparkleWrap, isLarge && styles.sparkleWrapLarge]}>
            <Sparkle />
          </View>
          <Text style={[styles.logo, isLarge && styles.logoLarge]}>
            Foca<Text style={styles.logoAccent}>Aí</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  sparkleWrap: {
    position: 'absolute',
    top: -2,
    left: 28,
    zIndex: 2,
  },
  sparkleWrapLarge: {
    top: 2,
    left: 36,
  },
  sparkle: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleLine: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: BrandColors.sun,
    borderRadius: 1,
  },
  logo: {
    fontSize: 38,
    fontWeight: '800',
    color: BrandColors.navy,
    letterSpacing: -0.6,
  },
  logoLarge: {
    fontSize: 48,
  },
  logoAccent: {
    color: BrandColors.orange,
  },
  miniScene: {
    width: 28,
    height: 32,
    marginBottom: 4,
  },
  miniSun: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BrandColors.orangeLight,
  },
  miniCactus: {
    position: 'absolute',
    bottom: 4,
    left: 8,
    width: 10,
    height: 20,
    backgroundColor: BrandColors.green,
    borderRadius: 5,
  },
  miniCactusArm: {
    position: 'absolute',
    bottom: 16,
    left: 2,
    width: 10,
    height: 7,
    backgroundColor: BrandColors.green,
    borderRadius: 4,
  },
  miniRock: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    width: 18,
    height: 6,
    backgroundColor: BrandColors.navy,
    borderRadius: 3,
    opacity: 0.45,
  },
});
