import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { BrandLogo } from '@/components/brand/brand-logo';
import { IntroLandscape } from '@/components/intro/intro-landscape';
import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

const INTRO_DURATION_MS = 2600;

export default function IntroScreen() {
  const router = useRouter();
  const padding = useScreenPadding();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, INTRO_DURATION_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <Animated.View
        entering={FadeIn.duration(700)}
        style={[
          styles.content,
          {
            paddingTop: padding.top + 24,
            paddingHorizontal: padding.left,
          },
        ]}>
        <BrandLogo size="large" />
        <Animated.View entering={FadeInDown.delay(250).duration(600)}>
          <Text style={styles.tagline}>
            Organize seus estudos.{'\n'}Construa seu futuro.
          </Text>
        </Animated.View>
      </Animated.View>

      <IntroLandscape />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
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
