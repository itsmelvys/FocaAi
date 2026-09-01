import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';
import { useAuth } from '@/hooks/use-auth';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export default function PerfilScreen() {
  const padding = useScreenPadding();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const name = user?.name || 'Letícia';
  const email = user?.email || 'leticia@focaai.app';

  function handleLogout() {
    signOut();
    router.replace('/login');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: 24,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLetter}>{name.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Seu espaço</Text>
        <Text style={styles.cardText}>
          Perfil de demonstração. Sem banco de dados ainda — os dados ficam só nesta sessão do app.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>concluídas</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>na semana</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>43%</Text>
          <Text style={styles.statLabel}>foco</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleLogout}
        style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  content: {
    alignItems: 'center',
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
    borderRadius: 20,
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
  statsRow: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    flex: 1,
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: BrandColors.textMuted,
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
    transform: [{ scale: 0.98 }],
  },
});
