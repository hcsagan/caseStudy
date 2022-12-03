import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import UserList from "../components/UserList";
import data from "../dataSets/allUsers.json";
import Header from "../components/Header";

export default ({ navigation }) => {
  const openPopup = useCallback((index) => {
    navigation.navigate("Modal", { data: data[index] });
  }, []);
  
  return (
    <View style={styles.container}>
      <Header showBack>
        <Text style={styles.title}>Local List</Text>
      </Header>
      <UserList data={data} onPress={openPopup} local={true} header={true} />
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
