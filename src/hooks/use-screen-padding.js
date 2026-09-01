import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Layout } from '@/constants/layout';

export function useScreenPadding() {
  const insets = useSafeAreaInsets();

  return {
    insets,
    top: insets.top + Layout.afterStatusBar,
    right: Math.max(insets.right, 0) + Layout.gutter,
    bottom: insets.bottom + Layout.afterHomeIndicator,
    left: Math.max(insets.left, 0) + Layout.gutter,
  };
}
