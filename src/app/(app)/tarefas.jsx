import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TaskCard } from '@/components/tarefas/task-card';
import { BrandColors } from '@/constants/brand';
import { MY_TASKS } from '@/constants/mock-tasks';
import { useScreenPadding } from '@/hooks/use-screen-padding';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'done', label: 'Concluídas' },
];

export default function TarefasScreen() {
  const padding = useScreenPadding();
  const [tasks, setTasks] = useState(MY_TASKS);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') {
      return tasks.filter((task) => !task.done);
    }
    if (filter === 'done') {
      return tasks.filter((task) => task.done);
    }
    return tasks;
  }, [filter, tasks]);

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  function showNewTaskHint() {
    setToast('Nova tarefa entra na próxima tela');
    setTimeout(() => setToast(''), 1800);
  }

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
        <Text style={styles.title}>Minhas tarefas</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Nova tarefa"
          onPress={showNewTaskHint}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'plus', android: 'add', web: 'add' }}
            size={22}
            tintColor={BrandColors.white}
          />
        </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BrandColors.navy,
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
    backgroundColor: BrandColors.creamButton,
  },
  pillActive: {
    backgroundColor: BrandColors.navy,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.navy,
  },
  pillTextActive: {
    color: BrandColors.white,
  },
  pressed: {
    opacity: 0.8,
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
});
