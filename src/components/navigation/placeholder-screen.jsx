import { StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/brand';
import { useScreenPadding } from '@/hooks/use-screen-padding';

export function PlaceholderScreen({ title, description }) {
  const padding = useScreenPadding();

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: padding.top,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingBottom: padding.bottom,
        },
      ]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BrandColors.cream,
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
