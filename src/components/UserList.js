import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import UserContainer from "./UserContainer";
import UserButton from "./UserButton";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default React.memo(({ data, onPress, local = false }) => {
  return (
    <FlatList
      data={data}
      style={{ backgroundColor: "#f5f5f9" }}
      renderItem={({ item, index }) => (
        // <User {...item} active={activeIndex === index ? true : false} onPress={() => scroller(index)} />

        <UserContainer gender={item.gender}>
          <UserButton
            name={item.name}
            location={item.location}
            picture={item.picture}
            onPress={async () => {
              setTimeout(() => onPress(index), 0);
            }}
          />
          {/* <View
            style={{
              height: "100%",
              position: "absolute",
              borderLeftColor: "red",
              borderLeftWidth: StyleSheet.hairlineWidth,
              left: "50%",
              zIndex: 1,
            }}
          /> */}
        </UserContainer>
      )}
    />
  );
});
