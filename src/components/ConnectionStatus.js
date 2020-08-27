import React from "react";
import { View, Text, StyleSheet } from "react-native";
const statusList = ["Yükleniyor...", "Bağlandı", "Bağlantı Hatası", "Bağlanılamadı", "Bağlantı Koptu"];
const statusColors = ["#fe0", "#af0", "#f55", "#f55", "#f55"];

export default React.memo(({ status }) => (
  <View style={{ ...styles.header }}>
    <Text>Durum: {statusList[status]}</Text>
    <View style={{ ...styles.info, backgroundColor: statusColors[status] }} />
  </View>
));

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  info: {
    width: 16,
    height: 16,
    borderRadius: 8,
    elevation: 3,
  },
});
