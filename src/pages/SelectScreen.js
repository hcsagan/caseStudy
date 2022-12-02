import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";

const Button = ({ label, icon, fontColor, reverse, onPress, description }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.header(reverse)}>
        <Text style={styles.headerText(fontColor)}>{label}</Text>
        <View style={styles.iconWrapper(fontColor)}>
          <Entypo name={icon} size={24} color="white" style={styles.icon} />
        </View>
      </View>
      <Text style={styles.description(reverse)}>{description}</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.text}>Selection Screen</Text>
      </Header>
      <Text style={styles.chooseText}>Please select one of the following options:</Text>
      <Button
        onPress={() => navigate("Online List")}
        label="Online List"
        description="Live list, listens to wunder-provider socket"
        icon="network"
        fontColor="#097"
        reverse
      />
      <Button
        onPress={() => navigate("Local List")}
        label="Local List"
        description="Useful when socket connection is not available."
        icon="drive"
        fontColor="#936"
      />
      <StatusBar barStyle="dark-content" backgroundColor="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#dedede",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    marginTop: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  header: (reverse) => ({
    flexDirection: reverse ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  headerText: (color) => ({
    fontWeight: "700",
    fontSize: 24,
    color,
  }),
  iconWrapper: (backgroundColor) => ({
    backgroundColor,
    padding: 6,
    borderRadius: 20,
  }),
  description: (reverse = false) => ({
    fontSize: 12,
    color: "#556",
    marginTop: 12,
    alignSelf: reverse === true ? "flex-end" : null,
  }),
  chooseText: {
    fontWeight: "500",
    fontSize: 14,
    alignSelf: "flex-start",
    marginHorizontal: "10%",
    marginBottom: 12,
    marginTop: -28,
    color: "#557",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    lineHeight: 38,
  },
  icon: {
    width: 24,
    height: 24
  }
});
