import React, { useState, useEffect, useCallback } from "react";
import UserList from "../components/UserList";
import ConnectionStatus from "../components/ConnectionStatus";
import { View } from "react-native";
import useSocket from "../hooks/useSocket";
import Header from "../components/Header";

const LIMIT = 20;

export default ({ navigation }) => {
  const [userList, setUserList] = useState([]);
  const { status, newUser } = useSocket();

  //update the user list, and limit the users at some point
  useEffect(() => {
    if (newUser !== undefined && !userList.includes(newUser)) {
      setUserList((userList) => {
        if (userList.length >= LIMIT) userList.pop();
        return [newUser, ...userList];
      });
    }
  }, [newUser]);

  // sending the selected user's data to popup screen
  const openPopup = useCallback(
    (index) => {
      navigation.navigate("Modal", { data: userList[index] });
    },
    [userList]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header showBack>
        <ConnectionStatus status={status} />
      </Header>
      <UserList data={userList} socket={true} onPress={openPopup} />
    </View>
  );
};
