import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandLogo } from '@/components/brand/brand-logo';
import { IntroLandscape } from '@/components/intro/intro-landscape';
import { BrandColors } from '@/constants/brand';

const INTRO_DURATION_MS = 2600;

export default function IntroScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, INTRO_DURATION_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <Animated.View entering={FadeIn.duration(700)} style={styles.content}>
          <BrandLogo size="large" />
          <Animated.View entering={FadeInDown.delay(250).duration(600)}>
            <Text style={styles.tagline}>
              Organize seus estudos.{'\n'}Construa seu futuro.
            </Text>
          </Animated.View>
        </Animated.View>

        <IntroLandscape />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 72,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  tagline: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: BrandColors.navy,
    fontWeight: '500',
  },
});
