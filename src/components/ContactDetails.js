import React, { useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { TouchableOpacity, BaseButton } from "react-native-gesture-handler";
import { Ionicons, Entypo } from "@expo/vector-icons";
import LinkButton from "./LinkButton";
const Icon = ({ name, size = 18, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);
const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

export default (email, cell, phone) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            ...styles.text,
            fontWeight: "800",
            fontSize: 16,
            marginBottom: 8,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            alignItems: "center",
          }}
        >
          Contact Details
        </Text>
        <Ionicons name="ios-person" color={styles.text.color} size={20} />
      </View>
      <LinkButton text={email} link={`mailto:${email}`} open={open} icon="ios-mail" iconColor="#9cf" index={-1} />
      <LinkButton text={phone} link={`tel:${phone}`} open={open} icon="old-phone" iconColor="#fc9" index={0} />
      <LinkButton text={cell} link={`tel:${cell}`} open={open} icon="ios-call" iconColor="#cf5" index={1} />
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ padding: 10, backgroundColor: "#05a", alignItems: "center", marginTop: 10 }}
        onPress={() => setOpen(() => !open)}
      >
        <Text style={{ color: "white" }}>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
};

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
