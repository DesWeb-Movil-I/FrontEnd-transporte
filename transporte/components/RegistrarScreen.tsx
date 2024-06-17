import axios from "axios";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RootStackParamList } from "./AppNavigator";

type RegistrarScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Registrar"
>;

const RegistrarScreen = () => {
  const navigation = useNavigation<RegistrarScreenNavigationProp>();
  const [nombre, setNombre] = useState("");
  const [identidad, setIdentidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [unidad, setUnidad] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleRegistro = async () => {
    // Validar campos vacíos
    if (!nombre || !identidad || !telefono || !unidad || !contrasena) {
      Alert.alert("Campos Incompletos", "Por favor completa todos los campos.");
      return;
    }

    const data = { nombre, identidad, telefono, unidad, contrasena };

    try {
      const response = await axios.post(
        "https://back-end-app-xyzp.onrender.com/api/informacion/",
        data
      );
      console.log("Registro exitoso:", response.data);

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Registro exitoso",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al registrar:", error);
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Error al registrar",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Identidad"
        value={identidad}
        onChangeText={setIdentidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Unidad"
        value={unidad}
        onChangeText={setUnidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>
            <FontAwesome5 name="user-plus" size={15} color="white" /> Registrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>
            <Ionicons name="arrow-back" size={15} color="white" /> Volver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.OS === "web" ? 50 : 20,
  },
  logo: {
    width: Platform.OS === "web" ? 300 : 290,
    height: Platform.OS === "web" ? 100 : 70,
    marginBottom: Platform.OS === "web" ? 50 : 20,
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
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
});

export default RegistrarScreen;
