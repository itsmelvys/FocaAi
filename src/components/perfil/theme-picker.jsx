import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Layout } from '@/constants/layout';
import { THEME_OPTIONS, useTheme } from '@/hooks/use-theme';

export function ThemePicker({ visible, onClose }) {
  const { mode, setTheme, colors } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: colors.cream }]}>
          <Text style={[styles.title, { color: colors.navy }]}>Tema do aplicativo</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Escolha entre o modo claro e o noturno.
          </Text>
          {THEME_OPTIONS.map((option) => {
            const active = mode === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => {
                  setTheme(option.id);
                  onClose();
                }}
                style={[
                  styles.option,
                  {
                    backgroundColor: active ? colors.navy : colors.white,
                    borderColor: active ? colors.navy : colors.inputBorder,
                  },
                ]}>
                <Text style={[styles.optionText, { color: active ? colors.white : colors.navy }]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  option: {
    minHeight: Layout.buttonHeight,
    borderRadius: Layout.buttonRadius,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
