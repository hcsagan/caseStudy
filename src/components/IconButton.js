import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Dimensions, Linking, Clipboard, Alert, Vibration } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Animated, { interpolateNode, Extrapolate, sub } from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const areaWidth = width * 0.7 - 32;

const Icon = React.memo(({ name, size = 36, color }) => {
  const NewIcon = Animated.createAnimatedComponent(name === "old-phone" ? Entypo : Ionicons);
  return <NewIcon name={name} size={name === "old-phone" ? size - 6 : size} color={color} />;
});

const lightText = (text) => <Text style={{ color: "#889", fontWeight: "300" }}>{text}</Text>;

const getAnimatedValues = (transition, index) => {
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
      iconTextOpacity
    }
}

export default React.memo(({ text, link, icon, iconColor, open: transition, type, index }) => {
  const { iconTextOpacity, opacity, positionX, positionY, scale } = getAnimatedValues(transition, index);

  // TODO Long Press actions (For now, it has only copy, but modal and actions can be added)
  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
    //Alert.alert("Copied!");
    Vibration.vibrate()
    setTimeout(() => {
      Vibration.cancel();
    }, 50);
  };

  //color transition: had to do it this way, a grey icon on top of the colored one.
  const greyOpacity = interpolateNode(transition, {
    inputRange: [0, 0.2],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={styles.button(positionX, positionY)}>
      <TouchableOpacity
        onPress={() => Linking.openURL(link).catch((e) => console.log(e))}
        onLongPress={() => writeToClipboard(text)}
      >
        <View style={styles.contact}>
          <Animated.View style={styles.contactIcon(scale)}>
            <Animated.View style={styles.bigIcon(greyOpacity)}>
              <Icon name={icon} color={iconColor} />
            </Animated.View>
            <Animated.View style={styles.littleIcon(greyOpacity)}>
              <Icon name={icon} color="#556" />
            </Animated.View>
            <Animated.Text style={styles.descText(iconTextOpacity)} allowFontScaling={false}>
              {lightText(type)}
            </Animated.Text>
          </Animated.View>
          <Animated.View style={{ opacity }}>{lightText(text)}</Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  button: (x, y) => ({
    position: "absolute",
    transform: [{ translateY: y }, { translateX: x }],
  }),
  text: {
    color: "#556",
  },
  bigIcon: (greyOpacity) => ({
    position: "absolute",
    opacity: sub(1, greyOpacity),
  }),
  littleIcon: (greyOpacity) => ({
    position: "absolute",
    opacity: greyOpacity,
  }),
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
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
