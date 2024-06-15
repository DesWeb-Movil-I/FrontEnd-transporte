import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import AntDesign from '@expo/vector-icons/AntDesign';

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
    }
    setIsEditing(!isEditing);
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <AntDesign name="user" size={100} color="black" style={styles.logo} />
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Nombre:</Text>
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
        <Text style={styles.label}>Número de Identificación:</Text>
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
        <Text style={styles.label}>Correo Electrónico:</Text>
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
        <Text style={styles.label}>Número de Teléfono:</Text>
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
        <View style={styles.buttonWrapper}>
          <Button title={isEditing ? "Guardar" : "Editar Perfil"} onPress={handleEditProfile} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Volver a Inicio" onPress={handleBackToHome} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default PerfilScreen;