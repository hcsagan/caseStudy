import React, { useState, useEffect, createRef } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import io from "socket.io-client";
import { StatusBar } from "expo-status-bar";
import myList from "./allUsers";
const socket = io("https://wunder-provider.herokuapp.com");
import UserContainer from "../components/UserContainer";
import UserButton from "../components/UserButton";
import UserDetails from "../components/UserDetails";
import Popup from "../components/Popup";
import Animated, { Value, Easing, timing } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const statusList = ["Yükleniyor...", "Bağlandı", "Bağlantı Hatası", "Bağlanılamadı", "Bağlantı Koptu"];
const statusColors = ["#fe0", "#af0", "#f55", "#f55", "#f55"];
const { width, height } = Dimensions.get("window");
const VW = width / 100;
const VH = height / 100;
const animConfig = {
  duration: 500,
  toValue: 1,
  easing: Easing.inOut(Easing.cubic),
};
export default () => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastUser, setLastUser] = useState();
  const [activeIndex, setActiveIndex] = useState(-1);
  const popupValue = new Value(0);
  const anim = timing(popupValue, animConfig);
  const animBack = timing(popupValue, { ...animConfig, toValue: 0 });
  const scrollRef = createRef();
  //Initialization and setup the socket
  // useEffect(() => {
  //   socket.on("connect", () => setStatus(1));
  //   socket.on("connect_error", () => setStatus(2));
  //   socket.on("connect_failed", () => setStatus(3));
  //   socket.on("disconnect", () => setStatus(4));
  //   socket.on("userList", ({ results }) => results[0] !== lastUser && setLastUser(results[0]));
  // }, []);

  //update the user list
  useEffect(() => {
    lastUser !== undefined && setUserList([lastUser, ...userList]);
  }, [lastUser]);

  // ! scroll to current active user when triggered.
  useEffect(() => {
    /*activeIndex !== -1 &&
      scrollRef.current.scrollToIndex({
        animated: true,
        index: activeIndex,
        viewPosition: 0,
      });*/
    activeIndex !== -1 && anim.start();
    activeIndex === -1 && animBack.start();
  }, [activeIndex]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text>Durum: {statusList[status]}</Text>
        <View style={{ ...styles.info, backgroundColor: statusColors[status] }} />
      </View>
      <FlatList
        data={myList}
        renderItem={({ item, index }) => (
          // <User {...item} active={activeIndex === index ? true : false} onPress={() => scroller(index)} />
          <UserContainer gender={item.gender} key={item.key}>
            {
              <UserButton
                name={item.name}
                location={item.location}
                picture={item.picture}
                onPress={async () => {
                  setTimeout(() => setActiveIndex(index), 0);
                }}
              />
            }
          </UserContainer>
        )}
        keyExtractor={(item) => item.email}
      />
      {activeIndex !== -1 && (
        <Animated.View
          style={{
            position: "absolute",
            width,
            height: "100%",
            backgroundColor: "#0017",
            opacity: popupValue,
            paddingTop: popupValue.interpolate({ inputRange: [0, 1], outputRange: [100 * VH, 0] }),
          }}
        >
          <PopupContainer>
            <Popup {...myList[activeIndex]} />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "white",
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                borderBottomLeftRadius: 16,
              }}
              onPress={() => {
                animBack.start();
                setTimeout(() => setActiveIndex(-1), 500);
              }}
            >
              <Ionicons name="ios-close" style={{ margin: 0 }} size={48} color="black" />
            </TouchableOpacity>
          </PopupContainer>
        </Animated.View>
      )}
    </View>
  );
};

const PopupContainer = (props) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 5 * VW,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          ...boxShadow,
        }}
      >
        {props.children}
      </View>
    </View>
  );
};

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
const boxShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3.84,

  elevation: 5,
};
