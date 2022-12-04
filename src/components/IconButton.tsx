import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Linking,
} from "react-native";
import Animated, {
  interpolateNode,
  Extrapolate,
  sub,
  AnimateStyle,
  
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { GestureResponderEvent } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedIcon from "./AnimatedIcon";

const { width } = Dimensions.get("screen");
const areaWidth = width * 0.7 - 32;


const lightText = (text: string) => (
  <Text style={style.lightText}>{text}</Text>
);

const getAnimatedValues = (transition: Animated.Value<number>, index: number) => {
  /*
   * Animation calculations
   */

  const posX = (areaWidth * index) / 2 + width * 0.05;
  // Icon positioning (Y-Axis)
  const positionY = interpolateNode(transition, {
    inputRange: [0, 0.6],
    outputRange: [20, index * 30],
    extrapolate: Extrapolate.CLAMP,
  });
  //(X-Axis)
  const positionX = interpolateNode(transition, {
    inputRange: [0.2, 0.6],
    outputRange: [posX, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  //Text opacity
  const opacity = interpolateNode(transition, {
    inputRange: [0.8, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  //icon scaling
  const scale = interpolateNode(transition, {
    inputRange: [0, 0.2],
    outputRange: [1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  //Text opacity (for the ones under icons)
  const iconTextOpacity = interpolateNode(transition, {
    inputRange: [0, 0.2],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return {
    positionX,
    positionY,
    opacity,
    scale,
    iconTextOpacity,
  };
};

interface IIconButton {
  text: string;
  link: string;
  icon: string;
  iconColor: string;
  open: Animated.Value<number>
  type: string;
  index: number;
}

export default React.memo(
  ({ text, link, icon, iconColor, open: transition, type, index }: IIconButton) => {
    const toast = useToast();
    const { top } = useSafeAreaInsets();

    const { iconTextOpacity, opacity, positionX, positionY, scale } =
      getAnimatedValues(transition, index);

    // TODO Long Press actions (For now, it has only copy, but modal and actions can be added)
    const writeToClipboard = async (text: string, e: GestureResponderEvent) => {
      await Clipboard.setStringAsync(text);
      toast.hideAll();
      toast.show("Copied", {
        placement: "top",
        style: {
          top,
          backgroundColor: "#333a"
        }
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    //color transition: had to do it this way, a grey icon on top of the colored one.
    const greyOpacity = interpolateNode(transition, {
      inputRange: [0, 0.2],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.View style={animatedStyle.button(positionX, positionY)}>
        <TouchableOpacity
          onPress={() => Linking.openURL(link).catch((e) => console.log(e))}
          onLongPress={(e) => writeToClipboard(text, e)}
        >
          <View style={style.contact}>
            <Animated.View style={animatedStyle.contactIcon(scale)}>
              <Animated.View style={animatedStyle.bigIcon(greyOpacity)}>
                <AnimatedIcon name={icon} color={iconColor} />
              </Animated.View>
              <Animated.View style={animatedStyle.littleIcon(greyOpacity)}>
                <AnimatedIcon name={icon} color="#556" />
              </Animated.View>
              <Animated.Text
                style={animatedStyle.descText(iconTextOpacity)}
                allowFontScaling={false}
              >
                {lightText(type)}
              </Animated.Text>
            </Animated.View>
            <Animated.View style={{ opacity }}>{lightText(text)}</Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

type AnimatedStyle = {
  [k: string]: (...args: any) => AnimateStyle<unknown>
}

const animatedStyle: AnimatedStyle = ({
  button: (x, y) => ({
    position: "absolute",
    transform: [{ translateY: y }, { translateX: x }],
  }),
  bigIcon: (greyOpacity) => ({
    position: "absolute",
    opacity: sub(1, greyOpacity),
  }),
  littleIcon: (greyOpacity) => ({
    position: "absolute",
    opacity: greyOpacity,
  }),
  contactIcon: (scale) => ({
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: scale }],
  }),
  descText: (opacity) => ({
    position: "absolute",
    top: 46,
    fontSize: 11,
    opacity,
  }),
});

const style = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  lightText: { color: "#889", fontWeight: "300" }
});
