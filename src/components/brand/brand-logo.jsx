import { StyleSheet, Text, View } from 'react-native';

import { useThemedStyles } from '@/hooks/use-theme';

function Sparkle({ styles }) {
  return (
    <View style={styles.sparkle}>
      <View style={[styles.sparkleLine, { transform: [{ rotate: '0deg' }] }]} />
      <View style={[styles.sparkleLine, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.sparkleLine, { transform: [{ rotate: '90deg' }] }]} />
    </View>
  );
}

function MiniCactus({ styles }) {
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
  const styles = useThemedStyles(makeStyles);
  const isLarge = size === 'large';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MiniCactus styles={styles} />
        <View>
          <View style={[styles.sparkleWrap, isLarge && styles.sparkleWrapLarge]}>
            <Sparkle styles={styles} />
          </View>
          <Text style={[styles.logo, isLarge && styles.logoLarge]}>
            Foca<Text style={styles.logoAccent}>Aí</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

function makeStyles(c) {
  return {
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
      backgroundColor: c.sun,
      borderRadius: 1,
    },
    logo: {
      fontSize: 38,
      fontWeight: '800',
      color: c.navy,
      letterSpacing: -0.6,
    },
    logoLarge: {
      fontSize: 48,
    },
    logoAccent: {
      color: c.orange,
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
      backgroundColor: c.orangeLight,
    },
    miniCactus: {
      position: 'absolute',
      bottom: 4,
      left: 8,
      width: 10,
      height: 20,
      backgroundColor: c.green,
      borderRadius: 5,
    },
    miniCactusArm: {
      position: 'absolute',
      bottom: 16,
      left: 2,
      width: 10,
      height: 7,
      backgroundColor: c.green,
      borderRadius: 4,
    },
    miniRock: {
      position: 'absolute',
      bottom: 0,
      left: 4,
      width: 18,
      height: 6,
      backgroundColor: c.navy,
      borderRadius: 3,
      opacity: 0.45,
    },
  };
}
