//! DEPRECATED
import React, { useMemo } from "react";
import { View, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
export default (attrs) => {
  const props = useMemo(() => attrs, [attrs]);
  return (
    <Animated.View style={styles.container(props.value)}>
      <View style={styles.wrapper}>{props.children}</View>
    </Animated.View>
  );
};
const styles = {
  container: (value) => ({
    width: Math.round(Dimensions.get("window").width * 0.9),
    marginLeft: Dimensions.get("window").width * 0.05,
    transform: [
      {
        translateY: Animated.interpolate(value, {
          inputRange: [0, 1],
          outputRange: [Dimensions.get("screen").height, 0],
        }),
      },
    ],
  }),
  wrapper: {
    backgroundColor: "#fff",
  },
};
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
