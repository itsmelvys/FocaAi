import { StyleSheet, View } from 'react-native';

import { useThemedStyles } from '@/hooks/use-theme';

export function HomeLandscape() {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.sky} />
      <View style={styles.hillBack} />
      <View style={styles.hillMid} />
      <View style={styles.hillFront} />

      <View style={styles.birdLeft} />
      <View style={styles.birdRight} />

      <View style={styles.cactus}>
        <View style={styles.cactusArm} />
        <View style={styles.cactusBody} />
        <View style={styles.cactusBase} />
      </View>

      <View style={styles.church}>
        <View style={styles.cross} />
        <View style={styles.roof} />
        <View style={styles.churchBody}>
          <View style={styles.window} />
          <View style={styles.door} />
        </View>
      </View>
    </View>
  );
}

function makeStyles(c) {
  return {
    wrap: {
      height: 130,
      marginTop: 4,
    },
    sky: {
      ...StyleSheet.absoluteFillObject,
    },
    hillBack: {
      position: 'absolute',
      bottom: 28,
      left: '18%',
      width: '62%',
      height: 48,
      backgroundColor: c.hillSoft,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    hillMid: {
      position: 'absolute',
      bottom: 24,
      right: '6%',
      width: '42%',
      height: 36,
      backgroundColor: c.hill,
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      opacity: 0.72,
    },
    hillFront: {
      position: 'absolute',
      bottom: 22,
      left: '8%',
      width: '36%',
      height: 22,
      backgroundColor: c.hill,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      opacity: 0.55,
    },
    birdLeft: {
      position: 'absolute',
      top: 18,
      right: '42%',
      width: 18,
      height: 5,
      borderRadius: 4,
      backgroundColor: c.bird,
      transform: [{ rotate: '-20deg' }],
    },
    birdRight: {
      position: 'absolute',
      top: 10,
      right: '30%',
      width: 14,
      height: 4,
      borderRadius: 4,
      backgroundColor: c.bird,
      transform: [{ rotate: '18deg' }],
    },
    cactus: {
      position: 'absolute',
      left: 16,
      bottom: 10,
      alignItems: 'center',
    },
    cactusBody: {
      width: 20,
      height: 64,
      backgroundColor: c.green,
      borderRadius: 11,
    },
    cactusArm: {
      position: 'absolute',
      left: -12,
      top: 18,
      width: 18,
      height: 11,
      backgroundColor: c.greenLight,
      borderRadius: 7,
    },
    cactusBase: {
      width: 28,
      height: 8,
      borderRadius: 4,
      backgroundColor: c.cactusDark,
      opacity: 0.3,
      marginTop: -3,
    },
    church: {
      position: 'absolute',
      right: 22,
      bottom: 10,
      alignItems: 'center',
    },
    cross: {
      width: 2,
      height: 10,
      backgroundColor: c.navy,
      marginBottom: 1,
    },
    roof: {
      width: 0,
      height: 0,
      borderLeftWidth: 26,
      borderRightWidth: 26,
      borderBottomWidth: 18,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: c.churchRoof,
    },
    churchBody: {
      width: 42,
      height: 34,
      backgroundColor: c.churchLight,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    window: {
      position: 'absolute',
      top: 6,
      width: 10,
      height: 12,
      borderRadius: 6,
      backgroundColor: c.navy,
      opacity: 0.55,
    },
    door: {
      width: 12,
      height: 16,
      backgroundColor: c.navy,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
    },
  };
}
