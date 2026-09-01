import { StyleSheet, Text, View } from 'react-native';

import { BrandLogo } from '@/components/brand/brand-logo';
import { BrandColors } from '@/constants/brand';

export function LoginHeader() {
  return (
    <View style={styles.container}>
      <BrandLogo />
      <Text style={styles.tagline}>
        Organize seus estudos.{'\n'}Construa seu futuro.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
  tagline: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: BrandColors.navy,
    fontWeight: '500',
  },
});
