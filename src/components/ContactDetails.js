import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { TouchableOpacity, BaseButton } from "react-native-gesture-handler";
import { Ionicons, Entypo } from "@expo/vector-icons";

const Icon = ({ name, size = 16, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);
const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

export default (email, cell, phone) => (
  <View>
    <Text style={{ ...styles.text, fontWeight: "600", fontSize: 16, marginBottom: 8 }}>Contact Details</Text>
    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`).catch((e) => console.log(e))}>
      <View style={styles.contact}>
        <View style={styles.contactIcon}>
          <Icon name="ios-mail" iconStyle={{ marginRight: 0 }} />
        </View>
        {light(email)}
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`).catch((e) => console.log(e))}>
      <View style={styles.contact}>
        <View style={styles.contactIcon}>
          <Entypo name="old-phone" color={styles.text.color} size={13} />
        </View>
        {light(phone)}
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${cell}`).catch((e) => console.log(e))}>
      <View style={styles.contact}>
        <View style={styles.contactIcon}>
          <Icon name="ios-call" iconStyle={{ marginRight: 0 }} />
        </View>
        {light(cell)}
      </View>
    </TouchableOpacity>
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
