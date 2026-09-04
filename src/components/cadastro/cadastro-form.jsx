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

import { BrandColors } from '@/constants/brand';
import { useAuth } from '@/hooks/use-auth';

function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize = 'none',
  rightIcon,
  onRightIconPress,
}) {
  return (
    <View style={styles.inputWrapper}>
      <AppIcon name={icon} size={20} tintColor={BrandColors.navy} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={BrandColors.inputPlaceholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      {rightIcon ? (
        <Pressable onPress={onRightIconPress} hitSlop={8} style={styles.eyeButton}>
          <AppIcon name={rightIcon} size={20} tintColor={BrandColors.navy} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function CadastroForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (loading) {
      return;
    }

    if (password && confirm && password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    Keyboard.dismiss();
    setError('');
    setLoading(true);
    signIn({ email, name: name.trim() || undefined });
    router.replace('/(app)');
  }

  return (
    <View style={styles.container}>
      <InputField
        icon={{ ios: 'person', android: 'person', web: 'person' }}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <InputField
        icon={{ ios: 'envelope', android: 'mail', web: 'mail' }}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        icon={{ ios: 'lock', android: 'lock', web: 'lock' }}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
        secureTextEntry={!showPassword}
        rightIcon={
          showPassword
            ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
            : { ios: 'eye', android: 'visibility', web: 'visibility' }
        }
        onRightIconPress={() => setShowPassword((prev) => !prev)}
      />
      <InputField
        icon={{ ios: 'lock', android: 'lock', web: 'lock' }}
        placeholder="Confirmar senha"
        value={confirm}
        onChangeText={(text) => {
          setConfirm(text);
          setError('');
        }}
        secureTextEntry={!showPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={handleSubmit}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.pressed,
          loading && styles.disabled,
        ]}>
        {loading ? (
          <ActivityIndicator color={BrandColors.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    minHeight: 56,
    shadowColor: BrandColors.navy,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
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
  error: {
    fontSize: 13,
    color: BrandColors.orange,
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: BrandColors.navy,
    borderRadius: 16,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: BrandColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.7,
  },
});
