import { useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BrandColors } from '@/constants/brand';

const COLORS = ['#3BA55C', '#E67E22', '#7B61FF', '#14B8A6', '#EAB308', '#EC4899', '#3B82F6', '#A78BFA'];

export function AddSubjectForm({ visible, onClose, onSave }) {
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
            placeholderTextColor={BrandColors.inputPlaceholder}
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.navy,
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.navy,
  },
  input: {
    backgroundColor: BrandColors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BrandColors.inputBorder,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: BrandColors.navy,
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
    borderColor: BrandColors.navy,
  },
  save: {
    marginTop: 20,
    backgroundColor: BrandColors.navy,
    borderRadius: 16,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveDisabled: {
    opacity: 0.45,
  },
  saveText: {
    color: BrandColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
