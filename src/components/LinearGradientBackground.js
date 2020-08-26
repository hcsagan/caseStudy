import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default ({ colors, style, children }) => {
  return (
    <LinearGradient style={style} colors={colors}>
      {children}
    </LinearGradient>
  );
};
