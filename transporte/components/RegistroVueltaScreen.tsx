import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AppNavigator";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

type RegistroVueltaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegistroVuelta"
>;

const RegistroVueltaScreen = () => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ruta, setRuta] = useState("");
  const [num_pasajeros, setPasajeros] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const navigation = useNavigation<RegistroVueltaScreenNavigationProp>();

    const handleRegistro = async () => {
     const data = { fecha, hora, ruta, num_pasajeros };

      try {
        const response = await axios.post(
          "http://192.168.1.41:5640/api/registro",
          data
        );
        console.log("Registro exitoso:", response.data);

        if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Vuelta registrada con exito",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      } catch (error) {
        console.log("Error al registrar:", error);
      }
    };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirmDate = (date: Date) => {
    setFecha(date.toLocaleDateString());
    hideDatePicker();
  };

  const handleConfirmTime = (time: Date) => {
    setHora(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimePicker();
  };

  return (
    <LinearGradient colors={["#ffffff", "#141679"]} style={styles.container}>
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        placeholder="DD/MM/AA"
        value={fecha}
        editable={false}
      />
      <TouchableOpacity style={styles.buttonInputs} onPress={showDatePicker}>
        <Text style={styles.buttonTextImputs}>Establecer Fecha</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <Text style={styles.label}>Hora:</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        placeholder="00:00"
        value={hora}
        editable={false}
      />
      <TouchableOpacity style={styles.buttonInputs} onPress={showTimePicker}>
        <Text style={styles.buttonTextImputs}>Establecer Hora</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
      <Text style={styles.labelNight}>Ruta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Las Flores..."
        value={ruta}
        onChangeText={setRuta}
      />
      <Text style={styles.labelNight}>Pasajeros:</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={num_pasajeros}
        onChangeText={setPasajeros}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrar Vuelta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF6347" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: Platform.OS === "web" ? 50 : 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#4a4a4a",
  },
  labelNight: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    height: Platform.OS === "web" ? 40 : 50,
    borderRadius: 10,
    borderColor: "#c9c9c9",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    fontSize: Platform.OS === "web" ? 16 : 16,
  },
  disabledInput: {
    backgroundColor: "#E0E0E0",
    color: "#000000", // Cambia el color del texto para que sea visible
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF", // Color de fondo del botón
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonInputs: {
    width: "50%",
    backgroundColor: "#007AFF", // Color de fondo del botón
    paddingVertical: 12,
    borderRadius: 50,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // Color del texto del botón
    fontSize: 18,
  },
  buttonTextImputs: {
    color: "#FFFFFF", // Color del texto del botón
    fontSize: 14,
  },
});

export default RegistroVueltaScreen;
