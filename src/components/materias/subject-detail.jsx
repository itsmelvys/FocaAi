import { AppIcon } from '@/components/ui/app-icon';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

export function SubjectDetail({ subject, visible, onClose, onToggleFavorite, onToggleDone }) {
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
              <AppIcon name={subject.icon} size={22} tintColor={BrandColors.white} />
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
                tintColor={subject.favorite ? BrandColors.orange : BrandColors.navy}
              />
              <Text style={styles.actionText}>{subject.favorite ? 'Favorita' : 'Favoritar'}</Text>
            </Pressable>
            <Pressable
              onPress={() => onToggleDone(subject.id)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <AppIcon
                name={{ ios: 'checkmark.circle', android: 'check-circle', web: 'check-circle' }}
                size={18}
                tintColor={BrandColors.navy}
              />
              <Text style={styles.actionText}>{studying ? 'Marcar concluída' : 'Em estudo'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 43, 76, 0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: BrandColors.cream,
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
    color: BrandColors.navy,
  },
  meta: {
    marginTop: 2,
    fontSize: 14,
    color: BrandColors.textMuted,
  },
  hint: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: BrandColors.textMuted,
  },
  actions: {
    marginTop: 20,
    gap: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: BrandColors.white,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: BrandColors.navy,
  },
  pressed: {
    opacity: 0.8,
  },
});
