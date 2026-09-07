import 'react-native-gesture-handler';
import { Stack } from 'expo-router';

import { AuthProvider } from '@/hooks/use-auth';
import { TasksProvider } from '@/hooks/use-tasks';
import { ThemeProvider } from '@/hooks/use-theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
