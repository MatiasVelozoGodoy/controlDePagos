import * as SQLite from "expo-sqlite"
import { useEffect, useRef } from "react"

export default function useDataBase() {
  const dbRef = useRef(null)

  async function openDB() {
    const db = await SQLite.openDatabaseAsync("controlDePagos_DB")
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
    `)
    dbRef.current = db
  }

  async function saveData(ic, objetivoNum, monto, montoNum, medioPagoValue) {
    const db = dbRef.current
    if (!db) {
      return
    }

    const cleanMonto = monto.replace(/\./g, "").replace(",", ".")
    const parsedMonto = Number.parseFloat(cleanMonto) || 0

    const result = await db.runAsync(
      "INSERT INTO control (fecha, ic, objetivo, monto, montoReal, medioDePago) VALUES (date('now'), ?, ?, ?, ?, ?)",
      ic,
      objetivoNum,
      parsedMonto,
      montoNum,
      medioPagoValue,
    )
  }

  async function verRegistros(filtroFecha = null, hasta = null) {
    const db = dbRef.current
    if (!db) {
      return
    }

    let query = `
      SELECT c.fecha AS Fecha, 
        c.ic as IC, 
        c.monto AS Monto_Total, 
        c.montoReal AS Monto_Real, 
        m.nombre AS Medio_de_pago 
      FROM control c 
      INNER JOIN mediosDePago m ON c.medioDePago = m.id
    `

    if (filtroFecha) {
      query += ` WHERE fecha BETWEEN '${filtroFecha}' AND '${hasta}'`
    }

    const rows = await db.getAllAsync(query)
    return rows
  }

  useEffect(() => {
    openDB()
  }, [])

  return { saveData, verRegistros }
}
