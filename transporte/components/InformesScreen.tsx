import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Platform, ActivityIndicator, } from "react-native";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootStackParamList } from "./AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "./AuthContex";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

type RegistroVueltaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Informes"
>;



const InformesScreen = () => {
  const [fecha, setFecha] = useState("");
  const {userId} = useAuth();
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const navigation = useNavigation<RegistroVueltaScreenNavigationProp>();

  const baseURL = `https://back-end-app-xyzp.onrender.com/api/informe/user/${userId}`;
  const baseURL2 = "https://back-end-app-xyzp.onrender.com/api/informe/";

  useEffect(() => {
    fetchRegistros(); 
  }, []);

  const fetchRegistros = async () => {
    try {
      setLoading(true);
      const response = await axios.get(baseURL);
      setRegistros(response.data);
      setFilteredRegistros(response.data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registros:", error);
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      let filteredData = [];

      if (fecha) {
        const response = await axios.get(`${baseURL2}${fecha}/${userId}`);
        filteredData = response.data;
      } else {
        const response = await axios.get(baseURL);
        filteredData = response.data;
      }

      setFilteredRegistros(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering registros:", error);
      setLoading(false);
    }
  };

  const handleLimpiar = () => {
    setFecha('')
    fetchRegistros();
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; 
    setFecha(formattedDate);
    hideDatePicker();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>
        <MaterialCommunityIcons
          name="face-man-profile"
          size={15}
          color="black"
        />
        {`  ${item.chofer}`}
      </Text>
      <Text style={styles.label}>
        <Ionicons name="calendar-number" size={15} color="red" />
        {`  ${item.fecha}`}
      </Text>
      <Text style={styles.label}>
        <Ionicons name="timer" size={15} color="purple" />
        {`  ${item.hora}`}
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="route" size={15} color="green" />
        {`  ${item.ruta}`}
      </Text>
      <Text style={styles.label}>
        <MaterialIcons name="group" size={15} color="black" />
        {`  ${item.num_pasajeros}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { marginTop: 50 }]}>Filtrar por Fecha:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-AA"
        value={fecha}
        onChangeText={handleConfirmDate}
        editable={false}
      />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={styles.buttonDos} onPress={showDatePicker}>
          <Text style={styles.buttonText}>
            {" "}
            <Ionicons name="calendar-number" size={15} color="white" />{" "}
            Establecer
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <Text style={styles.buttonText}>
            {" "}
            <FontAwesome5 name="filter" size={15} color="white" /> Filtrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.limpiar} onPress={handleLimpiar}>
          <Text style={styles.buttonText}>
            <Ionicons name="reload-circle-sharp" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={filteredRegistros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.flatList}
        />
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF6347" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>
          {" "}
          <AntDesign name="arrowleft" size={24} color="white" />
          Atras
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "web" ? 50 : 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#444444",
    marginBottom: 10,
  },
  buttonDos: {
    width: "40%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  filterButton: {
    width: "30%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  limpiar: {
    width: "20%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "500",
    color: "#FFFFFF",
    fontSize: 18,
  },
  flatList: {
    width: "100%",
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 20,
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
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default InformesScreen;
