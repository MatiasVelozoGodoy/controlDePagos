import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Transf. Bancaria", value: "1" },
  { label: "Pago Fácil", value: "2" },
  { label: "Efectivo", value: "3" },
  { label: "Tarj. Crédito", value: "4" },
  { label: "100% Honorarios", value: "5" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[
        styles.dropdown,
        isFocus && { borderColor: "#fffa", borderWidth: 1.6 },
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemContainerStyle={{ color: "red" }}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={{ color: "#fffa" }}
      data={data}
      labelField="label"
      containerStyle={{ backgroundColor: "black", borderRadius: 6 }}
      valueField="value"
      placeholder={!isFocus ? "Seleccionar" : "Seleccionar"}
      searchPlaceholder="Buscar..."
      value={value}
      activeColor="#333"
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      renderLeftIcon={() => (
        <AntDesign
          style={styles.icon}
          color={isFocus ? "red" : "green"}
          name="Safety"
          size={20}
        />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#fffa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#fffa",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
