import { useRouter } from 'expo-router';
import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, Text } from 'react-native';

import { useTheme, useThemedStyles } from '@/hooks/use-theme';

function makeStyles(c) {
  return {
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 2,
      paddingVertical: 4,
      paddingRight: 8,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: c.navy,
    },
    pressed: {
      opacity: 0.65,
    },
  };
}

export function BackButton({ onPress, label = 'Voltar' }) {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  function handlePress() {
    if (onPress) {
      onPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <AppIcon
        name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
        size={18}
        tintColor={colors.navy}
      />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
