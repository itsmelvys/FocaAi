import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';
import { useAuth } from '@/hooks/use-auth';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export function HomeHeader({ onBellPress }) {
  const padding = useScreenPadding();
  const router = useRouter();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Letícia';

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
        },
      ]}>
      <View style={[styles.sun, { top: padding.insets.top }]} />
      <View style={[styles.sunInner, { top: padding.insets.top + 14 }]} />
      <View style={[styles.cloudBack, { top: padding.insets.top + 18 }]} />
      <View style={[styles.cloudFront, { top: padding.insets.top + 30 }]} />

      <View style={styles.row}>
        <Pressable
          onPress={() => router.navigate('/(app)/perfil')}
          style={({ pressed }) => [styles.texts, pressed && styles.pressed]}>
          <Text style={styles.hello}>Olá, {firstName}! 👋</Text>
          <Text style={styles.subtitle}>Vamos focar hoje?</Text>
        </Pressable>

        <Pressable
          onPress={onBellPress}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Notificações"
          style={({ pressed }) => [styles.bell, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
            size={22}
            tintColor={BrandColors.navy}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 12,
    overflow: 'hidden',
  },
  sun: {
    position: 'absolute',
    right: 48,
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: BrandColors.hillSoft,
  },
  sunInner: {
    position: 'absolute',
    right: 62,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BrandColors.cream,
    opacity: 0.35,
  },
  cloudBack: {
    position: 'absolute',
    right: 112,
    width: 52,
    height: 22,
    borderRadius: 12,
    backgroundColor: BrandColors.cloud,
  },
  cloudFront: {
    position: 'absolute',
    right: 90,
    width: 36,
    height: 16,
    borderRadius: 10,
    backgroundColor: BrandColors.cloud,
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  texts: {
    flex: 1,
    paddingRight: 12,
  },
  hello: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: BrandColors.navy,
    opacity: 0.8,
  },
  bell: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  pressed: {
    opacity: 0.65,
  },
});
