import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function TaskCard({ task, onToggle }) {
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
          task.done && { backgroundColor: BrandColors.navy, borderColor: BrandColors.navy },
        ]}>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 76,
    paddingRight: 14,
    shadowColor: BrandColors.navy,
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
    color: BrandColors.navy,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.55,
  },
  meta: {
    marginTop: 4,
    fontSize: 13,
    color: BrandColors.textMuted,
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
