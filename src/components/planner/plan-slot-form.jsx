import { useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BrandColors } from '@/constants/brand';
import { PLANNER_DURATIONS, PLANNER_TIMES } from '@/constants/mock-planner';
import { SUBJECTS } from '@/constants/mock-tasks';

export function PlanSlotForm({ visible, onClose, onSave }) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(PLANNER_TIMES[1]);
  const [duration, setDuration] = useState(PLANNER_DURATIONS[1]);

  function reset() {
    setSubject(SUBJECTS[0]);
    setTitle('');
    setTime(PLANNER_TIMES[1]);
    setDuration(PLANNER_DURATIONS[1]);
  }

  function handleSave() {
    Keyboard.dismiss();
    onSave({
      subject: subject.name,
      subtitle: title.trim() || 'Bloco de estudo',
      time,
      duration,
      color: subject.color,
    });
    reset();
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <Text style={styles.title}>Planejar horário</Text>
          <Text style={styles.label}>Matéria</Text>
          <View style={styles.chips}>
            {SUBJECTS.map((item) => {
              const active = subject.name === item.name;
              return (
                <Pressable
                  key={item.name}
                  onPress={() => setSubject(item)}
                  style={[styles.chip, active && { backgroundColor: item.color }]}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.name}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>O que vai estudar</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: Lista de exercícios"
            placeholderTextColor={BrandColors.inputPlaceholder}
            style={styles.input}
          />

          <Text style={styles.label}>Horário</Text>
          <View style={styles.chips}>
            {PLANNER_TIMES.map((item) => {
              const active = time === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setTime(item)}
                  style={[styles.chip, active && styles.chipActive]}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Duração</Text>
          <View style={styles.chips}>
            {PLANNER_DURATIONS.map((item) => {
              const active = duration === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setDuration(item)}
                  style={[styles.chip, active && styles.chipActive]}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable onPress={handleSave} style={({ pressed }) => [styles.save, pressed && styles.pressed]}>
            <Text style={styles.saveText}>Salvar no dia</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 43, 76, 0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: BrandColors.cream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navy,
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navy,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: BrandColors.creamButton,
  },
  chipActive: {
    backgroundColor: BrandColors.navy,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.navy,
  },
  chipTextActive: {
    color: BrandColors.white,
  },
  input: {
    backgroundColor: BrandColors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BrandColors.inputBorder,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: BrandColors.navy,
  },
  save: {
    marginTop: 20,
    backgroundColor: BrandColors.navy,
    borderRadius: 16,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: BrandColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
