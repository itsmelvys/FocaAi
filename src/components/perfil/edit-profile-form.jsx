import { useEffect, useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useThemedStyles } from '@/hooks/use-theme';

export function EditProfileForm({ visible, profile, onClose, onSave }) {
  const styles = useThemedStyles(makeStyles);
  const [name, setName] = useState(profile?.name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [school, setSchool] = useState(profile?.school || '');
  const [course, setCourse] = useState(profile?.course || '');

  useEffect(() => {
    if (visible && profile) {
      setName(profile.name || '');
      setBio(profile.bio || '');
      setFullName(profile.fullName || '');
      setSchool(profile.school || '');
      setCourse(profile.course || '');
    }
  }, [profile, visible]);

  function handleSave() {
    Keyboard.dismiss();
    onSave({
      name: name.trim() || profile.name,
      bio: bio.trim(),
      fullName: fullName.trim(),
      school: school.trim(),
      course: course.trim(),
    });
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <Text style={styles.title}>Editar perfil</Text>
          <Text style={styles.label}>Nome</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <Text style={styles.label}>Nome completo</Text>
          <TextInput value={fullName} onChangeText={setFullName} style={styles.input} />
          <Text style={styles.label}>Bio</Text>
          <TextInput value={bio} onChangeText={setBio} style={styles.input} />
          <Text style={styles.label}>Instituição</Text>
          <TextInput value={school} onChangeText={setSchool} style={styles.input} />
          <Text style={styles.label}>Curso</Text>
          <TextInput value={course} onChangeText={setCourse} style={styles.input} />
          <Pressable onPress={handleSave} style={({ pressed }) => [styles.save, pressed && styles.pressed]}>
            <Text style={styles.saveText}>Salvar</Text>
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
      marginBottom: 8,
    },
    label: {
      marginTop: 12,
      marginBottom: 6,
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
    save: {
      marginTop: 20,
      backgroundColor: c.navy,
      borderRadius: 16,
      minHeight: 52,
      alignItems: 'center',
      justifyContent: 'center',
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
