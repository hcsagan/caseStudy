import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

/*
  ! I could use just linear gradient component but it doesn't support shadow in ios, 
  ! so I just wrapped it with View element. 
*/

interface UserContainerProps {
  gender: string;
  children: React.ReactNode;
}

export default React.memo(({ gender, children }: UserContainerProps) => {
  return (
    <View style={[styles.container, boxShadow]}>
      <LinearGradient
        colors={[gender === "male" ? "#f7f7ffff" : "#fff8ffff", "#fff"]}
        style={{ ...styles.bg }}
      >
        {children}
      </LinearGradient>
    </View>
  );
});

const boxShadow = {
  shadowColor: "#ddd",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3.84,

  elevation: 7,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: Dimensions.get("window").width * 0.03,
    marginTop: Dimensions.get("window").width * 0.06,
  },
  bg: {
    borderRadius: 12,
  },
});
