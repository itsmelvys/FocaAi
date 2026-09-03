import { StyleSheet, View } from 'react-native';

const FLAGS = ['#3BA55C', '#E67E22', '#3B82F6', '#1A2B4C', '#E67E22', '#3BA55C', '#7B61FF'];

export function FestivalFlags() {
  return (
    <View style={styles.row} pointerEvents="none">
      {FLAGS.map((color, index) => (
        <View
          key={`${color}-${index}`}
          style={[
            styles.flag,
            { borderTopColor: color, transform: [{ rotate: index % 2 === 0 ? '-8deg' : '8deg' }] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    top: 8,
    right: 12,
    flexDirection: 'row',
    gap: 2,
    zIndex: 1,
  },
  flag: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
