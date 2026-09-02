import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { CadastroForm } from '@/components/cadastro/cadastro-form';
import { IntroLandscape } from '@/components/intro/intro-landscape';
import { BackButton } from '@/components/navigation/back-button';
import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export default function CadastroScreen() {
  const router = useRouter();
  const padding = useScreenPadding();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
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
          <BackButton onPress={() => router.replace('/login')} />
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>Preencha seus dados para começar a focar nos estudos.</Text>
          <CadastroForm />
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
    zIndex: 1,
  },
  title: {
    marginTop: 8,
    marginBottom: 6,
    fontSize: 28,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
    color: BrandColors.textMuted,
  },
});
