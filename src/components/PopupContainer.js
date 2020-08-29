import React from "react";
import { View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default React.memo((props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginHorizontal: Dimensions.get("window").width * 0.05,
        marginTop: insets.top,
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
  );
});
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
