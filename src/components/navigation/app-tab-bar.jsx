import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';
import { Layout } from '@/constants/layout';
import { useScreenPadding } from '@/hooks/use-screen-padding';

const TABS = [
  {
    name: 'index',
    label: 'Início',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    name: 'tarefas',
    label: 'Tarefas',
    icon: { ios: 'checklist', android: 'assignment', web: 'assignment' },
  },
  {
    name: 'planner',
    label: 'Planner',
    icon: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  },
  {
    name: 'materias',
    label: 'Matérias',
    icon: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
  },
  {
    name: 'perfil',
    label: 'Perfil',
    icon: { ios: 'person.fill', android: 'person', web: 'person' },
  },
];

export function AppTabBar({ state, navigation }) {
  const padding = useScreenPadding();

  return (
    <View
      style={[
        styles.bar,
        {
          paddingTop: Layout.tabBarTop,
          paddingBottom: padding.bottom,
          paddingLeft: padding.insets.left + 8,
          paddingRight: padding.insets.right + 8,
        },
      ]}>
      {state.routes.map((route, index) => {
        const tab = TABS.find((item) => item.name === route.name);
        if (!tab) {
          return null;
        }

        const focused = state.index === index;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={styles.item}>
            <SymbolView
              name={tab.icon}
              size={22}
              tintColor={focused ? BrandColors.navy : BrandColors.tabInactive}
            />
            <Text style={[styles.label, focused && styles.labelActive]}>{tab.label}</Text>
            {focused ? <View style={styles.indicator} /> : <View style={styles.indicatorSpacer} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: BrandColors.white,
    borderTopWidth: 1,
    borderTopColor: '#F0EBE3',
  },
  item: {
    flex: 1,
    minHeight: Layout.tabItemMinHeight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: BrandColors.tabInactive,
  },
  labelActive: {
    color: BrandColors.navy,
    fontWeight: '700',
  },
  indicator: {
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: BrandColors.orange,
    marginTop: 2,
  },
  indicatorSpacer: {
    height: 5,
    marginTop: 2,
  },
});
