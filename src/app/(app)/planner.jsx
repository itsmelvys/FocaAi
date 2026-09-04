import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeLandscape } from '@/components/home/home-landscape';
import { BackButton } from '@/components/navigation/back-button';
import { PlanSlotForm } from '@/components/planner/plan-slot-form';
import { ScheduleItem } from '@/components/planner/schedule-item';
import { BrandColors } from '@/constants/brand';
import {
  MONTH_SHORT,
  WEEKDAY_SHORT,
  blocksForDate,
  dateKey,
  formatDayHeading,
  sameDay,
  weekDaysFrom,
} from '@/constants/mock-planner';
import { useScreenPadding } from '@/hooks/use-screen-padding';

function sortBlocks(blocks) {
  return [...blocks].sort((left, right) => left.time.localeCompare(right.time));
}

export default function PlannerScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const today = useMemo(() => new Date(), []);
  const weekDays = useMemo(() => weekDaysFrom(today), [today]);
  const [selected, setSelected] = useState(today);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [slotsByDay, setSlotsByDay] = useState(() => {
    const initial = {};
    weekDays.forEach((day) => {
      initial[dateKey(day)] = blocksForDate(day);
    });
    return initial;
  });

  const selectedKey = dateKey(selected);
  const slots = sortBlocks(slotsByDay[selectedKey] || []);
  const doneCount = slots.filter((item) => item.done).length;
  const percent = slots.length ? Math.round((doneCount / slots.length) * 100) : 0;

  function toggleSlot(id) {
    setSlotsByDay((current) => ({
      ...current,
      [selectedKey]: (current[selectedKey] || []).map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    }));
  }

  function addSlot(slot) {
    setSlotsByDay((current) => ({
      ...current,
      [selectedKey]: [
        ...(current[selectedKey] || []),
        {
          id: `custom-${Date.now()}`,
          done: false,
          ...slot,
        },
      ],
    }));
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
        <View style={styles.sun} />
        <View style={styles.birdOne} />
        <View style={styles.birdTwo} />
        <BackButton onPress={() => router.navigate('/(app)')} />
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Meu planner</Text>
            <Text style={styles.subtitle}>Organize seu tempo, conquiste seus sonhos.</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ir para hoje"
            onPress={() => setSelected(today)}
            style={({ pressed }) => [styles.calendarBtn, pressed && styles.pressed]}>
            <AppIcon
              name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }}
              size={22}
              tintColor={BrandColors.navy}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.daysWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
          contentContainerStyle={[
            styles.days,
            { paddingLeft: padding.left, paddingRight: padding.right },
          ]}>
          {weekDays.map((day) => {
            const active = sameDay(day, selected);
            return (
              <Pressable
                key={dateKey(day)}
                onPress={() => setSelected(day)}
                style={styles.dayChip}>
                <Text style={styles.dayWeek}>{WEEKDAY_SHORT[day.getDay()]}</Text>
                <View style={[styles.numberBox, active && styles.numberBoxActive]}>
                  <Text style={[styles.dayNumber, active && styles.dayNumberActive]}>
                    {day.getDate()}
                  </Text>
                </View>
                <Text style={styles.dayMonth}>{MONTH_SHORT[day.getMonth()]}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: 96,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>{formatDayHeading(selected)}</Text>
          <Pressable onPress={() => setSelected(today)} style={styles.todayBtn}>
            <Text style={styles.todayText}>Hoje</Text>
          </Pressable>
        </View>

        {slots.map((item, index) => (
          <ScheduleItem
            key={item.id}
            item={item}
            isLast={index === slots.length - 1}
            onToggle={toggleSlot}
          />
        ))}

        <View style={styles.summary}>
          <View style={styles.checkCircle}>
            <AppIcon
              name={{ ios: 'checkmark', android: 'check', web: 'check' }}
              size={16}
              tintColor={BrandColors.white}
            />
          </View>
          <View style={styles.summaryBody}>
            <Text style={styles.summaryText}>
              {doneCount} de {slots.length} tarefas planejadas para hoje!
            </Text>
            <View style={styles.summaryRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percent}%` }]} />
              </View>
              <Text style={styles.percent}>{percent}%</Text>
            </View>
          </View>
        </View>

        <HomeLandscape />
        <Text style={styles.quote}>Disciplina hoje, conquistas amanhã. ❤️</Text>
      </ScrollView>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Planejar horário"
        onPress={() => setPlannerOpen(true)}
        style={({ pressed }) => [
          styles.fab,
          { left: padding.left, right: padding.right },
          pressed && styles.pressed,
        ]}>
        <AppIcon
          name={{ ios: 'plus', android: 'add', web: 'add' }}
          size={20}
          tintColor={BrandColors.white}
        />
        <Text style={styles.fabText}>Planejar horário</Text>
      </Pressable>

      <PlanSlotForm visible={plannerOpen} onClose={() => setPlannerOpen(false)} onSave={addSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  header: {
    paddingBottom: 8,
    overflow: 'hidden',
  },
  sun: {
    position: 'absolute',
    right: 28,
    top: 18,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: BrandColors.sun,
    opacity: 0.35,
  },
  birdOne: {
    position: 'absolute',
    right: 108,
    top: 36,
    width: 16,
    height: 4,
    borderRadius: 3,
    backgroundColor: BrandColors.bird,
    transform: [{ rotate: '-22deg' }],
  },
  birdTwo: {
    position: 'absolute',
    right: 92,
    top: 28,
    width: 12,
    height: 3,
    borderRadius: 3,
    backgroundColor: BrandColors.bird,
    transform: [{ rotate: '18deg' }],
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
    color: BrandColors.navy,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: BrandColors.textMuted,
  },
  calendarBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: BrandColors.creamButton,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  daysWrap: {
    height: 112,
    marginBottom: 4,
  },
  daysScroll: {
    flexGrow: 0,
  },
  days: {
    gap: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayChip: {
    width: 52,
    height: 96,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  dayWeek: {
    height: 16,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: BrandColors.navy,
    textAlign: 'center',
  },
  numberBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: BrandColors.creamButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBoxActive: {
    backgroundColor: BrandColors.navy,
  },
  dayNumber: {
    width: 44,
    height: 44,
    fontSize: 18,
    lineHeight: 44,
    fontWeight: '800',
    color: BrandColors.navy,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  dayNumberActive: {
    color: BrandColors.white,
  },
  dayMonth: {
    height: 16,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
    color: BrandColors.navy,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 12,
  },
  dayTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  todayBtn: {
    backgroundColor: BrandColors.creamButton,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  todayText: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navy,
  },
  summary: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EEF2F7',
    borderRadius: 20,
    padding: 14,
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BrandColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryBody: {
    flex: 1,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.navy,
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
    backgroundColor: BrandColors.white,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BrandColors.navy,
    borderRadius: 8,
  },
  percent: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  quote: {
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    color: BrandColors.navy,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    minHeight: 52,
    borderRadius: 26,
    backgroundColor: BrandColors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: BrandColors.navy,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  fabText: {
    color: BrandColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
