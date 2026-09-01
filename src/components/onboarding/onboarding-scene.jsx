import { StyleSheet, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function OnboardingScene() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.sun} />
      <View style={styles.hill} />
      <View style={styles.town} />
      <View style={styles.churchRoof} />
      <View style={styles.church} />

      <View style={styles.cactus}>
        <View style={styles.cactusArm} />
        <View style={styles.cactusBody} />
      </View>

      <View style={styles.desk} />
      <View style={styles.person}>
        <View style={styles.head} />
        <View style={styles.body} />
        <View style={styles.arm} />
      </View>
      <View style={styles.book} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 240,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sun: {
    position: 'absolute',
    top: 8,
    right: 36,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.orangeLight,
    opacity: 0.85,
  },
  hill: {
    position: 'absolute',
    bottom: 48,
    width: '80%',
    height: 70,
    backgroundColor: BrandColors.hillSoft,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  town: {
    position: 'absolute',
    right: 42,
    bottom: 92,
    width: 54,
    height: 28,
    backgroundColor: BrandColors.churchLight,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  churchRoof: {
    position: 'absolute',
    right: 52,
    bottom: 118,
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: BrandColors.churchRoof,
  },
  church: {
    position: 'absolute',
    right: 58,
    bottom: 92,
    width: 24,
    height: 28,
    backgroundColor: BrandColors.church,
  },
  cactus: {
    position: 'absolute',
    left: 28,
    bottom: 72,
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
    left: -12,
    top: 14,
    width: 16,
    height: 10,
    backgroundColor: BrandColors.greenLight,
    borderRadius: 6,
  },
  desk: {
    width: 150,
    height: 14,
    backgroundColor: BrandColors.navy,
    borderRadius: 6,
    marginBottom: 8,
  },
  person: {
    position: 'absolute',
    bottom: 22,
    alignItems: 'center',
  },
  head: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BrandColors.hill,
    marginBottom: 4,
  },
  body: {
    width: 46,
    height: 40,
    borderRadius: 16,
    backgroundColor: BrandColors.navy,
  },
  arm: {
    position: 'absolute',
    right: -10,
    bottom: 16,
    width: 28,
    height: 8,
    borderRadius: 4,
    backgroundColor: BrandColors.navy,
    transform: [{ rotate: '18deg' }],
  },
  book: {
    position: 'absolute',
    bottom: 22,
    width: 36,
    height: 8,
    borderRadius: 2,
    backgroundColor: BrandColors.orange,
  },
});
