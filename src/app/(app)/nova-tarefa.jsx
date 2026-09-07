import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BackButton } from '@/components/navigation/back-button';
import { FestivalFlags } from '@/components/tarefas/festival-flags';
import { NovaTarefaForm } from '@/components/tarefas/nova-tarefa-form';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useThemedStyles } from '@/hooks/use-theme';

export default function NovaTarefaScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.screen}>
      <FestivalFlags />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: padding.top,
            paddingLeft: padding.left,
            paddingRight: padding.right,
            paddingBottom: padding.bottom + 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <BackButton onPress={() => router.navigate('/(app)/tarefas')} />
            <Text style={styles.title}>Nova tarefa</Text>
            <View style={styles.headerSpacer} />
          </View>
          <NovaTarefaForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
    },
    flex: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: c.navy,
    },
    headerSpacer: {
      width: 72,
    },
  };
}
