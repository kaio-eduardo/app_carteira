import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminScreen from "./screens/AdminScreen";
import NewCarteiraCadastroScreen from "./screens/NewCarteiraScreen";
import ListCarteirasScreen from "./screens/ListCarteirasScreen";
import CarteiraDetail from "./screens/CarteiraDetail";
import CarteiraProvider from "./context/Carteira";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CarteirasNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ListCarteiras">
      <Stack.Screen name="ListCarteiras" component={ListCarteirasScreen} />
      <Stack.Screen name="Carteira" component={CarteiraDetail} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <CarteiraProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Admin" component={AdminScreen} />
          <Tab.Screen name="Cadastro" component={NewCarteiraCadastroScreen} />
          <Tab.Screen
            name="Carteiras"
            options={{ headerShown: false }}
            component={CarteirasNavigator}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CarteiraProvider>
  );
}
