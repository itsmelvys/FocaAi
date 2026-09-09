import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeLandscape } from '@/components/home/home-landscape';
import { BackButton } from '@/components/navigation/back-button';
import { TaskCard } from '@/components/tarefas/task-card';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useTasks } from '@/hooks/use-tasks';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'done', label: 'Concluídas' },
];

export default function TarefasScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { tasks, toggleTask } = useTasks();
  const [filter, setFilter] = useState('all');

  const doneCount = tasks.filter((task) => task.done).length;
  const percent = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') {
      return tasks.filter((task) => !task.done);
    }
    if (filter === 'done') {
      return tasks.filter((task) => task.done);
    }
    return tasks;
  }, [filter, tasks]);

  const emptyLabel = {
    all: 'Nenhuma tarefa cadastrada ainda.',
    pending: 'Nenhuma tarefa pendente.',
    done: 'Nenhuma tarefa concluída.',
  }[filter];

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          {
            paddingTop: padding.top,
            paddingLeft: padding.left,
            paddingRight: padding.right,
          },
        ]}>
        <View style={styles.sun} />
        <BackButton onPress={() => router.navigate('/(app)')} />
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Minhas tarefas</Text>
            <Text style={styles.subtitle}>Acompanhe o que falta e o que já foi feito.</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nova tarefa"
            onPress={() => router.push('/(app)/nova-tarefa')}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
            <AppIcon
              name={{ ios: 'plus', android: 'add', web: 'add' }}
              size={20}
              tintColor={colors.white}
            />
          </Pressable>
        </View>
      </View>

      <View style={[styles.filters, { paddingLeft: padding.left, paddingRight: padding.right }]}>
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setFilter(item.id)}
              style={[styles.pill, active && styles.pillActive]}>
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: 28,
        }}
        showsVerticalScrollIndicator={false}>
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
              {doneCount} de {tasks.length} {tasks.length === 1 ? 'tarefa concluída' : 'tarefas concluídas'}
            </Text>
            <View style={styles.summaryRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
              </View>
              <Text style={styles.percent}>{percent}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.list}>
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </View>

        {visibleTasks.length === 0 ? <Text style={styles.empty}>{emptyLabel}</Text> : null}

        <HomeLandscape />
      </ScrollView>
    </View>
  );
}

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
    },
    header: {
      paddingBottom: 8,
      overflow: 'hidden',
    },
    sun: {
      position: 'absolute',
      right: 28,
      top: 12,
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: c.sun,
      opacity: 0.32,
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
      fontSize: 28,
      fontWeight: '800',
      color: c.navy,
    },
    subtitle: {
      marginTop: 4,
      fontSize: 14,
      lineHeight: 20,
      color: c.textMuted,
    },
    addButton: {
      zIndex: 1,
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: c.navy,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filters: {
      flexDirection: 'row',
      gap: 8,
      paddingTop: 8,
      paddingBottom: 12,
    },
    pill: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: c.white,
      borderWidth: 1,
      borderColor: c.searchBorder,
    },
    pillActive: {
      backgroundColor: c.navy,
      borderColor: c.navy,
    },
    pillText: {
      fontSize: 13,
      fontWeight: '600',
      color: c.navy,
    },
    pillTextActive: {
      color: c.white,
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
    list: {
      gap: 12,
    },
    empty: {
      marginTop: 12,
      marginBottom: 8,
      textAlign: 'center',
      fontSize: 14,
      color: c.textMuted,
    },
    pressed: {
      opacity: 0.8,
    },
  };
}
