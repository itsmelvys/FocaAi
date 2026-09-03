import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BackButton } from '@/components/navigation/back-button';
import { FestivalFlags } from '@/components/tarefas/festival-flags';
import { NovaTarefaForm } from '@/components/tarefas/nova-tarefa-form';
import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export default function NovaTarefaScreen() {
  const router = useRouter();
  const padding = useScreenPadding();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
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
    color: BrandColors.navy,
  },
  headerSpacer: {
    width: 72,
  },
});
