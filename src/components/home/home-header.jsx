import { useRouter } from 'expo-router';
import { AppIcon } from '@/components/ui/app-icon';
import { Image, Pressable, Text, View } from 'react-native';

import { BackButton } from '@/components/navigation/back-button';
import { useAuth } from '@/hooks/use-auth';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useTheme, useThemedStyles } from '@/hooks/use-theme';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Bom dia';
  }
  if (hour < 18) {
    return 'Boa tarde';
  }
  return 'Boa noite';
}

export function HomeHeader({ onBellPress }) {
  const padding = useScreenPadding();
  const router = useRouter();
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const firstName = user?.name?.split(' ')[0] || 'Letícia';

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
        },
      ]}>
      <View style={styles.sun} />
      <View style={styles.cloud} />
      <BackButton onPress={() => router.replace('/login')} />

      <View style={styles.row}>
        <Pressable
          onPress={() => router.navigate('/(app)/perfil')}
          style={({ pressed }) => [styles.identity, pressed && styles.pressed]}>
          <View style={styles.avatar}>
            {user?.photoUri ? (
              <Image source={{ uri: user.photoUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarLetter}>{firstName.charAt(0).toUpperCase()}</Text>
            )}
          </View>
          <View style={styles.texts}>
            <Text style={styles.hello}>
              {greeting()}, {firstName}!
            </Text>
            <Text style={styles.subtitle}>Vamos focar nos estudos hoje?</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={onBellPress}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Notificações"
          style={({ pressed }) => [styles.bell, pressed && styles.pressed]}>
          <AppIcon
            name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
            size={22}
            tintColor={colors.navy}
          />
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(c) {
  return {
    wrap: {
      paddingBottom: 8,
      overflow: 'hidden',
    },
    sun: {
      position: 'absolute',
      right: 28,
      top: 10,
      width: 78,
      height: 78,
      borderRadius: 39,
      backgroundColor: c.sun,
      opacity: 0.32,
    },
    cloud: {
      position: 'absolute',
      right: 96,
      top: 28,
      width: 48,
      height: 18,
      borderRadius: 10,
      backgroundColor: c.cloud,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      zIndex: 1,
    },
    identity: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: c.avatarBg,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    avatarImage: {
      width: 48,
      height: 48,
    },
    avatarLetter: {
      fontSize: 20,
      fontWeight: '800',
      color: c.navy,
    },
    texts: {
      flex: 1,
      paddingRight: 4,
    },
    hello: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '800',
      color: c.navy,
    },
    subtitle: {
      marginTop: 2,
      fontSize: 14,
      lineHeight: 20,
      color: c.textMuted,
    },
    bell: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: c.creamButton,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: {
      opacity: 0.7,
    },
  };
}
