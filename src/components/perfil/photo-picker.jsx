import * as ImagePicker from 'expo-image-picker';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

const OPTIONS = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

export function PhotoPicker({ visible, hasPhoto, onClose, onPicked, onRemove, onError }) {
  const { colors } = useTheme();

  async function pickFromLibrary() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      onError?.('Permita o acesso às fotos para escolher a imagem de perfil.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(OPTIONS);
    if (result.canceled) {
      return;
    }

    const uri = result.assets?.[0]?.uri;
    if (uri) {
      onPicked(uri);
      onClose();
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      onError?.('Permita o acesso à câmera para tirar a foto de perfil.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync(OPTIONS);
    if (result.canceled) {
      return;
    }

    const uri = result.assets?.[0]?.uri;
    if (uri) {
      onPicked(uri);
      onClose();
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: colors.cream }]}>
          <Text style={[styles.title, { color: colors.navy }]}>Foto de perfil</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Escolha uma imagem da galeria ou tire uma foto agora.
          </Text>

          <Pressable
            onPress={pickFromLibrary}
            style={[styles.option, { backgroundColor: colors.navy }]}>
            <Text style={[styles.optionText, { color: colors.white }]}>Escolher da galeria</Text>
          </Pressable>

          <Pressable
            onPress={takePhoto}
            style={[
              styles.option,
              { backgroundColor: colors.white, borderColor: colors.inputBorder, borderWidth: 1 },
            ]}>
            <Text style={[styles.optionText, { color: colors.navy }]}>Tirar foto</Text>
          </Pressable>

          {hasPhoto ? (
            <Pressable
              onPress={() => {
                onRemove();
                onClose();
              }}
              style={[styles.option, { backgroundColor: colors.priorityHighBg }]}>
              <Text style={[styles.optionText, { color: colors.priorityHigh }]}>Remover foto</Text>
            </Pressable>
          ) : null}
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
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
