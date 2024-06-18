import React from "react";
import { Text, StyleSheet, Platform, TouchableOpacity, } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "./AuthContex";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const {logout, userId} = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigateToRegistroVuelta = () => {
    navigation.navigate("RegistroVuelta");
  };

  const handleNavigateToInformes = () => {
    navigation.navigate("Informes");
  };

  const handleNavigateToLogin = () => {
    logout();
    navigation.navigate("Login");
    console.log(userId);
    logout();
  }

  const handleNavigateToPerfil = () => {
    navigation.navigate("Perfil");
  }

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      <FontAwesome name="bus" size={50} color="black" />
      <Text style={styles.text}>Marcar vueltas Transporte Urbano</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToRegistroVuelta}
      >
        <Text style={styles.buttonText}>Registrar Vuelta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonDos}
        onPress={handleNavigateToInformes}
      >
        <Text style={styles.buttonText}>Informes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonDos, { backgroundColor: "#007AFF" }]}
        onPress={handleNavigateToPerfil}
      >
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonDos, { backgroundColor: "#FF6347" }]}
        onPress={handleNavigateToLogin}
      >
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000",
  },
  buttonContainer: {
    width: "100%",
    marginTop: Platform.OS === "web" ? 20 : 10,
    height: Platform.OS === "web" ? 50 : 50,
    marginBottom: 0,
  },
  buttonContainerDos: {
    width: "100%",
    marginTop: Platform.OS === "web" ? 20 : 0,
    height: Platform.OS === "web" ? 50 : 50,
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonDos: {
    width: "100%",
    backgroundColor: "#007AFF", 
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default HomeScreen;
