import React, { useEffect } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Animated, { Value, timing, Easing, interpolate } from "react-native-reanimated";
import Popup from "../screens/PopupScreen";
import { Ionicons } from "@expo/vector-icons";
import PopupContainer from "./PopupContainer";
const { width, height } = Dimensions.get("screen");
const VW = width / 100;
const VH = height / 100;

const animConfig = {
  duration: 500,
  toValue: 1,
  easing: Easing.in(Easing.cubic),
};

const AnimatedPopup = ({ data, onPress }) => {
  const popupValue = new Value(0);
  useEffect(() => {
    timing(popupValue, animConfig).start();
  }, []);
  const closeDown = () => {
    return timing(popupValue, { duration: 500, toValue: 0, easing: Easing.out(Easing.cubic) });
  };
  // console.log(data);
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
};

export default React.memo(AnimatedPopup);
