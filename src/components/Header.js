import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";

const Header = ({ children, showBack = false }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container(top)}>
      {showBack && <BackButton />}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (topInset) => ({
    paddingTop: topInset + 12,
    paddingBottom: 12,
    backgroundColor: "#fff",
    width: "100%",
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.get("window").width * 0.03,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
  }),
  text: {
    fontSize: 18,
  },
});

export default React.memo(Header);
