import { useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Layout } from '@/constants/layout';
import { PLANNER_DURATIONS, PLANNER_TIMES } from '@/constants/mock-planner';
import { SUBJECTS } from '@/constants/mock-tasks';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

export function PlanSlotForm({ visible, onClose, onSave }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
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
            placeholderTextColor={colors.inputPlaceholder}
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

function makeStyles(c) {
  return {
    backdrop: {
      flex: 1,
      backgroundColor: c.overlay,
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: c.cream,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 24,
      paddingBottom: 32,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: c.navy,
      marginBottom: 16,
    },
    label: {
      marginTop: 12,
      marginBottom: 8,
      fontSize: 13,
      fontWeight: '700',
      color: c.navy,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      minHeight: Layout.pillHeight,
      paddingHorizontal: 12,
      borderRadius: Layout.pillRadius,
      backgroundColor: c.creamButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipActive: {
      backgroundColor: c.navy,
    },
    chipText: {
      fontSize: 13,
      fontWeight: '600',
      color: c.navy,
    },
    chipTextActive: {
      color: c.white,
    },
    input: {
      backgroundColor: c.white,
      borderRadius: Layout.fieldRadius,
      borderWidth: 1,
      borderColor: c.inputBorder,
      paddingHorizontal: 14,
      minHeight: Layout.fieldHeight,
      fontSize: 15,
      color: c.navy,
    },
    save: {
      marginTop: 20,
      backgroundColor: c.navy,
      borderRadius: Layout.buttonRadius,
      minHeight: Layout.buttonHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveText: {
      color: c.white,
      fontSize: 16,
      fontWeight: '700',
    },
    pressed: {
      opacity: 0.85,
    },
  };
}
