import { useRouter } from 'expo-router';
import { AppIcon } from '@/components/ui/app-icon';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OnboardingScene } from '@/components/onboarding/onboarding-scene';
import { BackButton } from '@/components/navigation/back-button';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

const STEPS = [
  {
    title: 'Estudar fica mais fácil com um plano',
    body: 'Organize tarefas, provas e horários de um jeito simples e visual.',
  },
  {
    title: 'Veja o seu dia de relance',
    body: 'Acompanhe o que vence hoje e o progresso da semana sem se perder.',
  },
  {
    title: 'Foque no que importa agora',
    body: 'Marque o que já fez e mantenha o ritmo até a próxima prova.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;

  function goToLogin() {
    router.replace('/login');
  }

  function handleBack() {
    if (step === 0) {
      router.replace('/');
      return;
    }
    setStep((current) => current - 1);
  }

  function handleNext() {
    if (isLast) {
      goToLogin();
      return;
    }
    setStep((current) => current + 1);
  }

  const current = STEPS[step];

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.topBar,
          {
            paddingTop: padding.top,
            paddingLeft: padding.left,
            paddingRight: padding.right,
          },
        ]}>
        <BackButton onPress={handleBack} />
        <View style={styles.progressRow}>
          {STEPS.map((item, index) => (
            <View
              key={item.title}
              style={[styles.progressSegment, index <= step && styles.progressActive]}
            />
          ))}
        </View>
        <Pressable onPress={goToLogin} hitSlop={8} style={({ pressed }) => pressed && styles.pressed}>
          <Text style={styles.skip}>Pular</Text>
        </Pressable>
      </View>

      <View style={[styles.body, { paddingHorizontal: padding.left }]}>
        <OnboardingScene />
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.body}</Text>
      </View>

      <View style={{ paddingHorizontal: padding.left, paddingBottom: padding.bottom + 8 }}>
        <Pressable
          accessibilityRole="button"
          onPress={handleNext}
          style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]}>
          <Text style={styles.nextText}>{isLast ? 'Entrar' : 'Próximo'}</Text>
          <AppIcon
            name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={18}
            tintColor={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 8,
    },
    progressRow: {
      flex: 1,
      flexDirection: 'row',
      gap: 8,
    },
    progressSegment: {
      flex: 1,
      height: 4,
      borderRadius: 4,
      backgroundColor: c.progressTrack,
    },
    progressActive: {
      backgroundColor: c.navy,
    },
    skip: {
      fontSize: 15,
      fontWeight: '600',
      color: c.navy,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      marginTop: 28,
      fontSize: 26,
      lineHeight: 32,
      fontWeight: '800',
      color: c.navy,
    },
    subtitle: {
      marginTop: 12,
      fontSize: 16,
      lineHeight: 24,
      color: c.textMuted,
    },
    nextButton: {
      backgroundColor: c.navy,
      borderRadius: 14,
      minHeight: 54,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    nextText: {
      color: c.white,
      fontSize: 16,
      fontWeight: '700',
    },
    pressed: {
      opacity: 0.8,
    },
  };
}
