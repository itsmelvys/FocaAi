import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { LoginDecorations } from '@/components/login/login-decorations';
import { LoginForm } from '@/components/login/login-form';
import { LoginHeader } from '@/components/login/login-header';
import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export default function LoginScreen() {
  const padding = useScreenPadding();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <LoginDecorations />
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
              paddingBottom: 208 + padding.insets.bottom,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <LoginHeader />
            <LoginForm />
          </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    zIndex: 1,
  },
});
