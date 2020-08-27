import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons, Entypo } from "@expo/vector-icons";

const Icon = ({ name, size = 16, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);
const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

export default (email, cell, phone) => (
  <View>
    <Text style={{ ...styles.text, fontWeight: "bold" }}>Contact Details</Text>
    <View style={styles.contact}>
      <View style={styles.contactIcon}>
        <Icon name="ios-mail" iconStyle={{ marginRight: 0 }} />
      </View>
      {light(email)}
    </View>
    <View style={styles.contact}>
      <View style={styles.contactIcon}>
        <Entypo name="old-phone" color={styles.text.color} size={13} />
      </View>
      {light(phone)}
    </View>
    <View style={styles.contact}>
      <View style={styles.contactIcon}>
        <Icon name="ios-call" iconStyle={{ marginRight: 0 }} />
      </View>
      {light(cell)}
    </View>
  </View>
);

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  contactIcon: {
    width: 16,
    marginRight: 4,
  },
});
