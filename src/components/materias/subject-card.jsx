import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemedStyles } from '@/hooks/use-theme';

export function SubjectCard({ subject, onPress }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={subject.name}
      onPress={() => onPress(subject)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.icon, { backgroundColor: subject.color }]}>
        <AppIcon name={subject.icon} size={18} tintColor={colors.white} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {subject.name}
        </Text>
        <Text style={styles.meta}>
          {subject.contents} {subject.contents === 1 ? 'conteúdo' : 'conteúdos'}
        </Text>
      </View>
      <AppIcon
        name={{ ios: 'chevron.right', android: 'chevron-right', web: 'chevron-right' }}
        size={18}
        tintColor={colors.tabInactive}
      />
    </Pressable>
  );
}

function makeStyles(c) {
  return {
    card: {
      width: '48.5%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.white,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      gap: 8,
      shadowColor: c.navy,
      shadowOpacity: 0.07,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    pressed: {
      opacity: 0.85,
    },
    icon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    texts: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      fontSize: 13,
      fontWeight: '800',
      color: c.navy,
    },
    meta: {
      marginTop: 2,
      fontSize: 11,
      color: c.textMuted,
    },
  };
}
