import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { IntroLandscape } from '@/components/intro/intro-landscape';
import { LoginForm } from '@/components/login/login-form';
import { LoginHeader } from '@/components/login/login-header';
import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export default function LoginScreen() {
  const padding = useScreenPadding();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.sun} />
      <IntroLandscape />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: padding.top,
              paddingLeft: padding.left,
              paddingRight: padding.right,
              paddingBottom: 260 + padding.insets.bottom,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <LoginHeader />
          <LoginForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  sun: {
    position: 'absolute',
    top: -40,
    right: -32,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: BrandColors.orangeLight,
    opacity: 0.4,
  },
  scrollContent: {
    flexGrow: 1,
    zIndex: 1,
  },
});
