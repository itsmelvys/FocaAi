import { AppIcon } from '@/components/ui/app-icon';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { HomeLandscape } from '@/components/home/home-landscape';
import { AddSubjectForm } from '@/components/materias/add-subject-form';
import { SubjectCard } from '@/components/materias/subject-card';
import { SubjectDetail } from '@/components/materias/subject-detail';
import { BackButton } from '@/components/navigation/back-button';
import { BrandColors } from '@/constants/brand';
import { SUBJECTS } from '@/constants/mock-subjects';
import { useScreenPadding } from '@/hooks/use-screen-padding';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'studying', label: 'Em estudo' },
  { id: 'favorite', label: 'Favoritas' },
  { id: 'done', label: 'Concluídas' },
];

export default function MateriasScreen() {
  const router = useRouter();
  const padding = useScreenPadding();
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
              size={16}
              tintColor={BrandColors.white}
            />
            <Text style={styles.addText}>Adicionar{'\n'}matéria</Text>
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
            tintColor={BrandColors.tabInactive}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar matéria..."
            placeholderTextColor={BrandColors.inputPlaceholder}
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
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
    backgroundColor: BrandColors.sun,
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
    color: BrandColors.navy,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: BrandColors.textMuted,
  },
  addBtn: {
    zIndex: 1,
    backgroundColor: BrandColors.navy,
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 92,
  },
  addText: {
    marginTop: 2,
    color: BrandColors.white,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: BrandColors.white,
    borderRadius: 24,
    minHeight: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EFEAE2',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: BrandColors.navy,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: '#E5E0D8',
  },
  pillActive: {
    backgroundColor: BrandColors.navy,
    borderColor: BrandColors.navy,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.navy,
  },
  pillTextActive: {
    color: BrandColors.white,
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
    color: BrandColors.textMuted,
  },
  quote: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F3E6D4',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  quoteCactus: {
    width: 16,
    height: 28,
    borderRadius: 8,
    backgroundColor: BrandColors.green,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    color: BrandColors.navy,
  },
  quoteLine: {
    width: 72,
    height: 3,
    borderRadius: 2,
    backgroundColor: BrandColors.orange,
    alignSelf: 'center',
    marginTop: 8,
  },
  pressed: {
    opacity: 0.85,
  },
});
