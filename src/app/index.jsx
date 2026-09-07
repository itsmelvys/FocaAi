import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { BrandLogo } from '@/components/brand/brand-logo';
import { IntroLandscape } from '@/components/intro/intro-landscape';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useThemedStyles } from '@/hooks/use-theme';

const SPLASH_DURATION_MS = 2600;

export default function SplashScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const styles = useThemedStyles(makeStyles);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.screen}>
      <View style={styles.sun} />

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

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
      overflow: 'hidden',
    },
    sun: {
      position: 'absolute',
      top: -36,
      right: -28,
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: c.orangeLight,
      opacity: 0.35,
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
      color: c.navy,
      fontWeight: '500',
    },
  };
}
