import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandColors } from '@/constants/brand';
import { useAuth } from '@/hooks/use-auth';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
    router.replace('/login');
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 24 }]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLetter}>{(user?.name || 'L').charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{user?.name || 'Letícia'}</Text>
      <Text style={styles.email}>{user?.email || 'leticia@focaai.app'}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Conta de teste</Text>
        <Text style={styles.cardText}>
          Ainda não há backend. Este perfil existe só no front para você navegar pelo app.
        </Text>
      </View>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: BrandColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: BrandColors.white,
    fontSize: 32,
    fontWeight: '800',
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: BrandColors.textMuted,
  },
  card: {
    marginTop: 28,
    width: '100%',
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    padding: 16,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.orange,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: BrandColors.navy,
  },
  logout: {
    marginTop: 24,
    width: '100%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BrandColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: BrandColors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
