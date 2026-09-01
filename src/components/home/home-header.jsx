import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandColors } from '@/constants/brand';
import { useAuth } from '@/hooks/use-auth';

export function HomeHeader({ onBellPress }) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Letícia';

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <View style={styles.sun} />
      <View style={styles.cloud} />

      <View style={styles.row}>
        <View style={styles.texts}>
          <Text style={styles.hello}>Olá, {firstName}! 👋</Text>
          <Text style={styles.subtitle}>Vamos focar hoje?</Text>
        </View>

        <Pressable
          onPress={onBellPress}
          hitSlop={10}
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
    paddingHorizontal: 22,
    paddingBottom: 8,
  },
  sun: {
    position: 'absolute',
    top: 8,
    right: 72,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: BrandColors.hillSoft,
    opacity: 0.85,
  },
  cloud: {
    position: 'absolute',
    top: 28,
    right: 108,
    width: 46,
    height: 22,
    borderRadius: 12,
    backgroundColor: BrandColors.cloud,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
