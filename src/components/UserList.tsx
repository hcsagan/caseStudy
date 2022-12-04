import React from "react";
import { FlatList, StyleSheet } from "react-native";
import UserContainer from "./UserContainer";
import UserButton from "./UserCard";
import NoUser from "./NoUser";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { User } from "../types/User";

interface UserListProps {
  data: User[],
  onPress: (index: number) => void;
}

interface RenderItemProps {
  item: User,
  index: number
}

export default React.memo(({ data, onPress }: UserListProps) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item, index }: RenderItemProps) => (
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

const listContainerStyle = ({ bottom, left, right }: EdgeInsets) => ({
  paddingBottom: bottom + 20,
  paddingLeft: left,
  paddingRight: right
});
