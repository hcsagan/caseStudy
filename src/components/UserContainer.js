import React, { useEffect, createRef } from "react";
import LinearGradient from "../components/LinearGradientBackground";
import { View, StyleSheet, Text } from "react-native";

/*
  ! I could use just linear gradient component but it doesn't support shadow in ios, 
  ! so I just wrapped it with View element. 
*/
export default ({ gender, children, active }) => {
  return (
    <View style={{ ...styles.container, ...boxShadow }}>
      <LinearGradient colors={["#fff", gender === "male" ? "#eef5" : "#fef5"]} style={{ ...styles.bg }}>
        {children}
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
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    borderRadius: 12,
  },
  bg: {
    borderRadius: 12,
  },
});
