import { useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme, useThemedStyles } from '@/hooks/use-theme';

const COLORS = ['#3BA55C', '#E67E22', '#7B61FF', '#14B8A6', '#EAB308', '#EC4899', '#3B82F6', '#A78BFA'];

export function AddSubjectForm({ visible, onClose, onSave }) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    Keyboard.dismiss();
    onSave({
      name: trimmed,
      color,
      contents: 0,
      status: 'studying',
      favorite: false,
      icon: { ios: 'book', android: 'menu-book', web: 'menu-book' },
    });
    setName('');
    setColor(COLORS[0]);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <Text style={styles.title}>Adicionar matéria</Text>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ex.: Filosofia"
            placeholderTextColor={colors.inputPlaceholder}
            style={styles.input}
          />
          <Text style={styles.label}>Cor</Text>
          <View style={styles.swatches}>
            {COLORS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setColor(item)}
                style={[styles.swatch, { backgroundColor: item }, color === item && styles.swatchActive]}
              />
            ))}
          </View>
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [styles.save, pressed && styles.pressed, !name.trim() && styles.saveDisabled]}>
            <Text style={styles.saveText}>Salvar matéria</Text>
          </Pressable>
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
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: c.navy,
      marginBottom: 16,
    },
    label: {
      marginTop: 12,
      marginBottom: 8,
      fontSize: 13,
      fontWeight: '700',
      color: c.navy,
    },
    input: {
      backgroundColor: c.white,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.inputBorder,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: c.navy,
    },
    swatches: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    swatch: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    swatchActive: {
      borderWidth: 3,
      borderColor: c.navy,
    },
    save: {
      marginTop: 20,
      backgroundColor: c.navy,
      borderRadius: 16,
      minHeight: 52,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveDisabled: {
      opacity: 0.45,
    },
    saveText: {
      color: c.white,
      fontSize: 16,
      fontWeight: '700',
    },
    pressed: {
      opacity: 0.85,
    },
  };
}
