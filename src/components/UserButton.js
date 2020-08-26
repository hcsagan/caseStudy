import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const VW = width / 100;

export default ({ name, picture, location, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ ...styles.buttonContainer }}>
    <Image source={{ uri: picture.medium }} style={styles.avatar} />
    <View style={styles.buttonTextContainer}>
      <View style={{ borderBottomColor: "#eee5", borderBottomWidth: StyleSheet.hairlineWidth }}>
        <Text style={styles.userName}>
          {name.title} {name.first} {name.last}
        </Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ios-pin" size={12} color="#777" style={{ marginRight: 2 }} />
            <Text style={styles.userCity}>{location.city}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatar: {
    width: 20 * VW,
    height: 20 * VW,
    borderRadius: 10 * VW,
    marginRight: 16,
  },
  userName: {
    fontWeight: "500",
    fontSize: 18,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userCity: {
    color: "#777",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextContainer: {
    width: "100%",
    flex: 1,
  },
});
