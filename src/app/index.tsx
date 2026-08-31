import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Detalhe decorativo no topo */}
      <View style={styles.sun}>
        <Text style={styles.sunText}>☀</Text>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.logo}>
          Foca<Text style={styles.logoHighlight}>Aí</Text>
        </Text>

        <Text style={styles.subtitle}>
          Organize seus estudos.{'\n'}
          Construa seu futuro.
        </Text>
      </View>

      {/* Decoração inferior */}
      <View style={styles.bottomDecoration}>

        <View style={styles.cactusArea}>
          <Text style={styles.cactus}>🌵</Text>
          <Text style={styles.cactusSmall}>🌵</Text>
        </View>

        <View style={styles.landscape}>

          {/* Casa */}
          <View style={styles.house}>
            <View style={styles.roof} />

            <View style={styles.houseBody}>
              <View style={styles.door} />
            </View>
          </View>

          {/* Igrejinha */}
          <View style={styles.church}>
            <View style={styles.churchRoof} />

            <View style={styles.churchBody}>
              <View style={styles.churchDoor} />
            </View>
          </View>

        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF9F1',
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#162A54',
    textAlign: 'center',
  },

  logoHighlight: {
    color: '#D86532',
  },

  subtitle: {
    marginTop: 18,
    fontSize: 17,
    textAlign: 'center',
    color: '#2B2B2B',
    lineHeight: 26,
  },

  // SOL DO TOPO
  sun: {
    position: 'absolute',
    top: 30,
    right: 25,
    zIndex: 1,
  },

  sunText: {
    fontSize: 55,
    color: '#F2A623',
  },

  // PARTE INFERIOR
  bottomDecoration: {
    width: '100%',
    height: 190,
    backgroundColor: '#183C6B',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    position: 'relative',
  },

  cactusArea: {
    position: 'absolute',
    left: 25,
    bottom: 70,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  cactus: {
    fontSize: 60,
  },

  cactusSmall: {
    fontSize: 38,
    marginLeft: -12,
  },

  landscape: {
    position: 'absolute',
    right: 25,
    bottom: 65,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  // CASA
  house: {
    alignItems: 'center',
    marginRight: 10,
  },

  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 32,
    borderRightWidth: 32,
    borderBottomWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D86532',
  },

  houseBody: {
    width: 55,
    height: 48,
    backgroundColor: '#F3D7A7',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  door: {
    width: 14,
    height: 25,
    backgroundColor: '#183C6B',
  },

  // IGREJINHA
  church: {
    alignItems: 'center',
  },

  churchRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 26,
    borderRightWidth: 26,
    borderBottomWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E99A32',
  },

  churchBody: {
    width: 45,
    height: 60,
    backgroundColor: '#F7E6C5',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  churchDoor: {
    width: 13,
    height: 28,
    backgroundColor: '#183C6B',
  },
});