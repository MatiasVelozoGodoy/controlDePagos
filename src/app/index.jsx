import { StyleSheet, Text, TextInput, View } from "react-native";
import Calendario from "../components/calendario";
import useDatePickerAppointment from "../hooks/useDatePickerAppointment";

export default function App() {
  const {
    date: selectedDate,
    show: showDatePicker,
    openPicker,
    handleChange,
    getMinimumDate,
  } = useDatePickerAppointment()




  return (
    <View style={styles.container}>
        <View style={styles.fecha}>
          <Calendario
            label="Elegir fecha"
            value={selectedDate}
            onChange={handleChange}
            show={showDatePicker}
            onPress={openPicker}
            minimumDate={getMinimumDate()}
          />
        </View>
      

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



    
  );
}

const styles = StyleSheet.create({
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
  fecha: {
    width: '100%',
    height: 100,
    padding: 4
  }
});
