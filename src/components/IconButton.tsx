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
  Extrapolate,
  AnimateStyle,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { GestureResponderEvent } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedIcon from "./AnimatedIcon";

const { width } = Dimensions.get("screen");
const areaWidth = width * 0.7 - 32;

const lightText = (text: string) => <Text style={style.lightText}>{text}</Text>;

interface IIconButton {
  text: string;
  link: string;
  icon: string;
  iconColor: string;
  transition: SharedValue<number>;
  type: string;
  index: number;
}

export default React.memo(
  ({ text, link, icon, iconColor, transition, type, index }: IIconButton) => {
    const toast = useToast();
    const { top } = useSafeAreaInsets();

    // TODO Long Press actions (For now, it has only copy, but modal and actions can be added)
    const writeToClipboard = async (text: string, e: GestureResponderEvent) => {
      await Clipboard.setStringAsync(text);
      toast.hideAll();
      toast.show("Copied", {
        placement: "top",
        style: {
          top,
          backgroundColor: "#333a",
        },
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const buttonStyle = useAnimatedStyle(() => {
      const posX = (areaWidth * index) / 2 + width * 0.05;
      // Icon positioning (Y-Axis)
      const positionY = interpolate(
        transition.value,
        [0, 0.6],
        [20, index * 30],
        Extrapolate.CLAMP
      );
      //(X-Axis)
      const positionX = interpolate(
        transition.value,
        [0.2, 0.6],
        [posX, 0],
        Extrapolate.CLAMP
      );

      return {
        position: "absolute",
        transform: [{ translateY: positionY }, { translateX: positionX }],
      };
    });

    const bigIconStyle = useAnimatedStyle(() => {
      const greyIconOpacity = interpolate(
        transition.value,
        [0, 0.2],
        [0, 1],
        Extrapolate.CLAMP
      );

      return {
        position: "absolute",
        opacity: 1 - greyIconOpacity,
      };
    });

    const littleIconStyle = useAnimatedStyle(() => {
      const greyIconOpacity = interpolate(
        transition.value,
        [0, 0.2],
        [0, 1],
        Extrapolate.CLAMP
      );

      return {
        position: "absolute",
        opacity: greyIconOpacity,
      };
    });

    const contactIconStyle = useAnimatedStyle(() => ({
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      transform: [
        {
          scale: interpolate(
            transition.value,
            [0, 0.2],
            [1, 0.5],
            Extrapolate.CLAMP
          ),
        },
      ],
    }));

    const descTextStyle = useAnimatedStyle(() => ({
      position: "absolute",
      top: 46,
      fontSize: 11,
      opacity: interpolate(
        transition.value,
        [0, 0.2],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }));

    const contactDetailTextStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        transition.value,
        [0.8, 1],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }));

    return (
      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          onPress={() => Linking.openURL(link).catch((e) => console.log(e))}
          onLongPress={(e) => writeToClipboard(text, e)}
        >
          <View style={style.contact}>
            <Animated.View style={contactIconStyle}>
              <Animated.View style={bigIconStyle}>
                <AnimatedIcon name={icon} color={iconColor} />
              </Animated.View>
              <Animated.View style={littleIconStyle}>
                <AnimatedIcon name={icon} color="#556" />
              </Animated.View>
              <Animated.Text style={descTextStyle} allowFontScaling={false}>
                {lightText(type)}
              </Animated.Text>
            </Animated.View>
            <Animated.View style={contactDetailTextStyle}>
              {lightText(text)}
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

type AnimatedStyle = {
  [k: string]: (...args: any) => AnimateStyle<unknown>;
};

const style = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  lightText: { color: "#889", fontWeight: "300" },
});
