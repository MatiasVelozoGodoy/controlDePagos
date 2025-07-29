import { SafeAreaView, StyleSheet, View } from "react-native";
import useDataBase from "../hooks/useDataBase";


const dbas = () => {
  
  const {verRegistros} = useDataBase()

  return (
    <SafeAreaView style={styles.container}>
    
        <View style={styles.innerContainer}>
          <View style={styles.boton}>
            

          </View>
        </View>
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
    color: 'white',
    paddingTop: 242
  }
});

export default dbas;
