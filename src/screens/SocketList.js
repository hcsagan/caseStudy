import React, { useState, useEffect } from "react";
import { View, BackHandler } from "react-native";
import io from "socket.io-client";
import myList from "./allUsers";
import UserList from "../components/UserList";
import { Value, Easing, timing } from "react-native-reanimated";
import AnimatedPopup from "../components/AnimatedPopup";
import ConnectionStatus from "../components/ConnectionStatus";
const socket = io("https://wunder-provider.herokuapp.com");
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
  const deactivate = async () => {
    setTimeout(() => setActiveIndex(() => -1), 0);
  };
  // ! scroll to current active user when triggered.
  useEffect(() => {
    activeIndex !== -1 && anim.start();
  }, [activeIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ConnectionStatus status={status} />
      <UserList data={myList} onPress={setActiveIndex} />
      {activeIndex !== -1 && (
        <AnimatedPopup
          popupValue={popupValue}
          data={{ ...myList[activeIndex] }}
          onPress={() => {
            animBack.start(deactivate);
          }}
        />
      )}
    </View>
  );
};
