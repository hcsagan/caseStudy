import React from "react";
import { View, Dimensions } from "react-native";

export default React.memo((props) => (
  <View
    style={{
      flex: 1,
      margin: Dimensions.get("window").width * 0.05,
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        ...boxShadow,
      }}
    >
      {props.children}
    </View>
  </View>
));
const boxShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3.84,
  elevation: 5,
};
