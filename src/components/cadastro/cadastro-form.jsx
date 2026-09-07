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

function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize = 'none',
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
        autoCapitalize={autoCapitalize}
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

export function CadastroForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
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
        styles={styles}
        colors={colors}
      />
      <InputField
        icon={{ ios: 'envelope', android: 'mail', web: 'mail' }}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        styles={styles}
        colors={colors}
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
        styles={styles}
        colors={colors}
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
        styles={styles}
        colors={colors}
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
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        )}
      </Pressable>
    </View>
  );
}

function makeStyles(c) {
  return {
    container: {
      width: '100%',
      gap: 12,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.white,
      borderRadius: 16,
      paddingHorizontal: 16,
      minHeight: 56,
      shadowColor: c.navy,
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
      color: c.navy,
    },
    eyeButton: {
      padding: 4,
    },
    error: {
      fontSize: 13,
      color: c.orange,
      fontWeight: '600',
    },
    primaryButton: {
      marginTop: 8,
      backgroundColor: c.navy,
      borderRadius: 16,
      minHeight: 54,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonText: {
      color: c.white,
      fontSize: 16,
      fontWeight: '700',
    },
    pressed: {
      opacity: 0.85,
    },
    disabled: {
      opacity: 0.7,
    },
  };
}
