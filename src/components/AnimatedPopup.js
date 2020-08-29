import React, { useEffect } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Animated, { Value, timing, Easing, interpolate } from "react-native-reanimated";
import Popup from "../screens/PopupScreen";
import { Ionicons } from "@expo/vector-icons";
import PopupContainer from "./PopupContainer";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("screen");
const VW = width / 100;
const VH = height / 100;
const popupValue = new Value(0);

const animConfig = {
  duration: 500,
  toValue: 1,
  easing: Easing.in(Easing.cubic),
};
const openUp = () => {
  return timing(popupValue, animConfig);
};
const closeDown = () => {
  return timing(popupValue, { duration: 500, toValue: 0, easing: Easing.out(Easing.cubic) });
};
export default React.memo(({ data, onPress }) => {
  useEffect(() => {
    //console.warn("mounted");
    console.log("animated popup mounted");
    openUp().start();
  }, []);
  // console.log(data);
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: "#0017",
        opacity: popupValue,
        paddingTop: interpolate(popupValue, { inputRange: [0, 1], outputRange: [height, 0] }),
      }}
    >
      <PopupContainer>
        {data && <Popup {...data} />}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "white",
            width: 48,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: 16,
          }}
          onPress={() => closeDown().start(onPress)}
        >
          <Ionicons name="ios-close" style={{ margin: 0 }} size={48} color="black" />
        </TouchableOpacity>
      </PopupContainer>
    </Animated.View>
  );
});
