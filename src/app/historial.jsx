import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const historial = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.7}>
            <Text style={styles.text}>Julio 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.7}>
            <Text style={styles.text}>Agosto 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.7}>
            <Text style={styles.text}>Septiembre 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.7}>
            <Text style={styles.text}>Octubre 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.7}>
            <Text style={styles.text}>Noviembre 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} activeOpacity={0.7}>
            <Text style={styles.text}>Diciembre 2024</Text>
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
    alignItems: "center",
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 15,
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
