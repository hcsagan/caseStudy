import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketStatus } from "../hooks/useSocket";

const getStatusName = (status: SocketStatus) => {
  const names = {
    [SocketStatus.Loading] : "Loading...",
    [SocketStatus.Connected] : "Connected",
    [SocketStatus.ConnectionError] : "Connect error.",
    [SocketStatus.ConnectionFailed] : "Connect failed.",
    [SocketStatus.Disconnected] : "Disconnected",
  }

  return names[status];
};

const getStatusColor = (status: SocketStatus) => {
  const colors = {
    [SocketStatus.Loading] : "#fe0",
    [SocketStatus.Connected] : "#af0",
    [SocketStatus.ConnectionError] : "#f55",
    [SocketStatus.ConnectionFailed] : "#f55",
    [SocketStatus.Disconnected] : "#f55"
  }

  return colors[status];
}

interface IConnectionStatus {
  status: SocketStatus;
}

export default React.memo(({ status }: IConnectionStatus) => (
  <View style={styles.textWrapper}>
    <Text style={styles.statusText}>Status: {getStatusName(status)}</Text>
    <View style={[styles.info, { backgroundColor: getStatusColor(status) }]} />
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
