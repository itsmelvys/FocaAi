import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

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

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') {
      return tasks.filter((task) => !task.done);
    }
    if (filter === 'done') {
      return tasks.filter((task) => task.done);
    }
    return tasks;
  }, [filter, tasks]);

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
        <BackButton onPress={() => router.navigate('/(app)')} />
        <View style={styles.titleRow}>
          <Text style={styles.title}>Minhas tarefas</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nova tarefa"
            onPress={() => router.push('/(app)/nova-tarefa')}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
            <AppIcon
              name={{ ios: 'plus', android: 'add', web: 'add' }}
              size={22}
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
          paddingBottom: 24,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}>
        {visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={toggleTask} />
        ))}
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
      paddingBottom: 12,
      gap: 4,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: c.navy,
    },
    addButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: c.navy,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filters: {
      flexDirection: 'row',
      gap: 8,
      paddingBottom: 16,
    },
    pill: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: c.creamButton,
    },
    pillActive: {
      backgroundColor: c.navy,
    },
    pillText: {
      fontSize: 13,
      fontWeight: '600',
      color: c.navy,
    },
    pillTextActive: {
      color: c.white,
    },
    pressed: {
      opacity: 0.8,
    },
  };
}
