import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeHeader } from '@/components/home/home-header';
import { HomeLandscape } from '@/components/home/home-landscape';
import { TaskRow } from '@/components/home/task-row';
import { Layout } from '@/constants/layout';
import { HOME_DAY_TASKS } from '@/constants/mock-tasks';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useTasks } from '@/hooks/use-tasks';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

const SHORTCUTS = [
  {
    id: 'tarefas',
    label: 'Tarefas',
    route: '/(app)/tarefas',
    icon: { ios: 'checklist', android: 'assignment', web: 'assignment' },
  },
  {
    id: 'planner',
    label: 'Planner',
    route: '/(app)/planner',
    icon: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  },
  {
    id: 'nova',
    label: 'Nova tarefa',
    route: '/(app)/nova-tarefa',
    icon: { ios: 'plus', android: 'add', web: 'add' },
  },
];

function formatCardDate() {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const now = new Date();
  return `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]}`;
}

export default function HomeScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { tasks } = useTasks();
  const [dayTasks, setDayTasks] = useState(HOME_DAY_TASKS);
  const [toast, setToast] = useState('');

  const dayDone = dayTasks.filter((task) => task.done).length;
  const weekDone = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const weekTotal = Math.max(tasks.length, 1);
  const percent = Math.round((weekDone / weekTotal) * 100);

  function toggleTask(id) {
    setDayTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(''), 1800);
  }

  return (
    <View style={styles.screen}>
      <HomeHeader onBellPress={() => showToast('Nenhuma notificação por enquanto')} />

      <ScrollView
        contentContainerStyle={{
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: 28,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.shortcuts}>
          {SHORTCUTS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(item.route)}
              style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]}>
              <AppIcon name={item.icon} size={18} tintColor={colors.navy} />
              <Text style={styles.shortcutText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.checkCircle}>
            <AppIcon
              name={{ ios: 'checkmark', android: 'check', web: 'check' }}
              size={16}
              tintColor={colors.white}
            />
          </View>
          <View style={styles.summaryBody}>
            <Text style={styles.summaryText}>
              {weekDone} de {weekTotal} {weekTotal === 1 ? 'tarefa da lista' : 'tarefas da lista'}
            </Text>
            <View style={styles.summaryRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
              </View>
              <Text style={styles.percent}>{percent}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Seu dia</Text>
              <Text style={styles.cardHint}>
                {dayDone} de {dayTasks.length} concluídas hoje
              </Text>
            </View>
            <View style={styles.dateChip}>
              <Text style={styles.dateText}>{formatCardDate()}</Text>
            </View>
          </View>

          {dayTasks.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={toggleTask}
              isLast={index === dayTasks.length - 1}
            />
          ))}

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(app)/planner')}
            style={({ pressed }) => [styles.weekButton, pressed && styles.pressed]}>
            <Text style={styles.weekButtonText}>Ver planejamento da semana</Text>
            <AppIcon
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              size={16}
              tintColor={colors.navy}
            />
          </Pressable>
        </View>

        <View style={styles.quote}>
          <Text style={styles.quoteText}>“Disciplina hoje, conquistas amanhã.”</Text>
        </View>
        <View style={styles.quoteLine} />
        <HomeLandscape />
      </ScrollView>

      {toast ? (
        <View style={[styles.toast, { left: padding.left, right: padding.right, bottom: 16 }]}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
    },
    shortcuts: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 14,
    },
    shortcut: {
      flex: 1,
      minHeight: Layout.buttonHeight,
      borderRadius: Layout.buttonRadius,
      backgroundColor: c.white,
      borderWidth: 1,
      borderColor: c.searchBorder,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingHorizontal: 8,
    },
    shortcutText: {
      fontSize: 12,
      fontWeight: '700',
      color: c.navy,
    },
    summary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: c.summaryBg,
      borderRadius: 20,
      padding: 14,
      marginBottom: 16,
    },
    checkCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.navy,
      alignItems: 'center',
      justifyContent: 'center',
    },
    summaryBody: {
      flex: 1,
    },
    summaryText: {
      fontSize: 14,
      fontWeight: '700',
      color: c.navy,
    },
    summaryRow: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    progressTrack: {
      flex: 1,
      height: 8,
      borderRadius: 8,
      backgroundColor: c.white,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: c.navy,
      borderRadius: 8,
    },
    percent: {
      fontSize: 13,
      fontWeight: '800',
      color: c.navy,
    },
    card: {
      backgroundColor: c.white,
      borderRadius: 24,
      padding: 16,
      shadowColor: c.navy,
      shadowOpacity: 0.07,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: c.navy,
    },
    cardHint: {
      marginTop: 2,
      fontSize: 13,
      color: c.textMuted,
    },
    dateChip: {
      minHeight: Layout.pillHeight,
      backgroundColor: c.creamButton,
      borderRadius: Layout.pillRadius,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateText: {
      fontSize: 11,
      fontWeight: '700',
      color: c.navy,
      letterSpacing: 0.4,
    },
    weekButton: {
      marginTop: 12,
      backgroundColor: c.creamButton,
      borderRadius: Layout.buttonRadius,
      minHeight: Layout.buttonHeight,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    weekButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: c.navy,
    },
    quote: {
      marginTop: 20,
      backgroundColor: c.quoteBg,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    quoteText: {
      fontSize: 14,
      fontWeight: '600',
      fontStyle: 'italic',
      color: c.navy,
      textAlign: 'center',
    },
    quoteLine: {
      width: 72,
      height: 3,
      borderRadius: 2,
      backgroundColor: c.orange,
      alignSelf: 'center',
      marginTop: 8,
    },
    toast: {
      position: 'absolute',
      backgroundColor: c.navy,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    toastText: {
      color: c.white,
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '600',
    },
    pressed: {
      opacity: 0.8,
    },
  };
}
