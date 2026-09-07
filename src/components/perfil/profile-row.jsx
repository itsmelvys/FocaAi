import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function ProfileRow({ icon, title, detail, isLast, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.iconWrap}>
        <AppIcon name={icon} size={20} tintColor={BrandColors.navy} />
      </View>
      <View style={[styles.texts, !isLast && styles.border]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <AppIcon
        name={{ ios: 'chevron.right', android: 'chevron-right', web: 'chevron-right' }}
        size={18}
        tintColor={BrandColors.tabInactive}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 10,
    minHeight: 68,
  },
  pressed: {
    opacity: 0.75,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
    marginRight: 10,
  },
  texts: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BrandColors.divider,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: BrandColors.navy,
  },
  detail: {
    marginTop: 2,
    fontSize: 13,
    color: BrandColors.textMuted,
  },
});
