import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeLandscape } from '@/components/home/home-landscape';
import { AddSubjectForm } from '@/components/materias/add-subject-form';
import { SubjectCard } from '@/components/materias/subject-card';
import { SubjectDetail } from '@/components/materias/subject-detail';
import { BackButton } from '@/components/navigation/back-button';
import { Layout } from '@/constants/layout';
import { SUBJECTS } from '@/constants/mock-subjects';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'studying', label: 'Em estudo' },
  { id: 'favorite', label: 'Favoritas' },
  { id: 'done', label: 'Concluídas' },
];

export default function MateriasScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return subjects.filter((item) => {
      if (term && !item.name.toLowerCase().includes(term)) {
        return false;
      }
      if (filter === 'studying') {
        return item.status === 'studying';
      }
      if (filter === 'favorite') {
        return item.favorite;
      }
      if (filter === 'done') {
        return item.status === 'done';
      }
      return true;
    });
  }, [filter, query, subjects]);

  function addSubject(subject) {
    setSubjects((current) => [
      {
        id: `s-${Date.now()}`,
        ...subject,
      },
      ...current,
    ]);
  }

  function toggleFavorite(id) {
    setSubjects((current) =>
      current.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)),
    );
    setSelected((current) =>
      current?.id === id ? { ...current, favorite: !current.favorite } : current,
    );
  }

  function toggleDone(id) {
    setSubjects((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'done' ? 'studying' : 'done' }
          : item,
      ),
    );
    setSelected((current) =>
      current?.id === id
        ? { ...current, status: current.status === 'done' ? 'studying' : 'done' }
        : current,
    );
  }

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          {
            paddingTop: padding.top,
            paddingLeft: padding.left,
            paddingRight: padding.right,
          },
        ]}>
        <View style={styles.sun} />
        <BackButton onPress={() => router.navigate('/(app)')} />
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Matérias</Text>
            <Text style={styles.subtitle}>
              Aqui estão todas as suas matérias. Escolha uma para ver o conteúdo.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Adicionar matéria"
            onPress={() => setAddOpen(true)}
            style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}>
            <AppIcon
              name={{ ios: 'plus', android: 'add', web: 'add' }}
              size={20}
              tintColor={colors.white}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: 24,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <AppIcon
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={18}
            tintColor={colors.tabInactive}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar matéria..."
            placeholderTextColor={colors.inputPlaceholder}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
          style={styles.filtersScroll}>
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFilter(item.id)}
                style={[styles.pill, active && styles.pillActive]}>
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.grid}>
          {visible.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} onPress={setSelected} />
          ))}
        </View>

        {visible.length === 0 ? (
          <Text style={styles.empty}>Nenhuma matéria encontrada.</Text>
        ) : null}

        <View style={styles.quote}>
          <View style={styles.quoteCactus} />
          <Text style={styles.quoteText}>“Disciplina hoje, conquistas amanhã.”</Text>
        </View>
        <View style={styles.quoteLine} />

        <HomeLandscape />
      </ScrollView>

      <AddSubjectForm visible={addOpen} onClose={() => setAddOpen(false)} onSave={addSubject} />
      <SubjectDetail
        subject={selected}
        visible={Boolean(selected)}
        onClose={() => setSelected(null)}
        onToggleFavorite={toggleFavorite}
        onToggleDone={toggleDone}
      />
    </View>
  );
}

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
    },
    header: {
      paddingBottom: 12,
      overflow: 'hidden',
    },
    sun: {
      position: 'absolute',
      right: 20,
      top: 8,
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: c.sun,
      opacity: 0.38,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    titleBlock: {
      flex: 1,
      zIndex: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      color: c.navy,
    },
    subtitle: {
      marginTop: 6,
      fontSize: 14,
      lineHeight: 20,
      color: c.textMuted,
    },
    addBtn: {
      zIndex: 1,
      width: Layout.iconButton,
      height: Layout.iconButton,
      borderRadius: Layout.iconRadius,
      backgroundColor: c.navy,
      alignItems: 'center',
      justifyContent: 'center',
    },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: c.white,
      borderRadius: Layout.fieldRadius,
      minHeight: Layout.fieldHeight,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: c.searchBorder,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      color: c.navy,
      paddingVertical: 10,
    },
    filtersScroll: {
      flexGrow: 0,
      marginTop: 14,
      marginBottom: 16,
    },
    filters: {
      gap: 8,
      paddingRight: 8,
    },
    pill: {
      minHeight: Layout.pillHeight,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: Layout.pillRadius,
      backgroundColor: c.white,
      borderWidth: 1,
      borderColor: c.inputBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pillActive: {
      backgroundColor: c.navy,
      borderColor: c.navy,
    },
    pillText: {
      fontSize: 13,
      fontWeight: '600',
      color: c.navy,
    },
    pillTextActive: {
      color: c.white,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 12,
    },
    empty: {
      marginTop: 24,
      textAlign: 'center',
      color: c.textMuted,
    },
    quote: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: c.quoteBg,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 14,
    },
    quoteCactus: {
      width: 16,
      height: 28,
      borderRadius: 8,
      backgroundColor: c.green,
    },
    quoteText: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      fontStyle: 'italic',
      color: c.navy,
    },
    quoteLine: {
      width: 72,
      height: 3,
      borderRadius: 2,
      backgroundColor: c.orange,
      alignSelf: 'center',
      marginTop: 8,
    },
    pressed: {
      opacity: 0.85,
    },
  };
}
