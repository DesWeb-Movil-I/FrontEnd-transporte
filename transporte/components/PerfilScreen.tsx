import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ToastAndroid, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from "./AuthContex";
import axios from "axios";


type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

interface Props {
  navigation: PerfilScreenNavigationProp;
}

const PerfilScreen: React.FC<Props> = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [unidad, setUnidad] = useState('')
  const [contrasena, setContrasena] = useState('')
  const { userId } = useAuth();

  const baseURL = `https://back-end-app-xyzp.onrender.com/api/informacion/usuario/${userId}`;
  const baseURLedit = `https://back-end-app-xyzp.onrender.com/api/informacion/usuario/edit/${userId}`;

  const cargarPerfil = async () => {
    try {
      const response = await axios.get(baseURL);
      setRegistros(response.data[0]);
      setName(response.data[0].nombre)
      setIdNumber(response.data[0].identidad)
      setPhone(response.data[0].telefono)
      setUnidad(response.data[0].unidad)
      setContrasena(response.data[0].contrasena)
    } catch (error) {
      console.error("Error fetching registros:", error);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const handleEditProfile = async () => {
    if (isEditing) {
    
      if (!name || !idNumber || !phone || !unidad || !contrasena) {
        Alert.alert('Campos Incompletos', 'Por favor complete todos los campos.');
        return;
      }

      const data = {
        nombre: name,
        identidad: idNumber,
        telefono: phone,
        unidad: unidad,
        contrasena: contrasena
      }
      await axios.put(baseURLedit, data);
      console.log("Perfil actualizado:", { name, idNumber, phone, unidad, contrasena });

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          "Perfil actualizado con éxito",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    }
    setIsEditing(!isEditing);
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient colors={["#efefef", "#efefef"]} style={styles.container}>
      <AntDesign name="user" size={100} color="black" style={styles.logo} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.profileItem}>
          <Text style={styles.label}>
            <Ionicons name="person" size={18} color="black" /> Nombre:
          </Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.value}>{name}</Text>
          )}
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.label}>
            <FontAwesome5 name="id-card" size={18} color="black" /> Número de
            Identificación:
          </Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={idNumber}
              onChangeText={setIdNumber}
            />
          ) : (
            <Text style={styles.value}>{idNumber}</Text>
          )}
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.label}>
            <Ionicons name="call" size={18} color="black" /> Número de Teléfono:
          </Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          ) : (
            <Text style={styles.value}>+{phone}</Text>
          )}
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>
            <Ionicons name="bus" size={18} color="black" /> Unidad:
          </Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={unidad}
              onChangeText={setUnidad}
            />
          ) : (
            <Text style={styles.value}>{unidad}</Text>
          )}
        </View>

        <View style={styles.profileItem}>
          <Text style={styles.label}>
            <MaterialIcons name="password" size={18} color="black" />{" "}
            Contraseña:
          </Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />
          ) : (
            <Text style={styles.value}>********</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>
            {isEditing ? "Guardar" : "Editar Perfil"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF6347" }]}
          onPress={handleBackToHome}
        >
          <Text style={styles.buttonText}> 
            <AntDesign name="arrowleft" size={24} color="white" />
             Atras
          </Text>
        </TouchableOpacity>
      </View>
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
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  profileItem: {
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#000",
  },
  value: {
    fontSize: 18,
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
    marginTop: 20,
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
  buttonText: {
    fontWeight: "500",
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default PerfilScreen;
