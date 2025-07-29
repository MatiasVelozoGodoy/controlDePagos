import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useDataBase from "../hooks/useDataBase";

const historial = () => {
  const router = useRouter();
  const { verRegistros } = useDataBase();
  const [datos, setDatos] = useState([]);


setDatos[verRegistros]


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />

          <TouchableOpacity
            style={styles.buttons}
            activeOpacity={0.7}
            onPress={() => {router.push("/dbas")
              datos[("2025-07-01", "2025-07-31")]}}
          >
            <Text style={styles.text}>Julio 2025</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            activeOpacity={0.7}
            onPress={() => {verRegistros("2025-08-01", "2025-08-31")}}
          >
            <Text style={styles.text}>Agosto 2025</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            activeOpacity={0.7}
            onPress={() => {verRegistros("2025-09-01", "2025-09-30")}}
          >
            <Text style={styles.text}>Septiembre 2025</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            activeOpacity={0.7}
            onPress={() => {verRegistros("2025-10-01", "2025-10-31")}}
          >
            <Text style={styles.text}>Octubre 2025</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            activeOpacity={0.7}
            onPress={() => {verRegistros("2025-11-01", "2025-11-30")}}
          >
            <Text style={styles.text}>Noviembre 2025</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            activeOpacity={0.7}
            onPress={() => {verRegistros("2025-12-01", "2025-12-31")}}
          >
            <Text style={styles.text}>Diciembre 2025</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 35,
    width: "75%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    padding: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  text: {
    color: "#fffa",
    fontSize: 18,
    textAlign: "auto",
    paddingLeft: 15,
    marginTop: 1,
  },
});
export default historial;
