import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import Animated, { interpolate, Extrapolate, Easing, Value, timing } from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";
const Icon = ({ name, size = 18, iconStyle = { marginRight: 8 }, color = styles.text.color }) => (
  <Ionicons style={iconStyle} name={name} size={size} color={color} />
);
const light = (text) => <Text style={{ color: "#778", fontWeight: "300" }}>{text}</Text>;

const transition = new Value(0);
const openConfig = {
  toValue: 1,
  duration: 500,
  easing: Easing.in(Easing.sin),
};
const closeConfig = {
  toValue: 0,
  duration: 500,
  easing: Easing.out(Easing.sin),
};
export default ({ email, cell, phone }) => {
  const [open, setOpen] = useState(0);
  // const transition = useTransition(open, {
  //   duration: 500,
  //   easing: Easing.out(Easing.sin),
  // });
  useEffect(() => {
    open !== 0 && animate();
  }, [open]);
  const animate = () => {
    timing(transition, open ? closeConfig : openConfig).start();
  };
  const rotate = interpolate(transition, {
    inputRange: [0.2, 0.8],
    outputRange: [0, -Math.PI / 2],
    extrapolate: Extrapolate.CLAMP,
  });
  const links = [
    { index: 0, text: cell, link: `tel:${cell}`, icon: "ios-call", iconColor: "#4c7" },
    { index: 1, text: phone, link: `tel:${phone}`, icon: "old-phone", iconColor: "#fa5" },
    { index: 2, text: email, link: `mailto:${email}`, icon: "ios-mail", iconColor: "#5af" },
  ];
  return (
    <View>
      <View style={styles.headerWrapper}>
        <Text style={[styles.text, styles.headerText]}>Contact</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen((open) => !open)}>
          <View style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>DETAILS</Text>
            <Animated.View style={{ transform: transformOrigin({ x: 0, y: -1 }, { rotate }) }}>
              <Entypo name="chevron-left" color="#557" size={20} />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ height: 102 }}>
        {links.map((item, index) => (
          <IconButton {...item} open={transition} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },
  contactIcon: {
    width: 16,
    marginRight: 4,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -6,
  },
  headerText: {
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  detailsButton: {
    backgroundColor: "#f5f5ff",
    padding: 6,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: "600",
    letterSpacing: -0.5,
    color: "#557",
  },
});
