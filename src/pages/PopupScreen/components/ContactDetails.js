import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import IconButton from "../../../components/IconButton";
import Animated, { interpolateNode, Extrapolate, EasingNode, Value, timing } from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";

const openConfig = {
  toValue: 1,
  duration: 500,
  easing: EasingNode.in(EasingNode.sin),
};

const closeConfig = {
  toValue: 0,
  duration: 500,
  easing: EasingNode.out(EasingNode.sin),
};

export default ({ email, cell, phone }) => {
  const transition = useRef(new Value(0)).current;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    open !== 0 && animate(open ? openConfig : closeConfig);
  }, [open]);
  
  const animate = (action) => {
    timing(transition, action).start();
  };

  const rotate = interpolateNode(transition, {
    inputRange: [0.2, 0.8],
    outputRange: [0, -Math.PI / 2],
    extrapolate: Extrapolate.CLAMP,
  });

  const links = [
    { text: cell, link: `tel:${cell}`, icon: "ios-call", iconColor: "#4c7", type: "GSM" },
    { text: phone, link: `tel:${phone}`, icon: "old-phone", iconColor: "#fa5", type: "Phone" },
    { text: email, link: `mailto:${email}`, icon: "ios-mail", iconColor: "#5af", type: "Mail" },
  ];

  return (
    <View>
      <View style={styles.headerWrapper}>
        <Text style={[styles.text, styles.headerText]}>Contact</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen((open) => (open === 0 ? true : !open))}>
          <View style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>DETAILS</Text>
            <Animated.View style={{ transform: transformOrigin({ x: 0, y: -1 }, { rotate }) }}>
              <Entypo name="chevron-left" color="#557" size={20} />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        {links.map((item, index) => (
          <IconButton {...item} index={index} open={transition} key={index.toString()} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#556",
  },
  iconContainer: { height: 102 },
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
