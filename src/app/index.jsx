import { useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Calendario from "../components/calendario";
import DropdownComponent from "../components/dropdown";
import useDatePickerAppointment from "../hooks/useDatePickerAppointment";

export default function App() {
  const {
    date: selectedDate,
    show: showDatePicker,
    openPicker,
    handleChange,
    getMinimumDate,
  } = useDatePickerAppointment();

  const [monto, setMonto] = useState("");
  const [montoNum, setMontoNum] = useState(0);
  const formatMonto = (val) => {
    val = val.replace(/[^0-9,]/g, "");

    const [entero, decimal] = val.split(",");
    const formattedEntero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const formattedDecimal = decimal?.slice(0, 2) ?? "";
    const visual =
      decimal !== undefined
        ? `${formattedEntero},${formattedDecimal}`
        : formattedEntero;

    const cleanNumber = parseFloat(`${entero}.${decimal ?? "0"}`);
    const resultado = parseFloat((cleanNumber * 0.2541).toFixed(2));

    setMonto(visual);
    setMontoNum(resultado);
  };
  const formatVisual = (num) => {
    const parts = num.toFixed(2).split(".");
    const entero = parts[0];
    const decimal = parts[1];

    const formattedEntero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedEntero},${decimal}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar />
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
        placeholder="Monto"
        placeholderTextColor="#fffa"
        keyboardType="numeric"
        value={monto}
        onChangeText={formatMonto}
      />

      <Text style={styles.text}>Medio de Pago</Text>
      <View style={styles.dropdown}>
        <DropdownComponent />
      </View>
      <View>
        <Text style={styles.text}>Total</Text>
      </View>
      <View>
        <Text style={styles.textMonto}>${formatVisual(montoNum)}</Text>
      </View>
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
  textMonto:{
        color: "#fffa",
    fontSize: 20,
  },
  input: {
    width: "75%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    padding: 10,
    color: "white",
  },
  fecha: {
    justifyContent: "center",
    width: "75%",
    height: "10%",
    padding: 4,
    marginTop: 15,
  },
  dropdown: {
    width: "75%",
  },
});
