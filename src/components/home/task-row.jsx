import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function TaskRow({ task, onToggle }) {
  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.iconBox, { backgroundColor: task.soft }]}>
        <SymbolView name={task.icon} size={18} tintColor={task.color} />
      </View>

      <View style={styles.texts}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subtitle}>{task.subtitle}</Text>
        <Text style={[styles.meta, { color: task.color }]}>{task.meta}</Text>
      </View>

      <View style={[styles.checkbox, task.done && { backgroundColor: task.color, borderColor: task.color }]}>
        {task.done ? (
          <SymbolView
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={12}
            tintColor={BrandColors.white}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
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
    color: BrandColors.navy,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: BrandColors.textMuted,
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
    borderColor: '#D7D2CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
