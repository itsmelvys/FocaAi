import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BackButton } from '@/components/navigation/back-button';
import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export function PlaceholderScreen({ title, description }) {
  const padding = useScreenPadding();
  const router = useRouter();

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: BrandColors.navy,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: BrandColors.textMuted,
    textAlign: 'center',
  },
});
