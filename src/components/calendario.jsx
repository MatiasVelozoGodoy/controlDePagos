
import DateTimePicker from "@react-native-community/datetimepicker"
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const DatePickerAppointment = ({ label = "Seleccionar fecha", value, onChange, show, onPress, minimumDate, style }) => {
  const formatDate = (date) => {
    if (!date) return "Seleccionar fecha"

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.7} style={styles.dateButton} onPress={onPress}>
        <View style={styles.dateButtonContent}>
          <View style={styles.dateInfo}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.dateText}>{value ? formatDate(value) : "Seleccionar fecha"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          minimumDate={minimumDate}
          locale="es-ES"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  dateButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#e9ecef",
    padding: 5,
  },
  dateButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInfo: {
    flex: 1,
  },
  label: {
    fontSize:14,
    color: 'black',
    marginBottom: 5,
    fontWeight: "500",
    textAlign: "center"
  },
  dateText: {
    fontSize: 14,
    color: 'black',
    fontWeight: "bold",
    textAlign: "center"
  },
})

export default DatePickerAppointment
