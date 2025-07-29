# 💰 Control de Pagos - App React Native

Una aplicación móvil desarrollada en React Native con Expo para el control y seguimiento de pagos y objetivos financieros.

## 🚀 Características

- **Gestión de Objetivos**: Establece y modifica metas financieras
- **Seguimiento de Progreso**: Porcentaje completado en tiempo real
- **Registro de Pagos**: IC, monto, fecha y medio de pago
- **Múltiples Medios de Pago**: Transferencia, efectivo, tarjetas, etc.
- **Historial por Períodos**: Consulta registros por meses
- **Persistencia de Datos**: Base de datos SQLite local
- **Interfaz Intuitiva**: Tema oscuro con validaciones

## 🛠️ Tecnologías

- React Native + Expo
- SQLite (base de datos local)
- AsyncStorage (configuraciones)
- React Navigation

## 📦 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- Expo CLI
- Dispositivo móvil o emulador

### Pasos de instalación

1. **Clonar el repositorio**
```bash
https://github.com/MatiasVelozoGodoy/controlDePagos.git
cd controlDePagos
```

2. **Instalar dependencias**
```bash
npm install
npm i react-native-element-dropdown
npm i @react-native-async-storage/async-storage
expo install expo-sqlite @react-native-async-storage/async-storage
npm i @react-native-community/datetimepicker
npx expo start
```

## 💾 Base de Datos

La app utiliza SQLite con dos tablas principales:
- **Medios de pago**: Catálogo de medios de pago
- **Control**: Registros de pagos con fecha, monto, IC y medio de pago

Los objetivos se guardan en AsyncStorage para persistir entre sesiones.

## 📱 Uso

1. Establece tu objetivo financiero
2. Registra pagos completando todos los campos
3. Visualiza el progreso con colores dinámicos
4. Consulta el historial por períodos específicos

La aplicación calcula automáticamente el progreso y aplica un factor de conversión a los montos ingresados.

## 📁 Estructura del Proyecto

```text
App/
├── src/
│   ├── components/
│   │   ├── dropdown.jsx          # Componente selector de medio de pago
│   │   └── calendario.jsx        # Componente selector de fecha
│   ├── hooks/
│   │   ├── useDataBase.jsx       # Hook para manejo de SQLite
│   │   └── useDatePickerAppointment.jsx  # Hook para selector de fecha
│   ├── datos.jsx                 # Pantalla de visualización de registros
│   ├── historial.jsx            # Pantalla de selección de períodos
│   ├── index.jsx                # Pantalla principal
│   └── _layout.jsx              # Configuración de navegación
```

## 🎯 Funcionalidades Principales

### 1. Gestión de Objetivos
- Establecer objetivo financiero inicial
- Modificar objetivo existente (reinicia el progreso)
- Persistencia automática en AsyncStorage
- Indicadores visuales de progreso:
  - 🔴 **Rojo**: Objetivo lejano
  - 🟡 **Amarillo**: Falta 15% o menos
  - 🟢 **Verde**: Objetivo alcanzado o superado

### 2. Registro de Pagos
- **IC**: Código interno de identificación
- **Monto**: Cantidad con formato argentino (punto para miles, coma para decimales)
- **Medio de Pago**: 
  - Transferencia Bancaria
  - Pago Fácil
  - Efectivo
  - Tarjeta de Crédito
  - 100% Honorarios
- **Fecha**: Selector de calendario
- **Cálculo Automático**: Aplicación de factor de conversión (25,41%)

### 3. Seguimiento y Reportes
- Historial por meses específicos
- Visualización detallada de registros
- Persistencia de datos entre sesiones

