import React from "react";
import { FlatList, StyleSheet } from "react-native";
import UserContainer from "./UserContainer";
import UserButton from "./UserCard";
import NoUser from "./NoUser";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { User } from "../types/User";

interface UserListProps {
  data: User[],
  onPress: (index: number) => void;
}

export default React.memo(({ data, onPress }: UserListProps) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item, index }) => (
    <UserContainer gender={item.gender}>
      <UserButton
        name={item.name}
        location={item.location}
        picture={item.picture}
        onPress={onPress}
        index={index}
      />
    </UserContainer>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={listContainerStyle(insets)}
      style={styles.list}
      ListEmptyComponent={NoUser}
    />
  );
});

const styles = StyleSheet.create({
  list: { backgroundColor: "#f5f5f9" },
});

const listContainerStyle = ({ bottom, left, right }) => ({
  paddingBottom: bottom + 20,
  paddingLeft: left,
  paddingRight: right
});
