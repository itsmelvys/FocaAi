import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BackButton } from '@/components/navigation/back-button';
import { useScreenPadding } from '@/hooks/use-screen-padding';
import { useThemedStyles } from '@/hooks/use-theme';

export function PlaceholderScreen({ title, description }) {
  const padding = useScreenPadding();
  const router = useRouter();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.screen}>
      <View
        style={{
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
        }}>
        <BackButton onPress={() => router.navigate('/(app)')} />
      </View>
      <View
        style={[
          styles.body,
          {
            paddingLeft: padding.left,
            paddingRight: padding.right,
            paddingBottom: padding.bottom,
          },
        ]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

function makeStyles(c) {
  return {
    screen: {
      flex: 1,
      backgroundColor: c.cream,
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: c.navy,
      textAlign: 'center',
    },
    description: {
      marginTop: 10,
      fontSize: 15,
      lineHeight: 22,
      color: c.textMuted,
      textAlign: 'center',
    },
  };
}
