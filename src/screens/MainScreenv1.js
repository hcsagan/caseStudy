/**
 * DEPRECATED
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import io from "socket.io-client";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import myList from "./allUsers";
const socket = io("https://wunder-provider.herokuapp.com");
const { width, height } = Dimensions.get("window");
const MAX_USERS = 5;

const Details = (user) => {};

const User = ({ name, picture, location }) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.userContainer}>
    <Image source={{ uri: picture.thumbnail }} style={styles.avatar} />
    <View>
      <Text style={styles.userName}>
        {name.title} {name.first} {name.last}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name="location-on" size={12} color="#777" style={{ marginRight: 2 }} />
        <Text style={styles.userCity}>{location.city}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default () => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastUser, setLastUser] = useState();
  const statusList = [
    "Yükleniyor...",
    "Bağlandı",
    "Bağlantı Hatası",
    "Bağlanılamadı",
    "Bağlantı Koptu",
  ];
  const statusColors = ["#fe0", "#af0", "#f55", "#f55", "#f55"];
  //Initialization and setup the socket
  useEffect(() => {
    socket.on("connect", () => setStatus(1));
    socket.on("connect_error", () => setStatus(2));
    socket.on("connect_failed", () => setStatus(3));
    socket.on("disconnect", () => setStatus(4));
    socket.on("userList", ({ results }) => results[0] !== lastUser && setLastUser(results[0]));
  }, []);

  //update the user list
  useEffect(() => {
    lastUser !== undefined && setUserList([lastUser, ...userList]);
  }, [lastUser]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} />
      <View style={styles.header}>
        <Text>Durum: {statusList[status]}</Text>
        <View style={{ ...styles.info, backgroundColor: statusColors[status] }} />
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#eee" }}>
        {/* {status === 1 && userList.length !== 0 && userList.map((item, index) => User(item))} */}
        {myList.map((item, index) => (
          <User {...item} key={item.email} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width,
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
  userContainer: {
    height: 72,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginHorizontal: 10,
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
