import AntDesign from "@expo/vector-icons/AntDesign";
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
import useDataBase from "../hooks/useDataBase";
import useDatePickerAppointment from "../hooks/useDatePickerAppointment";

export default function App() {

const { saveData } = useDataBase()


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
  const [objetivoNum, setObjetivoNum] = useState(0);
  const [monto, setMonto] = useState("");
  const [montoNum, setMontoNum] = useState(0);
  const [medioPago, setMedioPago] = useState({ label: "", value: "" });
  const [objetivoPuesto, setObjetivoPuesto] = useState(true);
  const [isDisable, setIsDisable] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)

  const formatMonto = (val) => {
    if (!val || val.trim() === "") {
      setMonto("");
      setMontoNum(0);
      return;
    }

    val = val.replace(/[^0-9,]/g, "");

    const comaCount = (val.match(/,/g) || []).length;
    if (comaCount > 1) return;

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

  const formatObjetivo = (val) => {
    if (!val || val.trim() === "") {
      setObjetivo("");
      setObjetivoNum(0);
      return;
    }

    val = val.replace(/[^0-9,]/g, "");

    const comaCount = (val.match(/,/g) || []).length;
    if (comaCount > 1) return;

    const [entero, decimal] = val.split(",");

    if (!entero) {
      setObjetivo("");
      setObjetivoNum(0);
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
    const cleanNumber = cleanEntero + cleanDecimal / 100;

    setObjetivo(visual);
    setObjetivoNum(isNaN(cleanNumber) ? 0 : cleanNumber);
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
            style={!isEmpty ? styles.input : styles.inputEmpty}
            placeholder="IC"
            placeholderTextColor="#fffa"
            keyboardType="numeric"
            value={ic}
            onChangeText={formatIC}
            maxLength={10}
          />

          <Text style={styles.text}>Objetivo</Text>
          <View style={styles.objetivoConteiner}>
            <TextInput
              style={!isDisable ? styles.inputObjetivo : styles.inputDisable}
              placeholder={!isDisable ? "Objetivo" : objetivo}
              editable={objetivoPuesto}
              placeholderTextColor="#fffa"
              keyboardType="numeric"
              value={objetivo}
              onChangeText={formatObjetivo}
              maxLength={15}
            />
            <View style={styles.botonEditarConteiner}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setIsDisable(false);
                  setObjetivoPuesto(true);
                }}
                activeOpacity={0.7}
              >
                <AntDesign
                  style={styles.icon}
                  name={isDisable ? "edit" : "save"}
                  size={20}
                  onPress={() => {
                    if (isDisable) {
                      Alert.alert(
                        "Objetivo",
                        "Estas por modificar tu objetivo, ¿Estas segura?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("cancelado"),
                            style: "cancel",
                          },
                          {
                            text: "aceptar",
                            onPress: () => {
                              console.log("modificado");
                              setObjetivoPuesto(true);
                              setIsDisable(false);
                            },
                          },
                        ]
                      );
                    } else {
                      setObjetivoPuesto(false);
                      setIsDisable(true);
                    }
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

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
                if (
                  monto === "" ||
                  objetivo === "" ||
                  ic === "" ||
                  medioPago.value === ""
                ) {
                  setIsEmpty(true)
                  Alert.alert("Faltan cosas", "Rellena todos los campos", [
                    { text: "Aceptar" },
                  ]);
                } else {
                  saveData(ic, objetivoNum, monto, montoNum, medioPago.value)
                  Alert.alert("Éxito", "Guardado con éxito", [
                    { text: "Aceptar" },
                  ]);
                  if (isDisable) {
                    const nuevo = objetivoNum - montoNum;
                    setObjetivo(formatVisual(nuevo));
                    setObjetivoNum(nuevo);
                    setIsEmpty(false)
                    setIc("")
                    setMonto("")
                    setMedioPago({value: ""})
                    setMontoNum("$0,00")
                  }
                }
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.textMonto}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/historial")}
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
    justifyContent: "center",
    width: "75%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    padding: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  inputEmpty: {
    justifyContent: "center",
    width: "75%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 6,
    padding: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  inputObjetivo: {
    width: "75%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    padding: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginLeft: 51,
  },
  inputDisable: {
    borderRadius: 6,
    padding: 15,
    color: "#f00a",
    fontSize: 18,
    textAlign: "center",
    marginLeft: 51,
  },
  fecha: {
    justifyContent: "center",
    width: "75%",
    height: "10%",
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
  botonesContainer: {
    width: "75%",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  iconButton: {
    borderRadius: 6,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "white",
  },
  objetivoConteiner: {
    flexDirection: "row",
  },
  botonEditarConteiner: {
    justifyContent: "center",
    paddingLeft: 10,
  },
});
