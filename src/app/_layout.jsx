import 'react-native-gesture-handler';
import { Stack } from 'expo-router';

import { AuthProvider } from '@/hooks/use-auth';
import { TasksProvider } from '@/hooks/use-tasks';

export default function RootLayout() {
  return (
    <AuthProvider>
      <TasksProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        />
      </TasksProvider>
    </AuthProvider>
  );
}
