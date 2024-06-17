import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Image, Text, Platform } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator";
import { useAuth } from "./AuthContex";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [estado, setEstado] = useState("");

  const handleLogin = async () => {
    const url = `https://back-end-app-xyzp.onrender.com/api/informacion/auth/${email}/${password}`;

    try {
      const result = await axios.get(url);
      const resultData = result.data;

      if (resultData.length > 0) {
        const userId = resultData[0].id; 
        console.log(userId)
        login(userId);
        setEstado("");
        setEmail("");
        setPassword("");
        navigation.navigate("Loading");
      }
    } catch (err) {
      setEstado("Usuario o Contraseña incorrectos!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.roundedInput]}
          placeholder="Usuario"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, styles.roundedInput]}
          placeholder="Clave"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.buttonContainer}>
          <Button title="Entrar" onPress={handleLogin} />
        </View>

        <View style={styles.buttonContainerDos}>
          <Button title="Registrar" onPress={() => navigation.navigate("Registrar")} />
        </View>

        {estado ? <Text style={styles.estado}>{estado}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.OS === "web" ? 50 : 0,
  },
  logo: {
    width: Platform.OS === "web" ? 300 : 290,
    height: Platform.OS === "web" ? 100 : 70,
    marginBottom: Platform.OS === "web" ? 50 : 220,
    marginTop: Platform.OS === "web" ? 50 : 200,
  },
  inputContainer: {
    width: "100%",
    flex: 1,
    borderRadius: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#192A57",
    alignItems: "center",
    justifyContent: "center",
    padding: Platform.OS === "web" ? 50 : 50,
  },
  input: {
    width: "100%",
    height: Platform.OS === "web" ? 40 : 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    fontSize: Platform.OS === "web" ? 16 : 16,
  },
  roundedInput: {
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  estado: {
    fontSize: 15,
    color: "#ff2b2b",
    marginTop: 10,
    fontWeight: "500",
  },
});

export default LoginScreen;
