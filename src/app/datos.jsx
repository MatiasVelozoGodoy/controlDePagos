import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Datos = () => {
  const router = useRouter()
  const { data: jsonData } = useLocalSearchParams()

  const records = jsonData ? JSON.parse(jsonData) : []

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Registros Guardados</Text>

          {records.length > 0 ? (
            records.map((record, index) => (
              <View key={index} style={styles.recordCard}>
                <Text style={styles.recordText}>
                  <Text style={styles.recordLabel}>Fecha:</Text> {record.Fecha}
                </Text>
                <Text style={styles.recordText}>
                  <Text style={styles.recordLabel}>IC:</Text> {record.IC}
                </Text>
                <Text style={styles.recordText}>
                  <Text style={styles.recordLabel}>Monto Total:</Text> ${record.Monto_Total}
                </Text>
                <Text style={styles.recordText}>
                  <Text style={styles.recordLabel}>Monto Real:</Text> ${record.Monto_Real}
                </Text>
                <Text style={styles.recordText}>
                  <Text style={styles.recordLabel}>Medio de Pago:</Text> {record.Medio_de_pago}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noRecordsText}>No hay registros para este período.</Text>
          )}

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  recordCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "90%",
    borderWidth: 1,
    borderColor: "#333",
  },
  recordText: {
    color: "#fffa",
    fontSize: 16,
    marginBottom: 5,
  },
  recordLabel: {
    fontWeight: "bold",
    color: "#fff",
  },
  noRecordsText: {
    color: "#fffa",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  backButton: {
    marginTop: 30,
    marginBottom: 30,
    width: "75%",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 12,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
  },
  backButtonText: {
    color: "#fffa",
    fontSize: 18,
  },
})

export default Datos
