import { Tabs } from 'expo-router';

import { AppTabBar } from '@/components/navigation/app-tab-bar';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        const current = props.state.routes[props.state.index]?.name;
        if (current === 'nova-tarefa') {
          return null;
        }
        return <AppTabBar {...props} />;
      }}>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="tarefas" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="planner" options={{ title: 'Planner' }} />
      <Tabs.Screen name="materias" options={{ title: 'Matérias' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
      <Tabs.Screen name="nova-tarefa" options={{ href: null, title: 'Nova tarefa' }} />
    </Tabs>
  );
}
