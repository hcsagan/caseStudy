import React, { useCallback } from "react";
import { View, Text } from "react-native";
import UserList from "../components/UserList";
import data from "../allUsers.json";
import Header from "../components/Header";

export default ({ navigation }) => {
  const openPopup = useCallback((index) => {
    navigation.navigate("Modal", { data: data[index] });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header back>
        <Text style={{ fontSize: 18 }}>Local List</Text>
      </Header>
      <UserList data={data} onPress={openPopup} local={true} header={true} />
    </View>
  );
};
