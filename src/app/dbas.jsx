import * as SQLite from "expo-sqlite";
import { useEffect, useRef } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const dbas = () => {
  const dbRef = useRef(null);

  async function openDB() {
    const db = await SQLite.openDatabaseAsync("controlDePagos_DB");
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS mediosDePago (
      id INTEGER PRIMARY KEY NOT NULL,
      valor INTEGER NOT NULL UNIQUE,
      nombre TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS control (
      id INTEGER PRIMARY KEY NOT NULL,
      fecha TEXT NOT NULL,
      ic INTEGER NOT NULL,
      objetivo REAL NOT NULL,
      monto REAL NOT NULL,
      montoReal REAL NOT NULL,
      medioDePago INTEGER NOT NULL,
      FOREIGN KEY (medioDePago) REFERENCES mediosDePago(id)
    );

    INSERT OR IGNORE INTO mediosDePago (valor, nombre) VALUES (1, 'Transf. Bancaria');
    INSERT OR IGNORE INTO mediosDePago (valor, nombre) VALUES (2, 'Pago Fácil');
    INSERT OR IGNORE INTO mediosDePago (valor, nombre) VALUES (3, 'Efectivo');
    INSERT OR IGNORE INTO mediosDePago (valor, nombre) VALUES (4, 'Tarj. Crédito');
    INSERT OR IGNORE INTO mediosDePago (valor, nombre) VALUES (5, '100% Honorarios');
  `);
    dbRef.current = db;
    console.log("DB abierta");
  }

  useEffect(() => {
    openDB();
  }, []);



  async function verRegistros() {
  const db = dbRef.current;
  const rows = await db.getAllAsync("SELECT c.fecha AS Fecha, c.ic as IC, c.monto AS Monto_Total, c.montoReal AS Monto_Real, m.nombre FROM control c INNER JOIN mediosDePago m ON c.medioDePago = m.id");
  console.log("Registros:", rows);
}

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
