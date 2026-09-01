import { StyleSheet, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

function Cloud({ style }) {
  return (
    <View style={[styles.cloud, style]}>
      <View style={styles.cloudPuffLeft} />
      <View style={styles.cloudPuffRight} />
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

function Cactus() {
  return (
    <View style={styles.cactus}>
      <View style={styles.cactusArmLeft} />
      <View style={styles.cactusArmRight} />
      <View style={styles.cactusBody}>
        <View style={[styles.cactusRidge, { top: 18 }]} />
        <View style={[styles.cactusRidge, { top: 38 }]} />
        <View style={[styles.cactusRidge, { top: 58 }]} />
      </View>
      <View style={styles.cactusBase} />
    </View>
  );
}

function Church() {
  return (
    <View style={styles.church}>
      <View style={styles.churchBushLeft} />
      <View style={styles.churchBushRight} />

      <View style={styles.churchTower}>
        <View style={styles.churchCross}>
          <View style={styles.crossV} />
          <View style={styles.crossH} />
        </View>
        <View style={styles.towerRoof} />
        <View style={styles.towerBody}>
          <View style={styles.towerWindow} />
        </View>
      </View>

      <View style={styles.churchMain}>
        <View style={styles.mainRoof} />
        <View style={styles.mainBody}>
          <View style={styles.mainWindow} />
          <View style={styles.mainDoor} />
        </View>
      </View>

      <View style={styles.churchWing}>
        <View style={styles.wingRoof} />
        <View style={styles.wingBody} />
      </View>
    </View>
  );
}

export function IntroLandscape() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.mountainBack} />
      <View style={styles.mountainMid} />
      <View style={styles.mountainFront} />

      <Cloud style={styles.cloudOne} />
      <Cloud style={styles.cloudTwo} />
      <Bird />

      <View style={styles.scene}>
        <Cactus />
        <Church />
      </View>

      <View style={styles.ground}>
        <View style={styles.wave} />
        <View style={[styles.wave, styles.waveTwo]} />
        <View style={[styles.wave, styles.waveThree]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 320,
  },
  mountainBack: {
    position: 'absolute',
    bottom: 118,
    left: '18%',
    width: '70%',
    height: 90,
    backgroundColor: BrandColors.hillSoft,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  mountainMid: {
    position: 'absolute',
    bottom: 110,
    left: '42%',
    width: '58%',
    height: 70,
    backgroundColor: BrandColors.hill,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    opacity: 0.7,
  },
  mountainFront: {
    position: 'absolute',
    bottom: 108,
    right: -20,
    width: '40%',
    height: 50,
    backgroundColor: BrandColors.hillSoft,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  cloud: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cloudOne: {
    top: 28,
    left: 36,
  },
  cloudTwo: {
    top: 18,
    right: 48,
  },
  cloudPuffLeft: {
    width: 28,
    height: 16,
    borderRadius: 10,
    backgroundColor: BrandColors.cloud,
  },
  cloudPuffRight: {
    width: 38,
    height: 20,
    borderRadius: 12,
    backgroundColor: BrandColors.cloud,
    marginLeft: -10,
  },
  bird: {
    position: 'absolute',
    top: 36,
    right: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  birdWingLeft: {
    width: 22,
    height: 6,
    backgroundColor: BrandColors.bird,
    borderRadius: 6,
    transform: [{ rotate: '-28deg' }],
  },
  birdWingRight: {
    width: 22,
    height: 6,
    backgroundColor: BrandColors.bird,
    borderRadius: 6,
    marginLeft: -6,
    transform: [{ rotate: '28deg' }],
  },
  scene: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  cactus: {
    width: 92,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cactusBody: {
    width: 42,
    height: 132,
    backgroundColor: BrandColors.green,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: 'hidden',
  },
  cactusRidge: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 3,
    borderRadius: 2,
    backgroundColor: BrandColors.cactusDark,
    opacity: 0.25,
  },
  cactusArmLeft: {
    position: 'absolute',
    left: 4,
    bottom: 62,
    width: 28,
    height: 18,
    backgroundColor: BrandColors.green,
    borderRadius: 12,
  },
  cactusArmRight: {
    position: 'absolute',
    right: 2,
    bottom: 86,
    width: 26,
    height: 16,
    backgroundColor: BrandColors.greenLight,
    borderRadius: 12,
  },
  cactusBase: {
    width: 56,
    height: 10,
    backgroundColor: BrandColors.cactusDark,
    borderRadius: 6,
    marginTop: -4,
    opacity: 0.35,
  },
  church: {
    width: 168,
    height: 150,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  churchBushLeft: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 28,
    height: 22,
    backgroundColor: BrandColors.green,
    borderRadius: 14,
    zIndex: 3,
  },
  churchBushRight: {
    position: 'absolute',
    right: 6,
    bottom: 8,
    width: 24,
    height: 18,
    backgroundColor: BrandColors.greenLight,
    borderRadius: 12,
    zIndex: 3,
  },
  churchTower: {
    alignItems: 'center',
    zIndex: 2,
  },
  churchCross: {
    alignItems: 'center',
    height: 16,
    marginBottom: 2,
  },
  crossV: {
    width: 3,
    height: 16,
    backgroundColor: BrandColors.navy,
    borderRadius: 1,
  },
  crossH: {
    position: 'absolute',
    top: 4,
    width: 10,
    height: 3,
    backgroundColor: BrandColors.navy,
    borderRadius: 1,
  },
  towerRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 22,
    borderRightWidth: 22,
    borderBottomWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: BrandColors.churchRoof,
  },
  towerBody: {
    width: 36,
    height: 70,
    backgroundColor: BrandColors.churchLight,
    alignItems: 'center',
    paddingTop: 10,
  },
  towerWindow: {
    width: 12,
    height: 18,
    borderRadius: 8,
    backgroundColor: BrandColors.navy,
  },
  churchMain: {
    alignItems: 'center',
    marginLeft: -4,
  },
  mainRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: BrandColors.churchRoof,
  },
  mainBody: {
    width: 68,
    height: 58,
    backgroundColor: BrandColors.churchLight,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainWindow: {
    position: 'absolute',
    top: 10,
    width: 14,
    height: 16,
    borderRadius: 8,
    backgroundColor: BrandColors.navy,
  },
  mainDoor: {
    width: 18,
    height: 26,
    backgroundColor: BrandColors.navy,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  churchWing: {
    marginLeft: -6,
    alignItems: 'center',
  },
  wingRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 24,
    borderRightWidth: 24,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: BrandColors.orange,
  },
  wingBody: {
    width: 42,
    height: 42,
    backgroundColor: BrandColors.church,
  },
  ground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 92,
    backgroundColor: BrandColors.navy,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    top: 18,
    left: -20,
    right: -20,
    height: 18,
    borderBottomWidth: 2,
    borderBottomColor: BrandColors.landscapeBlue,
    borderRadius: 40,
  },
  waveTwo: {
    top: 38,
    transform: [{ scaleX: 1.1 }],
  },
  waveThree: {
    top: 58,
    transform: [{ scaleX: 0.95 }],
  },
});
