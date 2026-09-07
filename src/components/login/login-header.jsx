import { StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/brand/brand-logo';
import { useThemedStyles } from '@/hooks/use-theme';

export function LoginHeader() {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.container}>
      <BrandLogo />
      <Text style={styles.tagline}>
        Organize seus estudos.{'\n'}Construa seu futuro.
      </Text>
    </View>
  );
}

function makeStyles(c) {
  return {
    container: {
      alignItems: 'center',
      marginBottom: 28,
    },
    tagline: {
      marginTop: 12,
      fontSize: 15,
      lineHeight: 22,
      textAlign: 'center',
      color: c.navy,
      fontWeight: '500',
    },
  };
}
