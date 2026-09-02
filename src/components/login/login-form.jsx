import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
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

import { BrandColors } from '@/constants/brand';
import { useAuth } from '@/hooks/use-auth';

function GoogleLogo() {
  return (
    <View style={styles.googleLogo}>
      <Text style={styles.googleG}>G</Text>
    </View>
  );
}

function Divider() {
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
}) {
  return (
    <View style={styles.inputWrapper}>
      <SymbolView
        name={icon}
        size={20}
        tintColor={BrandColors.navy}
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={BrandColors.inputPlaceholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {rightIcon ? (
        <Pressable onPress={onRightIconPress} hitSlop={8} style={styles.eyeButton}>
          <SymbolView name={rightIcon} size={20} tintColor={BrandColors.navy} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
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
          <ActivityIndicator color={BrandColors.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Entrar</Text>
        )}
      </Pressable>

      <Divider />

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={() => enterApp({ name: 'Letícia' })}
        style={({ pressed }) => [
          styles.googleButton,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}>
        <GoogleLogo />
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    gap: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: BrandColors.inputBorder,
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
    color: BrandColors.navy,
  },
  eyeButton: {
    padding: 4,
  },
  primaryButton: {
    backgroundColor: BrandColors.navy,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: BrandColors.white,
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
    backgroundColor: BrandColors.divider,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: BrandColors.textMuted,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.white,
    borderWidth: 1.5,
    borderColor: BrandColors.navy,
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
    color: BrandColors.navy,
    fontSize: 15,
    fontWeight: '600',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 14,
    color: BrandColors.navy,
    marginTop: 8,
  },
  signUpLink: {
    color: BrandColors.orange,
    fontWeight: '700',
  },
});
