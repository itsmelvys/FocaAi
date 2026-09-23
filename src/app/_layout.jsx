import { Stack } from 'expo-router';
import 'react-native-gesture-handler';

import { AppViewport } from '@/components/navigation/app-viewport';
import { AuthProvider } from '@/hooks/use-auth';
import { TasksProvider } from '@/hooks/use-tasks';
import { ThemeProvider } from '@/hooks/use-theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppViewport>
        <AuthProvider>
          <TasksProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: 'fade',
                contentStyle: { flex: 1 },
              }}
            />
          </TasksProvider>
        </AuthProvider>
      </AppViewport>
    </ThemeProvider>
  );
}
