import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, Text, View } from 'react-native';

import { useTheme, useThemedStyles } from '@/hooks/use-theme';

const PRIORITY_LABEL = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

export function TaskCard({ task, onToggle }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const priorityLabel = PRIORITY_LABEL[task.priority];

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: task.done }}
      onPress={() => onToggle(task.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.accent, { backgroundColor: task.color }]} />

      <View style={styles.texts}>
        <Text style={[styles.title, task.done && styles.titleDone]}>{task.title}</Text>
        <Text style={styles.meta}>
          {task.subject}  ·  {task.date}
        </Text>
        {priorityLabel ? (
          <View style={styles.priorityWrap}>
            <Text style={[styles.priority, { color: task.color }]}>{priorityLabel}</Text>
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.checkbox,
          task.done && { backgroundColor: colors.navy, borderColor: colors.navy },
        ]}>
        {task.done ? (
          <AppIcon
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={12}
            tintColor={colors.white}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

function makeStyles(c) {
  return {
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.white,
      borderRadius: 18,
      overflow: 'hidden',
      minHeight: 84,
      paddingRight: 14,
      shadowColor: c.navy,
      shadowOpacity: 0.07,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    pressed: {
      opacity: 0.85,
    },
    accent: {
      width: 6,
      alignSelf: 'stretch',
      marginRight: 14,
    },
    texts: {
      flex: 1,
      paddingVertical: 14,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: c.navy,
    },
    titleDone: {
      textDecorationLine: 'line-through',
      opacity: 0.55,
    },
    meta: {
      marginTop: 4,
      fontSize: 13,
      color: c.textMuted,
    },
    priorityWrap: {
      marginTop: 8,
      alignSelf: 'flex-start',
      backgroundColor: c.creamButton,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    priority: {
      fontSize: 11,
      fontWeight: '700',
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: c.divider,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
}
