import { AppIcon } from '@/components/ui/app-icon';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Layout } from '@/constants/layout';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

export function SubjectDetail({ subject, visible, onClose, onToggleFavorite, onToggleDone }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  if (!subject) {
    return null;
  }

  const studying = subject.status === 'studying';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={[styles.icon, { backgroundColor: subject.color }]}>
              <AppIcon name={subject.icon} size={22} tintColor={colors.white} />
            </View>
            <View style={styles.texts}>
              <Text style={styles.title}>{subject.name}</Text>
              <Text style={styles.meta}>
                {subject.contents} {subject.contents === 1 ? 'conteúdo' : 'conteúdos'}
              </Text>
            </View>
          </View>

          <Text style={styles.hint}>
            Os conteúdos desta matéria entram aqui. Por enquanto a tela é só visual.
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={() => onToggleFavorite(subject.id)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <AppIcon
                name={{ ios: 'star', android: 'star', web: 'star' }}
                size={18}
                tintColor={subject.favorite ? colors.orange : colors.navy}
              />
              <Text style={styles.actionText}>{subject.favorite ? 'Favorita' : 'Favoritar'}</Text>
            </Pressable>
            <Pressable
              onPress={() => onToggleDone(subject.id)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <AppIcon
                name={{ ios: 'checkmark.circle', android: 'check-circle', web: 'check-circle' }}
                size={18}
                tintColor={colors.navy}
              />
              <Text style={styles.actionText}>{studying ? 'Marcar concluída' : 'Em estudo'}</Text>
            </Pressable>
          </View>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    icon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    texts: {
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: c.navy,
    },
    meta: {
      marginTop: 2,
      fontSize: 14,
      color: c.textMuted,
    },
    hint: {
      marginTop: 16,
      fontSize: 14,
      lineHeight: 21,
      color: c.textMuted,
    },
    actions: {
      marginTop: 20,
      gap: 10,
    },
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: c.white,
      borderRadius: Layout.buttonRadius,
      minHeight: Layout.buttonHeight,
      paddingHorizontal: 14,
    },
    actionText: {
      fontSize: 15,
      fontWeight: '600',
      color: c.navy,
    },
    pressed: {
      opacity: 0.8,
    },
  };
}
