import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeHeader } from '@/components/home/home-header';
import { HomeLandscape } from '@/components/home/home-landscape';
import { TaskRow } from '@/components/home/task-row';
import { BrandColors } from '@/constants/brand';

const INITIAL_TASKS = [
  {
    id: 'math',
    title: 'Matemática',
    subtitle: 'Lista de exercícios',
    meta: 'Entrega hoje',
    color: BrandColors.math,
    soft: BrandColors.mathSoft,
    icon: { ios: 'plus.forwardslash.minus', android: 'calculate', web: 'calculate' },
    done: false,
  },
  {
    id: 'history',
    title: 'História',
    subtitle: 'Prova sobre Brasil República',
    meta: '04/06',
    color: BrandColors.history,
    soft: BrandColors.historySoft,
    icon: { ios: 'doc.text', android: 'description', web: 'description' },
    done: false,
  },
  {
    id: 'portuguese',
    title: 'Português',
    subtitle: 'Leitura e resumo',
    meta: '30/05',
    color: BrandColors.portuguese,
    soft: BrandColors.portugueseSoft,
    icon: { ios: 'book', android: 'menu_book', web: 'menu_book' },
    done: false,
  },
];

const WEEK_TOTAL = 7;
const WEEK_BASE_DONE = 3;

function formatCardDate() {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  return `${day} ${months[now.getMonth()]}`;
}

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [toast, setToast] = useState('');

  const weekDone = useMemo(() => {
    const extra = tasks.filter((task) => task.done).length;
    return Math.min(WEEK_TOTAL, WEEK_BASE_DONE + extra);
  }, [tasks]);

  const percent = Math.round((weekDone / WEEK_TOTAL) * 100);

  function toggleTask(id) {
    setTasks((current) =>
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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Seu dia</Text>
            <View style={styles.dateChip}>
              <Text style={styles.dateText}>{formatCardDate()}</Text>
            </View>
          </View>

          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={toggleTask} />
          ))}

          <Pressable
            onPress={() => router.push('/(app)/planner')}
            style={({ pressed }) => [styles.weekButton, pressed && styles.pressed]}>
            <Text style={styles.weekButtonText}>Ver planejamento da semana</Text>
            <SymbolView
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              size={16}
              tintColor={BrandColors.navy}
            />
          </Pressable>
        </View>

        <HomeLandscape />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progresso da semana</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>
              {weekDone} de {WEEK_TOTAL} tarefas concluídas
            </Text>
            <Text style={styles.progressPercent}>{percent}%</Text>
          </View>
        </View>
      </ScrollView>

      {toast ? (
        <View style={styles.toast}>
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
  content: {
    paddingHorizontal: 18,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: BrandColors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: BrandColors.navy,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
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
    color: BrandColors.navy,
  },
  dateChip: {
    backgroundColor: BrandColors.creamButton,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.navy,
    letterSpacing: 0.4,
  },
  weekButton: {
    marginTop: 8,
    backgroundColor: BrandColors.creamButton,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: BrandColors.navy,
  },
  pressed: {
    opacity: 0.8,
  },
  progressTrack: {
    marginTop: 14,
    height: 10,
    borderRadius: 8,
    backgroundColor: BrandColors.progressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BrandColors.math,
    borderRadius: 8,
  },
  progressRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 13,
    color: BrandColors.navy,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.math,
  },
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
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
