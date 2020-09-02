/**
 * * This is the old version of popup animation.
 * * Switched to React navigation modal type animation.
 */
import React, { useEffect, useRef, useMemo } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Animated, { Value, timing, Easing } from "react-native-reanimated";
import Popup from "../screens/PopupScreen";
import { Ionicons } from "@expo/vector-icons";
import PopupContainer from "./PopupContainer";
const { width, height } = Dimensions.get("screen");

const animConfig = {
  duration: 500,
  toValue: 1,
  easing: Easing.in(Easing.cubic),
};

const closeDown = (popupValue) => {
  return timing(popupValue, { duration: 500, toValue: 0, easing: Easing.out(Easing.cubic) });
};

const AnimatedPopup = ({ data, onPress }) => {
  //  const data = useMemo(() => user, [user]);
  const popupValue = useRef(new Value(0)).current;
  useEffect(() => {
    data !== null && timing(popupValue, animConfig).start();
  }, [data]);

  // console.log(data);
  return (
    <Animated.View
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: "#0017",
        opacity: popupValue,
        transform: [{ translateY: data === null ? height : 0 }],
      }}
    >
      <PopupContainer value={popupValue}>
        {<Popup loaded={data === null ? false : true} {...data} />}
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
          onPress={() => closeDown(popupValue).start(onPress)}
        >
          <Ionicons name="ios-close" style={{ margin: 0 }} size={48} color="black" />
        </TouchableOpacity>
      </PopupContainer>
    </Animated.View>
  );
};

export default React.memo(AnimatedPopup);
