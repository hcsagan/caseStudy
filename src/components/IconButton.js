import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Dimensions, Linking } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
const { width } = Dimensions.get("screen");
import { useTransition, transformOrigin } from "react-native-redash";

const Icon = ({ name, size = 36, color }) => {
  const NewIcon = Animated.createAnimatedComponent(name === "old-phone" ? Entypo : Ionicons);

  return <NewIcon name={name} size={name === "old-phone" ? size - 6 : size} color={color} />;
};
const lightText = (text) => <Text style={{ color: "#889", fontWeight: "300" }}>{text}</Text>;
export default React.memo(({ text, link, icon, iconColor, open, index }) => {
  const transition = open;
  // Icon positioning
  const positionY = interpolate(transition, {
    inputRange: [0, 0.6],
    outputRange: [20, index * 30],
    extrapolate: Extrapolate.CLAMP,
  });
  // 0 : -36, 1 : width - 72
  const areaWidth = width * 0.7 - 32;
  const posX = (areaWidth * index) / 2 + width * 0.05;
  const positionX = interpolate(transition, {
    inputRange: [0.2, 0.6],
    outputRange: [posX, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  //Text opacity
  const opacity = interpolate(transition, {
    inputRange: [0.8, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  //icon scaling
  const scale = interpolate(transition, {
    inputRange: [0, 0.2],
    outputRange: [1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  //icon scaling
  const iconTextOpacity = interpolate(transition, {
    inputRange: [0, 0.2],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  // ! works but it is glitchy, don't know if it's about my device or the api. So, deactivating icon color feature
  // const animatedColor = interpolateColor(transition, {
  //   inputRange: [0, 1],
  //   outputRange: [iconColor,  "rgb(85, 85, 102)"],
  // });
  const animatedColor = iconColor;
  const texts = ["GSM", "Phone", "Mail"];
  return (
    <>
      <Animated.View
        style={{
          ...styles.button,
          position: "absolute",

          transform: [{ translateY: positionY }, { translateX: positionX }],
        }}
      >
        <TouchableOpacity onPress={() => Linking.openURL(link).catch((e) => console.log(e))}>
          <View style={styles.contact}>
            <Animated.View
              style={{
                ...styles.contactIcon,
                transform: [{ scale: scale }],
              }}
            >
              <Icon name={icon} color={animatedColor} />

              <Animated.Text
                style={{ position: "absolute", top: 46, fontSize: 11, opacity: iconTextOpacity }}
                allowFontScaling={false}
              >
                {lightText(texts[index])}
              </Animated.Text>
            </Animated.View>
            <Animated.View style={{ opacity }}>{lightText(text)}</Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },

  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contactIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
