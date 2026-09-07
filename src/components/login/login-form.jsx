import { useRouter } from 'expo-router';
import { AppIcon } from '@/components/ui/app-icon';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '@/hooks/use-auth';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

function GoogleLogo({ styles }) {
  return (
    <View style={styles.googleLogo}>
      <Text style={styles.googleG}>G</Text>
    </View>
  );
}

function Divider({ styles }) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>ou</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
  styles,
  colors,
}) {
  return (
    <View style={styles.inputWrapper}>
      <AppIcon name={icon} size={20} tintColor={colors.navy} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.inputPlaceholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {rightIcon ? (
        <Pressable onPress={onRightIconPress} hitSlop={8} style={styles.eyeButton}>
          <AppIcon name={rightIcon} size={20} tintColor={colors.navy} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function enterApp({ name } = {}) {
    if (loading) {
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    signIn({ email, name });
    router.replace('/(app)');
  }

  return (
    <View style={styles.container}>
      <InputField
        icon={{ ios: 'envelope', android: 'mail', web: 'mail' }}
        placeholder="E-mail ou usuário"
        value={email}
        onChangeText={setEmail}
        styles={styles}
        colors={colors}
      />

      <InputField
        icon={{ ios: 'lock', android: 'lock', web: 'lock' }}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        rightIcon={
          showPassword
            ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
            : { ios: 'eye', android: 'visibility', web: 'visibility' }
        }
        onRightIconPress={() => setShowPassword((prev) => !prev)}
        styles={styles}
        colors={colors}
      />

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={() => enterApp()}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Entrar</Text>
        )}
      </Pressable>

      <Divider styles={styles} />

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={() => enterApp({ name: 'Letícia' })}
        style={({ pressed }) => [
          styles.googleButton,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}>
        <GoogleLogo styles={styles} />
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={() => router.push('/cadastro')}>
        <Text style={styles.signUpText}>
          Ainda não tem uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
        </Text>
      </Pressable>
    </View>
  );
}

function makeStyles(c) {
  return {
    container: {
      width: '100%',
      maxWidth: 360,
      alignSelf: 'center',
      gap: 14,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.white,
      borderWidth: 1,
      borderColor: c.inputBorder,
      borderRadius: 12,
      paddingHorizontal: 14,
      height: 52,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: c.navy,
    },
    eyeButton: {
      padding: 4,
    },
    primaryButton: {
      backgroundColor: c.navy,
      borderRadius: 12,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
    primaryButtonText: {
      color: c.white,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: c.divider,
    },
    dividerText: {
      marginHorizontal: 16,
      fontSize: 14,
      color: c.textMuted,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.white,
      borderWidth: 1.5,
      borderColor: c.navy,
      borderRadius: 12,
      height: 52,
      gap: 10,
    },
    googleLogo: {
      width: 22,
      height: 22,
      borderRadius: 11,
      alignItems: 'center',
      justifyContent: 'center',
    },
    googleG: {
      fontSize: 16,
      fontWeight: '700',
      color: '#4285F4',
    },
    googleButtonText: {
      color: c.navy,
      fontSize: 15,
      fontWeight: '600',
    },
    signUpText: {
      textAlign: 'center',
      fontSize: 14,
      color: c.navy,
      marginTop: 8,
    },
    signUpLink: {
      color: c.orange,
      fontWeight: '700',
    },
  };
}
