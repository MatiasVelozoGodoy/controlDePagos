import { Button, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import useDataBase from "../hooks/useDataBase";


const dbas = () => {
  
  const {saveData,
        verRegistros} = useDataBase()


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <View style={styles.boton}>
          <Button
          title="GOLA"
          onPress={() => verRegistros()}          
          />
          </View>
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
  boton:{
    
    paddingTop: 242
  }
});

export default dbas;
