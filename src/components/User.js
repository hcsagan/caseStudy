import React from "react";
import LinearGradient from "../components/LinearGradientBackground";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const VW = width / 100;
const VH = height / 100;

export default ({ gender, name, picture, location, onPress, active, index }) => {
  //console.warn(index);
  return (
    <View style={{ ...styles.container, ...boxShadow }}>
      <LinearGradient colors={["#fff", gender === "male" ? "#eef5" : "#fef5"]} style={{ ...styles.bg }}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ ...styles.buttonContainer }}>
          <Image source={{ uri: picture.medium }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
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
        {active && (
          <View>
            <Text>Sa</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const boxShadow = {
  shadowColor: "#bbb",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3.84,

  elevation: 5,
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    borderRadius: 12,
  },
  bg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
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
});
