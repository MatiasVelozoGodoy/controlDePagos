import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
    <View style={styles.container}>
      <Text style={styles.text}>Fecha</Text>

      <Text style={styles.text}>IC</Text>
      <TextInput
      style={styles.input}
      placeholder="IC"
      placeholderTextColor="#fffa"
      keyboardType="numeric"
      />

      <Text style={styles.text}>Monto</Text>
      <TextInput
      style={styles.input}
      placeholder="IC"
      placeholderTextColor="#fffa"
      keyboardType="numeric"
      />

      <Text style={styles.text}>Medio de Pago</Text>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScrollView:{
        flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  text: {
    color: "#fffa",
    fontSize: 40,
    padding: 30,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
    padding: 10,
    color: 'white',
  },
});
