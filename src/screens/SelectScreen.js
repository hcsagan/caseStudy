import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
const Button = ({ label, icon, reverse, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 24,
        marginTop: 12,
        flexDirection: reverse ? "row-reverse" : "row",
        justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <Text style={{ fontWeight: "700", fontSize: 24 }}>{label}</Text>
      <Entypo name={icon} size={24} />
    </TouchableOpacity>
  );
};
export default ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#dedede", justifyContent: "center" }}>
      <Text style={{ fontWeight: "500", fontSize: 16 }}>Lütfen Seçim Yapınız</Text>
      <Button onPress={() => navigate("Local List")} label="Yerel Liste" icon="classic-computer" />
      <Button onPress={() => navigate("Online List")} label="Online Liste" icon="network" reverse={true} />
    </View>
  );
};
