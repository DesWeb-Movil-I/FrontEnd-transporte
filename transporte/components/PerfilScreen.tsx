import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

interface Props {
  navigation: PerfilScreenNavigationProp;
}

const PerfilScreen: React.FC<Props> = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Juan Pérez');
  const [idNumber, setIdNumber] = useState('12345678');
  const [email, setEmail] = useState('juan.perez@example.com');
  const [phone, setPhone] = useState('+504 9876-5432');

  const handleEditProfile = () => {
    if (isEditing) {
      console.log('Perfil actualizado:', { name, idNumber, email, phone });
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
    <LinearGradient colors={['#efefef', '#efefef']} style={styles.container}>
      <View style={styles.navigationBar}>
        <Text style={styles.logoText}>Perfil</Text>
      </View>
      <AntDesign name="user" size={100} color="black" style={styles.logo} />
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
          <FontAwesome5 name="id-card" size={18} color="black" /> Número de Identificación:
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
          <MaterialIcons name="email" size={18} color="black" /> Correo Electrónico:
        </Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.value}>{email}</Text>
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
          <Text style={styles.value}>{phone}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>{isEditing ? "Guardar" : "Editar Perfil"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#FF6347" }]} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>Volver a Inicio</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: Platform.OS === 'web' ? 50 : 20,
    marginTop: 50,
  },
  navigationBar: {
    width: '100%',
    height: Platform.OS === 'web' ? 60 : 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileItem: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
  },
  value: {
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: Platform.OS === 'web' ? 40 : 50,
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 7,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default PerfilScreen;
