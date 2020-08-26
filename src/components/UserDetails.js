import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default ({ picture }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: picture.large }} />
    <View style={styles.content}></View>
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: 200,
  },
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
