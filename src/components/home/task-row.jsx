import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemedStyles } from '@/hooks/use-theme';

export function TaskRow({ task, onToggle, isLast }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: task.done }}
      onPress={() => onToggle(task.id)}
      style={({ pressed }) => [styles.row, !isLast && styles.rowBorder, pressed && styles.pressed]}>
      <View style={[styles.iconBox, { backgroundColor: task.soft }]}>
        <AppIcon name={task.icon} size={18} tintColor={task.color} />
      </View>

      <View style={styles.texts}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subtitle}>{task.subtitle}</Text>
        <Text style={[styles.meta, { color: task.color }]}>{task.meta}</Text>
      </View>

      <View
        style={[
          styles.checkbox,
          task.done && { backgroundColor: task.color, borderColor: task.color },
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
    },
    rowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: c.progressTrack,
    },
    pressed: {
      opacity: 0.75,
    },
    iconBox: {
      width: 42,
      height: 42,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    texts: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: c.navy,
    },
    subtitle: {
      marginTop: 2,
      fontSize: 13,
      color: c.textMuted,
    },
    meta: {
      marginTop: 4,
      fontSize: 12,
      fontWeight: '600',
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
