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
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
          "Vuelta registrada con éxito",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.log("Error al registrar:", error);
       if (Platform.OS === "android") {
         ToastAndroid.showWithGravity(
           "Error al registrar",
           ToastAndroid.SHORT,
           ToastAndroid.BOTTOM
         );
       }
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
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    setFecha(formattedDate);
    hideDatePicker();
  };

  const handleConfirmTime = (time: Date) => {
    setHora(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimePicker();
  };

  return (
    <LinearGradient colors={["#efefef", "#efefef"]} style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.caja}>
          <Text style={styles.label}>
            <Ionicons name="calendar-number" size={15} color="black" /> Fecha
          </Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="YYYY-MM-DD"
            value={fecha}
            editable={false}
          />

          <TouchableOpacity
            style={styles.buttonInputs}
            onPress={showDatePicker}
          >
            <Text style={styles.buttonTextInputs}>Establecer </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.caja}>
          <Text style={styles.label}>
            <Ionicons name="timer" size={15} color="black" />
            Hora
          </Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="00:00"
            value={hora}
            editable={false}
          />
          <TouchableOpacity
            style={styles.buttonInputs}
            onPress={showTimePicker}
          >
            <Text style={styles.buttonTextInputs}>Establecer</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>
      </View>

      <Text style={[styles.label, { marginTop: 20 }]}>
        <FontAwesome5 name="route" size={15} color="black" /> Ingresar Ruta
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Las Flores..."
        value={ruta}
        onChangeText={setRuta}
      />
      <Text style={styles.label}> 
        <MaterialIcons name="group" size={15} color="black" /> Cantidad Pasajeros
      </Text>
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
    alignItems: "flex-start",
    padding: Platform.OS === "web" ? 50 : 20,
    marginTop: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    width: "100%",
    height: Platform.OS === "web" ? 40 : 50,
    borderRadius: 10,
    borderColor: "#FFF",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#efefef",
    color: "#000000",
    borderBottomColor: "gray",
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonInputs: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  buttonTextInputs: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  navigationBar: {
    width: "100%",
    height: Platform.OS === "web" ? 60 : 80, // Ajustar altura según la plataforma
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF", // Color de fondo de la barra de navegación
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // Color del texto del logo
  },
  caja: {
    width: 180,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
  },
});

export default RegistroVueltaScreen;
