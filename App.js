import React from "react";
import { StyleSheet, Constants } from "react-native";
import { StatusBar } from "expo-status-bar";
import MainScreen from "./src/screens/MyList";
import SocketList from "./src/screens/SocketList";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectScreen from "./src/screens/SelectScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Select Screen" component={SelectScreen} />
        <Stack.Screen name="Local List" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Online List" component={SocketList} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
