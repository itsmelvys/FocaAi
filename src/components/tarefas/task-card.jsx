import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemedStyles } from '@/hooks/use-theme';

export function TaskCard({ task, onToggle }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

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
      borderRadius: 16,
      overflow: 'hidden',
      minHeight: 76,
      paddingRight: 14,
      shadowColor: c.navy,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
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
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: c.divider,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
}
