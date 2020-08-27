import React from "react";
import { FlatList } from "react-native";
import UserContainer from "./UserContainer";
import UserButton from "./UserButton";

export default React.memo(({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      style={{ backgroundColor: "#f9f9f9" }}
      renderItem={({ item, index }) => (
        // <User {...item} active={activeIndex === index ? true : false} onPress={() => scroller(index)} />
        <UserContainer gender={item.gender} key={item.key}>
          <UserButton
            name={item.name}
            location={item.location}
            picture={item.picture}
            onPress={async () => {
              setTimeout(() => onPress(index), 0);
            }}
          />
        </UserContainer>
      )}
      keyExtractor={(item) => item.email}
    />
  );
});
