import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import MainScreen from "./src/screens/MainScreen";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
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
