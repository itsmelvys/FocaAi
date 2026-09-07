import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { SUBJECTS } from '@/constants/mock-tasks';
import { useTasks } from '@/hooks/use-tasks';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatShortDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

function upcomingDates(count = 14) {
  const start = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export function NovaTarefaForm() {
  const router = useRouter();
  const { addTask } = useTasks();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('media');
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const dates = useMemo(() => upcomingDates(), []);

  const priorities = useMemo(
    () => [
      { id: 'baixa', label: 'Baixa', bg: colors.priorityLowBg, color: colors.priorityLow },
      { id: 'media', label: 'Média', bg: colors.priorityMidBg, color: colors.priorityMid },
      { id: 'alta', label: 'Alta', bg: colors.priorityHighBg, color: colors.priorityHigh },
    ],
    [colors],
  );

  function handleSave() {
    if (!title.trim() || !subject) {
      return;
    }

    Keyboard.dismiss();
    addTask({
      title: title.trim(),
      subject: subject.name,
      date: formatShortDate(dueDate),
      color: subject.color,
      description: description.trim(),
      priority,
    });
    router.navigate('/(app)/tarefas');
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Matéria</Text>
      <Pressable onPress={() => setSubjectOpen(true)} style={styles.field}>
        <Text style={[styles.fieldText, !subject && styles.placeholder]}>
          {subject ? subject.name : 'Selecione a matéria'}
        </Text>
        <AppIcon
          name={{ ios: 'chevron.down', android: 'expand_more', web: 'expand_more' }}
          size={18}
          tintColor={colors.navy}
        />
      </Pressable>

      <Text style={styles.label}>Título da tarefa</Text>
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder="Ex: Lista de exercícios"
          placeholderTextColor={colors.inputPlaceholder}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <Text style={styles.label}>Descrição (opcional)</Text>
      <View style={[styles.field, styles.textArea]}>
        <TextInput
          style={[styles.input, styles.textAreaInput]}
          placeholder="Detalhes sobre a tarefa..."
          placeholderTextColor={colors.inputPlaceholder}
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />
      </View>

      <Text style={styles.label}>Data de entrega</Text>
      <Pressable onPress={() => setDateOpen(true)} style={styles.field}>
        <AppIcon
          name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }}
          size={18}
          tintColor={colors.navy}
        />
        <Text style={styles.fieldText}>{formatDate(dueDate)}</Text>
      </Pressable>

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.priorityRow}>
        {priorities.map((item) => {
          const active = priority === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setPriority(item.id)}
              style={[
                styles.priorityChip,
                { backgroundColor: item.bg },
                active && styles.priorityActive,
              ]}>
              <Text style={[styles.priorityText, { color: item.color }]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleSave}
        style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
        <Text style={styles.saveText}>Salvar tarefa</Text>
      </Pressable>

      <Modal transparent visible={subjectOpen} animationType="fade" onRequestClose={() => setSubjectOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setSubjectOpen(false)}>
          <View style={styles.sheet}>
            {SUBJECTS.map((item) => (
              <Pressable
                key={item.name}
                onPress={() => {
                  setSubject(item);
                  setSubjectOpen(false);
                }}
                style={styles.sheetItem}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={styles.sheetText}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Modal transparent visible={dateOpen} animationType="fade" onRequestClose={() => setDateOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setDateOpen(false)}>
          <View style={styles.sheet}>
            <ScrollView style={styles.dateList}>
              {dates.map((date) => (
                <Pressable
                  key={date.toISOString()}
                  onPress={() => {
                    setDueDate(date);
                    setDateOpen(false);
                  }}
                  style={styles.sheetItem}>
                  <Text style={styles.sheetText}>{formatDate(date)}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function makeStyles(c) {
  return {
    form: {
      backgroundColor: c.white,
      borderRadius: 20,
      padding: 16,
      gap: 8,
    },
    label: {
      marginTop: 8,
      fontSize: 14,
      fontWeight: '700',
      color: c.navy,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.inputBorder,
      borderRadius: 12,
      minHeight: 48,
      paddingHorizontal: 12,
      gap: 8,
    },
    textArea: {
      alignItems: 'flex-start',
      minHeight: 96,
      paddingVertical: 10,
    },
    fieldText: {
      flex: 1,
      fontSize: 15,
      color: c.navy,
    },
    placeholder: {
      color: c.inputPlaceholder,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: c.navy,
      paddingVertical: 10,
    },
    textAreaInput: {
      minHeight: 76,
    },
    priorityRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 4,
    },
    priorityChip: {
      flex: 1,
      minHeight: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    priorityActive: {
      borderWidth: 2,
      borderColor: c.navy,
    },
    priorityText: {
      fontSize: 14,
      fontWeight: '700',
    },
    saveButton: {
      marginTop: 16,
      backgroundColor: c.navy,
      borderRadius: 14,
      minHeight: 52,
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
    overlay: {
      flex: 1,
      backgroundColor: c.overlay,
      justifyContent: 'center',
      padding: 24,
    },
    sheet: {
      backgroundColor: c.white,
      borderRadius: 16,
      paddingVertical: 8,
      maxHeight: 360,
    },
    dateList: {
      maxHeight: 320,
    },
    sheetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    sheetText: {
      fontSize: 15,
      color: c.navy,
      fontWeight: '600',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
  };
}
