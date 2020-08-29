import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UserList from "../components/UserList";
import AnimatedPopup from "../components/AnimatedPopup";
import ConnectionStatus from "../components/ConnectionStatus";
import { SafeAreaView } from "react-native-safe-area-context";

const LIMIT = 20;
const socket = io("https://wunder-provider.herokuapp.com");

export default () => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastUser, setLastUser] = useState();
  const [shownPopup, setShownPopup] = useState(false);

  // Initialization and setup the socket
  // ! socket makes some latency issue in emulator and low-end devices due to js thread overload
  useEffect(() => {
    socket.on("connect", () => setStatus(1));
    socket.on("connect_error", () => setStatus(2));
    //disabled below listeners due to performance issues
    //socket.on("connect_failed", () => setStatus(3));
    //socket.on("disconnect", () => setStatus(4));
    socket.on("userList", ({ results, info }) => {
      results[0] !== lastUser && setLastUser({ ...results[0], key: info.seed });
    });
    return () => socket.removeAllListeners();
  }, []);

  //update the user list, and limit the users at some point
  useEffect(() => {
    if (lastUser !== undefined && !userList.includes(lastUser)) {
      if (userList.length >= LIMIT)
        setUserList((userList) => {
          userList.pop();
          return [lastUser, ...userList];
        });
      else setUserList((userList) => [lastUser, ...userList]);
    }
  }, [lastUser]);
  const openPopup = (index) => {
    setShownPopup(userList[index]);
  };
  const closePopup = (index) => {
    setShownPopup(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ConnectionStatus status={status} />
      <UserList data={userList} onPress={openPopup} />
      {/* 
        There is a difference between this one and local list which is the data.
        I set current open popup on seperate state because
        it causes re-render in all userList related components when new data comes from socket 
       */}
      {shownPopup && <AnimatedPopup data={shownPopup} onPress={() => setTimeout(closePopup, 0)} />}
    </SafeAreaView>
  );
};
