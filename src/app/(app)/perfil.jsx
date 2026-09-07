import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeLandscape } from '@/components/home/home-landscape';
import { BackButton } from '@/components/navigation/back-button';
import { EditProfileForm } from '@/components/perfil/edit-profile-form';
import { ProfileRow } from '@/components/perfil/profile-row';
import { BrandColors } from '@/constants/brand';
import { SUBJECTS } from '@/constants/mock-subjects';
import { DEMO_PROFILE, useAuth } from '@/hooks/use-auth';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useTasks } from '@/hooks/use-tasks';

const STATS = [
  { key: 'subjects', label: 'Matérias' },
  { key: 'done', label: 'Tarefas concluídas' },
  { key: 'streak', label: 'Dias seguidos' },
  { key: 'goals', label: 'Metas alcançadas' },
];

export default function PerfilScreen() {
  const padding = useScreenPadding();
  const router = useRouter();
  const { user, signOut, updateProfile } = useAuth();
  const { tasks } = useTasks();
  const [editOpen, setEditOpen] = useState(false);
  const [toast, setToast] = useState('');

  const profile = user || DEMO_PROFILE;
  const doneCount = Math.max(tasks.filter((task) => task.done).length, 48);
  const stats = {
    subjects: SUBJECTS.length,
    done: doneCount,
    streak: 7,
    goals: 3,
  };

  const infoRows = useMemo(
    () => [
      {
        title: 'Nome completo',
        detail: profile.fullName,
        icon: { ios: 'person', android: 'person-outline', web: 'person-outline' },
      },
      {
        title: 'E-mail',
        detail: profile.email,
        icon: { ios: 'envelope', android: 'mail-outline', web: 'mail-outline' },
      },
      {
        title: 'Data de nascimento',
        detail: profile.birthDate,
        icon: { ios: 'calendar', android: 'calendar-today', web: 'calendar-today' },
      },
      {
        title: 'Instituição de ensino',
        detail: profile.school,
        icon: { ios: 'graduationcap', android: 'school', web: 'school' },
      },
      {
        title: 'Curso',
        detail: profile.course,
        icon: { ios: 'person.3', android: 'groups', web: 'groups' },
      },
    ],
    [profile],
  );

  const preferenceRows = [
    {
      title: 'Lembretes',
      detail: profile.reminders ? 'Ativados' : 'Desativados',
      icon: { ios: 'bell', android: 'notifications-none', web: 'notifications-none' },
      onPress: () => updateProfile({ reminders: !profile.reminders }),
    },
    {
      title: 'Tema do aplicativo',
      detail: profile.theme,
      icon: { ios: 'moon', android: 'dark-mode', web: 'dark-mode' },
    },
    {
      title: 'Idioma',
      detail: profile.language,
      icon: { ios: 'globe', android: 'language', web: 'language' },
    },
  ];

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 1600);
  }

  function handleLogout() {
    signOut();
    router.replace('/login');
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: 28,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.sun} />
          <View style={styles.cloud} />
          <BackButton onPress={() => router.navigate('/(app)')} />
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Perfil</Text>
              <Text style={styles.subtitle}>Seus dados, suas conquistas e suas preferências.</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Configurações"
              onPress={() => showToast('As preferências ficam mais abaixo')}
              style={({ pressed }) => [styles.settingsBtn, pressed && styles.pressed]}>
              <AppIcon
                name={{ ios: 'gearshape', android: 'settings', web: 'settings' }}
                size={22}
                tintColor={BrandColors.navy}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>{profile.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.cameraBadge}>
              <AppIcon
                name={{ ios: 'camera', android: 'photo-camera', web: 'photo-camera' }}
                size={12}
                tintColor={BrandColors.white}
              />
            </View>
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Pressable
            onPress={() => setEditOpen(true)}
            style={({ pressed }) => [styles.editBtn, pressed && styles.pressed]}>
            <AppIcon
              name={{ ios: 'pencil', android: 'edit', web: 'edit' }}
              size={14}
              tintColor={BrandColors.navy}
            />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>

          <View style={styles.statsRow}>
            {STATS.map((item, index) => (
              <View key={item.key} style={styles.stat}>
                {index > 0 ? <View style={styles.statDivider} /> : null}
                <View style={styles.statBody}>
                  <Text style={styles.statValue}>{stats[item.key]}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Minhas informações</Text>
        <View style={styles.listCard}>
          {infoRows.map((row, index) => (
            <ProfileRow
              key={row.title}
              {...row}
              isLast={index === infoRows.length - 1}
              onPress={() => setEditOpen(true)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Preferências</Text>
        <View style={styles.listCard}>
          {preferenceRows.map((row, index) => (
            <ProfileRow
              key={row.title}
              {...row}
              isLast={index === preferenceRows.length - 1}
              onPress={row.onPress || (() => showToast('Preferência de demonstração'))}
            />
          ))}
        </View>

        <View style={styles.footerRow}>
          <Pressable
            accessibilityRole="button"
            onPress={handleLogout}
            style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
            <AppIcon
              name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }}
              size={18}
              tintColor={BrandColors.priorityHigh}
            />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </Pressable>
          <Text style={styles.footerQuote}>Grandes planos começam com pequenos passos! ♡</Text>
        </View>

        <HomeLandscape />
      </ScrollView>

      <EditProfileForm
        visible={editOpen}
        profile={profile}
        onClose={() => setEditOpen(false)}
        onSave={updateProfile}
      />

      {toast ? (
        <View style={[styles.toast, { left: padding.left, right: padding.right }]}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  header: {
    overflow: 'hidden',
    paddingBottom: 8,
  },
  sun: {
    position: 'absolute',
    right: 36,
    top: -8,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: BrandColors.sun,
    opacity: 0.32,
  },
  cloud: {
    position: 'absolute',
    right: 18,
    top: 28,
    width: 54,
    height: 22,
    borderRadius: 12,
    backgroundColor: BrandColors.cloud,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: BrandColors.textMuted,
  },
  settingsBtn: {
    zIndex: 1,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 8,
    backgroundColor: BrandColors.white,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: BrandColors.navy,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatarWrap: {
    width: 92,
    height: 92,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#F3D5B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 36,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  cameraBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BrandColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: BrandColors.white,
  },
  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  bio: {
    marginTop: 4,
    fontSize: 13,
    color: BrandColors.textMuted,
    textAlign: 'center',
  },
  editBtn: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: BrandColors.creamButton,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editText: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navy,
  },
  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    width: '100%',
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: BrandColors.divider,
    marginRight: 6,
  },
  statBody: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  statLabel: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'center',
    color: BrandColors.textMuted,
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  listCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: BrandColors.navy,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  footerRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: BrandColors.priorityHighBg,
    borderRadius: 24,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.priorityHigh,
  },
  footerQuote: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'italic',
    color: BrandColors.navy,
  },
  toast: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: BrandColors.navy,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toastText: {
    color: BrandColors.white,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
