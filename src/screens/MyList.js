import React, { useCallback } from "react";
import { View } from "react-native";
import UserList from "../components/UserList";
import data from "../allUsers.json";

export default ({ navigation }) => {
  const openPopup = useCallback((index) => {
    navigation.navigate("Modal", { data: data[index] });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <UserList data={data} onPress={openPopup} local={true} />
    </View>
  );
};
