import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import Popup from "../screens/PopupScreen";
import { Ionicons } from "@expo/vector-icons";
import PopupContainer from "./PopupContainer";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");
const VW = width / 100;
const VH = height / 100;

export default React.memo(({ popupValue, data, onPress }) => (
  <Animated.View
    style={{
      position: "absolute",
      width,
      height,
      backgroundColor: "#0017",
      opacity: popupValue,
      paddingTop: popupValue.interpolate({ inputRange: [0, 1], outputRange: [100 * VH, Constants.statusBarHeight] }),
    }}
  >
    <PopupContainer>
      <Popup {...data} />
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
        onPress={onPress}
      >
        <Ionicons name="ios-close" style={{ margin: 0 }} size={48} color="black" />
      </TouchableOpacity>
    </PopupContainer>
  </Animated.View>
));
