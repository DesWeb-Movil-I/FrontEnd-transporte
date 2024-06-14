import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AppNavigator";
import { useNavigation } from "@react-navigation/native";

type LoadingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Loading"
>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000); // Redirige a la pantalla Home después de 1 segundo (simulando carga)

    // Nota: En un escenario real, podrías realizar aquí la carga de datos o cualquier otra tarea asíncrona
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DF8588",
  },
  logo: {
    width: 220,
    height: 50,
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default LoadingScreen;
