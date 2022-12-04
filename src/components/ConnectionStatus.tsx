import React from "react";
import { View, Text, StyleSheet } from "react-native";

const statusList = [
  "Loading...",
  "Connected",
  "Connect error.",
  "Connect failed.",
  "Disconnected",
];
const statusColors = ["#fe0", "#af0", "#f55", "#f55", "#f55"];

interface IConnectionStatus {
  status: number;
}

export default React.memo(({ status }: IConnectionStatus) => (
  <View style={styles.textWrapper}>
    <Text style={styles.statusText}>Status: {statusList[status]}</Text>
    <View style={[styles.info, { backgroundColor: statusColors[status] }]} />
  </View>
));

const styles = StyleSheet.create({
  statusText: {
    fontSize: 18,
  },

  info: {
    width: 16,
    height: 16,
    borderRadius: 8,
    elevation: 3,
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
  },
});
