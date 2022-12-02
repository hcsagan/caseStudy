import React from "react";
import { FlatList, StyleSheet } from "react-native";
import UserContainer from "./UserContainer";
import UserButton from "./UserButton";
import NoUser from "./NoUser";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default React.memo(({ data, onPress }) => {
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
      contentContainerStyle={styles.listContainer(insets)}
      style={styles.list}
      ListEmptyComponent={NoUser}
    />
  );
});

const styles = StyleSheet.create({
  list: { backgroundColor: "#f5f5f9" },
  listContainer: ({ top, bottom, left, right }) => ({
    paddingTop: top + 56,
    paddingBottom: bottom + 20,
    paddingLeft: left,
    paddingRight: right
  }),
});
