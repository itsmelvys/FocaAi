import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function AppViewport({ children }) {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  if (Platform.OS !== 'web' || width <= 480) {
    return <View style={styles.fill}>{children}</View>;
  }

  const phoneWidth = Math.min(390, width - 32);
  const phoneHeight = Math.min(844, height - 32);

  return (
    <View style={[styles.page, { backgroundColor: colors.landscapeBlue, minHeight: height }]}>
      <View
        style={[
          styles.phone,
          {
            width: phoneWidth,
            height: phoneHeight,
            backgroundColor: colors.cream,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  page: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  phone: {
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 8,
    borderColor: '#0B1220',
  },
});
