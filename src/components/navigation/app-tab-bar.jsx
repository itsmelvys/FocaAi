import { AppIcon } from '@/components/ui/app-icon';
import { Pressable, Text, View } from 'react-native';

import { Layout } from '@/constants/layout';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useThemedStyles } from '@/hooks/use-theme';

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

function makeStyles(c) {
  return {
    bar: {
      flexDirection: 'row',
      backgroundColor: c.white,
      borderTopWidth: 1,
      borderTopColor: c.tabBarBorder,
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
      color: c.tabInactive,
    },
    labelActive: {
      color: c.navy,
      fontWeight: '700',
    },
    indicator: {
      width: 18,
      height: 3,
      borderRadius: 2,
      backgroundColor: c.orange,
      marginTop: 2,
    },
    indicatorSpacer: {
      height: 5,
      marginTop: 2,
    },
  };
}

export function AppTabBar({ state, navigation }) {
  const padding = useScreenPadding();
  const styles = useThemedStyles(makeStyles);

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
            <AppIcon
              name={tab.icon}
              size={22}
              tintColor={focused ? styles.labelActive.color : styles.label.color}
            />
            <Text style={[styles.label, focused && styles.labelActive]}>{tab.label}</Text>
            {focused ? <View style={styles.indicator} /> : <View style={styles.indicatorSpacer} />}
          </Pressable>
        );
      })}
    </View>
  );
}
