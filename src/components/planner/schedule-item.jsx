import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function ScheduleItem({ item, isLast, onToggle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.time}>{item.time}</Text>

      <View style={styles.rail}>
        <View style={[styles.dot, { backgroundColor: item.color }]} />
        {isLast ? null : <View style={styles.line} />}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => onToggle(item.id)}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.texts}>
          <Text style={[styles.subject, { color: item.color }, item.done && styles.done]}>
            {item.subject}
          </Text>
          <Text style={[styles.subtitle, item.done && styles.done]}>{item.subtitle}</Text>
          <View style={styles.chip}>
            <AppIcon
              name={{ ios: 'clock', android: 'schedule', web: 'schedule' }}
              size={12}
              tintColor={BrandColors.textMuted}
            />
            <Text style={styles.chipText}>{item.duration}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <AppIcon
            name={{ ios: 'ellipsis', android: 'more-vert', web: 'more-vert' }}
            size={18}
            tintColor={BrandColors.tabInactive}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 92,
  },
  time: {
    width: 48,
    paddingTop: 18,
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navy,
  },
  rail: {
    width: 18,
    alignItems: 'center',
    paddingTop: 22,
    alignSelf: 'stretch',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: BrandColors.divider,
    marginTop: 4,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 8,
    marginBottom: 12,
    shadowColor: BrandColors.navy,
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  texts: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: BrandColors.textMuted,
  },
  done: {
    textDecorationLine: 'line-through',
    opacity: 0.55,
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: BrandColors.creamButton,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: BrandColors.textMuted,
  },
  menu: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
