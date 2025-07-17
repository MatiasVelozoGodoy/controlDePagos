import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Calendario from "../components/calendario";
import Dropdown from "../components/dropdown";
import useDatePickerAppointment from "../hooks/useDatePickerAppointment";

export default function App() {
  const {
    date: selectedDate,
    show: showDatePicker,
    openPicker,
    handleChange,
    getMinimumDate,
  } = useDatePickerAppointment();
  const router = useRouter();
  const [ic, setIc] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [monto, setMonto] = useState("");
  const [montoNum, setMontoNum] = useState(0);
  const [medioPago, setMedioPago] = useState({ label: "", value: "" });
  const [objetivoPuesto, setObjetivoPuesto] = useState(true)

  const formatMonto = (val) => {
    if (!val || val.trim() === "") {
      setMonto("");
      setMontoNum(0);
      return;
    }

    val = val.replace(/[^0-9,]/g, "");

    const comaCount = (val.match(/,/g) || []).length;
    if (comaCount > 1) {
      return;
    }

    const [entero, decimal] = val.split(",");

    if (!entero) {
      setMonto("");
      setMontoNum(0);
      return;
    }

    const formattedEntero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedDecimal = decimal?.slice(0, 2) ?? "";

    const visual =
      decimal !== undefined
        ? `${formattedEntero},${formattedDecimal}`
        : formattedEntero;

    const cleanEntero = Number.parseInt(entero) || 0;
    const cleanDecimal = decimal
      ? Number.parseInt(decimal.padEnd(2, "0").slice(0, 2))
      : 0;
    const cleanNumber = cleanEntero + cleanDecimal / 75;

    const resultado = Number.parseFloat((cleanNumber * 0.2541).toFixed(2));

    setMonto(visual);
    setMontoNum(isNaN(resultado) ? 0 : resultado);
  };

  const formatVisual = (num) => {
    if (isNaN(num) || num === 0) return "0,00";

    const parts = num.toFixed(2).split(".");
    const entero = parts[0];
    const decimal = parts[1];
    const formattedEntero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedEntero},${decimal}`;
  };

  const formatIC = (val) => {
    const cleaned = val.replace(/[^0-9]/g, "");
    setIc(cleaned);
  };

    const formatObjetivo = (val) => {
    const cleaned = val.replace(/[^0-9]/g, "");
    setObjetivo(cleaned);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />

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
            value={ic}
            onChangeText={formatIC}
            maxLength={10}
          />
          <Text style={styles.text}>Objetivo</Text>

          <TextInput
            style={styles.input}
            placeholder="Objetivo"
            
            editable={objetivoPuesto}
            placeholderTextColor="#fffa"
            keyboardType="numeric"
            value={objetivo}
            onChangeText={formatObjetivo}
            maxLength={10}
          />

          <Text style={styles.text}>Monto</Text>
          <TextInput
            style={styles.input}            
            placeholder="0,00"
            placeholderTextColor="#fffa"
            keyboardType="numeric"
            value={monto}
            onChangeText={formatMonto}
          />

          <Text style={styles.text}>Medio de Pago</Text>
          <View style={styles.dropdown}>
            <Dropdown value={medioPago} setValue={setMedioPago} />
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.text}>Total</Text>
            <Text style={styles.textMonto}>${formatVisual(montoNum)}</Text>
          </View>
          <View style={styles.botonesContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (monto === "" || objetivo === "" || ic === "" || medioPago.value === "") {
                console.log("No guardarrrr");
                Alert.alert("Faltan cosas", "Rellena todos los campos", [
                  { text: "Aceptar" },
                ]);
              } else {
                setObjetivoPuesto(false)
                console.log("Datos a guardar:", montoNum);
                console.log("IC:", ic);
                console.log("Fecha:", selectedDate);
                console.log("Medio de pago:", medioPago.label);
                Alert.alert("Exito", "Guardado con exito", [
                  { text: "Aceptar" },
                ]);
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.textMonto}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/guardados")}
            activeOpacity={0.7}
          >
            <Text style={styles.textMonto}>Historial</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  text: {
    color: "#fff",
    fontSize: 30,
    padding: 30,
    textAlign: "center",
  },
  textMonto: {
    color: "#fffa",
    fontSize: 18,
    textAlign: "auto",
    paddingLeft: 15,
    marginTop: 1,
  },
  input: {
    width: "75%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    padding: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  inputDisable:{
    
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
    marginBottom: 20,
  },
  totalContainer: {
    alignItems: "flex-start",
    marginTop: 10,
    padding: 2,
    borderTopWidth: 1,
    borderTopColor: "#333",
    width: "100%",
  },
  button: {
    marginTop: 25,
    width: "75%",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#000",
    padding: 10,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
  },
  botonesContainer:{
    width: "75%",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 50
  }
});
