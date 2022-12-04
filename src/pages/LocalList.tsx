import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import UserList from "../components/UserList";
import data from "../dataSets/allUsers.json";
import Header from "../components/Header";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigatorParamList } from "../../App";

interface LocalListProps {
  navigation: StackNavigationProp<RootNavigatorParamList, "Main">
}

export default ({ navigation }: LocalListProps) => {
  const openPopup = useCallback((index) => {
    navigation.navigate("Modal", { data: data[index] });
  }, []);

  return (
    <View style={styles.container}>
      <Header showBack>
        <Text style={styles.title}>Local List</Text>
      </Header>
      <UserList data={data} onPress={openPopup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 18
  },
});
