import { StyleSheet, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

function SunDecoration() {
  return (
    <View style={styles.sunContainer} pointerEvents="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <View
          key={angle}
          style={[
            styles.sunRay,
            { transform: [{ rotate: `${angle}deg` }, { translateY: -52 }] },
          ]}
        />
      ))}
      <View style={styles.sunCore} />
      <View style={styles.sunInnerRing} />
    </View>
  );
}

function Cactus({ size = 'large' }) {
  const isLarge = size === 'large';
  const bodyWidth = isLarge ? 28 : 18;
  const bodyHeight = isLarge ? 72 : 48;
  const armWidth = isLarge ? 14 : 10;
  const armHeight = isLarge ? 22 : 16;

  return (
    <View style={[styles.cactus, isLarge ? styles.cactusLarge : styles.cactusSmall]}>
      <View style={[styles.cactusArmLeft, { width: armWidth, height: armHeight }]} />
      <View style={[styles.cactusArmRight, { width: armWidth, height: armHeight }]} />
      <View style={[styles.cactusBody, { width: bodyWidth, height: bodyHeight }]}>
        {[0.25, 0.5, 0.75].map((pos) => (
          <View key={pos} style={[styles.cactusSpine, { top: bodyHeight * pos - 3 }]} />
        ))}
      </View>
    </View>
  );
}

function Church() {
  return (
    <View style={styles.church}>
      <View style={styles.churchCross}>
        <View style={styles.crossVertical} />
        <View style={styles.crossHorizontal} />
      </View>
      <View style={styles.churchRoof} />
      <View style={styles.churchBody}>
        <View style={styles.churchWindow} />
        <View style={styles.churchDoor} />
      </View>
    </View>
  );
}

function Bird() {
  return (
    <View style={styles.bird}>
      <View style={styles.birdWingLeft} />
      <View style={styles.birdWingRight} />
    </View>
  );
}

export function LoginDecorations() {
  return (
    <>
      <SunDecoration />

      <View style={styles.landscape} pointerEvents="none">
        <View style={styles.hills}>
          <View style={[styles.hill, styles.hillBack]} />
          <View style={[styles.hill, styles.hillFront]} />
        </View>

        <Bird />

        <View style={styles.groundScene}>
          <View style={styles.cactusGroup}>
            <Cactus size="large" />
            <Cactus size="small" />
          </View>

          <Church />
        </View>

        <View style={styles.waveLayer1} />
        <View style={styles.waveLayer2} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sunContainer: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  sunRay: {
    position: 'absolute',
    width: 3,
    height: 18,
    backgroundColor: BrandColors.orangeLight,
    borderRadius: 2,
    opacity: 0.7,
  },
  sunCore: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: BrandColors.orangeLight,
    opacity: 0.85,
  },
  sunInnerRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: BrandColors.cream,
    opacity: 0.15,
  },
  landscape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  hills: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 60,
  },
  hill: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  hillBack: {
    left: '30%',
    width: '50%',
    height: 45,
    backgroundColor: BrandColors.hill,
    opacity: 0.5,
  },
  hillFront: {
    left: '55%',
    width: '45%',
    height: 35,
    backgroundColor: BrandColors.hill,
    opacity: 0.35,
  },
  bird: {
    position: 'absolute',
    top: 30,
    right: '35%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  birdWingLeft: {
    width: 14,
    height: 4,
    backgroundColor: BrandColors.navy,
    borderRadius: 2,
    transform: [{ rotate: '-20deg' }],
    marginRight: -2,
  },
  birdWingRight: {
    width: 14,
    height: 4,
    backgroundColor: BrandColors.navy,
    borderRadius: 2,
    transform: [{ rotate: '20deg' }],
    marginLeft: -2,
  },
  groundScene: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  cactusGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  cactus: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cactusLarge: {
    marginBottom: 0,
  },
  cactusSmall: {
    marginBottom: 4,
  },
  cactusBody: {
    backgroundColor: BrandColors.green,
    borderRadius: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  cactusArmLeft: {
    position: 'absolute',
    left: -8,
    top: '35%',
    backgroundColor: BrandColors.green,
    borderRadius: 8,
    transform: [{ rotate: '-30deg' }],
    zIndex: -1,
  },
  cactusArmRight: {
    position: 'absolute',
    right: -6,
    top: '25%',
    backgroundColor: BrandColors.greenLight,
    borderRadius: 8,
    transform: [{ rotate: '25deg' }],
    zIndex: -1,
  },
  cactusSpine: {
    position: 'absolute',
    left: '50%',
    width: 2,
    height: 6,
    marginLeft: -1,
    backgroundColor: BrandColors.greenLight,
    borderRadius: 1,
    opacity: 0.6,
  },
  church: {
    alignItems: 'center',
    marginBottom: 2,
  },
  churchCross: {
    alignItems: 'center',
    marginBottom: -2,
    zIndex: 2,
  },
  crossVertical: {
    width: 3,
    height: 14,
    backgroundColor: BrandColors.navy,
    borderRadius: 1,
  },
  crossHorizontal: {
    position: 'absolute',
    top: 3,
    width: 10,
    height: 3,
    backgroundColor: BrandColors.navy,
    borderRadius: 1,
  },
  churchRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 36,
    borderRightWidth: 36,
    borderBottomWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: BrandColors.church,
    marginBottom: -1,
  },
  churchBody: {
    width: 58,
    height: 52,
    backgroundColor: BrandColors.churchLight,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  churchWindow: {
    position: 'absolute',
    top: 10,
    width: 12,
    height: 16,
    backgroundColor: BrandColors.navy,
    borderRadius: 6,
    opacity: 0.3,
  },
  churchDoor: {
    width: 16,
    height: 28,
    backgroundColor: BrandColors.navy,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  waveLayer1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: BrandColors.landscapeBlue,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  waveLayer2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: BrandColors.landscapeBlueDark,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
