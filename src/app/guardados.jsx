import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const guardados = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}></View>
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
});
export default guardados;
