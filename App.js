import React from "react";
import { StyleSheet, Constants } from "react-native";
import { StatusBar } from "expo-status-bar";
import MainScreen from "./src/screens/MainScreen";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
