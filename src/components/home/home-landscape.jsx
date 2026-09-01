import { StyleSheet, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function HomeLandscape() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.hillBack} />
      <View style={styles.hillFront} />
      <View style={styles.bird} />
      <View style={styles.birdSmall} />

      <View style={styles.cactus}>
        <View style={styles.cactusArm} />
        <View style={styles.cactusBody} />
      </View>

      <View style={styles.church}>
        <View style={styles.cross} />
        <View style={styles.roof} />
        <View style={styles.churchBody}>
          <View style={styles.door} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 88,
    marginVertical: 8,
    overflow: 'hidden',
  },
  hillBack: {
    position: 'absolute',
    bottom: 18,
    left: '22%',
    width: '55%',
    height: 36,
    backgroundColor: BrandColors.hillSoft,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  hillFront: {
    position: 'absolute',
    bottom: 18,
    right: '8%',
    width: '40%',
    height: 28,
    backgroundColor: BrandColors.hill,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 0.7,
  },
  bird: {
    position: 'absolute',
    top: 14,
    right: '38%',
    width: 16,
    height: 5,
    borderRadius: 4,
    backgroundColor: BrandColors.bird,
    transform: [{ rotate: '-18deg' }],
  },
  birdSmall: {
    position: 'absolute',
    top: 8,
    right: '28%',
    width: 12,
    height: 4,
    borderRadius: 4,
    backgroundColor: BrandColors.bird,
    transform: [{ rotate: '16deg' }],
  },
  cactus: {
    position: 'absolute',
    left: 18,
    bottom: 8,
    alignItems: 'center',
  },
  cactusBody: {
    width: 18,
    height: 52,
    backgroundColor: BrandColors.green,
    borderRadius: 10,
  },
  cactusArm: {
    position: 'absolute',
    left: -10,
    top: 16,
    width: 16,
    height: 10,
    backgroundColor: BrandColors.greenLight,
    borderRadius: 6,
  },
  church: {
    position: 'absolute',
    right: 28,
    bottom: 8,
    alignItems: 'center',
  },
  cross: {
    width: 2,
    height: 10,
    backgroundColor: BrandColors.navy,
    marginBottom: 1,
  },
  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 22,
    borderRightWidth: 22,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: BrandColors.churchRoof,
  },
  churchBody: {
    width: 36,
    height: 28,
    backgroundColor: BrandColors.churchLight,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  door: {
    width: 10,
    height: 14,
    backgroundColor: BrandColors.navy,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
