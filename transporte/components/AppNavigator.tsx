import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import HomeScreen from "./HomeScreen";
import RegistroVueltaScreen from "./RegistroVueltaScreen";
import InformesScreen from "./InformesScreen";
import PerfilScreen from './PerfilScreen';


export type RootStackParamList = {
  Login: undefined;
  Loading: undefined;
  Home: undefined;
  RegistroVuelta: undefined;
  Informes: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistroVuelta"
          component={RegistroVueltaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Informes"
          component={InformesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name= "Perfil"
          component= {PerfilScreen}
          options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
