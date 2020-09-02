/**
 * Script for getting data from socket, and storing in a state.
 *
 */
import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import UserList from "../components/UserList";
import ConnectionStatus from "../components/ConnectionStatus";
import { SafeAreaView } from "react-native-safe-area-context";
// ! DEPRECATED
// import AnimatedPopup from "../components/AnimatedPopup";

const LIMIT = 20;

export default ({ navigation }) => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastUser, setLastUser] = useState();
  // ! DEPRECATED
  // const [shownPopup, setShownPopup] = useState(false);

  // Initialization and setup the socket
  useEffect(() => {
    const socket = io("https://wunder-provider.herokuapp.com");

    socket.once("connect", () => setStatus(1));
    socket.on("connect_error", () => setStatus(2));
    socket.connected ? setStatus(1) : socket.connect();

    // ! disabled below listeners due to performance issues
    //socket.on("connect_failed", () => setStatus(3));
    //socket.on("disconnect", () => setStatus(4));

    socket.on("userList", ({ results, info }) => {
      if (results[0] !== lastUser) setLastUser({ ...results[0], key: info.seed });
    });

    //cleaning the listeners and setting status to disconnected.
    return () => {
      socket.disconnect();
      setStatus(4);
    };
  }, []);
  //update the user list, and limit the users at some point
  useEffect(() => {
    if (lastUser !== undefined && !userList.includes(lastUser)) {
      setUserList((userList) => {
        if (userList.length >= LIMIT) userList.pop();
        return [lastUser, ...userList];
      });
    }
  }, [lastUser]);

  // self explaining
  const openPopup = useCallback(
    (index) => {
      // setShownPopup(userList[index]);
      navigation.navigate("Modal", { data: userList[index] });
    },
    [userList]
  );

  // ! DEPRECATED, don't need to use
  /* const closePopup = useCallback(() => {
    setShownPopup(false);
  }, []); */

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ConnectionStatus status={status} />
      <UserList data={userList} socket={true} onPress={openPopup} />
      {/* 
        There is a difference between this one and local list which is the data.
        I set current open popup on seperate state because
        it causes re-render in all userList related components when new data comes from socket 
       */}
      {/* {shownPopup && <AnimatedPopup data={shownPopup} onPress={closePopup} />} */}
    </SafeAreaView>
  );
};
