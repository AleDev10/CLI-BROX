import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Lists  from "../components/lists";


export default function Index() {
  return (
    <View style={styles.caixa_main}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>👋</Text>
        <Text style={styles.titulo}>Olá LAKE,</Text>
        <Text style={styles.subtitulo}>pronto para organizar as tarefas.</Text>
      </View>

      {/* Barra de ações */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.btnSincronizar}>
          <Text style={styles.btnSincronizarText}>Sincronizar</Text>
        </TouchableOpacity>
        <Text style={styles.listasText}>0 Listas</Text>
        <TextInput
          style={styles.pesquisa}
          placeholder="Pesquisa"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Área das listas */}
      <View style={styles.listasArea}>{/* Aqui vão as listas */}
        <Lists />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa_main: {
    flex: 1,
    backgroundColor: "#888", // cor de fundo geral
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  emoji: {
    fontSize: 22,
    marginRight: 4,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    marginRight: 4,
  },
  subtitulo: {
    color: "#fff",
    fontSize: 14,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 6,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#c26cff",
  },
  btnSincronizar: {
    backgroundColor: "#c26cff",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  btnSincronizarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listasText: {
    color: "#fff",
    marginRight: 8,
  },
  pesquisa: {
    flex: 1,
    backgroundColor: "#444",
    borderRadius: 6,
    paddingHorizontal: 10,
    color: "#fff",
    height: 32,
    fontSize: 12
  },
  listasArea: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 12,
    marginTop: 8,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
