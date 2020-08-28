import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
const Icon = ({ name, size = 18, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);
const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;
export default ({ text, link, icon, iconColor, open, transformStyle }) => (
  <TouchableOpacity onPress={() => Linking.openURL(link).catch((e) => console.log(e))}>
    <View style={styles.contact}>
      <View style={{ ...styles.contactIcon, ...transformStyle }}>
        {icon === "old-phone" && <Entypo name="old-phone" color={iconColor} size={15} />}
        {icon !== "old-phone" && <Icon name={icon} iconStyle={{ marginRight: 0 }} color={iconColor} />}
      </View>
      {open && light(text)}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  contactIcon: {
    width: 16,
    marginRight: 4,
  },
});
